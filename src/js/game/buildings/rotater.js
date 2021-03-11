import { formatItemsPerSecond, generateMatrixRotations } from "../../core/utils";
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
import { CcwRotatorVariant, DefaultRotatorVariant, Rotate180RotatorVariant } from "./variants/rotator";

export class MetaRotaterBuilding extends MetaBuilding {
    constructor() {
        super("rotater");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaRotaterBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaRotaterBuilding.variants = [DefaultRotatorVariant, CcwRotatorVariant, Rotate180RotatorVariant];

MetaRotaterBuilding.setupEntityComponents = [
    entity =>
        entity.addComponent(
            new ItemProcessorComponent({
                inputsPerCharge: 1,
                processorType: enumItemProcessorTypes.rotater,
            })
        ),
    entity =>
        entity.addComponent(
            new ItemEjectorComponent({
                slots: [{ pos: new Vector(0, 0), direction: enumDirection.top }],
            })
        ),
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
