import { Vector, enumDirection } from "../../../core/vector";
import { enumPinSlotType } from "../../components/wired_pins";
import { MetaBuildingVariant, defaultBuildingVariant } from "../../meta_building_variant";

export class DefaultItemProducerVariant extends MetaBuildingVariant {
    constructor(metaBuilding) {
        super(defaultBuildingVariant, metaBuilding);
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
        return "#b37dcd";
    }

    /**
     * Should update the entity to match the given variants
     * @param {import("../../../savegame/savegame_typedefs").Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity, rotationVariant) {
        entity.components.ItemEjector.setSlots([{ pos: new Vector(0, 0), direction: enumDirection.top }]);

        entity.components.WiredPins.setSlots([
            {
                pos: new Vector(0, 0),
                type: enumPinSlotType.logicalAcceptor,
                direction: enumDirection.bottom,
            },
        ]);
    }
}
