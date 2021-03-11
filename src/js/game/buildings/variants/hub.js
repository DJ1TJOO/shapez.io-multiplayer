import { Vector, enumDirection } from "../../../core/vector";
import { enumItemProcessorTypes } from "../../components/item_processor";
import { enumPinSlotType } from "../../components/wired_pins";
import { MetaBuildingVariant, defaultBuildingVariant } from "../../meta_building_variant";

export class DefaultHubVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
    }

    /**
     * Should return the dimensions of the building
     */
    getDimensions() {
        return new Vector(4, 4);
    }

    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {number} rotationVariant
     */
    getSilhouetteColor(rotationVariant) {
        return "#eb5555";
    }

    /**
     * Should update the entity to match the given variants
     * @param {import("../../../savegame/savegame_typedefs").Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.ItemProcessor.inputsPerCharge = 1;

        entity.components.ItemProcessor.type = enumItemProcessorTypes.hub;

        entity.components.WiredPins.setSlots([
            {
                pos: new Vector(0, 2),
                type: enumPinSlotType.logicalEjector,
                direction: enumDirection.left,
            },
        ]);

        entity.components.ItemAcceptor.setSlots([
            {
                pos: new Vector(0, 0),
                directions: [enumDirection.top, enumDirection.left],
                filter: "shape",
            },
            {
                pos: new Vector(1, 0),
                directions: [enumDirection.top],
                filter: "shape",
            },
            {
                pos: new Vector(2, 0),
                directions: [enumDirection.top],
                filter: "shape",
            },
            {
                pos: new Vector(3, 0),
                directions: [enumDirection.top, enumDirection.right],
                filter: "shape",
            },
            {
                pos: new Vector(0, 3),
                directions: [enumDirection.bottom, enumDirection.left],
                filter: "shape",
            },
            {
                pos: new Vector(1, 3),
                directions: [enumDirection.bottom],
                filter: "shape",
            },
            {
                pos: new Vector(2, 3),
                directions: [enumDirection.bottom],
                filter: "shape",
            },
            {
                pos: new Vector(3, 3),
                directions: [enumDirection.bottom, enumDirection.right],
                filter: "shape",
            },
            {
                pos: new Vector(0, 1),
                directions: [enumDirection.left],
                filter: "shape",
            },
            {
                pos: new Vector(0, 2),
                directions: [enumDirection.left],
                filter: "shape",
            },
            {
                pos: new Vector(0, 3),
                directions: [enumDirection.left],
                filter: "shape",
            },
            {
                pos: new Vector(3, 1),
                directions: [enumDirection.right],
                filter: "shape",
            },
            {
                pos: new Vector(3, 2),
                directions: [enumDirection.right],
                filter: "shape",
            },
            {
                pos: new Vector(3, 3),
                directions: [enumDirection.right],
                filter: "shape",
            },
        ]);
    }
}
