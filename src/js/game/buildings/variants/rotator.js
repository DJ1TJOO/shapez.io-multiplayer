import { formatItemsPerSecond, generateMatrixRotations } from "../../../core/utils";
import { T } from "../../../translations";
import { enumItemProcessorTypes } from "../../components/item_processor";
import { MetaBuildingVariant, defaultBuildingVariant } from "../../meta_building_variant";
import { GameRoot } from "../../root";
import { enumHubGoalRewards } from "../../tutorial_goals";

export class DefaultRotatorVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_rotater);
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
                formatItemsPerSecond(root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.rotater)),
            ],
        ];
    }

    /**
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {import("../../../savegame/savegame_typedefs").Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, entity) {
        return generateMatrixRotations([0, 1, 1, 1, 1, 0, 0, 1, 1])[rotation];
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#7dc6cd";
    }

    /**
     * Should update the entity to match the given variants
     * @param {import("../../../savegame/savegame_typedefs").Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.ItemProcessor.type = enumItemProcessorTypes.rotater;
    }
}

export class CcwRotatorVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super("ccw", metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_rotater_ccw);
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
                formatItemsPerSecond(root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.rotaterCCW)),
            ],
        ];
    }

    /**
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {import("../../../savegame/savegame_typedefs").Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, entity) {
        return generateMatrixRotations([1, 1, 0, 0, 1, 1, 1, 1, 0])[rotation];
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#7dc6cd";
    }

    /**
     * Should update the entity to match the given variants
     * @param {import("../../../savegame/savegame_typedefs").Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.ItemProcessor.type = enumItemProcessorTypes.rotater180;
    }
}

export class Rotate180RotatorVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super("rotate180", metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_rotater_180);
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
                formatItemsPerSecond(root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.rotater180)),
            ],
        ];
    }

    /**
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {import("../../../savegame/savegame_typedefs").Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, entity) {
        return generateMatrixRotations([1, 1, 0, 1, 1, 1, 0, 1, 1])[rotation];
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#7dc6cd";
    }

    /**
     * Should update the entity to match the given variants
     * @param {import("../../../savegame/savegame_typedefs").Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.ItemProcessor.type = enumItemProcessorTypes.rotater180;
    }
}
