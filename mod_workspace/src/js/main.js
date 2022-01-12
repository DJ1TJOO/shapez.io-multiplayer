import { makeDiv } from "shapez/core/utils";
import { ModsState } from "./states/mods";
import { mod } from "./mod";
import { AboutModsState } from "./states/about_mods";

mod.registerState(ModsState);
mod.registerState(AboutModsState);

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
