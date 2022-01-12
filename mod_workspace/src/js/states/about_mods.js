import { cachebust } from "shapez/core/cachebust";
import { TextualGameState } from "shapez/core/textual_game_state";
import { T } from "shapez/translations";

export class AboutModsState extends TextualGameState {
    constructor() {
        super("AboutModsState");
    }

    getStateHeaderTitle() {
        return T.aboutMods.title;
    }

    getMainContentHTML() {
        return `
            <div class="head">
                <div class="logo">
                    <img src="${cachebust("res/logo.png")}" alt="shapez.io Logo">
                    <span class="updateLabel">Mods</span>
                </div>
            </div>
            <div class="text">
            ${T.aboutMods.text}
            </div>
        `;
    }

    onEnter() {}
}
