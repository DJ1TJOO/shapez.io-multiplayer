import { enumDirection, Vector } from "../../core/vector";
import { ItemEjectorComponent } from "../components/item_ejector";
import { ItemProducerComponent } from "../components/item_producer";
import { enumPinSlotType, WiredPinsComponent } from "../components/wired_pins";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { DefaultItemProducerVariant } from "./variants/item_producer";

export class MetaItemProducerBuilding extends MetaBuilding {
    constructor() {
        super("item_producer");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaItemProducerBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaItemProducerBuilding.variants = [DefaultItemProducerVariant];
MetaItemProducerBuilding.setupEntityComponents = [
    entity =>
        entity.addComponent(
            new ItemEjectorComponent({
                slots: [{ pos: new Vector(0, 0), direction: enumDirection.top }],
            })
        ),
    entity =>
        entity.addComponent(
            new WiredPinsComponent({
                slots: [
                    {
                        pos: new Vector(0, 0),
                        type: enumPinSlotType.logicalAcceptor,
                        direction: enumDirection.bottom,
                    },
                ],
            })
        ),

    entity => entity.addComponent(new ItemProducerComponent()),
];
