import { Loader } from "../../core/loader";
import { enumDirection, Vector, enumAngleToDirection, enumDirectionToVector } from "../../core/vector";
import { ItemAcceptorComponent } from "../components/item_acceptor";
import { ItemEjectorComponent } from "../components/item_ejector";
import { enumUndergroundBeltMode, UndergroundBeltComponent } from "../components/underground_belt";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { GameRoot } from "../root";
import { globalConfig } from "../../core/config";
import { generateMatrixRotations } from "../../core/utils";
import { DefaultUndergroundBeltVariant, Tier2UndergroundBeltVariant } from "./variants/underground_belt";
import { defaultBuildingVariant } from "../meta_building_variant";

export class MetaUndergroundBeltBuilding extends MetaBuilding {
    constructor() {
        super("underground_belt");
    }

    getFlipOrientationAfterPlacement(variant) {
        return true;
    }

    getStayInPlacementMode(variant) {
        return true;
    }

    /**
     * @param {number} rotationVariant
     * @param {string} variant
     */
    getPreviewSprite(rotationVariant, variant) {
        let suffix = "";
        if (variant !== defaultBuildingVariant) {
            suffix = "-" + variant;
        }

        switch (MetaUndergroundBeltBuilding.rotationVariantToMode[rotationVariant]) {
            case enumUndergroundBeltMode.sender:
                return Loader.getSprite("sprites/buildings/underground_belt_entry" + suffix + ".png");
            case enumUndergroundBeltMode.receiver:
                return Loader.getSprite("sprites/buildings/underground_belt_exit" + suffix + ".png");
            default:
                assertAlways(false, "Invalid rotation variant");
        }
    }

    /**
     * @param {number} rotationVariant
     * @param {string} variant
     */
    getBlueprintSprite(rotationVariant, variant) {
        let suffix = "";
        if (variant !== defaultBuildingVariant) {
            suffix = "-" + variant;
        }

        switch (MetaUndergroundBeltBuilding.rotationVariantToMode[rotationVariant]) {
            case enumUndergroundBeltMode.sender:
                return Loader.getSprite("sprites/blueprints/underground_belt_entry" + suffix + ".png");
            case enumUndergroundBeltMode.receiver:
                return Loader.getSprite("sprites/blueprints/underground_belt_exit" + suffix + ".png");
            default:
                assertAlways(false, "Invalid rotation variant");
        }
    }

    /**
     * @param {number} rotationVariant
     * @param {string} variant
     */
    getSprite(rotationVariant, variant) {
        return this.getPreviewSprite(rotationVariant, variant);
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaUndergroundBeltBuilding.setupEntityComponents.forEach(func => func(entity));
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
        const searchDirection = enumAngleToDirection[rotation];
        const searchVector = enumDirectionToVector[searchDirection];
        const tier = MetaUndergroundBeltBuilding.variantToTier[variant];

        const targetRotation = (rotation + 180) % 360;
        const targetSenderRotation = rotation;

        for (
            let searchOffset = 1;
            searchOffset <= globalConfig.undergroundBeltMaxTilesByTier[tier];
            ++searchOffset
        ) {
            tile = tile.addScalars(searchVector.x, searchVector.y);

            const contents = root.map.getTileContent(tile, "regular");
            if (contents) {
                const undergroundComp = contents.components.UndergroundBelt;
                if (undergroundComp && undergroundComp.tier === tier) {
                    const staticComp = contents.components.StaticMapEntity;
                    if (staticComp.rotation === targetRotation) {
                        if (undergroundComp.mode !== enumUndergroundBeltMode.sender) {
                            // If we encounter an underground receiver on our way which is also faced in our direction, we don't accept that
                            break;
                        }
                        return {
                            rotation: targetRotation,
                            rotationVariant: 1,
                            connectedEntities: [contents],
                        };
                    } else if (staticComp.rotation === targetSenderRotation) {
                        // Draw connections to receivers
                        if (undergroundComp.mode === enumUndergroundBeltMode.receiver) {
                            return {
                                rotation: rotation,
                                rotationVariant: 0,
                                connectedEntities: [contents],
                            };
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        return {
            rotation,
            rotationVariant: 0,
        };
    }
}

MetaUndergroundBeltBuilding.setupEntityComponents = [
    // Required, since the item processor needs this.
    entity =>
        entity.addComponent(
            new ItemEjectorComponent({
                slots: [],
            })
        ),
    entity => entity.addComponent(new UndergroundBeltComponent({})),
    entity =>
        entity.addComponent(
            new ItemAcceptorComponent({
                slots: [],
            })
        ),
];

MetaUndergroundBeltBuilding.rotationVariantToMode = [
    enumUndergroundBeltMode.sender,
    enumUndergroundBeltMode.receiver,
];

MetaUndergroundBeltBuilding.variantToTier = {
    [defaultBuildingVariant]: 0,
    [new Tier2UndergroundBeltVariant().getId()]: 1,
};

MetaUndergroundBeltBuilding.variants = [DefaultUndergroundBeltVariant, Tier2UndergroundBeltVariant];

MetaUndergroundBeltBuilding.overlayMatricesByRotation = [
    // Sender
    (entity, rotationVariant) => generateMatrixRotations([1, 1, 1, 0, 1, 0, 0, 1, 0]),
    // Receiver
    (entity, rotationVariant) => generateMatrixRotations([0, 1, 0, 0, 1, 0, 1, 1, 1]),
];

MetaUndergroundBeltBuilding.silhouetteColorsByRotation = [() => "#6d9dff", () => "#71ff9c"];

MetaUndergroundBeltBuilding.componentVariationsByRotation = {
    [enumUndergroundBeltMode.sender]: (entity, rotationVariant) => {
        entity.components.UndergroundBelt.mode = enumUndergroundBeltMode.sender;
        entity.components.ItemEjector.setSlots([]);
        entity.components.ItemAcceptor.setSlots([
            {
                pos: new Vector(0, 0),
                directions: [enumDirection.bottom],
            },
        ]);
    },

    [enumUndergroundBeltMode.receiver]: (entity, rotationVariant) => {
        entity.components.UndergroundBelt.mode = enumUndergroundBeltMode.receiver;
        entity.components.ItemAcceptor.setSlots([]);
        entity.components.ItemEjector.setSlots([
            {
                pos: new Vector(0, 0),
                direction: enumDirection.top,
            },
        ]);
    },
};
