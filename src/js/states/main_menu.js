import { cachebust } from "../core/cachebust";
import { A_B_TESTING_LINK_TYPE, globalConfig, THIRDPARTY_URLS } from "../core/config";
import { GameState } from "../core/game_state";
import { DialogWithForm } from "../core/modal_dialog_elements";
import { FormElementInput } from "../core/modal_dialog_forms";
import { FlagPacketFlags, MultiplayerPacketTypes } from "../core/multiplayer_packets";
import { ReadWriteProxy } from "../core/read_write_proxy";
import {
    formatSecondsToTimeAgo,
    generateFileDownload,
    isSupportedBrowser,
    makeButton,
    makeButtonElement,
    makeDiv,
    removeAllChildren,
    startFileChoose,
    waitNextFrame,
} from "../core/utils";
import { GameLoadingOverlay } from "../game/game_loading_overlay";
import { HUDModalDialogs } from "../game/hud/parts/modal_dialogs";
import { getApplicationSettingById } from "../profile/application_settings";
import { T } from "../translations";
import { MultiplayerConnection } from "./multiplayer";

const trim = require("trim");
const io = require("socket.io-client");

/**
 * @typedef {import("../savegame/savegame_typedefs").SavegameMetadata} SavegameMetadata
 * @typedef {import("../profile/setting_types").EnumSetting} EnumSetting
 */

export class MainMenuState extends GameState {
    constructor() {
        super("MainMenuState");
    }

    getInnerHTML() {
            const bannerHtml = `
            <h3>${T.demoBanners.title}</h3>
            <p>${T.demoBanners.intro}</p>
            <a href="#" class="steamLink ${A_B_TESTING_LINK_TYPE}" target="_blank">Get the shapez.io standalone!</a>
        `;

            const showDemoBadges = this.app.restrictionMgr.getIsStandaloneMarketingActive();

            return `
            <div class="topButtons">
                <button class="languageChoose" data-languageicon="${this.app.settings.getLanguage()}"></button>
                <button class="settingsButton"></button>
            ${
                G_IS_STANDALONE || G_IS_DEV
                    ? `
                <button class="exitAppButton"></button>
            `
                    : ""
            }
            </div>

            <video autoplay muted loop class="fullscreenBackgroundVideo">
                <source src="${cachebust("res/bg_render.webm")}" type="video/webm">
            </video>

            <div class="logo">
                <img src="${cachebust("res/logo.png")}" alt="shapez.io Logo">
                <span class="updateLabel">v${G_BUILD_VERSION}</span>
            </div>

            <div class="mainWrapper ${showDemoBadges ? "demo" : "noDemo"}">
                <div class="sideContainer">
                    ${showDemoBadges ? `<div class="standaloneBanner">${bannerHtml}</div>` : ""}
                </div>

                <div class="mainContainer">
                    ${
                        isSupportedBrowser()
                            ? ""
                            : `<div class="browserWarning">${T.mainMenu.browserWarning}</div>`
                    }
                    <div class="buttons"></div>
                </div>
            </div>

            <div class="footer">
                <a class="githubLink boxLink" target="_blank">
                    ${T.mainMenu.openSourceHint}
                    <span class="thirdpartyLogo githubLogo"></span>
                </a>

                <a class="discordLink boxLink" target="_blank">
                    ${T.mainMenu.discordLink}
                    <span class="thirdpartyLogo  discordLogo"></span>
                </a>

                <div class="sidelinks">
                    <a class="redditLink">${T.mainMenu.subreddit}</a>

                    <a class="changelog">${T.changelog.title}</a>

                    <a class="helpTranslate">${T.mainMenu.helpTranslate}</a>
                </div>

                <div class="author">${T.mainMenu.madeBy.replace(
                    "<author-link>",
                    '<a class="producerLink" target="_blank">Tobias Springer</a>'
                )}</div>
            </div>
        `;
    }

    /**
     * Asks the user to import a savegame
     */
    requestImportSavegame() {
        if (
            this.app.savegameMgr.getSavegamesMetaData().length > 0 &&
            !this.app.restrictionMgr.getHasUnlimitedSavegames()
        ) {
            this.app.analytics.trackUiClick("importgame_slot_limit_show");
            this.showSavegameSlotLimit();
            return;
        }

        // Create a 'fake' file-input to accept savegames
        startFileChoose(".bin").then(file => {
            if (file) {
                const closeLoader = this.dialogs.showLoadingDialog();
                waitNextFrame().then(() => {
                    this.app.analytics.trackUiClick("import_savegame");
                    const reader = new FileReader();
                    reader.addEventListener("load", event => {
                        const contents = event.target.result;
                        let realContent;

                        try {
                            realContent = ReadWriteProxy.deserializeObject(contents);
                        } catch (err) {
                            closeLoader();
                            this.dialogs.showWarning(
                                T.dialogs.importSavegameError.title,
                                T.dialogs.importSavegameError.text + "<br><br>" + err
                            );
                            return;
                        }

                        this.app.savegameMgr.importSavegame(realContent).then(
                            () => {
                                closeLoader();
                                this.dialogs.showWarning(
                                    T.dialogs.importSavegameSuccess.title,
                                    T.dialogs.importSavegameSuccess.text
                                );

                                this.renderMainMenu();
                                this.renderSavegames();
                            },
                            err => {
                                closeLoader();
                                this.dialogs.showWarning(
                                    T.dialogs.importSavegameError.title,
                                    T.dialogs.importSavegameError.text + ":<br><br>" + err
                                );
                            }
                        );
                    });
                    reader.addEventListener("error", error => {
                        this.dialogs.showWarning(
                            T.dialogs.importSavegameError.title,
                            T.dialogs.importSavegameError.text + ":<br><br>" + error
                        );
                    });
                    reader.readAsText(file, "utf-8");
                });
            }
        });
    }

    onBackButton() {
        this.app.platformWrapper.exitApp();
    }

    onEnter(payload) {
        this.dialogs = new HUDModalDialogs(null, this.app);
        const dialogsElement = document.body.querySelector(".modalDialogParent");
        this.dialogs.initializeToElement(dialogsElement);

        if (payload.loadError) {
            this.dialogs.showWarning(
                T.dialogs.gameLoadFailure.title,
                T.dialogs.gameLoadFailure.text + "<br><br>" + payload.loadError
            );
        }

        const qs = this.htmlElement.querySelector.bind(this.htmlElement);

        if (G_IS_DEV && globalConfig.debug.fastGameEnter) {
            const games = this.app.savegameMgr.getSavegamesMetaData();
            if (games.length > 0 && globalConfig.debug.resumeGameOnFastEnter) {
                this.resumeGame(games[0]);
            } else {
                this.onPlayButtonClicked();
            }
        }

        // Initialize video
        this.videoElement = this.htmlElement.querySelector("video");
        this.videoElement.playbackRate = 0.9;
        this.videoElement.addEventListener("canplay", () => {
            if (this.videoElement) {
                this.videoElement.classList.add("loaded");
            }
        });

        this.trackClicks(qs(".settingsButton"), this.onSettingsButtonClicked);
        this.trackClicks(qs(".changelog"), this.onChangelogClicked);
        this.trackClicks(qs(".redditLink"), this.onRedditClicked);
        this.trackClicks(qs(".languageChoose"), this.onLanguageChooseClicked);
        this.trackClicks(qs(".helpTranslate"), this.onTranslationHelpLinkClicked);

        if (G_IS_STANDALONE) {
            this.trackClicks(qs(".exitAppButton"), this.onExitAppButtonClicked);
        }

        this.renderMainMenu();
        this.renderSavegames();

        const steamLink = this.htmlElement.querySelector(".steamLink");
        if (steamLink) {
            this.trackClicks(steamLink, () => this.onSteamLinkClicked(), { preventClick: true });
        }

        const discordLink = this.htmlElement.querySelector(".discordLink");
        this.trackClicks(
            discordLink,
            () => this.app.platformWrapper.openExternalLink(THIRDPARTY_URLS.discord),
            { preventClick: true }
        );

        const githubLink = this.htmlElement.querySelector(".githubLink");
        this.trackClicks(
            githubLink,
            () => this.app.platformWrapper.openExternalLink(THIRDPARTY_URLS.github),
            { preventClick: true }
        );

        const producerLink = this.htmlElement.querySelector(".producerLink");
        this.trackClicks(
            producerLink,
            () => this.app.platformWrapper.openExternalLink("https://tobspr.com"),
            { preventClick: true }
        );
    }

    renderMultiplayerMenu() {
        const buttonContainer = this.htmlElement.querySelector(".mainContainer .buttons");
        removeAllChildren(buttonContainer);

        const importButtonElement = makeButtonElement(
            ["importButton", "styledButton"],
            T.mainMenu.importSavegame
        );
        this.trackClicks(importButtonElement, this.requestImportSavegame);

        const backButton = makeButton(buttonContainer, ["backButton", "styledButton"], T.mainMenu.back);
        this.trackClicks(backButton, this.onBackButtonClicked);

        const joinButton = makeButton(buttonContainer, ["joinButton", "styledButton"], T.mainMenu.join);
        this.trackClicks(joinButton, this.onJoinButtonClicked);

        const outerDiv = makeDiv(buttonContainer, null, ["outer"], null);
        outerDiv.appendChild(importButtonElement);
        const newGameButton = makeButton(
            this.htmlElement.querySelector(".mainContainer .outer"),
            ["newGameButton", "styledButton"],
            T.mainMenu.newGame
        );
        this.trackClicks(newGameButton, this.onMultiplayerPlayButtonClicked);
    }

    renderMainMenu() {
        const buttonContainer = this.htmlElement.querySelector(".mainContainer .buttons");
        removeAllChildren(buttonContainer);

        // Import button
        const importButtonElement = makeButtonElement(
            ["importButton", "styledButton"],
            T.mainMenu.importSavegame
        );
        this.trackClicks(importButtonElement, this.requestImportSavegame);

        if (this.savedGames.length > 0) {
            // Continue game
            const continueButton = makeButton(
                buttonContainer,
                ["continueButton", "styledButton"],
                T.mainMenu.continue
            );
            this.trackClicks(continueButton, this.onContinueButtonClicked);

            // Multiplayer game
            const multiplayerButton = makeButton(
                buttonContainer,
                ["multiplayerButton", "styledButton"],
                T.mainMenu.multiplayer
            );
            this.trackClicks(multiplayerButton, this.onMultiplayerButtonClicked);

            const outerDiv = makeDiv(buttonContainer, null, ["outer"], null);
            outerDiv.appendChild(importButtonElement);
            const newGameButton = makeButton(
                this.htmlElement.querySelector(".mainContainer .outer"),
                ["newGameButton", "styledButton"],
                T.mainMenu.newGame
            );
            this.trackClicks(newGameButton, this.onPlayButtonClicked);
        } else {
            // New game
            const playBtn = makeButton(buttonContainer, ["playButton", "styledButton"], T.mainMenu.play);
            this.trackClicks(playBtn, this.onPlayButtonClicked);

            // Multiplayer game
            const multiplayerButton = makeButton(
                buttonContainer,
                ["multiplayerButton", "styledButton"],
                T.mainMenu.multiplayer
            );
            this.trackClicks(multiplayerButton, this.onMultiplayerButtonClicked);

            buttonContainer.appendChild(importButtonElement);
        }
    }

    onSteamLinkClicked() {
        this.app.analytics.trackUiClick("main_menu_steam_link_" + A_B_TESTING_LINK_TYPE);
        this.app.platformWrapper.openExternalLink(
            THIRDPARTY_URLS.standaloneStorePage + "?ref=mmsl2&prc=" + A_B_TESTING_LINK_TYPE
        );

        return false;
    }

    onExitAppButtonClicked() {
        this.app.platformWrapper.exitApp();
    }

    onChangelogClicked() {
        this.moveToState("ChangelogState");
    }

    onRedditClicked() {
        this.app.analytics.trackUiClick("main_menu_reddit_link");
        this.app.platformWrapper.openExternalLink(THIRDPARTY_URLS.reddit);
    }

    onLanguageChooseClicked() {
        this.app.analytics.trackUiClick("choose_language");
        const setting = /** @type {EnumSetting} */ (getApplicationSettingById("language"));

        const { optionSelected } = this.dialogs.showOptionChooser(T.settings.labels.language.title, {
            active: this.app.settings.getLanguage(),
            options: setting.options.map(option => ({
                value: setting.valueGetter(option),
                text: setting.textGetter(option),
                desc: setting.descGetter(option),
                iconPrefix: setting.iconPrefix,
            })),
        });

        optionSelected.add(value => {
            this.app.settings.updateLanguage(value).then(() => {
                if (setting.restartRequired) {
                    if (this.app.platformWrapper.getSupportsRestart()) {
                        this.app.platformWrapper.performRestart();
                    } else {
                        this.dialogs.showInfo(
                            T.dialogs.restartRequired.title,
                            T.dialogs.restartRequired.text,
                            ["ok:good"]
                        );
                    }
                }

                if (setting.changeCb) {
                    setting.changeCb(this.app, value);
                }
            });

            // Update current icon
            this.htmlElement.querySelector("button.languageChoose").setAttribute("data-languageIcon", value);
        }, this);
    }

    get savedGames() {
        return this.app.savegameMgr.getSavegamesMetaData();
    }

    renderSavegames(multiplayer = false) {
        const oldContainer = this.htmlElement.querySelector(".mainContainer .savegames");
        if (oldContainer) {
            oldContainer.remove();
        }
        const games = this.savedGames;
        if (games.length > 0) {
            const parent = makeDiv(this.htmlElement.querySelector(".mainContainer"), null, ["savegames"]);

            for (let i = 0; i < games.length; ++i) {
                const elem = makeDiv(parent, null, ["savegame"]);

                makeDiv(
                    elem,
                    null,
                    ["playtime"],
                    formatSecondsToTimeAgo((new Date().getTime() - games[i].lastUpdate) / 1000.0)
                );

                makeDiv(
                    elem,
                    null,
                    ["level"],
                    games[i].level
                        ? T.mainMenu.savegameLevel.replace("<x>", "" + games[i].level)
                        : T.mainMenu.savegameLevelUnknown
                );

                const name = makeDiv(
                    elem,
                    null,
                    ["name"],
                    "<span>" + (games[i].name ? games[i].name : T.mainMenu.savegameUnnamed) + "</span>"
                );

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("styledButton", "deleteGame");
                elem.appendChild(deleteButton);

                const downloadButton = document.createElement("button");
                downloadButton.classList.add("styledButton", "downloadGame");
                elem.appendChild(downloadButton);

                const renameButton = document.createElement("button");
                renameButton.classList.add("styledButton", "renameGame");
                name.appendChild(renameButton);

                const resumeButton = document.createElement("button");
                resumeButton.classList.add("styledButton", "resumeGame");
                elem.appendChild(resumeButton);

                this.trackClicks(deleteButton, () => this.deleteGame(games[i]));
                this.trackClicks(downloadButton, () => this.downloadGame(games[i]));
                this.trackClicks(renameButton, () => this.requestRenameSavegame(games[i]));

                if (multiplayer) this.trackClicks(resumeButton, () => this.resumeMultiplayerGame(games[i]));
                else this.trackClicks(resumeButton, () => this.resumeGame(games[i]));
            }
        }
    }

    /**
     * @param {SavegameMetadata} game
     */
    requestRenameSavegame(game) {
        const regex = /^[a-zA-Z0-9_\- ]{1,20}$/;

        const nameInput = new FormElementInput({
            id: "nameInput",
            label: null,
            placeholder: "",
            defaultValue: game.name || "",
            validator: val => val.match(regex) && trim(val).length > 0,
        });
        const dialog = new DialogWithForm({
            app: this.app,
            title: T.dialogs.renameSavegame.title,
            desc: T.dialogs.renameSavegame.desc,
            formElements: [nameInput],
            buttons: ["cancel:bad:escape", "ok:good:enter"],
        });
        this.dialogs.internalShowDialog(dialog);

        // When confirmed, save the name
        dialog.buttonSignals.ok.add(() => {
            game.name = trim(nameInput.getValue());
            this.app.savegameMgr.writeAsync();
            this.renderSavegames();
        });
    }

    /**
     * @param {SavegameMetadata} game
     */
    resumeGame(game) {
        this.app.analytics.trackUiClick("resume_game");

        this.app.adProvider.showVideoAd().then(() => {
            this.app.analytics.trackUiClick("resume_game_adcomplete");
            const savegame = this.app.savegameMgr.getSavegameById(game.internalId);
            savegame
                .readAsync()
                .then(() => {
                    this.moveToState("InGameState", {
                        savegame,
                    });
                })
                .catch(err => {
                    this.dialogs.showWarning(
                        T.dialogs.gameLoadFailure.title,
                        T.dialogs.gameLoadFailure.text + "<br><br>" + err
                    );
                });
        });
    }

    /**
     * @param {SavegameMetadata} game
     */
    deleteGame(game) {
        this.app.analytics.trackUiClick("delete_game");

        const signals = this.dialogs.showWarning(
            T.dialogs.confirmSavegameDelete.title,
            T.dialogs.confirmSavegameDelete.text
                .replace("<savegameName>", game.name || T.mainMenu.savegameUnnamed)
                .replace("<savegameLevel>", String(game.level)),
            ["cancel:good", "delete:bad:timeout"]
        );

        signals.delete.add(() => {
            this.app.savegameMgr.deleteSavegame(game).then(
                () => {
                    this.renderSavegames();
                    if (this.savedGames.length <= 0) this.renderMainMenu();
                },
                err => {
                    this.dialogs.showWarning(
                        T.dialogs.savegameDeletionError.title,
                        T.dialogs.savegameDeletionError.text + "<br><br>" + err
                    );
                }
            );
        });
    }

    /**
     * @param {SavegameMetadata} game
     */
    downloadGame(game) {
        this.app.analytics.trackUiClick("download_game");

        const savegame = this.app.savegameMgr.getSavegameById(game.internalId);
        savegame.readAsync().then(() => {
            const data = ReadWriteProxy.serializeObject(savegame.currentData);
            const filename = (game.name || "unnamed") + ".bin";
            generateFileDownload(filename, data);
        });
    }

    /**
     * Shows a hint that the slot limit has been reached
     */
    showSavegameSlotLimit() {
        const { getStandalone } = this.dialogs.showWarning(
            T.dialogs.oneSavegameLimit.title,
            T.dialogs.oneSavegameLimit.desc,
            ["cancel:bad", "getStandalone:good"]
        );
        getStandalone.add(() => {
            this.app.analytics.trackUiClick("visit_steampage_from_slot_limit");
            this.app.platformWrapper.openExternalLink(THIRDPARTY_URLS.standaloneStorePage + "?reF=ssll");
        });
    }

    onSettingsButtonClicked() {
        this.moveToState("SettingsState");
    }

    onTranslationHelpLinkClicked() {
        this.app.analytics.trackUiClick("translation_help_link");
        this.app.platformWrapper.openExternalLink(
            "https://github.com/tobspr/shapez.io/blob/master/translations"
        );
    }

    onPlayButtonClicked() {
        if (
            this.app.savegameMgr.getSavegamesMetaData().length > 0 &&
            !this.app.restrictionMgr.getHasUnlimitedSavegames()
        ) {
            this.app.analytics.trackUiClick("startgame_slot_limit_show");
            this.showSavegameSlotLimit();
            return;
        }

        this.app.analytics.trackUiClick("startgame");
        this.app.adProvider.showVideoAd().then(() => {
            const savegame = this.app.savegameMgr.createNewSavegame();
            this.moveToState("InGameState", {
                savegame,
            });

            this.app.analytics.trackUiClick("startgame_adcomplete");
        });
    }

    onContinueButtonClicked() {
        let latestLastUpdate = 0;
        let latestInternalId;
        this.app.savegameMgr.currentData.savegames.forEach(saveGame => {
            if (saveGame.lastUpdate > latestLastUpdate) {
                latestLastUpdate = saveGame.lastUpdate;
                latestInternalId = saveGame.internalId;
            }
        });

        const savegame = this.app.savegameMgr.getSavegameById(latestInternalId);
        savegame.readAsync().then(() => {
            this.moveToState("InGameState", {
                savegame,
            });
        });
    }

    onLeave() {
        this.dialogs.cleanup();
    }

    onMultiplayerButtonClicked() {
        this.renderMultiplayerMenu();
        this.renderSavegames(true);
    }

    onBackButtonClicked() {
        this.renderMainMenu();
        this.renderSavegames();
    }

    onJoinButtonClicked() {
        //host regex
        const host = /wss:\/\/[a-z]{2,}\.[a-z]{2,}?:[0-9]{4,5}\/?/i;

        const hostInput = new FormElementInput({
            id: "hostInput",
            label: null,
            placeholder: "",
            defaultValue: "",
            validator: val => val.match(host) && trim(val).length > 0,
        });
        const hostDialog = new DialogWithForm({
            app: this.app,
            title: T.dialogs.joinMultiplayerGameHost.title,
            desc: T.dialogs.joinMultiplayerGameHost.desc,
            formElements: [hostInput],
            buttons: ["cancel:bad:escape", "ok:good:enter"],
        });
        this.dialogs.internalShowDialog(hostDialog);

        // When confirmed, create connection
        hostDialog.buttonSignals.ok.add(() => {
            var host = trim(hostInput.getValue());

            //UUID v4 regex
            const uuid = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

            const connectIdInput = new FormElementInput({
                id: "connectIdInput",
                label: null,
                placeholder: "",
                defaultValue: "",
                validator: val => val.match(uuid) && trim(val).length > 0,
            });
            const dialog = new DialogWithForm({
                app: this.app,
                title: T.dialogs.joinMultiplayerGame.title,
                desc: T.dialogs.joinMultiplayerGame.desc,
                formElements: [connectIdInput],
                buttons: ["cancel:bad:escape", "ok:good:enter"],
            });
            this.dialogs.internalShowDialog(dialog);

            // When confirmed, create connection
            dialog.buttonSignals.ok.add(() => {
                let connectionId = trim(connectIdInput.getValue());

                // @ts-ignore
                var socket = io(host, { transport: ["websocket"] });
                var socketId = undefined;
                socket.on("connect", () => {
                    socket.on("id", id => {
                        socketId = id;
                        socket.emit("joinRoom", connectionId, socketId);
                    });
                    socket.on("error", () => {
                        this.dialogs.showWarning(
                            T.dialogs.multiplayerGameError.title,
                            T.dialogs.multiplayerGameError.desc + "<br><br>"
                        );
                    });
                    socket.on("offer", async data => {
                        if (data.socketIdSender !== socketId) return;
                        const config = {
                            iceServers: [
                                {
                                    urls: "stun:stun.1.google.com:19302",
                                },
                            ],
                        };
                        const pc = new RTCPeerConnection(config);
                        const dc = pc.createDataChannel("game", {
                            negotiated: true,
                            id: 0,
                        });
                        await pc.setRemoteDescription({
                            type: "offer",
                            sdp: data.offer,
                        });
                        await pc.setLocalDescription(await pc.createAnswer());
                        pc.onicecandidate = ({ candidate }) => {
                            if (candidate) return;
                            socket.emit("answer", {
                                socketIdReceiver: data.socketIdReceiver,
                                socketIdSender: data.socketIdSender,
                                answer: pc.localDescription.sdp,
                                room: data.room,
                            });
                        };

                        var gameDataState = -1;
                        var gameData = "";

                        var onMessage = ev => {
                            var packet = JSON.parse(ev.data);

                            //When data ends
                            if (
                                packet.type === MultiplayerPacketTypes.FLAG &&
                                packet.flag === FlagPacketFlags.ENDDATA
                            ) {
                                gameDataState = 1;
                                console.log(gameData);
                                gameData = JSON.parse(gameData);
                                var connection = new MultiplayerConnection(pc, dc, gameData);
                                this.moveToState("MultiplayerState", {
                                    connection,
                                    connectionId,
                                });
                            }

                            //When data recieved
                            if (packet.type === MultiplayerPacketTypes.DATA && gameDataState === 0)
                                gameData = gameData + packet.data;

                            //When start data
                            if (
                                packet.type === MultiplayerPacketTypes.FLAG &&
                                packet.flag === FlagPacketFlags.STARTDATA
                            ) {
                                gameDataState = 0;
                                this.loadingOverlay = new GameLoadingOverlay(this.app, this.getDivElement());
                                this.loadingOverlay.showBasic();
                            }
                        };

                        dc.onmessage = onMessage;
                        pc.ondatachannel = event => {
                            let receiveChannel = event.channel;
                            receiveChannel.onmessage = onMessage;
                        };
                    });
                });
            });
        });
    }

    onMultiplayerPlayButtonClicked() {
        if (
            this.app.savegameMgr.getSavegamesMetaData().length > 0 &&
            !this.app.restrictionMgr.getHasUnlimitedSavegames()
        ) {
            this.app.analytics.trackUiClick("startgame_slot_limit_show");
            this.showSavegameSlotLimit();
            return;
        }
        //host regex
        const host = /wss:\/\/[a-z]{2,}\.[a-z]{2,}?:[0-9]{4,5}\/?/i;

        const hostInput = new FormElementInput({
            id: "hostInput",
            label: null,
            placeholder: "",
            defaultValue: "",
            validator: val => trim(val).length > 0,
        });
        const hostDialog = new DialogWithForm({
            app: this.app,
            title: T.dialogs.createMultiplayerGameHost.title,
            desc: T.dialogs.createMultiplayerGameHost.desc,
            formElements: [hostInput],
            buttons: ["cancel:bad:escape", "ok:good:enter"],
        });
        this.dialogs.internalShowDialog(hostDialog);

        hostDialog.buttonSignals.ok.add(() => {
            this.app.analytics.trackUiClick("startgame");
            this.app.adProvider.showVideoAd().then(() => {
                var host = trim(hostInput.getValue());
                const savegame = this.app.savegameMgr.createNewSavegame();
                this.moveToState("MultiplayerState", {
                    savegame,
                    host: host,
                });

                this.app.analytics.trackUiClick("startgame_adcomplete");
            });
        });
    }

    /**
     * @param {SavegameMetadata} game
     */
    resumeMultiplayerGame(game) {
        //host regex
        const host = /ws:\/\/[a-z]{2,}.[a-z]{2,}?:[0-9]{4,5}\/?/i;

        const hostInput = new FormElementInput({
            id: "hostInput",
            label: null,
            placeholder: "",
            defaultValue: "",
            validator: val => trim(val).length > 0,
        });
        const hostDialog = new DialogWithForm({
            app: this.app,
            title: T.dialogs.createMultiplayerGameHost.title,
            desc: T.dialogs.createMultiplayerGameHost.desc,
            formElements: [hostInput],
            buttons: ["cancel:bad:escape", "ok:good:enter"],
        });
        this.dialogs.internalShowDialog(hostDialog);

        hostDialog.buttonSignals.ok.add(() => {
            this.app.analytics.trackUiClick("resume_game");

            this.app.adProvider.showVideoAd().then(() => {
                var host = trim(hostInput.getValue());
                this.app.analytics.trackUiClick("resume_game_adcomplete");
                const savegame = this.app.savegameMgr.getSavegameById(game.internalId);
                savegame
                    .readAsync()
                    .then(() => {
                        this.moveToState("MultiplayerState", {
                            savegame,
                            host: host,
                        });
                    })
                    .catch(err => {
                        this.dialogs.showWarning(
                            T.dialogs.gameLoadFailure.title,
                            T.dialogs.gameLoadFailure.text + "<br><br>" + err
                        );
                    });
            });
        });
    }
}