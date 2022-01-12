import { T } from "shapez/translations";
import { TextualGameState } from "shapez/core/textual_game_state";
import { mod } from "../mod";

export class ModsState extends TextualGameState {
    constructor() {
        super("ModsState");
    }

    getStateHeaderTitle() {
        return T.mods.title;
    }

    getMainContentHTML() {
        return `<div class="sidebar">
                    <button class="styledButton categoryButton" data-category-btn="installedMods">${
                        T.mods.categories.installedmods
                    }</button>
                    <button class="styledButton categoryButton" data-category-btn="exploreMods">${
                        T.mods.categories.exploreMods
                    }</button>
                    <button class="styledButton categoryButton" data-category-btn="exploreModpacks">${
                        T.mods.categories.exploreModpacks
                    }</button>
                    <div class="other">
                        <button class="styledButton aboutButton" data-category-btn="exploreModpacks">${
                            T.aboutMods.title
                        }</button>
                    </div>
                </div>
                <div class="categoryContainer">
                    <div class="category" data-category="installedMods">
                        ${this.getMods()}
                    </div>
                </div>
                `;
    }

    getMods() {
        let html = "";
        for (const currentMod of mod.modManager.mods) {
            html += `<a class="setting cardbox enabled mod-settings-card-${currentMod.id}">
                <div class="row"><label>${currentMod.info.name}</label></div>
                <div class="desc">${currentMod.info.description}</div>
            </a>`;
        }
        return html;
    }

    onEnter() {
        const links = this.htmlElement.querySelectorAll("a[href]");
        links.forEach(link => {
            this.trackClicks(
                link,
                () => this.app.platformWrapper.openExternalLink(link.getAttribute("href")),
                { preventClick: true }
            );
        });

        this.initCategoryTrackClicks();

        this.htmlElement.querySelector(".category").classList.add("active");
        this.htmlElement.querySelector(".categoryButton").classList.add("active");
    }

    initCategoryTrackClicks() {
        const installedMods = this.htmlElement.querySelector("[data-category-btn='installedMods']");
        this.trackClicks(
            installedMods,
            () => {
                this.setActiveCategory("installedMods");
            },
            { preventDefault: false }
        );

        const exploreMods = this.htmlElement.querySelector("[data-category-btn='exploreMods']");
        this.trackClicks(
            exploreMods,
            () => {
                var win = window.open("/mods", "_blank");
                win.focus();
            },
            { preventDefault: false }
        );

        const exploreModpacks = this.htmlElement.querySelector("[data-category-btn='exploreModpacks']");
        this.trackClicks(
            exploreModpacks,
            () => {
                var win = window.open("/mods", "_blank");
                win.focus();
            },
            { preventDefault: false }
        );

        const about = this.htmlElement.querySelector(".aboutButton");
        this.trackClicks(
            about,
            () => {
                this.moveToStateAddGoBack("AboutModsState");
            },
            { preventDefault: false }
        );

        for (const currentMod of mod.modManager.mods) {
            if (Object.keys(currentMod.settings).length > 0)
                this.trackClicks(
                    this.htmlElement.querySelector(`.mod-settings-card-${currentMod.id}`),
                    () => {
                        this.moveToStateAddGoBack("ModSettingsState", {
                            mod: currentMod,
                        });
                    },
                    { preventClick: true }
                );
        }
    }

    setActiveCategory(category) {
        const previousCategory = this.htmlElement.querySelector(".category.active");
        const previousCategoryButton = this.htmlElement.querySelector(".categoryButton.active");

        if (previousCategory.getAttribute("data-category") == category) {
            return;
        }

        previousCategory.classList.remove("active");
        previousCategoryButton.classList.remove("active");

        const newCategory = this.htmlElement.querySelector("[data-category='" + category + "']");
        const newCategoryButton = this.htmlElement.querySelector("[data-category-btn='" + category + "']");

        newCategory.classList.add("active");
        newCategoryButton.classList.add("active");
    }
}
