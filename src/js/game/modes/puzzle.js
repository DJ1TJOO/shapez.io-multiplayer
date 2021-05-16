/* typehints:start */
import { GameRoot } from "../root";
/* typehints:end */

import { Rectangle } from "../../core/rectangle";
import { types } from "../../savegame/serialization";
import { enumGameModeTypes, GameMode } from "../game_mode";
import { HUDPuzzleBackToMenu } from "../hud/parts/puzzle_back_to_menu";
import { HUDPuzzleDLCLogo } from "../hud/parts/puzzle_dlc_logo";
import { gMetaBuildingRegistry } from "../../core/global_registries";
import { MetaBalancerBuilding } from "../buildings/balancer";
import { MetaUndergroundBeltBuilding } from "../buildings/underground_belt";

export class PuzzleGameMode extends GameMode {
    static getType() {
        return enumGameModeTypes.puzzle;
    }

    /** @returns {object} */
    static getSchema() {
        return {
            zoneHeight: types.uint,
            zoneWidth: types.uint,
        };
    }

    /** @param {GameRoot} root */
    constructor(root) {
        super(root);

        const data = this.getSaveData();

        for (const key in PuzzleGameMode.additionalHudParts) {
            const hudPart = PuzzleGameMode.additionalHudParts[key](this.root);
            if (hudPart) this.additionalHudParts[key] = hudPart;
        }

        this.zoneWidth = data.zoneWidth || 8;
        this.zoneHeight = data.zoneHeight || 6;
    }

    /**
     * @param {typeof import("../meta_building").MetaBuilding} building
     */
    isBuildingExcluded(building) {
        return this.hiddenBuildings.indexOf(building) >= 0;
    }

    getSaveData() {
        const save = this.root.savegame.getCurrentDump();
        if (!save) {
            return {};
        }
        return save.gameMode.data;
    }

    getCameraBounds() {
        return Rectangle.centered(this.zoneWidth + 20, this.zoneHeight + 20);
    }

    getBuildableZones() {
        return [Rectangle.centered(this.zoneWidth, this.zoneHeight)];
    }

    hasHub() {
        return false;
    }

    hasResources() {
        return false;
    }

    getMinimumZoom() {
        return 1;
    }

    getMaximumZoom() {
        return 4;
    }

    getIsSaveable() {
        return false;
    }

    getSupportsCopyPaste() {
        return false;
    }

    throughputDoesNotMatter() {
        return true;
    }

    getSupportsWires() {
        return false;
    }

    getFixedTickrate() {
        return 300;
    }

    getIsDeterministic() {
        return true;
    }

    /** @returns {boolean} */
    getIsFreeplayAvailable() {
        return true;
    }
}
PuzzleGameMode.additionalHudParts = {
    puzzleBackToMenu: root => HUDPuzzleBackToMenu,
    puzzleDlcLogo: root => HUDPuzzleDLCLogo,
};
