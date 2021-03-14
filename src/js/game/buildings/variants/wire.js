import { generateMatrixRotations } from "../../../core/utils";
import { SOUNDS } from "../../../platform/sound";
import { enumWireType } from "../../components/wire";
import { Entity } from "../../entity";
import { defaultBuildingVariant, MetaBuildingVariant } from "../../meta_building_variant";
import { GameRoot } from "../../root";
import { enumHubGoalRewards } from "../../tutorial_goals";

export class DefaultWireVariant extends MetaBuildingVariant {
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
        return wireOverlayMatrices[wireRotationVariantToType[rotationVariant]](entity, rotationVariant)[
            rotation
        ];
    }

    /**
     * Returns the placement sound
     * @returns {string}
     */
    getPlacementSound() {
        return SOUNDS.placeBelt;
    }

    /**
     * Returns whether this building can get replaced
     */
    getIsReplaceable() {
        return true;
    }

    /**
     * Returns whether the building has the direction lock switch available
     */
    getHasDirectionLockAvailable() {
        return true;
    }

    /**
     * Whether to stay in placement mode after having placed a building
     */
    getStayInPlacementMode() {
        return true;
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
     * Whether to rotate automatically in the dragging direction while placing
     */
    getRotateAutomaticallyWhilePlacing() {
        return true;
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#61ef6f";
    }

    getRotationVariants() {
        return [0, 1, 2, 3];
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.Wire.type = wireRotationVariantToType[rotationVariant];
        entity.components.Wire.variant = wireVariantToVariant[this.getId()];
    }
}

export class SecondWireVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super("second", metaBuilding);
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
        return wireOverlayMatrices[wireRotationVariantToType[rotationVariant]](entity, rotationVariant)[
            rotation
        ];
    }

    /**
     * Returns the placement sound
     * @returns {string}
     */
    getPlacementSound() {
        return SOUNDS.placeBelt;
    }

    /**
     * Returns whether this building can get replaced
     */
    getIsReplaceable() {
        return true;
    }

    /**
     * Returns whether the building has the direction lock switch available
     */
    getHasDirectionLockAvailable() {
        return true;
    }

    /**
     * Whether to stay in placement mode after having placed a building
     */
    getStayInPlacementMode() {
        return true;
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
     * Whether to rotate automatically in the dragging direction while placing
     */
    getRotateAutomaticallyWhilePlacing() {
        return true;
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#61ef6f";
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.Wire.type = wireRotationVariantToType[rotationVariant];
        entity.components.Wire.variant = wireVariantToVariant[this.getId()];
    }
}

export const wireVariantToVariant = {
    [defaultBuildingVariant]: "first",
    [new SecondWireVariant().getId()]: "second",
};

export const wireRotationVariantToType = [
    enumWireType.forward,
    enumWireType.turn,
    enumWireType.split,
    enumWireType.cross,
];

export const wireOverlayMatrices = {
    [enumWireType.forward]: (entity, rotationVariant) => generateMatrixRotations([0, 1, 0, 0, 1, 0, 0, 1, 0]),
    [enumWireType.split]: (entity, rotationVariant) => generateMatrixRotations([0, 0, 0, 1, 1, 1, 0, 1, 0]),
    [enumWireType.turn]: (entity, rotationVariant) => generateMatrixRotations([0, 0, 0, 0, 1, 1, 0, 1, 0]),
    [enumWireType.cross]: (entity, rotationVariant) => generateMatrixRotations([0, 1, 0, 1, 1, 1, 0, 1, 0]),
};
