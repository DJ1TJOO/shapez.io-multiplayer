import { enumDirection, Vector } from "../../core/vector";
import { ItemAcceptorComponent } from "../components/item_acceptor";
import { ItemEjectorComponent } from "../components/item_ejector";
import { ItemProcessorComponent } from "../components/item_processor";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import {
    DefaultPainterVariant,
    DoublePainterVariant,
    MirroredPainterVariant,
    QuadPainterVariant,
} from "./variants/painter";

export class MetaPainterBuilding extends MetaBuilding {
    constructor() {
        super("painter");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaPainterBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaPainterBuilding.variants = [
    DefaultPainterVariant,
    MirroredPainterVariant,
    DoublePainterVariant,
    QuadPainterVariant,
];

MetaPainterBuilding.setupEntityComponents = [
    entity => entity.addComponent(new ItemProcessorComponent({})),
    entity =>
        entity.addComponent(
            new ItemEjectorComponent({
                slots: [{ pos: new Vector(1, 0), direction: enumDirection.right }],
            })
        ),
    entity =>
        entity.addComponent(
            new ItemAcceptorComponent({
                slots: [
                    {
                        pos: new Vector(0, 0),
                        directions: [enumDirection.left],
                        filter: "shape",
                    },
                    {
                        pos: new Vector(1, 0),
                        directions: [enumDirection.top],
                        filter: "color",
                    },
                ],
            })
        ),
];
