import { enumDirection, Vector } from "../../core/vector";
import { enumPinSlotType, WiredPinsComponent } from "../components/wired_pins";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { DisplayComponent } from "../components/display";
import { DefaultDisplayVariant } from "./variants/display";

export class MetaDisplayBuilding extends MetaBuilding {
    constructor() {
        super("display");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaDisplayBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaDisplayBuilding.variants = [DefaultDisplayVariant];

MetaDisplayBuilding.setupEntityComponents = [
    entity =>
        entity.addComponent(
            new WiredPinsComponent({
                slots: [
                    {
                        pos: new Vector(0, 0),
                        direction: enumDirection.bottom,
                        type: enumPinSlotType.logicalAcceptor,
                    },
                ],
            })
        ),
    entity => entity.addComponent(new DisplayComponent()),
];
