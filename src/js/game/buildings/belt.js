import { Loader } from "../../core/loader";
import { enumAngleToDirection, enumDirection, Vector } from "../../core/vector";
import { BeltComponent } from "../components/belt";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { GameRoot } from "../root";
import { beltVariantToRotation, DefaultBeltVariant } from "./variants/belt";

export class MetaBeltBuilding extends MetaBuilding {
    constructor() {
        super("belt");
    }

    getPreviewSprite(rotationVariant) {
        switch (beltVariantToRotation[rotationVariant]) {
            case enumDirection.top: {
                return Loader.getSprite("sprites/buildings/belt_top.png");
            }
            case enumDirection.left: {
                return Loader.getSprite("sprites/buildings/belt_left.png");
            }
            case enumDirection.right: {
                return Loader.getSprite("sprites/buildings/belt_right.png");
            }
            default: {
                assertAlways(false, "Invalid belt rotation variant");
            }
        }
    }

    getBlueprintSprite(rotationVariant) {
        switch (beltVariantToRotation[rotationVariant]) {
            case enumDirection.top: {
                return Loader.getSprite("sprites/blueprints/belt_top.png");
            }
            case enumDirection.left: {
                return Loader.getSprite("sprites/blueprints/belt_left.png");
            }
            case enumDirection.right: {
                return Loader.getSprite("sprites/blueprints/belt_right.png");
            }
            default: {
                assertAlways(false, "Invalid belt rotation variant");
            }
        }
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaBeltBuilding.setupEntityComponents.forEach(func => func(entity));
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
        const topDirection = enumAngleToDirection[rotation];
        const rightDirection = enumAngleToDirection[(rotation + 90) % 360];
        const bottomDirection = enumAngleToDirection[(rotation + 180) % 360];
        const leftDirection = enumAngleToDirection[(rotation + 270) % 360];

        const { ejectors, acceptors } = root.logic.getEjectorsAndAcceptorsAtTile(tile);

        let hasBottomEjector = false;
        let hasRightEjector = false;
        let hasLeftEjector = false;

        let hasTopAcceptor = false;
        let hasLeftAcceptor = false;
        let hasRightAcceptor = false;

        // Check all ejectors
        for (let i = 0; i < ejectors.length; ++i) {
            const ejector = ejectors[i];

            if (ejector.toDirection === topDirection) {
                hasBottomEjector = true;
            } else if (ejector.toDirection === leftDirection) {
                hasRightEjector = true;
            } else if (ejector.toDirection === rightDirection) {
                hasLeftEjector = true;
            }
        }

        // Check all acceptors
        for (let i = 0; i < acceptors.length; ++i) {
            const acceptor = acceptors[i];
            if (acceptor.fromDirection === bottomDirection) {
                hasTopAcceptor = true;
            } else if (acceptor.fromDirection === rightDirection) {
                hasLeftAcceptor = true;
            } else if (acceptor.fromDirection === leftDirection) {
                hasRightAcceptor = true;
            }
        }

        // Soo .. if there is any ejector below us we always prioritize
        // this ejector
        if (!hasBottomEjector) {
            // When something ejects to us from the left and nothing from the right,
            // do a curve from the left to the top

            if (hasRightEjector && !hasLeftEjector) {
                return {
                    rotation: (rotation + 270) % 360,
                    rotationVariant: 2,
                };
            }

            // When something ejects to us from the right and nothing from the left,
            // do a curve from the right to the top
            if (hasLeftEjector && !hasRightEjector) {
                return {
                    rotation: (rotation + 90) % 360,
                    rotationVariant: 1,
                };
            }
        }

        // When there is a top acceptor, ignore sides
        // NOTICE: This makes the belt prefer side turns *way* too much!
        if (!hasTopAcceptor) {
            // When there is an acceptor to the right but no acceptor to the left,
            // do a turn to the right
            if (hasRightAcceptor && !hasLeftAcceptor) {
                return {
                    rotation,
                    rotationVariant: 2,
                };
            }

            // When there is an acceptor to the left but no acceptor to the right,
            // do a turn to the left
            if (hasLeftAcceptor && !hasRightAcceptor) {
                return {
                    rotation,
                    rotationVariant: 1,
                };
            }
        }

        return {
            rotation,
            rotationVariant: 0,
        };
    }
}

MetaBeltBuilding.variants = [DefaultBeltVariant];

MetaBeltBuilding.setupEntityComponents = [
    entity =>
        entity.addComponent(
            new BeltComponent({
                direction: enumDirection.top, // updated later
            })
        ),
];
