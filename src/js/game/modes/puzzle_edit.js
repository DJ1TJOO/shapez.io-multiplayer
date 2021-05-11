/* typehints:start */
import { GameRoot } from "../root";
/* typehints:end */

import { enumGameModeIds } from "../game_mode";
import { PuzzleGameMode } from "./puzzle";
import { MetaStorageBuilding } from "../buildings/storage";
import { MetaReaderBuilding } from "../buildings/reader";
import { MetaFilterBuilding } from "../buildings/filter";
import { MetaDisplayBuilding } from "../buildings/display";
import { MetaLeverBuilding } from "../buildings/lever";
import { MetaItemProducerBuilding } from "../buildings/item_producer";
import { MetaMinerBuilding } from "../buildings/miner";
import { MetaWireBuilding } from "../buildings/wire";
import { MetaWireTunnelBuilding } from "../buildings/wire_tunnel";
import { MetaConstantSignalBuilding } from "../buildings/constant_signal";
import { MetaLogicGateBuilding } from "../buildings/logic_gate";
import { MetaVirtualProcessorBuilding } from "../buildings/virtual_processor";
import { MetaAnalyzerBuilding } from "../buildings/analyzer";
import { MetaComparatorBuilding } from "../buildings/comparator";
import { MetaTransistorBuilding } from "../buildings/transistor";
import { HUDPuzzleEditorControls } from "../hud/parts/puzzle_editor_controls";
import { HUDPuzzleEditorReview } from "../hud/parts/puzzle_editor_review";
import { HUDPuzzleEditorSettings } from "../hud/parts/puzzle_editor_settings";

export class PuzzleEditGameMode extends PuzzleGameMode {
    static getId() {
        return enumGameModeIds.puzzleEdit;
    }

    static getSchema() {
        return {};
    }

    /** @param {GameRoot} root */
    constructor(root) {
        super(root);

        for (const key in PuzzleEditGameMode.additionalHudParts) {
            const hudPart = PuzzleEditGameMode.additionalHudParts[key](this.root);
            if (hudPart) this.additionalHudParts[key] = hudPart;
        }

        for (let i = 0; i < PuzzleEditGameMode.hiddenBuildings.length; i++) {
            let building = PuzzleEditGameMode.hiddenBuildings[i](this.root);
            if (building) {
                this.hiddenBuildings.push(building);
            }
        }
    }

    getIsEditor() {
        return true;
    }
}

PuzzleEditGameMode.additionalHudParts = {
    ...PuzzleGameMode.additionalHudParts,
    puzzleEditorControls: root => HUDPuzzleEditorControls,
    puzzleEditorReview: root => HUDPuzzleEditorReview,
    puzzleEditorSettings: root => HUDPuzzleEditorSettings,
};

PuzzleEditGameMode.hiddenBuildings = [
    root => MetaStorageBuilding,
    root => MetaReaderBuilding,
    root => MetaFilterBuilding,
    root => MetaDisplayBuilding,
    root => MetaLeverBuilding,
    root => MetaItemProducerBuilding,
    root => MetaMinerBuilding,

    root => MetaWireBuilding,
    root => MetaWireTunnelBuilding,
    root => MetaConstantSignalBuilding,
    root => MetaLogicGateBuilding,
    root => MetaVirtualProcessorBuilding,
    root => MetaAnalyzerBuilding,
    root => MetaComparatorBuilding,
    root => MetaTransistorBuilding,
];
