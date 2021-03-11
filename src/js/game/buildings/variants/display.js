import { Vector, enumDirection } from "../../../core/vector";
import { enumPinSlotType } from "../../components/wired_pins";
import { MetaBuildingVariant, defaultBuildingVariant } from "../../meta_building_variant";
import { enumHubGoalRewards } from "../../tutorial_goals";

export class DefaultDisplayVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_display);
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
        return "#aaaaaa";
    }

    /**
     * Should update the entity to match the given variants
     * @param {import("../../../savegame/savegame_typedefs").Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.WiredPins.setSlots([
            {
                pos: new Vector(0, 0),
                direction: enumDirection.bottom,
                type: enumPinSlotType.logicalAcceptor,
            },
        ]);
    }
}
