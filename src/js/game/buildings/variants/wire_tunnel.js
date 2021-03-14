import { generateMatrixRotations } from "../../../core/utils";
import { Entity } from "../../entity";
import { defaultBuildingVariant, MetaBuildingVariant } from "../../meta_building_variant";
import { GameRoot } from "../../root";
import { enumHubGoalRewards } from "../../tutorial_goals";

export class DefaultWireTunnelVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_wires_painter_and_levers);
    }

    /**
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, entity) {
        return generateMatrixRotations([0, 1, 0, 1, 1, 1, 0, 1, 0])[rotation];
    }

    /**
     * Returns the edit layer of the building
     * @param {GameRoot} root
     * @returns {Layer}
     */
    getLayer(root) {
        return "wires";
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
        return "#777a86";
    }

    /**
     * Should return false if the pins are already included in the sprite of the building
     * @returns {boolean}
     */
    getRenderPins() {
        return false;
    }
}
