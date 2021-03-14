import { SOUNDS } from "../../../platform/sound";
import { Entity } from "../../entity";
import { defaultBuildingVariant, MetaBuildingVariant } from "../../meta_building_variant";
import { GameRoot } from "../../root";
import { enumHubGoalRewards } from "../../tutorial_goals";
import { MetaWireBuilding } from "../wire";

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
        return MetaWireBuilding.overlayMatrices[MetaWireBuilding.rotationVariantToType[rotationVariant]](
            entity,
            rotationVariant
        )[rotation];
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
        entity.components.Wire.type = MetaWireBuilding.rotationVariantToType[rotationVariant];
        entity.components.Wire.variant = MetaWireBuilding.wireVariantToVariant[this.getId()];
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
        return MetaWireBuilding.overlayMatrices[MetaWireBuilding.rotationVariantToType[rotationVariant]](
            entity,
            rotationVariant
        )[rotation];
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
        entity.components.Wire.type = MetaWireBuilding.rotationVariantToType[rotationVariant];
        entity.components.Wire.variant = MetaWireBuilding.wireVariantToVariant[this.getId()];
    }
}
