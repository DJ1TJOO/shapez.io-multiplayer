import { enumDirection, Vector } from "../../core/vector";
import { enumPinSlotType, WiredPinsComponent } from "../components/wired_pins";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { ConstantSignalComponent } from "../components/constant_signal";
import { DefaultConstantSignalVariant } from "./variants/constant_signal";

export class MetaConstantSignalBuilding extends MetaBuilding {
    constructor() {
        super("constant_signal");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaConstantSignalBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}
MetaConstantSignalBuilding.variants = [DefaultConstantSignalVariant];

MetaConstantSignalBuilding.setupEntityComponents = [
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
    entity => entity.addComponent(new ConstantSignalComponent({})),
];
