import { formatItemsPerSecond, generateMatrixRotations } from "../../../core/utils";
import { enumDirection, Vector } from "../../../core/vector";
import { T } from "../../../translations";
import { enumItemProcessorTypes } from "../../components/item_processor";
import { Entity } from "../../entity";
import { defaultBuildingVariant, MetaBuildingVariant } from "../../meta_building_variant";
import { GameRoot } from "../../root";
import { enumHubGoalRewards } from "../../tutorial_goals";

export class DefaultStackerVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_stacker);
    }

    /**
     * Should return the dimensions of the building
     */
    getDimensions() {
        return new Vector(2, 1);
    }

    /**
     * Should return additional statistics about this building
     * @param {GameRoot} root
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root) {
        return [
            [
                T.ingame.buildingPlacement.infoTexts.speed,
                formatItemsPerSecond(root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.stacker)),
            ],
        ];
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#9fcd7d";
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.ItemProcessor.inputsPerCharge = 2;

        entity.components.ItemProcessor.type = enumItemProcessorTypes.stacker;

        entity.components.ItemEjector.setSlots([{ pos: new Vector(0, 0), direction: enumDirection.top }]);

        entity.components.ItemAcceptor.setSlots([
            {
                pos: new Vector(0, 0),
                directions: [enumDirection.bottom],
                filter: "shape",
            },
            {
                pos: new Vector(1, 0),
                directions: [enumDirection.bottom],
                filter: "shape",
            },
        ]);
    }
}
