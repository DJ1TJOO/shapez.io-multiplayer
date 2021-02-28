import { ItemAcceptorComponent } from "../components/item_acceptor";
import { ItemEjectorComponent } from "../components/item_ejector";
import { enumItemProcessorTypes, ItemProcessorComponent } from "../components/item_processor";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { BeltUnderlaysComponent } from "../components/belt_underlays";
import {
    DefaultBalancerVariant,
    MergerBalancerVariant,
    MergerInverseBalancerVariant,
    SplitterBalancerVariant,
    SplitterInverseBalancerVariant,
} from "./variants/balancer";

export class MetaBalancerBuilding extends MetaBuilding {
    constructor() {
        super("balancer");
    }

    /**
<<<<<<< HEAD
=======
     * @param {string} variant
     */
    getSilhouetteColor(variant) {
        return MetaBalancerBuilding.silhouetteColors[variant]();
    }

    /**
     * @param {string} variant
     */
    getIsRemovable(variant) {
        return MetaBalancerBuilding.isRemovable[variant]();
    }

    /**
     * @param {string} variant
     */
    getIsRotateable(variant) {
        return MetaBalancerBuilding.isRotateable[variant]();
    }

    /**
     * @param {GameRoot} root
     */
    getAvailableVariants(root) {
        const variants = MetaBalancerBuilding.avaibleVariants;

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
        return MetaBalancerBuilding.layerByVariant[variant](root);
    }

    /**
     * @param {string} variant
     */
    getDimensions(variant) {
        return MetaBalancerBuilding.dimensions[variant]();
    }

    /**
     * @param {string} variant
     */
    getShowLayerPreview(variant) {
        return MetaBalancerBuilding.layerPreview[variant]();
    }

    /**
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {string} variant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, variant, entity) {
        let matrices = MetaBalancerBuilding.overlayMatrices[variant](entity, rotationVariant);
        return matrices ? matrices[rotation] : null;
    }

    /**
     * @param {string} variant
     */
    getRenderPins(variant) {
        return MetaBalancerBuilding.renderPins[variant]();
    }

    /**
     * @param {GameRoot} root
     * @param {string} variant
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root, variant) {
        return MetaBalancerBuilding.additionalStatistics[variant](root);
    }

    /**
>>>>>>> modloader
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaBalancerBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaBalancerBuilding.variants = [
    DefaultBalancerVariant,
    MergerBalancerVariant,
    MergerInverseBalancerVariant,
    SplitterBalancerVariant,
    SplitterInverseBalancerVariant,
];

MetaBalancerBuilding.setupEntityComponents = [
    entity =>
        entity.addComponent(
            new ItemAcceptorComponent({
                slots: [], // set later
            })
        ),

    entity =>
        entity.addComponent(
            new ItemProcessorComponent({
                inputsPerCharge: 1,
                processorType: enumItemProcessorTypes.balancer,
            })
        ),

    entity =>
        entity.addComponent(
            new ItemEjectorComponent({
                slots: [], // set later
                renderFloatingItems: false,
            })
        ),

    entity => entity.addComponent(new BeltUnderlaysComponent({ underlays: [] })),
];
