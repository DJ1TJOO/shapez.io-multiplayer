import { ItemAcceptorComponent } from "../components/item_acceptor";
import { ItemEjectorComponent } from "../components/item_ejector";
import { enumItemProcessorTypes, ItemProcessorComponent } from "../components/item_processor";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { BeltUnderlaysComponent } from "../components/belt_underlays";
import {
    DefaultBalancerVariant,
    MergerBalancerVariant,
    MergerInverseBalancerVariant,
    SplitterBalancerVariant,
    SplitterInverseBalancerVariant,
} from "./variants/balancer";

export class MetaBalancerBuilding extends MetaBuilding {
    constructor() {
        super("balancer", [
            DefaultBalancerVariant,
            MergerBalancerVariant,
            MergerInverseBalancerVariant,
            SplitterBalancerVariant,
            SplitterInverseBalancerVariant,
        ]);
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaBalancerBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaBalancerBuilding.setupEntityComponents = [
    entity =>
    entity.addComponent(
        new ItemAcceptorComponent({
            slots: [], // set later
        })
    ),

    entity =>
    entity.addComponent(
        new ItemProcessorComponent({
            inputsPerCharge: 1,
            processorType: enumItemProcessorTypes.balancer,
        })
    ),

    entity =>
    entity.addComponent(
        new ItemEjectorComponent({
            slots: [], // set later
            renderFloatingItems: false,
        })
    ),

    entity => entity.addComponent(new BeltUnderlaysComponent({ underlays: [] })),
];