import { enumDirection, Vector } from "../../core/vector";
import { enumLogicGateType, LogicGateComponent } from "../components/logic_gate";
import { enumPinSlotType, WiredPinsComponent } from "../components/wired_pins";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";

export class MetaAnalyzerBuilding extends MetaBuilding {
    constructor() {
        super("analyzer");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaAnalyzerBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaAnalyzerBuilding.setupEntityComponents = [
    entity =>
    entity.addComponent(
        new WiredPinsComponent({
            slots: [{
                    pos: new Vector(0, 0),
                    direction: enumDirection.left,
                    type: enumPinSlotType.logicalEjector,
                },
                {
                    pos: new Vector(0, 0),
                    direction: enumDirection.right,
                    type: enumPinSlotType.logicalEjector,
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
            type: enumLogicGateType.analyzer,
        })
    ),
];