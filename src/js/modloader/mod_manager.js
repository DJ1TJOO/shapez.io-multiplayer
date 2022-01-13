/**
 * @typedef {import('../application').Application} Application
 */

import { Mod } from "./mod";
import { setExports } from "./exports";
import { queryParamOptions } from "../core/query_parameters";

export class ModManager {
    /**
     * @param {Application} app
     */
    constructor(app) {
        this.app = app;

        /**
         * @type {Array<Mod>}
         */
        this.mods = [];

        // Set exports
        setExports();
    }

    initialize() {
        // Load local mod for mod development
        if (G_IS_MOD || queryParamOptions.modVersion) {
            return this.loadMod("http://localhost:3010/mod.js");
        }
    }

    /**
     * @param {Mod} mod
     */
    registerMod(mod) {
        assert(!this.mods.some(x => x.id === mod.id), "no duplicate mods");
        this.mods.push(mod);

        return this;
    }

    /**
     * Loads mod js from url
     * @param {string} url http url of mod
     */
    loadMod(url) {
        return Promise.race([
            new Promise((resolve, reject) => {
                setTimeout(reject, 60 * 1000);
            }),
            fetch(url, {
                method: "GET",
                cache: "no-cache",
            }),
        ])
            .then(res => res.text())
            .catch(err => {
                assert(this, "Failed to load mod:", err);
                return Promise.reject("Downloading from '" + url + "' timed out");
            })
            .then(modCode => {
                return Promise.race([
                    new Promise((resolve, reject) => {
                        setTimeout(reject, 60 * 1000);
                    }),
                    new Promise((resolve, reject) => {
                        this.nextModResolver = resolve;
                        this.nextModRejector = reject;

                        const modScript = document.createElement("script");
                        modScript.textContent = modCode;
                        modScript.type = "text/javascript";
                        try {
                            document.head.appendChild(modScript);
                            resolve();
                        } catch (ex) {
                            console.error("Failed to insert mod, bad js:", ex);
                            this.nextModResolver = null;
                            this.nextModRejector = null;
                            reject("Mod is invalid");
                        }
                    }),
                ]);
            })
            .catch(err => {
                assert(this, "Failed to initializing mod:", err);
                return Promise.reject("Initializing mod failed: " + err);
            });
    }

    /**
     * Has mod loaded
     * @param {number} id Mod id
     * @returns {boolean}
     */
    hasMod(id) {
        return this.mods.some(x => x.id === id);
    }

    /**
     * Get mod by id
     * @param {number} id Mod id
     * @returns {Mod}
     */
    getMod(id) {
        return this.mods.find(x => x.id === id);
    }

    /**
     * Enables a mod
     * @param {number} id Mod id
     * @returns {boolean}
     */
    enableMod(id) {
        const mod = this.mods.find(x => x.id === id);
        if (!mod) return false;

        mod.enabled = true;
        mod.signals.enable.dispatch(true);

        return true;
    }

    /**
     * Disables a mod
     * @param {number} id Mod id
     * @returns {boolean}
     */
    disableMod(id) {
        const mod = this.mods.find(x => x.id === id);
        if (!mod) return false;

        mod.enabled = false;
        mod.signals.disable.dispatch();

        return true;
    }

    /**
     * Enables all mods
     */
    enableMods() {
        for (const mod of this.mods) {
            mod.enabled = true;
            mod.signals.enable.dispatch();
        }
    }

    /**
     * Disables all mods
     */
    disableMods() {
        for (const mod of this.mods) {
            mod.enabled = true;
            mod.signals.enable.dispatch();
        }
    }
}
