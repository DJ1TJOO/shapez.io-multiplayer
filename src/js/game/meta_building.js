import { Loader } from "../core/loader";
import { AtlasSprite } from "../core/sprites";
import { Vector } from "../core/vector";
import { SOUNDS } from "../platform/sound";
import { StaticMapEntityComponent } from "./components/static_map_entity";
import { Entity } from "./entity";
import { GameRoot } from "./root";
import { getCodeFromBuildingData } from "./building_codes";
import { MetaBuildingVariant } from "./meta_building_variant";

export const defaultBuildingVariant = "default";

export class MetaBuilding {
    /**
     *
     * @param {string} id Building id
     * @param {Array<typeof MetaBuildingVariant>} variants Building variants
     */
    constructor(id, variants) {
        this.id = id;
        /**@typedef {Object.<string, MetaBuildingVariant>} */
        this.variants = {};
        for (let i = 0; i < variants.length; i++) {
            // @ts-ignore
            const variant = new variants[i](this);
            this.variants[variant.getId()] = variant;
        }
    }

    /**
     * Returns the id of this building
     */
    getId() {
        return this.id;
    }

    /**
     * Returns the edit layer of the building
     * @param {GameRoot} root
     * @param {string} variant
     * @returns {Layer}
     */
    getLayer(root, variant = defaultBuildingVariant) {
        if (!this.variants[variant]) return "regular";
        return this.variants[variant].getLayer(root);
    }

    /**
     * Should return the dimensions of the building
     * @param {string} variant
     */
    getDimensions(variant = defaultBuildingVariant) {
        if (!this.variants[variant]) return new Vector(1, 1);
        return this.variants[variant].getDimensions();
    }

    /**
     * Returns whether the building has the direction lock switch available
     */
    getHasDirectionLockAvailable(variant = defaultBuildingVariant) {
        if (!this.variants[variant]) return false;
        return this.variants[variant].getHasDirectionLockAvailable();
    }

    /**
     * Whether to stay in placement mode after having placed a building
     */
    getStayInPlacementMode(variant = defaultBuildingVariant) {
        if (!this.variants[variant]) return false;
        return this.variants[variant].getStayInPlacementMode();
    }

    /**
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {string} variant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, variant, entity) {
        if (!this.variants[variant]) return null;
        return this.variants[variant].getSpecialOverlayRenderMatrix(rotation, rotationVariant, entity);
    }

    /**
     * Should return additional statistics about this building
     * @param {GameRoot} root
     * @param {string} variant
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root, variant) {
        if (!this.variants[variant]) return [];
        return this.variants[variant].getAdditionalStatistics(root);
    }

    /**
     * Returns whether this building can get replaced
     */
    getIsReplaceable(variant = defaultBuildingVariant) {
        if (!this.variants[variant]) return false;
        return this.variants[variant].getIsReplaceable();
    }

    /**
     * Whether to flip the orientation after a building has been placed - useful
     * for tunnels.
     */
    getFlipOrientationAfterPlacement(variant = defaultBuildingVariant) {
        if (!this.variants[variant]) return false;
        return this.variants[variant].getFlipOrientationAfterPlacement();
    }

    /**
     * Whether to show a preview of the layer when placing the building
     * @param {string} variant
     */
    getShowLayerPreview(variant) {
        if (!this.variants[variant]) return null;
        return this.variants[variant].getShowLayerPreview();
    }

    /**
     * Whether to rotate automatically in the dragging direction while placing
     * @param {string} variant
     */
    getRotateAutomaticallyWhilePlacing(variant = defaultBuildingVariant) {
        if (!this.variants[variant]) return false;
        return this.variants[variant].getRotateAutomaticallyWhilePlacing();
    }

    /**
     * Returns whether this building is removable
     * @param {string} variant
     * @returns {boolean}
     */
    getIsRemovable(variant = defaultBuildingVariant) {
        if (!this.variants[variant]) return true;
        return this.variants[variant].getIsRemovable();
    }

    /**
     * Returns the placement sound
     * @param {string} variant
     * @returns {string}
     */
    getPlacementSound(variant = defaultBuildingVariant) {
        if (!this.variants[variant]) return SOUNDS.placeBuilding;
        return this.variants[variant].getPlacementSound();
    }

    /**
     * @param {GameRoot} root
     */
    getAvailableVariants(root) {
        let avaibleVariants = [];

        const variantKeys = Object.keys(this.variants);
        for (let i = 0; i < variantKeys.length; i++) {
            const id = variantKeys[i];
            if (this.variants[id].getIsAvailable(root)) avaibleVariants.push(id);
        }

        return avaibleVariants;
    }

    /**
     * Returns a preview sprite
     * @returns {AtlasSprite}
     */
    getPreviewSprite(rotationVariant = 0, variant = defaultBuildingVariant) {
        if (!this.variants[variant])
            return Loader.getSprite(
                "sprites/buildings/" +
                    this.id +
                    (variant === defaultBuildingVariant ? "" : "-" + variant) +
                    ".png"
            );
        return this.variants[variant].getPreviewSprite(rotationVariant);
    }

    /**
     * Returns a sprite for blueprints
     * @returns {AtlasSprite}
     */
    getBlueprintSprite(rotationVariant = 0, variant = defaultBuildingVariant) {
        if (!this.variants[variant])
            return Loader.getSprite(
                "sprites/blueprints/" +
                    this.id +
                    (variant === defaultBuildingVariant ? "" : "-" + variant) +
                    ".png"
            );
        return this.variants[variant].getBlueprintSprite(rotationVariant);
    }

    /**
     * Returns whether this building is rotateable
     * @param {string} variant
     * @returns {boolean}
     */
    getIsRotateable(variant) {
        if (!this.variants[variant]) return true;
        return this.variants[variant].getIsRotateable();
    }

    /**
     * Returns whether this building is unlocked for the given game
     * @param {GameRoot} root
     */
    getIsUnlocked(root) {
        return this.getAvailableVariants(root).length > 0;
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {string} variant
     * @param {number} rotationVariant
     */
    getSilhouetteColor(variant, rotationVariant) {
        if (!this.variants[variant]) return null;
        return this.variants[variant].getSilhouetteColor(rotationVariant);
    }

    /**
     * Should return false if the pins are already included in the sprite of the building
     * @param {string} variant
     * @returns {boolean}
     */
    getRenderPins(variant = defaultBuildingVariant) {
        if (!this.variants[variant]) return true;
        return this.variants[variant].getRenderPins();
    }

    /**
     * Creates the entity without placing it
     * @param {object} param0
     * @param {GameRoot} param0.root
     * @param {Vector} param0.origin Origin tile
     * @param {number=} param0.rotation Rotation
     * @param {number} param0.originalRotation Original Rotation
     * @param {number} param0.rotationVariant Rotation variant
     * @param {string} param0.variant
     */
    createEntity({ root, origin, rotation, originalRotation, rotationVariant, variant }) {
        const entity = new Entity(root);
        entity.layer = this.getLayer(root, variant);
        entity.addComponent(
            new StaticMapEntityComponent({
                origin: new Vector(origin.x, origin.y),
                rotation,
                originalRotation,
                tileSize: this.getDimensions(variant).copy(),
                code: getCodeFromBuildingData(this, variant, rotationVariant),
            })
        );
        this.setupEntityComponents(entity, root);
        this.updateVariants(entity, rotationVariant, variant);
        return entity;
    }

    /**
     * Returns the sprite for a given variant
     * @param {number} rotationVariant
     * @param {string} variant
     * @returns {AtlasSprite}
     */
    getSprite(rotationVariant, variant) {
        if (!this.variants[variant])
            return Loader.getSprite(
                "sprites/buildings/" +
                    this.id +
                    (variant === defaultBuildingVariant ? "" : "-" + variant) +
                    ".png"
            );
        return this.variants[variant].getBlueprintSprite(rotationVariant);
    }

    /**
     * Should compute the optimal rotation variant on the given tile
     * @param {object} param0
     * @param {GameRoot} param0.root
     * @param {Vector} param0.tile
     * @param {number} param0.rotation
     * @param {string} param0.variant
     * @param {Layer} param0.layer
     * @return {{ rotation: number, rotationVariant: number, connectedEntities?: Array<Entity> }}
     */
    computeOptimalDirectionAndRotationVariantAtTile({ root, tile, rotation, variant, layer }) {
        if (!this.variants[variant]) {
            if (!this.getIsRotateable(variant)) {
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
        return this.variants[variant].computeOptimalDirectionAndRotationVariantAtTile({
            root,
            tile,
            rotation,
            layer,
        });
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     * @param {string} variant
     */
    updateVariants(entity, rotationVariant, variant) {
        if (this.variants[variant]) this.variants[variant].updateVariants(entity, rotationVariant);
    }

    // PRIVATE INTERFACE

    /**
     * Should setup the entity components
     * @param {Entity} entity
     * @param {GameRoot} root
     */
    setupEntityComponents(entity, root) {
        abstract;
    }
}
