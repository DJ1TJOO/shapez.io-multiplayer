import { formatBigNumber } from "../../../core/utils";
import { enumDirection, Vector } from "../../../core/vector";
import { T } from "../../../translations";
import { enumPinSlotType } from "../../components/wired_pins";
import { Entity } from "../../entity";
import { defaultBuildingVariant, MetaBuildingVariant } from "../../meta_building_variant";
import { GameRoot } from "../../root";
import { enumHubGoalRewards } from "../../tutorial_goals";

export const storageSize = 5000;

export class DefaultStorageVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_storage);
    }

    /**
     * Should return the dimensions of the building
     */
    getDimensions() {
        return new Vector(2, 2);
    }

    /**
     * Should return additional statistics about this building
     * @param {GameRoot} root
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root) {
        return [[T.ingame.buildingPlacement.infoTexts.storage, formatBigNumber(storageSize)]];
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
        return "#bbdf6d";
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.ItemEjector.setSlots([
            {
                pos: new Vector(0, 0),
                direction: enumDirection.top,
            },
            {
                pos: new Vector(1, 0),
                direction: enumDirection.top,
            },
        ]);
        entity.components.ItemAcceptor.setSlots([
            {
                pos: new Vector(0, 1),
                directions: [enumDirection.bottom],
            },
            {
                pos: new Vector(1, 1),
                directions: [enumDirection.bottom],
            },
        ]);
        entity.components.Storage.maximumStorage = storageSize;
        entity.components.WiredPins.setSlots([
            {
                pos: new Vector(1, 1),
                direction: enumDirection.right,
                type: enumPinSlotType.logicalEjector,
            },
            {
                pos: new Vector(0, 1),
                direction: enumDirection.left,
                type: enumPinSlotType.logicalEjector,
            },
        ]);
    }
}
