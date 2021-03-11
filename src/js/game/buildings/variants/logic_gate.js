import { generateMatrixRotations } from "../../../core/utils";
import { enumDirection, Vector } from "../../../core/vector";
import { enumLogicGateType } from "../../components/logic_gate";
import { enumPinSlotType } from "../../components/wired_pins";
import { Entity } from "../../entity";
import { defaultBuildingVariant, MetaBuildingVariant } from "../../meta_building_variant";
import { GameRoot } from "../../root";
import { enumHubGoalRewards } from "../../tutorial_goals";

export class DefaultLogicGateVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_logic_gates);
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
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, entity) {
        return generateMatrixRotations([0, 1, 0, 1, 1, 1, 0, 1, 1])[rotation];
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
        return "#f48d41";
    }

    /**
     * Should return false if the pins are already included in the sprite of the building
     * @returns {boolean}
     */
    getRenderPins() {
        return false;
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.WiredPins.setSlots([
            {
                pos: new Vector(0, 0),
                direction: enumDirection.top,
                type: enumPinSlotType.logicalEjector,
            },
            {
                pos: new Vector(0, 0),
                direction: enumDirection.left,
                type: enumPinSlotType.logicalAcceptor,
            },
            {
                pos: new Vector(0, 0),
                direction: enumDirection.right,
                type: enumPinSlotType.logicalAcceptor,
            },
        ]);

        entity.components.LogicGate.type = enumLogicGateType.and;
    }
}

export class NotLogicGateVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super("not", metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_logic_gates);
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
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, entity) {
        return generateMatrixRotations([0, 1, 0, 0, 1, 0, 0, 1, 0])[rotation];
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
        return "#f44184";
    }

    /**
     * Should return false if the pins are already included in the sprite of the building
     * @returns {boolean}
     */
    getRenderPins() {
        return false;
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.WiredPins.setSlots([
            {
                pos: new Vector(0, 0),
                direction: enumDirection.top,
                type: enumPinSlotType.logicalEjector,
            },
            {
                pos: new Vector(0, 0),
                direction: enumDirection.bottom,
                type: enumPinSlotType.logicalAcceptor,
            },
        ]);

        entity.components.LogicGate.type = enumLogicGateType.not;
    }
}

export class OrLogicGateVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super("or", metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_logic_gates);
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
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, entity) {
        return generateMatrixRotations([0, 1, 0, 1, 1, 1, 0, 1, 1])[rotation];
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
        return "#f4d041";
    }

    /**
     * Should return false if the pins are already included in the sprite of the building
     * @returns {boolean}
     */
    getRenderPins() {
        return false;
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.WiredPins.setSlots([
            {
                pos: new Vector(0, 0),
                direction: enumDirection.top,
                type: enumPinSlotType.logicalEjector,
            },
            {
                pos: new Vector(0, 0),
                direction: enumDirection.left,
                type: enumPinSlotType.logicalAcceptor,
            },
            {
                pos: new Vector(0, 0),
                direction: enumDirection.right,
                type: enumPinSlotType.logicalAcceptor,
            },
        ]);

        entity.components.LogicGate.type = enumLogicGateType.or;
    }
}

export class XorLogicGateVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super("xor", metaBuilding);
    }

    getIsAvailable(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_logic_gates);
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
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, entity) {
        return generateMatrixRotations([0, 1, 0, 1, 1, 1, 0, 1, 1])[rotation];
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
        return "#f4a241";
    }

    /**
     * Should return false if the pins are already included in the sprite of the building
     * @returns {boolean}
     */
    getRenderPins() {
        return false;
    }

    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.WiredPins.setSlots([
            {
                pos: new Vector(0, 0),
                direction: enumDirection.top,
                type: enumPinSlotType.logicalEjector,
            },
            {
                pos: new Vector(0, 0),
                direction: enumDirection.left,
                type: enumPinSlotType.logicalAcceptor,
            },
            {
                pos: new Vector(0, 0),
                direction: enumDirection.right,
                type: enumPinSlotType.logicalAcceptor,
            },
        ]);

        entity.components.LogicGate.type = enumLogicGateType.xor;
    }
}
