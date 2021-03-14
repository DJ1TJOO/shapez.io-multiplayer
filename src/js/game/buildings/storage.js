import { enumDirection, Vector } from "../../core/vector";
import { ItemAcceptorComponent } from "../components/item_acceptor";
import { ItemEjectorComponent } from "../components/item_ejector";
import { StorageComponent } from "../components/storage";
import { enumPinSlotType, WiredPinsComponent } from "../components/wired_pins";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { DefaultStorageVariant, storageSize } from "./variants/storage";

export class MetaStorageBuilding extends MetaBuilding {
    constructor() {
        super("storage");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaStorageBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaStorageBuilding.variants = [DefaultStorageVariant];

MetaStorageBuilding.setupEntityComponents = [
    entity =>
        // Required, since the item processor needs this.
        entity.addComponent(
            new ItemEjectorComponent({
                slots: [
                    {
                        pos: new Vector(0, 0),
                        direction: enumDirection.top,
                    },
                    {
                        pos: new Vector(1, 0),
                        direction: enumDirection.top,
                    },
                ],
            })
        ),
    entity =>
        entity.addComponent(
            new ItemAcceptorComponent({
                slots: [
                    {
                        pos: new Vector(0, 1),
                        directions: [enumDirection.bottom],
                    },
                    {
                        pos: new Vector(1, 1),
                        directions: [enumDirection.bottom],
                    },
                ],
            })
        ),
    entity =>
        entity.addComponent(
            new StorageComponent({
                maximumStorage: storageSize,
            })
        ),
    entity =>
        entity.addComponent(
            new WiredPinsComponent({
                slots: [
                    {
                        pos: new Vector(1, 1),
                        direction: enumDirection.right,
                        type: enumPinSlotType.logicalEjector,
                    },
                    {
                        pos: new Vector(0, 1),
                        direction: enumDirection.left,
                        type: enumPinSlotType.logicalEjector,
                    },
                ],
            })
        ),
];
