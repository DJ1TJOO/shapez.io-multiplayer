import { formatItemsPerSecond } from "../../../core/utils";
import { Vector, enumDirection } from "../../../core/vector";
import { T } from "../../../translations";
import { enumItemProcessorTypes } from "../../components/item_processor";
import { MetaBuildingVariant, defaultBuildingVariant } from "../../meta_building_variant";
import { GameRoot } from "../../root";
import { enumHubGoalRewards } from "../../tutorial_goals";

export class DefaultCutterVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_cutter_and_trash);
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
                formatItemsPerSecond(root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.cutter) / 2),
            ],
        ];
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#7dcda2";
    }

    /**
     * Should update the entity to match the given variants
     * @param {import("../../../savegame/savegame_typedefs").Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.ItemEjector.setSlots([
            { pos: new Vector(0, 0), direction: enumDirection.top },
            { pos: new Vector(1, 0), direction: enumDirection.top },
        ]);

        entity.components.ItemProcessor.type = enumItemProcessorTypes.cutter;
    }
}

export class QuadCutterVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super("quad", metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_cutter_quad);
    }

    /**
     * Should return the dimensions of the building
     */
    getDimensions() {
        return new Vector(4, 1);
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
                formatItemsPerSecond(
                    root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.cutterQuad) / 2
                ),
            ],
        ];
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#7dcda2";
    }

    /**
     * Should update the entity to match the given variants
     * @param {import("../../../savegame/savegame_typedefs").Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.ItemEjector.setSlots([
            { pos: new Vector(0, 0), direction: enumDirection.top },
            { pos: new Vector(1, 0), direction: enumDirection.top },
            { pos: new Vector(2, 0), direction: enumDirection.top },
            { pos: new Vector(3, 0), direction: enumDirection.top },
        ]);
        entity.components.ItemProcessor.type = enumItemProcessorTypes.cutterQuad;
    }
}
