/**
 * @type {import('../../../src/js/modloader/mod').Mod}
 */
const mod = new shapez.Mod("test", {
    name: "TestMod",
    description: "A test mod for modloader",
    authors: ["DJ1TJOO"],
    version: "0.0.1",
});

class AboutModsState extends shapez.TextualGameState {
    constructor() {
        super("AboutModsState");
    }

    getStateHeaderTitle() {
        return "Test";
    }

    getMainContentHTML() {
        return `
            <div class="head">
                <div class="logo">
                    <img src="${shapez.cachebust("res/logo.png")}" alt="shapez.io Logo">
                    <span class="updateLabel">Mods</span>
                </div>
            </div>
            <div class="text">
            dddd
            </div>
        `;
    }

    onEnter() {}
}

mod.registerTranslation("en", {
    mainMenu: {
        continue: "Jeee",
    },
});

mod.registerTranslation("nl", {
    mainMenu: {
        continue: "Nee",
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

        const aboutButton = shapez.makeDiv(buttonsElement, null, ["aboutButton", "settingsButton"]);
        aboutButton.addEventListener("click", () => {
            mod.modManager.app.stateMgr.moveToState("AboutModsState");
        });
    }
);

mod.registerState(AboutModsState);

console.log(mod);
