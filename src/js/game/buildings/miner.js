import { enumDirection, Vector } from "../../core/vector";
import { ItemEjectorComponent } from "../components/item_ejector";
import { MinerComponent } from "../components/miner";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { ChainableMinerVariant, DefaultMinerVariant } from "./variants/miner";

export class MetaMinerBuilding extends MetaBuilding {
    constructor() {
        super("miner");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaMinerBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaMinerBuilding.variants = [DefaultMinerVariant, ChainableMinerVariant];

MetaMinerBuilding.setupEntityComponents = [
    entity => entity.addComponent(new MinerComponent({})),
    entity =>
        entity.addComponent(
            new ItemEjectorComponent({
                slots: [{ pos: new Vector(0, 0), direction: enumDirection.top }],
            })
        ),
];
