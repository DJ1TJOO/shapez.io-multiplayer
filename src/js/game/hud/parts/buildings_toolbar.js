import { MetaBeltBuilding } from "../../buildings/belt";
import { MetaCutterBuilding } from "../../buildings/cutter";
import { MetaDisplayBuilding } from "../../buildings/display";
import { MetaFilterBuilding } from "../../buildings/filter";
import { MetaLeverBuilding } from "../../buildings/lever";
import { MetaMinerBuilding } from "../../buildings/miner";
import { MetaMixerBuilding } from "../../buildings/mixer";
import { MetaPainterBuilding } from "../../buildings/painter";
import { MetaReaderBuilding } from "../../buildings/reader";
import { MetaRotaterBuilding } from "../../buildings/rotater";
import { MetaBalancerBuilding } from "../../buildings/balancer";
import { MetaStackerBuilding } from "../../buildings/stacker";
import { MetaTrashBuilding } from "../../buildings/trash";
import { MetaUndergroundBeltBuilding } from "../../buildings/underground_belt";
import { HUDBaseToolbar } from "./base_toolbar";
import { MetaStorageBuilding } from "../../buildings/storage";
import { MetaItemProducerBuilding } from "../../buildings/item_producer";
import { MetaConstantProducerBuilding } from "../../buildings/constant_producer";
import { MetaGoalAcceptorBuilding } from "../../buildings/goal_acceptor";
import { MetaBlockBuilding } from "../../buildings/block";
import { MetaBuilding } from "../../meta_building";

export class HUDBuildingsToolbar extends HUDBaseToolbar {
    constructor(root) {
        super(root, {
            primaryBuildings: HUDBuildingsToolbar.bar.primaryBuildings,
            secondaryBuildings: HUDBuildingsToolbar.bar.secondaryBuildings,
            visibilityCondition: () =>
                !root.camera.getIsMapOverlayActive() && root.currentLayer === "regular",
            htmlElementId: HUDBuildingsToolbar.bar.htmlElementId,
        });
    }
}

HUDBuildingsToolbar.bar = {
    /** @type {Array<typeof MetaBuilding>} */
    primaryBuildings: [
        MetaConstantProducerBuilding,
        MetaGoalAcceptorBuilding,
        MetaBeltBuilding,
        MetaBalancerBuilding,
        MetaUndergroundBeltBuilding,
        MetaMinerBuilding,
        MetaBlockBuilding,
        MetaCutterBuilding,
        MetaRotaterBuilding,
        MetaStackerBuilding,
        MetaMixerBuilding,
        MetaPainterBuilding,
        MetaTrashBuilding,
        MetaItemProducerBuilding,
    ],
    /** @type {Array<typeof MetaBuilding>} */
    secondaryBuildings: [
        MetaStorageBuilding,
        MetaReaderBuilding,
        MetaLeverBuilding,
        MetaFilterBuilding,
        MetaDisplayBuilding,
    ],
    htmlElementId: "ingame_HUD_BuildingsToolbar",
};
