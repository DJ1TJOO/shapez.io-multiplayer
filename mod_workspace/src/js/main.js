import { makeDiv } from "shapez/core/utils";
import { ModsState } from "./states/mods";
import { mod } from "./mod";
import { AboutModsState } from "./states/about_mods";

mod.registerState(ModsState);
mod.registerState(AboutModsState);

mod.registerTranslation("en", {
    modSettings: {
        title: "Mod settings",
    },
    aboutMods: {
        title: "About mods",
        text: "This is a page about mods",
    },
    mods: {
        title: "Mods",
        categories: {
            installedmods: "Installed mods",
            exploreMods: "Explore mods",
            exploreModpacks: "Explore modpacks",
        },
    },
});

mod.registerTranslation("nl", {
    modSettings: {
        title: "Mod instellingen",
    },
    aboutMods: {
        title: "Over mods",
        text: "Dit is een pagina mods",
    },
    mods: {
        title: "Mods",
        categories: {
            installedmods: "Geïnstalleerde mods",
            exploreMods: "Verken mods",
            exploreModpacks: "Verken modpacks",
        },
    },
});

// Listen when state changed
mod.modManager.app.stateMgr.stateChanged.add(
    /**
     * @param {string} state
     * @param {import('../../../src/js/states/main_menu').MainMenuState} gameState
     */
    (state, gameState) => {
        if (state !== "MainMenuState") return;

        // Add buttons
        const buttonsElement = gameState.htmlElement.querySelector(".topButtons");

        const aboutButton = makeDiv(buttonsElement, null, ["modsButton"]);
        aboutButton.addEventListener("click", () => {
            mod.modManager.app.stateMgr.currentState.moveToState("ModsState");
        });
    }
);

console.log(mod);
