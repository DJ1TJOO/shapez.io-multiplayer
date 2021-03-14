import { LogicGateComponent } from "../components/logic_gate";
import { WiredPinsComponent } from "../components/wired_pins";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import {
    DefaultVirtualProcessorVariant,
    PainterVirtualProcessorVariant,
    RotatorVirtualProcessorVariant,
    StackerVirtualProcessorVariant,
    UnstackerVirtualProcessorVariant,
} from "./variants/virtual_processor";

export class MetaVirtualProcessorBuilding extends MetaBuilding {
    constructor() {
        super("virtual_processor");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaVirtualProcessorBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaVirtualProcessorBuilding.setupEntityComponents = [
    entity =>
        entity.addComponent(
            new WiredPinsComponent({
                slots: [],
            })
        ),
    entity => entity.addComponent(new LogicGateComponent({})),
];

MetaVirtualProcessorBuilding.variants = [
    DefaultVirtualProcessorVariant,
    RotatorVirtualProcessorVariant,
    UnstackerVirtualProcessorVariant,
    StackerVirtualProcessorVariant,
    PainterVirtualProcessorVariant,
];
