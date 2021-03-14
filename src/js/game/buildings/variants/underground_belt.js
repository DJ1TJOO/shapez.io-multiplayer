import { globalConfig } from "../../../core/config";
import { formatItemsPerSecond, generateMatrixRotations } from "../../../core/utils";
import { T } from "../../../translations";
import { Entity } from "../../entity";
import { defaultBuildingVariant, MetaBuildingVariant } from "../../meta_building_variant";
import { GameRoot } from "../../root";
import { enumHubGoalRewards } from "../../tutorial_goals";
import { MetaUndergroundBeltBuilding } from "../underground_belt";

export class DefaultUndergroundBeltVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_tunnel);
    }

    /**
     * Whether to stay in placement mode after having placed a building
     */
    getStayInPlacementMode() {
        return true;
    }

    /**
     * Should return additional statistics about this building
     * @param {GameRoot} root
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root) {
        const rangeTiles = globalConfig.undergroundBeltMaxTilesByTier[0];

        const beltSpeed = root.hubGoals.getUndergroundBeltBaseSpeed();
        return [
            [
                T.ingame.buildingPlacement.infoTexts.range,
                T.ingame.buildingPlacement.infoTexts.tiles.replace("<x>", "" + rangeTiles),
            ],
            [T.ingame.buildingPlacement.infoTexts.speed, formatItemsPerSecond(beltSpeed)],
        ];
    }

    /**
     * Whether to flip the orientation after a building has been placed - useful
     * for tunnels.
     */
    getFlipOrientationAfterPlacement() {
        return true;
    }

    /**
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, entity) {
        return MetaUndergroundBeltBuilding.overlayMatricesByRotation[rotationVariant]()[rotation];
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return MetaUndergroundBeltBuilding.silhouetteColorsByRotation[rotationVariant]();
    }

    getRotationVariants() {
        return [0, 1];
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.UndergroundBelt.tier = MetaUndergroundBeltBuilding.variantToTier[this.id];
        MetaUndergroundBeltBuilding.componentVariationsByRotation[rotationVariant](entity, rotationVariant);
    }
}

export class Tier2UndergroundBeltVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super("tier2", metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_underground_belt_tier_2);
    }

    /**
     * Whether to stay in placement mode after having placed a building
     */
    getStayInPlacementMode() {
        return true;
    }

    /**
     * Should return additional statistics about this building
     * @param {GameRoot} root
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root) {
        const rangeTiles = globalConfig.undergroundBeltMaxTilesByTier[1];

        const beltSpeed = root.hubGoals.getUndergroundBeltBaseSpeed();
        return [
            [
                T.ingame.buildingPlacement.infoTexts.range,
                T.ingame.buildingPlacement.infoTexts.tiles.replace("<x>", "" + rangeTiles),
            ],
            [T.ingame.buildingPlacement.infoTexts.speed, formatItemsPerSecond(beltSpeed)],
        ];
    }

    /**
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, entity) {
        return MetaUndergroundBeltBuilding.overlayMatricesByRotation[rotationVariant]()[rotation];
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return MetaUndergroundBeltBuilding.silhouetteColorsByRotation[rotationVariant]();
    }

    getRotationVariants() {
        return [0, 1];
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.UndergroundBelt.tier = MetaUndergroundBeltBuilding.variantToTier[this.id];
        MetaUndergroundBeltBuilding.componentVariationsByRotation[rotationVariant](entity, rotationVariant);
    }
}
