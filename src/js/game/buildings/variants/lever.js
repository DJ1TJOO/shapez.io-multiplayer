import { enumDirection, Vector } from "../../../core/vector";
import { enumPinSlotType } from "../../components/wired_pins";
import { Entity } from "../../entity";
import { defaultBuildingVariant, MetaBuildingVariant } from "../../meta_building_variant";
import { enumHubGoalRewards } from "../../tutorial_goals";

export class DefaultLeverVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_wires_painter_and_levers);
    }

    /**
     * Whether to show a preview of the layer when placing the building
     */
    getShowLayerPreview() {
        return "wires";
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#1a678b";
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.WiredPins.setSlots([
            {
                pos: new Vector(0, 0),
                direction: enumDirection.top,
                type: enumPinSlotType.logicalEjector,
            },
        ]);
    }
}
