import { enumDirection, Vector } from "../../core/vector";
import { enumLogicGateType, LogicGateComponent } from "../components/logic_gate";
import { enumPinSlotType, WiredPinsComponent } from "../components/wired_pins";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { DefaultComparatorVariant } from "./variants/comparator";

export class MetaComparatorBuilding extends MetaBuilding {
    constructor() {
        super("comparator");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaComparatorBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaComparatorBuilding.variants = [DefaultComparatorVariant];

MetaComparatorBuilding.setupEntityComponents = [
    (entity, rotationVariant) =>
        entity.addComponent(
            new WiredPinsComponent({
                slots: [
                    {
                        pos: new Vector(0, 0),
                        direction: enumDirection.top,
                        type: enumPinSlotType.logicalEjector,
                    },
                    {
                        pos: new Vector(0, 0),
                        direction: enumDirection.left,
                        type: enumPinSlotType.logicalAcceptor,
                    },
                    {
                        pos: new Vector(0, 0),
                        direction: enumDirection.right,
                        type: enumPinSlotType.logicalAcceptor,
                    },
                ],
            })
        ),
    (entity, rotationVariant) =>
        entity.addComponent(
            new LogicGateComponent({
                type: enumLogicGateType.compare,
            })
        ),
];
