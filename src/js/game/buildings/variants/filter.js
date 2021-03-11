import { formatItemsPerSecond } from "../../../core/utils";
import { Vector, enumDirection } from "../../../core/vector";
import { T } from "../../../translations";
import { enumPinSlotType } from "../../components/wired_pins";
import { MetaBuildingVariant, defaultBuildingVariant } from "../../meta_building_variant";
import { GameRoot } from "../../root";
import { enumHubGoalRewards } from "../../tutorial_goals";

export class DefaultFilterVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_filter);
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
                formatItemsPerSecond(root.hubGoals.getBeltBaseSpeed()),
            ],
        ];
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
        return "#c45c2e";
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
                direction: enumDirection.left,
                type: enumPinSlotType.logicalAcceptor,
            },
        ]);

        entity.components.ItemAcceptor.setSlots([
            {
                pos: new Vector(0, 0),
                directions: [enumDirection.bottom],
            },
        ]);

        entity.components.ItemEjector.setSlots([
            {
                pos: new Vector(0, 0),
                direction: enumDirection.top,
            },
            {
                pos: new Vector(1, 0),
                direction: enumDirection.right,
            },
        ]);
    }
}
