import { generateMatrixRotations } from "../../core/utils";
import { Vector } from "../../core/vector";
import { WireTunnelComponent } from "../components/wire_tunnel";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { defaultBuildingVariant } from "../meta_building_variant";
import { GameRoot } from "../root";
import { enumHubGoalRewards } from "../tutorial_goals";

export class MetaWireTunnelBuilding extends MetaBuilding {
    constructor() {
        super("wire_tunnel");
    }

    /**
     * @param {string} variant
     */
    getSilhouetteColor(variant) {
        return MetaWireTunnelBuilding.silhouetteColors[variant]();
    }

    /**
     * @param {string} variant
     */
    getIsRemovable(variant) {
        return MetaWireTunnelBuilding.isRemovable[variant]();
    }

    /**
     * @param {string} variant
     */
    getIsRotateable(variant) {
        return MetaWireTunnelBuilding.isRotateable[variant]();
    }

    /**
     * @param {GameRoot} root
     */
    getAvailableVariants(root) {
        const variants = MetaWireTunnelBuilding.avaibleVariants;

        let available = [];
        for (const variant in variants) {
            if (variants[variant](root)) available.push(variant);
        }

        return available;
    }

    /**
     * Returns the edit layer of the building
     * @param {GameRoot} root
     * @param {string} variant
     * @returns {Layer}
     */
    getLayer(root, variant) {
        // @ts-ignore
        return MetaWireTunnelBuilding.layerByVariant[variant](root);
    }

    /**
     * @param {string} variant
     */
    getDimensions(variant) {
        return MetaWireTunnelBuilding.dimensions[variant]();
    }

    /**
     * @param {string} variant
     */
    getShowLayerPreview(variant) {
        return MetaWireTunnelBuilding.layerPreview[variant]();
    }

    /**
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {string} variant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, variant, entity) {
        let matrices = MetaWireTunnelBuilding.overlayMatrices[variant](entity, rotationVariant);
        return matrices ? matrices[rotation] : null;
    }

    /**
     * @param {string} variant
     */
    getRenderPins(variant) {
        return MetaWireTunnelBuilding.renderPins[variant]();
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaWireTunnelBuilding.setupEntityComponents.forEach(func => func(entity));
    }

    /**
     * @param {Entity} entity
     * @param {number} rotationVariant
     * @param {string} variant
     */
    updateVariants(entity, rotationVariant, variant) {
        MetaWireTunnelBuilding.componentVariations[variant](entity, rotationVariant);
    }

    static setupEntityComponents = [entity => entity.addComponent(new WireTunnelComponent())];

    static overlayMatrices = {
        [defaultBuildingVariant]: (entity, rotationVariant) =>
            generateMatrixRotations([0, 1, 0, 1, 1, 1, 0, 1, 0]),
    };

    static dimensions = {
        [defaultBuildingVariant]: () => new Vector(1, 1),
    };

    static silhouetteColors = {
        [defaultBuildingVariant]: () => "#777a86",
    };

    static isRemovable = {
        [defaultBuildingVariant]: () => true,
    };

    static isRotateable = {
        [defaultBuildingVariant]: () => false,
    };

    static renderPins = {
        [defaultBuildingVariant]: () => false,
    };

    static layerPreview = {
        [defaultBuildingVariant]: () => "wires",
    };

    static avaibleVariants = {
        [defaultBuildingVariant]: root =>
            root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_wires_painter_and_levers),
    };

    static layerByVariant = {
        [defaultBuildingVariant]: root => "wires",
    };

    static componentVariations = {
        [defaultBuildingVariant]: (entity, rotationVariant) => {},
    };
}
