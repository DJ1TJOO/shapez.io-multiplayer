const mod = new Mod("test", {
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

mod.registerState(AboutModsState);

console.log(mod);
