import { AtlasSprite } from "../../../core/sprites";
import { formatItemsPerSecond } from "../../../core/utils";
import { SOUNDS } from "../../../platform/sound";
import { T } from "../../../translations";
import { MetaBuilding } from "../../meta_building";
import { defaultBuildingVariant, MetaBuildingVariant } from "../../meta_building_variant";
import { GameRoot } from "../../root";
import { THEME } from "../../theme";
import { MetaBeltBuilding } from "../belt";

export class DefaultBeltVariant extends MetaBuildingVariant {
    /**
     * @param {MetaBuilding} metaBuilding MetaBuilding
     */
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    getIsAvailable(root) {
        return true;
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
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {import("../../../savegame/savegame_typedefs").Entity} entity
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
        return [
            [
                T.ingame.buildingPlacement.infoTexts.speed,
                formatItemsPerSecond(root.hubGoals.getBeltBaseSpeed()),
            ],
        ];
    }

    /**
     * Whether to rotate automatically in the dragging direction while placing
     */
    getRotateAutomaticallyWhilePlacing() {
        return true;
    }

    /**
     * Returns the placement sound
     * @returns {string}
     */
    getPlacementSound() {
        return SOUNDS.placeBelt;
    }

    /**
     * Returns the sprite for a given variant
     * @param {number} rotationVariant
     * @returns {AtlasSprite}
     */
    getSprite(rotationVariant) {
        return null;
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return THEME.map.chunkOverview.beltColor;
    }

    getRotationVariants() {
        return [0, 1, 2];
    }

    /**
     * Should update the entity to match the given variants
     * @param {import("../../../savegame/savegame_typedefs").Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.Belt.direction = MetaBeltBuilding.variantToRotation[rotationVariant];
    }
}
