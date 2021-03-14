import { enumDirection, Vector } from "../../core/vector";
import { enumLogicGateType, LogicGateComponent } from "../components/logic_gate";
import { enumPinSlotType, WiredPinsComponent } from "../components/wired_pins";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { DefaultTransistorVariant, MirroredTransistorVariant } from "./variants/transistor";

export class MetaTransistorBuilding extends MetaBuilding {
    constructor() {
        super("transistor");
    }
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaTransistorBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaTransistorBuilding.setupEntityComponents = [
    entity =>
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
                        direction: enumDirection.bottom,
                        type: enumPinSlotType.logicalAcceptor,
                    },
                ],
            })
        ),
    entity =>
        entity.addComponent(
            new LogicGateComponent({
                type: enumLogicGateType.transistor,
            })
        ),
];

MetaTransistorBuilding.variants = [DefaultTransistorVariant, MirroredTransistorVariant];
