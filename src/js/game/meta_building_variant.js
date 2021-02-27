import { Loader } from "../core/loader";
import { AtlasSprite } from "../core/sprites";
import { Vector } from "../core/vector";
import { SOUNDS } from "../platform/sound";
import { Entity } from "./entity";
import { defaultBuildingVariant, MetaBuilding } from "./meta_building";
import { GameRoot } from "./root";

export class MetaBuildingVariant {
    /**
     *
     * @param {string} id Variant id
     * @param {MetaBuilding} metaBuilding MetaBuilding
     */
    constructor(id, metaBuilding) {
        this.id = id;
        this.metaBuilding = metaBuilding;
    }

    /**
     * Returns the id of this building
     */
    getId() {
        return this.id;
    }

    getIsAvailable(root) {
        return true;
    }

    /**
     * Returns whether this building is rotateable
     * @returns {boolean}
     */
    getIsRotateable() {
        return true;
    }

    /**
     * Returns whether this building can get replaced
     */
    getIsReplaceable() {
        return false;
    }

    /**
     * Returns whether this building is removable
     * @returns {boolean}
     */
    getIsRemovable() {
        return true;
    }

    /**
     * Returns whether the building has the direction lock switch available
     */
    getHasDirectionLockAvailable() {
        return false;
    }

    /**
     * Returns the edit layer of the building
     * @param {GameRoot} root
     * @returns {Layer}
     */
    getLayer(root) {
        return "regular";
    }

    /**
     * Should return the dimensions of the building
     */
    getDimensions() {
        return new Vector(1, 1);
    }

    /**
     * Whether to stay in placement mode after having placed a building
     */
    getStayInPlacementMode() {
        return false;
    }

    /**
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, entity) {
        return null;
    }

    /**
     * Should return additional statistics about this building
     * @param {GameRoot} root
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root) {
        return [];
    }

    /**
     * Whether to flip the orientation after a building has been placed - useful
     * for tunnels.
     */
    getFlipOrientationAfterPlacement() {
        return false;
    }

    /**
     * Whether to show a preview of the layer when placing the building
     */
    getShowLayerPreview() {
        return null;
    }

    /**
     * Whether to rotate automatically in the dragging direction while placing
     */
    getRotateAutomaticallyWhilePlacing() {
        return false;
    }

    /**
     * Returns the placement sound
     * @returns {string}
     */
    getPlacementSound() {
        return SOUNDS.placeBuilding;
    }

    /**
     * Returns a preview sprite
     * @returns {AtlasSprite}
     */
    getPreviewSprite(rotationVariant = 0) {
        return Loader.getSprite(
            "sprites/buildings/" +
                this.metaBuilding.getId() +
                (this.id === defaultBuildingVariant ? "" : "-" + this.id) +
                ".png"
        );
    }

    /**
     * Returns a sprite for blueprints
     * @returns {AtlasSprite}
     */
    getBlueprintSprite(rotationVariant = 0) {
        return Loader.getSprite(
            "sprites/blueprints/" +
                this.metaBuilding.getId() +
                (this.id === defaultBuildingVariant ? "" : "-" + this.id) +
                ".png"
        );
    }

    /**
     * Returns the sprite for a given variant
     * @param {number} rotationVariant
     * @returns {AtlasSprite}
     */
    getSprite(rotationVariant) {
        return Loader.getSprite(
            "sprites/buildings/" +
                this.metaBuilding.getId() +
                (this.id === defaultBuildingVariant ? "" : "-" + this.id) +
                ".png"
        );
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return null;
    }

    /**
     * Should return false if the pins are already included in the sprite of the building
     * @returns {boolean}
     */
    getRenderPins() {
        return true;
    }

    getRotationVariants() {
        return [0];
    }

    /**
     * Should compute the optimal rotation variant on the given tile
     * @param {object} param0
     * @param {GameRoot} param0.root
     * @param {Vector} param0.tile
     * @param {number} param0.rotation
     * @param {Layer} param0.layer
     * @return {{ rotation: number, rotationVariant: number, connectedEntities?: Array<Entity> }}
     */
    computeOptimalDirectionAndRotationVariantAtTile({ root, tile, rotation, layer }) {
        if (!this.getIsRotateable()) {
            return {
                rotation: 0,
                rotationVariant: 0,
            };
        }
        return {
            rotation,
            rotationVariant: 0,
        };
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {}
}
