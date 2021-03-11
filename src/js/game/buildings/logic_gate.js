import { WiredPinsComponent } from "../components/wired_pins";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { LogicGateComponent } from "../components/logic_gate";
import {
    DefaultLogicGateVariant,
    NotLogicGateVariant,
    OrLogicGateVariant,
    XorLogicGateVariant,
} from "./variants/logic_gate";

export class MetaLogicGateBuilding extends MetaBuilding {
    constructor() {
        super("logic_gate");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaLogicGateBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}
MetaLogicGateBuilding.variants = [
    DefaultLogicGateVariant,
    NotLogicGateVariant,
    OrLogicGateVariant,
    XorLogicGateVariant,
];

MetaLogicGateBuilding.setupEntityComponents = [
    entity =>
        entity.addComponent(
            new WiredPinsComponent({
                slots: [],
            })
        ),
    entity => entity.addComponent(new LogicGateComponent({})),
];
