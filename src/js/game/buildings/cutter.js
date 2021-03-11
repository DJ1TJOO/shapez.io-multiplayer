import { formatBigNumber, formatItemsPerSecond } from "../../core/utils";
import { enumDirection, Vector } from "../../core/vector";
import { T } from "../../translations";
import { ItemAcceptorComponent } from "../components/item_acceptor";
import { ItemEjectorComponent } from "../components/item_ejector";
import { enumItemProcessorTypes, ItemProcessorComponent } from "../components/item_processor";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { defaultBuildingVariant } from "../meta_building_variant";
import { GameRoot } from "../root";
import { enumHubGoalRewards } from "../tutorial_goals";
import { DefaultCutterVariant, QuadCutterVariant } from "./variants/cutter";

export class MetaCutterBuilding extends MetaBuilding {
    constructor() {
        super("cutter");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaCutterBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaCutterBuilding.setupEntityComponents = [
    entity =>
        entity.addComponent(
            new ItemProcessorComponent({
                inputsPerCharge: 1,
                processorType: enumItemProcessorTypes.cutter,
            })
        ),
    entity => entity.addComponent(new ItemEjectorComponent({})),
    entity =>
        entity.addComponent(
            new ItemAcceptorComponent({
                slots: [
                    {
                        pos: new Vector(0, 0),
                        directions: [enumDirection.bottom],
                        filter: "shape",
                    },
                ],
            })
        ),
];

MetaCutterBuilding.variants = [DefaultCutterVariant, QuadCutterVariant];
