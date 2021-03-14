import { Loader } from "../../core/loader";
import { enumDirection, Vector } from "../../core/vector";
import { enumWireType, WireComponent } from "../components/wire";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { GameRoot } from "../root";
import {
    DefaultWireVariant,
    SecondWireVariant,
    wireRotationVariantToType,
    wireVariantToVariant,
} from "./variants/wire";

export class MetaWireBuilding extends MetaBuilding {
    constructor() {
        super("wire");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaWireBuilding.setupEntityComponents.forEach(func => func(entity));
    }

    /**
     *
     * @param {number} rotationVariant
     * @param {string} variant
     * @returns {import("../../core/sprites").AtlasSprite}
     */
    getPreviewSprite(rotationVariant, variant) {
        const wireVariant = wireVariantToVariant[variant];
        switch (wireRotationVariantToType[rotationVariant]) {
            case enumWireType.forward: {
                return Loader.getSprite("sprites/wires/sets/" + wireVariant + "_forward.png");
            }
            case enumWireType.turn: {
                return Loader.getSprite("sprites/wires/sets/" + wireVariant + "_turn.png");
            }
            case enumWireType.split: {
                return Loader.getSprite("sprites/wires/sets/" + wireVariant + "_split.png");
            }
            case enumWireType.cross: {
                return Loader.getSprite("sprites/wires/sets/" + wireVariant + "_cross.png");
            }
            default: {
                assertAlways(false, "Invalid wire rotation variant");
            }
        }
    }

    getBlueprintSprite(rotationVariant, variant) {
        return this.getPreviewSprite(rotationVariant, variant);
    }

    /**
     * Should compute the optimal rotation variant on the given tile
     * @param {object} param0
     * @param {GameRoot} param0.root
     * @param {Vector} param0.tile
     * @param {number} param0.rotation
     * @param {string} param0.variant
     * @param {string} param0.layer
     * @return {{ rotation: number, rotationVariant: number, connectedEntities?: Array<Entity> }}
     */
    computeOptimalDirectionAndRotationVariantAtTile({ root, tile, rotation, variant, layer }) {
        const wireVariant = wireVariantToVariant[variant];
        const connections = {
            // @ts-ignore
            top: root.logic.computeWireEdgeStatus({ tile, wireVariant, edge: enumDirection.top }),
            // @ts-ignore
            right: root.logic.computeWireEdgeStatus({ tile, wireVariant, edge: enumDirection.right }),
            // @ts-ignore
            bottom: root.logic.computeWireEdgeStatus({ tile, wireVariant, edge: enumDirection.bottom }),
            // @ts-ignore
            left: root.logic.computeWireEdgeStatus({ tile, wireVariant, edge: enumDirection.left }),
        };

        let flag = 0;
        flag |= connections.top ? 0x1000 : 0;
        flag |= connections.right ? 0x100 : 0;
        flag |= connections.bottom ? 0x10 : 0;
        flag |= connections.left ? 0x1 : 0;

        let targetType = enumWireType.forward;

        // First, reset rotation
        rotation = 0;

        switch (flag) {
            case 0x0000:
                // Nothing
                break;

            case 0x0001:
                // Left
                rotation += 90;
                break;

            case 0x0010:
                // Bottom
                // END
                break;

            case 0x0011:
                // Bottom | Left
                targetType = enumWireType.turn;
                rotation += 90;
                break;

            case 0x0100:
                // Right
                rotation += 90;
                break;

            case 0x0101:
                // Right | Left
                rotation += 90;
                break;

            case 0x0110:
                // Right | Bottom
                targetType = enumWireType.turn;
                break;

            case 0x0111:
                // Right | Bottom | Left
                targetType = enumWireType.split;
                break;

            case 0x1000:
                // Top
                break;

            case 0x1001:
                // Top | Left
                targetType = enumWireType.turn;
                rotation += 180;
                break;

            case 0x1010:
                // Top | Bottom
                break;

            case 0x1011:
                // Top | Bottom | Left
                targetType = enumWireType.split;
                rotation += 90;
                break;

            case 0x1100:
                // Top | Right
                targetType = enumWireType.turn;
                rotation -= 90;
                break;

            case 0x1101:
                // Top | Right | Left
                targetType = enumWireType.split;
                rotation += 180;
                break;

            case 0x1110:
                // Top | Right | Bottom
                targetType = enumWireType.split;
                rotation -= 90;
                break;

            case 0x1111:
                // Top | Right | Bottom | Left
                targetType = enumWireType.cross;
                break;
        }

        return {
            // Clamp rotation
            rotation: (rotation + 360 * 10) % 360,
            rotationVariant: wireRotationVariantToType.indexOf(targetType),
        };
    }
}

MetaWireBuilding.setupEntityComponents = [entity => entity.addComponent(new WireComponent({}))];

MetaWireBuilding.variants = [DefaultWireVariant, SecondWireVariant];
