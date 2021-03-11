import { enumDirection, Vector } from "../../core/vector";
import { enumPinSlotType, WiredPinsComponent } from "../components/wired_pins";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { LeverComponent } from "../components/lever";
import { DefaultLeverVariant } from "./variants/lever";

export class MetaLeverBuilding extends MetaBuilding {
    constructor() {
        super("lever");
    }
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaLeverBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaLeverBuilding.variants = [DefaultLeverVariant];

MetaLeverBuilding.setupEntityComponents = [
    entity =>
        entity.addComponent(
            new WiredPinsComponent({
                slots: [
                    {
                        pos: new Vector(0, 0),
                        direction: enumDirection.top,
                        type: enumPinSlotType.logicalEjector,
                    },
                ],
            })
        ),
    entity => entity.addComponent(new LeverComponent({})),
];
