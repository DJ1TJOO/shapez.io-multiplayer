import { enumDirection, Vector } from "../../core/vector";
import { ACHIEVEMENTS } from "../../platform/achievement_provider";
import { ItemAcceptorComponent } from "../components/item_acceptor";
import { enumItemProcessorTypes, ItemProcessorComponent } from "../components/item_processor";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { DefaultTrashVariant } from "./variants/trash";

export class MetaTrashBuilding extends MetaBuilding {
    constructor() {
        super("trash");
    }

    addAchievementReceiver(entity) {
        if (!entity.root) {
            return;
        }

        const itemProcessor = entity.components.ItemProcessor;
        const tryTakeItem = itemProcessor.tryTakeItem.bind(itemProcessor);

        itemProcessor.tryTakeItem = () => {
            const taken = tryTakeItem(...arguments);

            if (taken) {
                entity.root.signals.achievementCheck.dispatch(ACHIEVEMENTS.trash1000, 1);
            }

            return taken;
        };
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaTrashBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaTrashBuilding.variants = [DefaultTrashVariant];

MetaTrashBuilding.setupEntityComponents = [
    entity =>
        entity.addComponent(
            new ItemAcceptorComponent({
                slots: [
                    {
                        pos: new Vector(0, 0),
                        directions: [
                            enumDirection.top,
                            enumDirection.right,
                            enumDirection.bottom,
                            enumDirection.left,
                        ],
                    },
                ],
            })
        ),
    entity =>
        entity.addComponent(
            new ItemProcessorComponent({
                inputsPerCharge: 1,
                processorType: enumItemProcessorTypes.trash,
            })
        ),
    function (entity) {
        // @ts-ignore
        this.addAchievementReceiver(entity);
    },
];
