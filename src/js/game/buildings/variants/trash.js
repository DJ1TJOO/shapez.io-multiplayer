import { generateMatrixRotations } from "../../../core/utils";
import { enumDirection, Vector } from "../../../core/vector";
import { enumItemProcessorTypes } from "../../components/item_processor";
import { Entity } from "../../entity";
import { defaultBuildingVariant, MetaBuildingVariant } from "../../meta_building_variant";
import { enumHubGoalRewards } from "../../tutorial_goals";

export class DefaultTrashVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_cutter_and_trash);
    }

    /**
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {Entity} entity
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
        return "#ed1d5d";
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.ItemAcceptor.setSlots([
            {
                pos: new Vector(0, 0),
                directions: [
                    enumDirection.top,
                    enumDirection.right,
                    enumDirection.bottom,
                    enumDirection.left,
                ],
            },
        ]);

        entity.components.ItemProcessor.inputsPerCharge = 1;

        entity.components.ItemProcessor.type = enumItemProcessorTypes.trash;
    }
}
