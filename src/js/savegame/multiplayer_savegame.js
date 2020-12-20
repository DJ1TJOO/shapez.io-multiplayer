import { ReadWriteProxy } from "../core/read_write_proxy";
import { ExplainedResult } from "../core/explained_result";
import { SavegameSerializer } from "./savegame_serializer";
import { BaseSavegameInterface } from "./savegame_interface";
import { createLogger } from "../core/logging";
import { globalConfig } from "../core/config";
import { getSavegameInterface, savegameInterfaces } from "./savegame_interface_registry";
import { SavegameInterface_V1001 } from "./schemas/1001";
import { SavegameInterface_V1002 } from "./schemas/1002";
import { SavegameInterface_V1003 } from "./schemas/1003";
import { SavegameInterface_V1004 } from "./schemas/1004";
import { SavegameInterface_V1005 } from "./schemas/1005";
import { SavegameInterface_V1006 } from "./schemas/1006";
import { Savegame } from "./savegame";

const logger = createLogger("savegame");

/**
 * @typedef {import("../application").Application} Application
 * @typedef {import("../game/root").GameRoot} GameRoot
 * @typedef {import("./savegame_typedefs").SavegameData} SavegameData
 * @typedef {import("./savegame_typedefs").SavegameMetadata} SavegameMetadata
 * @typedef {import("./savegame_typedefs").SavegameStats} SavegameStats
 * @typedef {import("./savegame_typedefs").SerializedGame} SerializedGame
 */

export class MultiplayerSavegame {
    /**
     *
     * @param {Application} app
     * @param {SavegameData} gameData
     */
    constructor(app, gameData) {
        /** @type {Application} */
        this.app = app;

        /** @type {SavegameData} */
        this.currentData = gameData;

        assert(
            savegameInterfaces[Savegame.getCurrentVersion()],
            "Savegame interface not defined: " + Savegame.getCurrentVersion()
        );
    }

    //////// RW Proxy Impl //////////

    /**
     * @returns {number}
     */
    static getCurrentVersion() {
        return Savegame.getCurrentVersion();
    }

    /**
     * @returns {typeof BaseSavegameInterface}
     */
    static getReaderClass() {
        return savegameInterfaces[Savegame.getCurrentVersion()];
    }

    /**
     * @returns {number}
     */
    getCurrentVersion() {
        return /** @type {typeof MultiplayerSavegame} */ (this.constructor).getCurrentVersion();
    }

    /**
     * Returns the savegames default data
     * @returns {SavegameData}
     */
    getDefaultData() {
        return {
            version: this.getCurrentVersion(),
            dump: null,
            stats: {},
            lastUpdate: Date.now(),
        };
    }

    /**
     * Verifies the savegames data
     * @param {SavegameData} data
     */
    verify(data) {
        if (!data.dump) {
            // Well, guess that works
            return ExplainedResult.good();
        }

        if (!this.getDumpReaderForExternalData(data).validate()) {
            return ExplainedResult.bad("dump-reader-failed-validation");
        }
        return ExplainedResult.good();
    }

    //////// Subclasses interface  ////////

    /**
     * Returns if this game can be saved on disc
     * @returns {boolean}
     */
    isSaveable() {
        return false;
    }

    /**
     * Returns the statistics of the savegame
     * @returns {SavegameStats}
     */
    getStatistics() {
        return this.currentData.stats;
    }

    /**
     * Returns the *real* last update of the savegame, not the one of the metadata
     * which could also be the servers one
     */
    getRealLastUpdate() {
        return this.currentData.lastUpdate;
    }

    /**
     * Returns if this game has a serialized game dump
     */
    hasGameDump() {
        return !!this.currentData.dump && this.currentData.dump.entities.length > 0;
    }

    /**
     * Returns the current game dump
     * @returns {SerializedGame}
     */
    getCurrentDump() {
        return this.currentData.dump;
    }

    /**
     * Returns a reader to access the data
     * @returns {BaseSavegameInterface}
     */
    getDumpReader() {
        if (!this.currentData.dump) {
            logger.warn("Getting reader on null-savegame dump");
        }

        const cls = /** @type {typeof MultiplayerSavegame} */ (this.constructor).getReaderClass();
        return new cls(this.currentData);
    }

    /**
     * Returns a reader to access external data
     * @returns {BaseSavegameInterface}
     */
    getDumpReaderForExternalData(data) {
        assert(data.version, "External data contains no version");
        return getSavegameInterface(data);
    }

    ///////// Public Interface ///////////

    /**
     * Updates the last update field so we can send the savegame to the server,
     * WITHOUT Saving!
     */
    setLastUpdate(time) {
        this.currentData.lastUpdate = time;
    }

    /**
     *
     * @param {GameRoot} root
     */
    updateData(root) {
        // Construct a new serializer
        const serializer = new SavegameSerializer();

        // let timer = performance.now();
        const dump = serializer.generateDumpFromGameRoot(root);
        if (!dump) {
            return false;
        }

        const shadowData = Object.assign({}, this.currentData);
        shadowData.dump = dump;
        shadowData.lastUpdate = new Date().getTime();
        shadowData.version = this.getCurrentVersion();

        const reader = this.getDumpReaderForExternalData(shadowData);

        // Validate (not in prod though)
        if (!G_IS_RELEASE) {
            const validationResult = reader.validate();
            if (!validationResult) {
                return false;
            }
        }

        // Save data
        this.currentData = shadowData;
    }
}