import { enumDirection, Vector } from "../../core/vector";
import { ItemAcceptorComponent } from "../components/item_acceptor";
import { ItemEjectorComponent } from "../components/item_ejector";
import { enumItemProcessorTypes, ItemProcessorComponent } from "../components/item_processor";
import { Entity } from "../entity";
import { MetaBuilding, defaultBuildingVariant } from "../meta_building";
import { GameRoot } from "../root";
import { enumHubGoalRewards } from "../tutorial_goals";
import { T } from "../../translations";
import { formatItemsPerSecond, generateMatrixRotations } from "../../core/utils";
import { BeltUnderlaysComponent } from "../components/belt_underlays";
import { THEME } from "../theme";

/** @enum {string} */
export const enumBeltCrossingVariants = {
    corner: "corner",
    switcher: "switcher",
    //do stuff in all this code with this
};

const overlayMatrices = {
    [defaultBuildingVariant]: generateMatrixRotations([0, 1, 0, 1, 1, 1, 0, 1, 0]),
    [enumBeltCrossingVariants.corner]: generateMatrixRotations([0, 1, 0, 1, 1, 1, 0, 1, 0]),
    [enumBeltCrossingVariants.switcher]: null,
};

export class MetaBeltCrossingBuilding extends MetaBuilding {
    constructor() {
        super("belt_crossing");
    }

    getDimensions(variant) {
        switch (variant) {
            case enumBeltCrossingVariants.switcher:
                return new Vector(2, 1);
            case defaultBuildingVariant:
            case enumBeltCrossingVariants.corner:
                return new Vector(1, 1);
            default:
                assertAlways(false, "Unknown crossing variant: " + variant);
        }
    }

    /**
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {string} variant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, variant, entity) {
        const matrix = overlayMatrices[variant];
        if (matrix) {
            return matrix[rotation];
        }
        return null;
    }

    /**
     * @param {GameRoot} root
     * @param {string} variant
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root, variant) {
        const speed =
            root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.balancer);
        return [[T.ingame.buildingPlacement.infoTexts.speed, formatItemsPerSecond(speed)]];
    }

    getSilhouetteColor() {
        return THEME.map.chunkOverview.beltColor;
    }

    /**
     * @param {GameRoot} root
     */
    getAvailableVariants(root) {
        return [defaultBuildingVariant, enumBeltCrossingVariants.corner, enumBeltCrossingVariants.switcher];
    }

    /**
     * @param {GameRoot} root
     */
    getIsUnlocked(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_belt_crossing);
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        entity.addComponent(
            new ItemAcceptorComponent({
                slots: [], // set later
            })
        );

        entity.addComponent(
            new ItemProcessorComponent({
                makeCharges: false,
            })
        );

        entity.addComponent(
            new ItemEjectorComponent({
                slots: [], // set later
                renderFloatingItems: false,
            })
        );

        entity.addComponent(new BeltUnderlaysComponent({ underlays: [] }));
    }

    /**
     *
     * @param {Entity} entity
     * @param {number} rotationVariant
     * @param {string} variant
     */
    updateVariants(entity, rotationVariant, variant) {
        switch (variant) {
            
            case defaultBuildingVariant: {
                entity.components.ItemAcceptor.setSlots([
                    {
                        pos: new Vector(0, 0),
                        directions: [enumDirection.bottom]
                    },
                    {
                        pos: new Vector(0, 0),
                        directions: [enumDirection.left]
                    },
                ]);

                entity.components.ItemEjector.setSlots([
                    {
                        pos: new Vector(0, 0),
                        direction: enumDirection.top,
                    },
                    {
                        pos: new Vector(0, 0),
                        direction: enumDirection.right,
                    },
                ]);

                entity.components.BeltUnderlays.underlays = [
                    { pos: new Vector(0, 0), direction: enumDirection.top },
                    { pos: new Vector(0, 0), direction: enumDirection.right },
                ];
                break;
            }
            case enumBeltCrossingVariants.corner: {
                entity.components.ItemAcceptor.setSlots([
                    {
                        pos: new Vector(0, 0),
                        directions: [enumDirection.bottom]
                    },
                    {
                        pos: new Vector(0, 0),
                        directions: [enumDirection.left]
                    },
                ]);

                entity.components.ItemEjector.setSlots([
                    {
                        pos: new Vector(0, 0),
                        direction: enumDirection.right,
                    },
                    {
                        pos: new Vector(0, 0),
                        direction: enumDirection.top,
                    },
                ]);

                entity.components.BeltUnderlays.underlays = [
                    { pos: new Vector(0, 0), direction: enumDirection.top },
                    { pos: new Vector(0, 0), direction: enumDirection.right},
                ];
                break;
            }
            case enumBeltCrossingVariants.switcher: {
                entity.components.ItemAcceptor.setSlots([
                    {
                        pos: new Vector(0, 0),
                        directions: [enumDirection.bottom]
                    },
                    {
                        pos: new Vector(1, 0),
                        directions: [enumDirection.bottom]
                    },
                ]);

                entity.components.ItemEjector.setSlots([
                    {
                        pos: new Vector(1, 0),
                        direction: enumDirection.top,
                    },
                    {
                        pos: new Vector(0, 0),
                        direction: enumDirection.top,
                    },
                ]);

                entity.components.BeltUnderlays.underlays = [
                    { pos: new Vector(0, 0), direction: enumDirection.top },
                    { pos: new Vector(1, 0), direction: enumDirection.top },
                ];
                break;
            }
            default:
                assertAlways(false, "Unknown balancer variant: " + variant);
        }
    }
}
