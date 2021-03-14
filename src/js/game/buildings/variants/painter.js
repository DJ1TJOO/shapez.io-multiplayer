import { formatItemsPerSecond } from "../../../core/utils";
import { enumDirection, Vector } from "../../../core/vector";
import { T } from "../../../translations";
import { enumItemProcessorRequirements, enumItemProcessorTypes } from "../../components/item_processor";
import { enumPinSlotType, WiredPinsComponent } from "../../components/wired_pins";
import { Entity } from "../../entity";
import { defaultBuildingVariant, MetaBuildingVariant } from "../../meta_building_variant";
import { GameRoot } from "../../root";
import { enumHubGoalRewards } from "../../tutorial_goals";

export class DefaultPainterVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_painter);
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
                formatItemsPerSecond(root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.painter)),
            ],
        ];
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#cd9b7d";
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        if (entity.components.WiredPins) {
            entity.removeComponent(WiredPinsComponent);
        }

        entity.components.ItemAcceptor.setSlots([
            {
                pos: new Vector(0, 0),
                directions: [enumDirection.left],
                filter: "shape",
            },
            {
                pos: new Vector(1, 0),
                directions: [enumDirection.top],
                filter: "color",
            },
        ]);

        entity.components.ItemEjector.setSlots([{ pos: new Vector(1, 0), direction: enumDirection.right }]);

        entity.components.ItemProcessor.type = enumItemProcessorTypes.painter;
        entity.components.ItemProcessor.processingRequirement = null;
        entity.components.ItemProcessor.inputsPerCharge = 2;
    }
}

export class MirroredPainterVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super("mirrored", metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_painter);
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
                formatItemsPerSecond(root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.painter)),
            ],
        ];
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#cd9b7d";
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        if (entity.components.WiredPins) {
            entity.removeComponent(WiredPinsComponent);
        }

        entity.components.ItemAcceptor.setSlots([
            {
                pos: new Vector(0, 0),
                directions: [enumDirection.left],
                filter: "shape",
            },
            {
                pos: new Vector(1, 0),
                directions: [enumDirection.bottom],
                filter: "color",
            },
        ]);

        entity.components.ItemEjector.setSlots([{ pos: new Vector(1, 0), direction: enumDirection.right }]);

        entity.components.ItemProcessor.type = enumItemProcessorTypes.painter;
        entity.components.ItemProcessor.processingRequirement = null;
        entity.components.ItemProcessor.inputsPerCharge = 2;
    }
}

export class DoublePainterVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super("double", metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_painter_double);
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
        return [
            [
                T.ingame.buildingPlacement.infoTexts.speed,
                formatItemsPerSecond(
                    root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.painterDouble)
                ),
            ],
        ];
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#cd9b7d";
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        if (entity.components.WiredPins) {
            entity.removeComponent(WiredPinsComponent);
        }

        entity.components.ItemAcceptor.setSlots([
            {
                pos: new Vector(0, 0),
                directions: [enumDirection.left],
                filter: "shape",
            },
            {
                pos: new Vector(0, 1),
                directions: [enumDirection.left],
                filter: "shape",
            },
            {
                pos: new Vector(1, 0),
                directions: [enumDirection.top],
                filter: "color",
            },
        ]);

        entity.components.ItemEjector.setSlots([{ pos: new Vector(1, 0), direction: enumDirection.right }]);

        entity.components.ItemProcessor.type = enumItemProcessorTypes.painterDouble;
        entity.components.ItemProcessor.processingRequirement = null;
        entity.components.ItemProcessor.inputsPerCharge = 3;
    }
}

export class QuadPainterVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super("quad", metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_wires_painter_and_levers);
    }

    /**
     * Should return the dimensions of the building
     */
    getDimensions() {
        return new Vector(4, 1);
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
                formatItemsPerSecond(root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.painterQuad)),
            ],
        ];
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#cd9b7d";
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        if (!entity.components.WiredPins) {
            entity.addComponent(new WiredPinsComponent({ slots: [] }));
        }

        entity.components.WiredPins.setSlots([
            {
                pos: new Vector(0, 0),
                direction: enumDirection.bottom,
                type: enumPinSlotType.logicalAcceptor,
            },
            {
                pos: new Vector(1, 0),
                direction: enumDirection.bottom,
                type: enumPinSlotType.logicalAcceptor,
            },
            {
                pos: new Vector(2, 0),
                direction: enumDirection.bottom,
                type: enumPinSlotType.logicalAcceptor,
            },
            {
                pos: new Vector(3, 0),
                direction: enumDirection.bottom,
                type: enumPinSlotType.logicalAcceptor,
            },
        ]);

        entity.components.ItemAcceptor.setSlots([
            {
                pos: new Vector(0, 0),
                directions: [enumDirection.left],
                filter: "shape",
            },
            {
                pos: new Vector(0, 0),
                directions: [enumDirection.bottom],
                filter: "color",
            },
            {
                pos: new Vector(1, 0),
                directions: [enumDirection.bottom],
                filter: "color",
            },
            {
                pos: new Vector(2, 0),
                directions: [enumDirection.bottom],
                filter: "color",
            },
            {
                pos: new Vector(3, 0),
                directions: [enumDirection.bottom],
                filter: "color",
            },
        ]);

        entity.components.ItemEjector.setSlots([{ pos: new Vector(0, 0), direction: enumDirection.top }]);

        entity.components.ItemProcessor.type = enumItemProcessorTypes.painterQuad;
        entity.components.ItemProcessor.processingRequirement = enumItemProcessorRequirements.painterQuad;
        entity.components.ItemProcessor.inputsPerCharge = 5;
    }
}
