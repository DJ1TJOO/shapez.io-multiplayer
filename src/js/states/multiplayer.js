import { APPLICATION_ERROR_OCCURED } from "../core/error_handler";
import { GameState } from "../core/game_state";
import { logSection, createLogger } from "../core/logging";
import { waitNextFrame } from "../core/utils";
import { globalConfig } from "../core/config";
import { GameLoadingOverlay } from "../game/game_loading_overlay";
import { KeyActionMapper } from "../game/key_action_mapper";
import { Savegame } from "../savegame/savegame";
import { GameCore } from "../game/core";
import { MUSIC } from "../platform/sound";
import { HUDModalDialogs } from "../game/hud/parts/modal_dialogs";
import { MultiplayerSavegame } from "../savegame/multiplayer_savegame";
import {
    DataPacket,
    FlagPacket,
    FlagPacketFlags,
    MultiplayerPacket,
    MultiplayerPacketTypes,
    SignalPacket,
    SignalPacketSignals,
    StringSerializable,
} from "../core/multiplayer_packets";
import { getBuildingDataFromCode } from "../game/building_codes";
import { ConstantSignalComponent } from "../game/components/constant_signal";

const logger = createLogger("state/ingame");
const { v4: uuidv4 } = require("uuid");
const wrtc = require("wrtc");
const Peer = require("simple-peer");
const io = require("socket.io-client");

// Different sub-states
const stages = {
    s3_createCore: "🌈 3: Create core",
    s4_A_initEmptyGame: "🌈 4/A: Init empty game",
    s4_B_resumeGame: "🌈 4/B: Resume game",

    s5_firstUpdate: "🌈 5: First game update",
    s6_postLoadHook: "🌈 6: Post load hook",
    s7_warmup: "🌈 7: Warmup",

    s10_gameRunning: "🌈 10: Game finally running",

    leaving: "🌈 Saving, then leaving the game",
    destroyed: "🌈 DESTROYED: Core is empty and waits for state leave",
    initFailed: "🌈 ERROR: Initialization failed!",
};

export const gameCreationAction = {
    new: "new-game",
    resume: "resume-game",
};

export class MultiplayerConnection {
    constructor(peer, gameData) {
        /** @type {Peer} */
        this.peer = peer;

        /** @type {object} */
        this.gameData = gameData;
    }
}

// Typehints
export class GameCreationPayload {
    constructor() {
        /** @type {boolean|undefined} */
        this.fastEnter;

        /** @type {Savegame|undefined} */
        this.savegame;

        /** @type {string|undefined} */
        this.connectionId;

        /** @type {MultiplayerConnection|undefined} */
        this.connection;

        /** @type {String|undefined} */
        this.host;
    }
}

export class MultiplayerState extends GameState {
    constructor() {
        super("MultiplayerState");

        /** @type {GameCreationPayload} */
        this.creationPayload = null;

        // Stores current stage
        this.stage = "";

        /** @type {GameCore} */
        this.core = null;

        /** @type {KeyActionMapper} */
        this.keyActionMapper = null;

        /** @type {GameLoadingOverlay} */
        this.loadingOverlay = null;

        /** @type {Savegame} */
        this.savegame = null;

        /** @type {string} */
        this.connectionId = undefined;

        /** @type {MultiplayerConnection} */
        this.connection = undefined;

        /** @type {String} */
        this.host = undefined;

        this.boundInputFilter = this.filterInput.bind(this);

        /**
         * Whether we are currently saving the game
         * @TODO: This doesn't realy fit here
         */
        this.currentSavePromise = null;
    }

    /**
     * Switches the game into another sub-state
     * @param {string} stage
     */
    switchStage(stage) {
        assert(stage, "Got empty stage");
        if (stage !== this.stage) {
            this.stage = stage;
            logger.log(this.stage);
            return true;
        } else {
            // log(this, "Re entering", stage);
            return false;
        }
    }

    // GameState implementation
    getInnerHTML() {
        return "";
    }

    getThemeMusic() {
        return MUSIC.theme;
    }

    onBeforeExit() {
        // logger.log("Saving before quitting");
        // return this.doSave().then(() => {
        //     logger.log(this, "Successfully saved");
        //     // this.stageDestroyed();
        // });
    }

    onAppPause() {
        // if (this.stage === stages.s10_gameRunning) {
        //     logger.log("Saving because app got paused");
        //     this.doSave();
        // }
    }

    getHasFadeIn() {
        return false;
    }

    getPauseOnFocusLost() {
        return false;
    }

    getHasUnloadConfirmation() {
        return true;
    }

    onLeave() {
        if (this.core) {
            this.stageDestroyed();
        }
        this.app.inputMgr.dismountFilter(this.boundInputFilter);
    }

    onResized(w, h) {
        super.onResized(w, h);
        if (this.stage === stages.s10_gameRunning) {
            this.core.resize(w, h);
        }
    }

    // ---- End of GameState implementation

    /**
     * Goes back to the menu state
     */
    goBackToMenu() {
        this.saveThenGoToState("MainMenuState");
    }

    /**
     * Goes back to the settings state
     */
    goToSettings() {
        this.saveThenGoToState("SettingsState", {
            backToStateId: this.key,
            backToStatePayload: this.creationPayload,
        });
    }

    /**
     * Goes back to the settings state
     */
    goToKeybindings() {
        this.saveThenGoToState("KeybindingsState", {
            backToStateId: this.key,
            backToStatePayload: this.creationPayload,
        });
    }

    /**
     * Moves to a state outside of the game
     * @param {string} stateId
     * @param {any=} payload
     */
    saveThenGoToState(stateId, payload) {
        if (this.stage === stages.leaving || this.stage === stages.destroyed) {
            logger.warn(
                "Tried to leave game twice or during destroy:",
                this.stage,
                "(attempted to move to",
                stateId,
                ")"
            );
            return;
        }
        this.stageLeavingGame();
        this.doSave().then(() => {
            this.stageDestroyed();
            this.moveToState(stateId, payload);
        });
    }

    onBackButton() {
        // do nothing
    }

    /**
     * Called when the game somehow failed to initialize. Resets everything to basic state and
     * then goes to the main menu, showing the error
     * @param {string} err
     */
    onInitializationFailure(err) {
        if (this.switchStage(stages.initFailed)) {
            logger.error("Init failure:", err);
            this.stageDestroyed();
            this.moveToState("MainMenuState", { loadError: err });
        }
    }

    // STAGES

    /**
     * Creates the game core instance, and thus the root
     */
    stage3CreateCore() {
        if (this.switchStage(stages.s3_createCore)) {
            logger.log("Creating new game core");
            this.core = new GameCore(this.app);

            if (this.connection) {
                this.multiplayerSavegame = new MultiplayerSavegame(this.app, this.connection.gameData);
                this.core.initializeRootMultiplayer(this, this.multiplayerSavegame);

                console.log(this.multiplayerSavegame);
                if (this.multiplayerSavegame.hasGameDump()) {
                    this.stage4bResumeGame();
                } else {
                    this.onInitializationFailure("The multiplayer game could not be loaded.");
                }
            } else {
                this.core.initializeRoot(this, this.savegame);

                if (this.savegame.hasGameDump()) {
                    this.stage4bResumeGame();
                } else {
                    this.app.gameAnalytics.handleGameStarted();
                    this.stage4aInitEmptyGame();
                }
            }
        }
    }

    /**
     * Initializes a new empty game
     */
    stage4aInitEmptyGame() {
        if (this.switchStage(stages.s4_A_initEmptyGame)) {
            this.core.initNewGame();
            this.stage5FirstUpdate();
        }
    }

    /**
     * Resumes an existing game
     */
    stage4bResumeGame() {
        if (this.switchStage(stages.s4_B_resumeGame)) {
            if (!this.core.initExistingGame(this.connection ? true : false)) {
                this.onInitializationFailure("Savegame is corrupt and can not be restored.");
                return;
            }
            this.app.gameAnalytics.handleGameResumed();
            this.stage5FirstUpdate();
        }
    }

    /**
     * Performs the first game update on the game which initializes most caches
     */
    stage5FirstUpdate() {
        if (this.switchStage(stages.s5_firstUpdate)) {
            this.core.root.logicInitialized = true;
            this.core.updateLogic();
            this.stage6PostLoadHook();
        }
    }

    /**
     * Call the post load hook, this means that we have loaded the game, and all systems
     * can operate and start to work now.
     */
    stage6PostLoadHook() {
        if (this.switchStage(stages.s6_postLoadHook)) {
            logger.log("Post load hook");
            this.core.postLoadHook();
            this.stage7Warmup();
        }
    }

    /**
     * This makes the game idle and draw for a while, because we run most code this way
     * the V8 engine can already start to optimize it. Also this makes sure the resources
     * are in the VRAM and we have a smooth experience once we start.
     */
    stage7Warmup() {
        if (this.switchStage(stages.s7_warmup)) {
            if (this.creationPayload.fastEnter) {
                this.warmupTimeSeconds = globalConfig.warmupTimeSecondsFast;
            } else {
                this.warmupTimeSeconds = globalConfig.warmupTimeSecondsRegular;
            }
        }
    }

    /**
     * The final stage where this game is running and updating regulary.
     */
    async stage10GameRunning() {
        if (this.switchStage(stages.s10_gameRunning)) {
            this.core.root.signals.readyToRender.dispatch();

            logSection("GAME STARTED", "#26a69a");

            // Initial resize, might have changed during loading (this is possible)
            this.core.resize(this.app.screenWidth, this.app.screenHeight);

            //Connect to signalling server
            if (this.connectionId) {
                var onOpen = event => {
                    this.core.root.signals.entityAdded.add(entity => {
                        if (entity.multipalyerPlace) return;

                        MultiplayerPacket.sendPacket(
                            this.connection.peer,
                            new SignalPacket(SignalPacketSignals.entityAdded, [entity])
                        );
                    });
                    this.core.root.signals.entityDestroyed.add(entity => {
                        if (entity.multipalyerDestroy) return;

                        MultiplayerPacket.sendPacket(
                            this.connection.peer,
                            new SignalPacket(SignalPacketSignals.entityDestroyed, [entity])
                        );
                    });
                    this.core.root.signals.entityComponentChanged.add((entity, component) => {
                        if (!(component instanceof ConstantSignalComponent)) return;

                        MultiplayerPacket.sendPacket(
                            this.connection.peer,
                            new SignalPacket(SignalPacketSignals.entityComponentChanged, [entity, component])
                        );
                    });
                    this.core.root.signals.entityGotNewComponent.add(entity => {
                        if (entity.multipalyerComponentAdd) return;

                        MultiplayerPacket.sendPacket(
                            this.connection.peer,
                            new SignalPacket(SignalPacketSignals.entityComponentRemoved, [entity])
                        );
                    });
                    this.core.root.signals.entityComponentRemoved.add(entity => {
                        if (entity.multipalyerComponentRemove) return;

                        MultiplayerPacket.sendPacket(
                            this.connection.peer,
                            new SignalPacket(SignalPacketSignals.entityComponentRemoved, [entity])
                        );
                    });
                    this.core.root.signals.upgradePurchased.add(upgradeId => {
                        if (this.core.root.multiplayerUpgradePurchased) return;

                        MultiplayerPacket.sendPacket(
                            this.connection.peer,
                            new SignalPacket(SignalPacketSignals.upgradePurchased, [
                                new StringSerializable(upgradeId),
                            ])
                        );
                    });
                };

                var onMessage = data => {
                    var packet = JSON.parse(data);
                    if (packet.type === MultiplayerPacketTypes.SIGNAL) {
                        packet.args = MultiplayerPacket.deserialize(packet.args, this.core.root);
                        if (packet.signal === SignalPacketSignals.entityAdded) {
                            var entity = packet.args[0];

                            this.core.root.hud.parts.buildingPlacer.tryPlaceCurrentBuildingAt(
                                entity.components.StaticMapEntity.origin, {
                                    origin: entity.components.StaticMapEntity.origin,
                                    originalRotation: entity.components.StaticMapEntity.originalRotation,
                                    rotation: entity.components.StaticMapEntity.rotation,
                                    rotationVariant: getBuildingDataFromCode(
                                        entity.components.StaticMapEntity.code
                                    ).rotationVariant,
                                    variant: getBuildingDataFromCode(entity.components.StaticMapEntity.code)
                                        .variant,
                                    building: getBuildingDataFromCode(entity.components.StaticMapEntity.code)
                                        .metaInstance,
                                },
                                entity.uid,
                                true
                            );
                        }
                        if (packet.signal === SignalPacketSignals.entityDestroyed) {
                            if (this.core.root.entityMgr.findByUid(packet.args[0].uid) !== null)
                                this.core.root.logic.tryDeleteBuilding(
                                    this.core.root.entityMgr.findByUid(packet.args[0].uid),
                                    true
                                );
                        }
                        if (packet.signal === SignalPacketSignals.entityComponentChanged) {
                            let entity = this.core.root.entityMgr.findByUid(packet.args[0].uid);
                            let component = packet.args[1];
                            if (entity === null) return;
                            entity.removeComponent(component.constructor, false, true);
                            entity.addComponent(component, false, true);
                        }
                        if (packet.signal === SignalPacketSignals.upgradePurchased) {
                            this.core.root.hubGoals.tryUnlockUpgrade(packet.args[0].value, true);
                        }
                    }
                };

                this.connection.peer.on("connect", onOpen);
                onOpen();

                this.connection.peer.on("data", onMessage);
            } else {
                this.connectionId = uuidv4();
                // @ts-ignore
                var socket = io(this.host, { transport: ["websocket"] });
                var socketId = undefined;

                var connections = [];
                socket.on("connect", () => {
                    socket.on("id", id => {
                        socketId = id;
                    });
                    socket.emit("createRoom", this.connectionId);

                    //Create peer
                    socket.on("createPeer", async data => {
                        const config = {
                            iceServers: [{
                                    urls: "stun:stun.1.google.com:19302",
                                },
                                {
                                    url: "turn:numb.viagenie.ca",
                                    credential: "muazkh",
                                    username: "webrtc@live.com",
                                },
                            ],
                        };
                        const peer = new Peer({ initiator: true, wrtc: wrtc, config: config });
                        const peerId = uuidv4();
                        peer.on("signal", signalData => {
                            console.log("Send signal");
                            console.log({
                                peerId: peerId,
                                signal: signalData,
                                senderId: socketId,
                                receiverId: data.receiverId,
                            });
                            socket.emit("signal", {
                                peerId: peerId,
                                signal: signalData,
                                senderId: socketId,
                                receiverId: data.receiverId,
                            });
                        });
                        socket.on("signal", signalData => {
                            if (socketId !== signalData.receiverId) return;
                            if (peerId !== signalData.peerId) return;
                            console.log("Received signal");
                            console.log(signalData);

                            peer.signal(signalData.signal);
                        });

                        var onOpen = event => {
                            this.core.root.signals.entityAdded.add(entity => {
                                if (entity.multipalyerPlace) return;

                                MultiplayerPacket.sendPacket(
                                    peer,
                                    new SignalPacket(SignalPacketSignals.entityAdded, [entity]),
                                    connections
                                );
                            });
                            this.core.root.signals.entityDestroyed.add(entity => {
                                if (entity.multipalyerDestroy) return;

                                MultiplayerPacket.sendPacket(
                                    peer,
                                    new SignalPacket(SignalPacketSignals.entityDestroyed, [entity]),
                                    connections
                                );
                            });
                            this.core.root.signals.entityComponentChanged.add((entity, component) => {
                                if (!(component instanceof ConstantSignalComponent)) return;

                                MultiplayerPacket.sendPacket(
                                    peer,
                                    new SignalPacket(SignalPacketSignals.entityComponentChanged, [
                                        entity,
                                        component,
                                    ]),
                                    connections
                                );
                            });
                            this.core.root.signals.entityGotNewComponent.add(entity => {
                                if (entity.multipalyerComponentAdd) return;

                                MultiplayerPacket.sendPacket(
                                    peer,
                                    new SignalPacket(SignalPacketSignals.entityComponentRemoved, [entity]),
                                    connections
                                );
                            });
                            this.core.root.signals.entityComponentRemoved.add(entity => {
                                if (entity.multipalyerComponentRemove) return;

                                MultiplayerPacket.sendPacket(
                                    peer,
                                    new SignalPacket(SignalPacketSignals.entityComponentRemoved, [entity]),
                                    connections
                                );
                            });
                            this.core.root.signals.upgradePurchased.add(upgradeId => {
                                if (this.core.root.multiplayerUpgradePurchased) return;

                                MultiplayerPacket.sendPacket(
                                    peer,
                                    new SignalPacket(SignalPacketSignals.upgradePurchased, [
                                        new StringSerializable(upgradeId),
                                    ]),
                                    connections
                                );
                            });

                            var dataPackets = DataPacket.createFromData({
                                    version: this.savegame.getCurrentVersion(),
                                    dump: this.savegame.getCurrentDump(),
                                    stats: this.savegame.getStatistics(),
                                    lastUpdate: this.savegame.getRealLastUpdate(),
                                },
                                600
                            );

                            MultiplayerPacket.sendPacket(peer, new FlagPacket(FlagPacketFlags.STARTDATA));
                            for (let i = 0; i < dataPackets.length; i++) {
                                MultiplayerPacket.sendPacket(peer, dataPackets[i]);
                            }
                            MultiplayerPacket.sendPacket(peer, new FlagPacket(FlagPacketFlags.ENDDATA));
                        };

                        var onMessage = data => {
                            var packet = JSON.parse(data);
                            if (packet.type === MultiplayerPacketTypes.SIGNAL) {
                                packet.args = MultiplayerPacket.deserialize(packet.args, this.core.root);

                                for (let i = 0; i < connections.length; i++) {
                                    if (connections[i].peerId === peerId) continue;

                                    MultiplayerPacket.sendPacket(
                                        connections[i].peer,
                                        new SignalPacket(packet.signal, packet.args),
                                        connections
                                    );
                                }

                                if (packet.signal === SignalPacketSignals.entityAdded) {
                                    var entity = packet.args[0];

                                    this.core.root.hud.parts.buildingPlacer.tryPlaceCurrentBuildingAt(
                                        entity.components.StaticMapEntity.origin, {
                                            origin: entity.components.StaticMapEntity.origin,
                                            originalRotation: entity.components.StaticMapEntity.originalRotation,
                                            rotation: entity.components.StaticMapEntity.rotation,
                                            rotationVariant: getBuildingDataFromCode(
                                                entity.components.StaticMapEntity.code
                                            ).rotationVariant,
                                            variant: getBuildingDataFromCode(
                                                entity.components.StaticMapEntity.code
                                            ).variant,
                                            building: getBuildingDataFromCode(
                                                entity.components.StaticMapEntity.code
                                            ).metaInstance,
                                        },
                                        entity.uid,
                                        true
                                    );
                                }
                                if (packet.signal === SignalPacketSignals.entityDestroyed) {
                                    if (this.core.root.entityMgr.findByUid(packet.args[0].uid) !== null)
                                        this.core.root.logic.tryDeleteBuilding(
                                            this.core.root.entityMgr.findByUid(packet.args[0].uid),
                                            true
                                        );
                                }
                                if (packet.signal === SignalPacketSignals.entityComponentChanged) {
                                    let entity = this.core.root.entityMgr.findByUid(packet.args[0].uid);
                                    let component = packet.args[1];
                                    if (entity === null) return;
                                    entity.removeComponent(component.constructor, false, true);
                                    entity.addComponent(component, false, true);
                                }
                                if (packet.signal === SignalPacketSignals.upgradePurchased) {
                                    this.core.root.hubGoals.tryUnlockUpgrade(packet.args[0].value, true);
                                }
                            }
                        };

                        peer.on("connect", onOpen);
                        peer.on("data", onMessage);

                        connections.push({ peer: peer, peerId: peerId });
                    });
                });

                this.dialogs = new HUDModalDialogs(null, this.app);
                const dialogsElement = document.body.querySelector(".modalDialogParent");
                this.dialogs.initializeToElement(dialogsElement);

                this.dialogs.showInfo(
                    "Share the code with your friends",
                    `<a href="${this.connectionId}" onclick="event.preventDefault();navigator.clipboard.writeText(event.target.getAttribute('href')).then(() => {},() => {});">${this.connectionId}</a>`
                );
            }
        }
    }

    /**
     * This stage destroys the whole game, used to cleanup
     */
    stageDestroyed() {
        if (this.switchStage(stages.destroyed)) {
            // Cleanup all api calls
            this.cancelAllAsyncOperations();

            if (this.syncer) {
                this.syncer.cancelSync();
                this.syncer = null;
            }

            // Cleanup core
            if (this.core) {
                this.core.destruct();
                this.core = null;
            }
        }
    }

    /**
     * When leaving the game
     */
    stageLeavingGame() {
        if (this.switchStage(stages.leaving)) {
            // ...
        }
    }

    // END STAGES

    /**
     * Filters the input (keybindings)
     */
    filterInput() {
        return this.stage === stages.s10_gameRunning;
    }

    /**
     * @param {GameCreationPayload} payload
     */
    onEnter(payload) {
        this.app.inputMgr.installFilter(this.boundInputFilter);

        this.creationPayload = payload;
        this.savegame = payload.savegame;
        this.connectionId = payload.connectionId;
        this.connection = payload.connection;
        this.host = payload.host;

        this.loadingOverlay = new GameLoadingOverlay(this.app, this.getDivElement());
        this.loadingOverlay.showBasic();

        this.asyncChannel.watch(waitNextFrame()).then(() => this.stage3CreateCore());
    }

    /**
     * Render callback
     * @param {number} dt
     */
    onRender(dt) {
        if (APPLICATION_ERROR_OCCURED) {
            // Application somehow crashed, do not do anything
            return;
        }

        if (this.stage === stages.s7_warmup) {
            this.core.draw();
            this.warmupTimeSeconds -= dt / 1000.0;
            if (this.warmupTimeSeconds < 0) {
                logger.log("Warmup completed");
                this.stage10GameRunning();
            }
        }

        if (this.stage === stages.s10_gameRunning) {
            this.core.tick(dt);
        }

        // If the stage is still active (This might not be the case if tick() moved us to game over)
        if (this.stage === stages.s10_gameRunning) {
            // Only draw if page visible
            if (this.app.pageVisible) {
                this.core.draw();
            }

            this.loadingOverlay.removeIfAttached();
        } else {
            if (!this.loadingOverlay.isAttached()) {
                this.loadingOverlay.showBasic();
            }
        }
    }

    onBackgroundTick(dt) {
        this.onRender(dt);
    }

    /**
     * Saves the game
     */

    doSave() {
        if (!this.savegame || !this.savegame.isSaveable()) {
            return Promise.resolve();
        }

        if (APPLICATION_ERROR_OCCURED) {
            logger.warn("skipping save because application crashed");
            return Promise.resolve();
        }

        if (
            this.stage !== stages.s10_gameRunning &&
            this.stage !== stages.s7_warmup &&
            this.stage !== stages.leaving
        ) {
            logger.warn("Skipping save because game is not ready");
            return Promise.resolve();
        }

        if (this.currentSavePromise) {
            logger.warn("Skipping double save and returning same promise");
            return this.currentSavePromise;
        }
        logger.log("Starting to save game ...");
        this.savegame.updateData(this.core.root);

        this.currentSavePromise = this.savegame
            .writeSavegameAndMetadata()
            .catch(err => {
                // Catch errors
                logger.warn("Failed to save:", err);
            })
            .then(() => {
                // Clear promise
                logger.log("Saved!");
                this.core.root.signals.gameSaved.dispatch();
                this.currentSavePromise = null;
            });

        return this.currentSavePromise;
    }
}