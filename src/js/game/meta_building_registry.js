import { gMetaBuildingRegistry } from "../core/global_registries";
import { createLogger } from "../core/logging";
import { T } from "../translations";
import { MetaAnalyzerBuilding } from "./buildings/analyzer";
import { enumBalancerVariants, MetaBalancerBuilding } from "./buildings/balancer";
import { MetaBeltBuilding } from "./buildings/belt";
import { MetaBlockBuilding } from "./buildings/block";
import { MetaComparatorBuilding } from "./buildings/comparator";
import { MetaConstantProducerBuilding } from "./buildings/constant_producer";
import { MetaConstantSignalBuilding } from "./buildings/constant_signal";
import { enumCutterVariants, MetaCutterBuilding } from "./buildings/cutter";
import { MetaDisplayBuilding } from "./buildings/display";
import { MetaFilterBuilding } from "./buildings/filter";
import { MetaGoalAcceptorBuilding } from "./buildings/goal_acceptor";
import { MetaHubBuilding } from "./buildings/hub";
import { MetaItemProducerBuilding } from "./buildings/item_producer";
import { MetaLeverBuilding } from "./buildings/lever";
import { enumLogicGateVariants, MetaLogicGateBuilding } from "./buildings/logic_gate";
import { enumMinerVariants, MetaMinerBuilding } from "./buildings/miner";
import { MetaMixerBuilding } from "./buildings/mixer";
import { enumPainterVariants, MetaPainterBuilding } from "./buildings/painter";
import { MetaReaderBuilding } from "./buildings/reader";
import { enumRotaterVariants, MetaRotaterBuilding } from "./buildings/rotater";
import { MetaStackerBuilding } from "./buildings/stacker";
import { MetaStorageBuilding } from "./buildings/storage";
import { enumTransistorVariants, MetaTransistorBuilding } from "./buildings/transistor";
import { MetaTrashBuilding } from "./buildings/trash";
import { enumUndergroundBeltVariants, MetaUndergroundBeltBuilding } from "./buildings/underground_belt";
import { enumVirtualProcessorVariants, MetaVirtualProcessorBuilding } from "./buildings/virtual_processor";
import { MetaWireBuilding } from "./buildings/wire";
import { MetaWireTunnelBuilding } from "./buildings/wire_tunnel";
import { buildBuildingCodeCache, gBuildingVariants, registerBuildingVariant } from "./building_codes";
import { enumWireVariant } from "./components/wire";
import { KEYMAPPINGS } from "./key_action_mapper";
import { defaultBuildingVariant } from "./meta_building";

const logger = createLogger("building_registry");

export function initMetaBuildingRegistry() {
    gMetaBuildingRegistry.register(MetaBalancerBuilding);
    gMetaBuildingRegistry.register(MetaMinerBuilding);
    gMetaBuildingRegistry.register(MetaCutterBuilding);
    gMetaBuildingRegistry.register(MetaRotaterBuilding);
    gMetaBuildingRegistry.register(MetaStackerBuilding);
    gMetaBuildingRegistry.register(MetaMixerBuilding);
    gMetaBuildingRegistry.register(MetaPainterBuilding);
    gMetaBuildingRegistry.register(MetaTrashBuilding);
    gMetaBuildingRegistry.register(MetaStorageBuilding);
    gMetaBuildingRegistry.register(MetaBeltBuilding);
    gMetaBuildingRegistry.register(MetaUndergroundBeltBuilding);
    gMetaBuildingRegistry.register(MetaGoalAcceptorBuilding);
    gMetaBuildingRegistry.register(MetaHubBuilding);
    gMetaBuildingRegistry.register(MetaWireBuilding);
    gMetaBuildingRegistry.register(MetaConstantSignalBuilding);
    gMetaBuildingRegistry.register(MetaLogicGateBuilding);
    gMetaBuildingRegistry.register(MetaLeverBuilding);
    gMetaBuildingRegistry.register(MetaFilterBuilding);
    gMetaBuildingRegistry.register(MetaWireTunnelBuilding);
    gMetaBuildingRegistry.register(MetaDisplayBuilding);
    gMetaBuildingRegistry.register(MetaVirtualProcessorBuilding);
    gMetaBuildingRegistry.register(MetaReaderBuilding);
    gMetaBuildingRegistry.register(MetaTransistorBuilding);
    gMetaBuildingRegistry.register(MetaAnalyzerBuilding);
    gMetaBuildingRegistry.register(MetaComparatorBuilding);
    gMetaBuildingRegistry.register(MetaItemProducerBuilding);
    gMetaBuildingRegistry.register(MetaConstantProducerBuilding);
    gMetaBuildingRegistry.register(MetaBlockBuilding);

    // Belt
    registerBuildingVariant(0, 1, MetaBeltBuilding, defaultBuildingVariant, 0);
    registerBuildingVariant(0, 2, MetaBeltBuilding, defaultBuildingVariant, 1);
    registerBuildingVariant(0, 3, MetaBeltBuilding, defaultBuildingVariant, 2);

    // Balancer
    registerBuildingVariant(0, 4, MetaBalancerBuilding);
    registerBuildingVariant(0, 5, MetaBalancerBuilding, enumBalancerVariants.merger);
    registerBuildingVariant(0, 6, MetaBalancerBuilding, enumBalancerVariants.mergerInverse);
    registerBuildingVariant(0, 47, MetaBalancerBuilding, enumBalancerVariants.splitter);
    registerBuildingVariant(0, 48, MetaBalancerBuilding, enumBalancerVariants.splitterInverse);

    // Miner
    registerBuildingVariant(0, 7, MetaMinerBuilding);
    registerBuildingVariant(0, 8, MetaMinerBuilding, enumMinerVariants.chainable);

    // Cutter
    registerBuildingVariant(0, 9, MetaCutterBuilding);
    registerBuildingVariant(0, 10, MetaCutterBuilding, enumCutterVariants.quad);

    // Rotater
    registerBuildingVariant(0, 11, MetaRotaterBuilding);
    registerBuildingVariant(0, 12, MetaRotaterBuilding, enumRotaterVariants.ccw);
    registerBuildingVariant(0, 13, MetaRotaterBuilding, enumRotaterVariants.rotate180);

    // Stacker
    registerBuildingVariant(0, 14, MetaStackerBuilding);

    // Mixer
    registerBuildingVariant(0, 15, MetaMixerBuilding);

    // Painter
    registerBuildingVariant(0, 16, MetaPainterBuilding);
    registerBuildingVariant(0, 17, MetaPainterBuilding, enumPainterVariants.mirrored);
    registerBuildingVariant(0, 18, MetaPainterBuilding, enumPainterVariants.double);
    registerBuildingVariant(0, 19, MetaPainterBuilding, enumPainterVariants.quad);

    // Trash
    registerBuildingVariant(0, 20, MetaTrashBuilding);

    // Storage
    registerBuildingVariant(0, 21, MetaStorageBuilding);

    // Underground belt
    registerBuildingVariant(0, 22, MetaUndergroundBeltBuilding, defaultBuildingVariant, 0);
    registerBuildingVariant(0, 23, MetaUndergroundBeltBuilding, defaultBuildingVariant, 1);
    registerBuildingVariant(0, 24, MetaUndergroundBeltBuilding, enumUndergroundBeltVariants.tier2, 0);
    registerBuildingVariant(0, 25, MetaUndergroundBeltBuilding, enumUndergroundBeltVariants.tier2, 1);

    // Hub
    registerBuildingVariant(0, 26, MetaHubBuilding);

    // Wire
    registerBuildingVariant(0, 27, MetaWireBuilding, defaultBuildingVariant, 0);
    registerBuildingVariant(0, 28, MetaWireBuilding, defaultBuildingVariant, 1);
    registerBuildingVariant(0, 29, MetaWireBuilding, defaultBuildingVariant, 2);
    registerBuildingVariant(0, 30, MetaWireBuilding, defaultBuildingVariant, 3);

    registerBuildingVariant(0, 52, MetaWireBuilding, enumWireVariant.second, 0);
    registerBuildingVariant(0, 53, MetaWireBuilding, enumWireVariant.second, 1);
    registerBuildingVariant(0, 54, MetaWireBuilding, enumWireVariant.second, 2);
    registerBuildingVariant(0, 55, MetaWireBuilding, enumWireVariant.second, 3);

    // Constant signal
    registerBuildingVariant(0, 31, MetaConstantSignalBuilding);

    // Logic gate
    registerBuildingVariant(0, 32, MetaLogicGateBuilding);
    registerBuildingVariant(0, 34, MetaLogicGateBuilding, enumLogicGateVariants.not);
    registerBuildingVariant(0, 35, MetaLogicGateBuilding, enumLogicGateVariants.xor);
    registerBuildingVariant(0, 36, MetaLogicGateBuilding, enumLogicGateVariants.or);

    // Transistor
    registerBuildingVariant(0, 38, MetaTransistorBuilding, defaultBuildingVariant);
    registerBuildingVariant(0, 60, MetaTransistorBuilding, enumTransistorVariants.mirrored);

    // Lever
    registerBuildingVariant(0, 33, MetaLeverBuilding);

    // Filter
    registerBuildingVariant(0, 37, MetaFilterBuilding);

    // Wire tunnel
    registerBuildingVariant(0, 39, MetaWireTunnelBuilding);

    // Display
    registerBuildingVariant(0, 40, MetaDisplayBuilding);

    // Virtual Processor
    registerBuildingVariant(0, 42, MetaVirtualProcessorBuilding);
    registerBuildingVariant(0, 44, MetaVirtualProcessorBuilding, enumVirtualProcessorVariants.rotater);
    registerBuildingVariant(0, 45, MetaVirtualProcessorBuilding, enumVirtualProcessorVariants.unstacker);
    registerBuildingVariant(0, 50, MetaVirtualProcessorBuilding, enumVirtualProcessorVariants.stacker);
    registerBuildingVariant(0, 51, MetaVirtualProcessorBuilding, enumVirtualProcessorVariants.painter);

    // Analyzer
    registerBuildingVariant(0, 46, MetaComparatorBuilding);
    registerBuildingVariant(0, 43, MetaAnalyzerBuilding);

    // Reader
    registerBuildingVariant(0, 49, MetaReaderBuilding);

    // Item producer
    registerBuildingVariant(0, 61, MetaItemProducerBuilding);

    // Constant producer
    registerBuildingVariant(0, 62, MetaConstantProducerBuilding);

    // Goal acceptor
    registerBuildingVariant(0, 63, MetaGoalAcceptorBuilding);

    // Block
    registerBuildingVariant(0, 64, MetaBlockBuilding);

    // Propagate instances
    for (const key in gBuildingVariants) {
        gBuildingVariants[key].metaInstance = gMetaBuildingRegistry.findByClass(
            gBuildingVariants[key].metaClass
        );
    }

    for (const key in gBuildingVariants) {
        const variant = gBuildingVariants[key];
        assert(variant.metaClass, "Variant has no meta: " + key);

        if (typeof variant.rotationVariant === "undefined") {
            variant.rotationVariant = 0;
        }
        if (typeof variant.variant === "undefined") {
            variant.variant = defaultBuildingVariant;
        }
    }

    // Check for valid keycodes
    if (G_IS_DEV) {
        gMetaBuildingRegistry.entries.forEach(metaBuilding => {
            const id = metaBuilding.getId();
            if (!["hub"].includes(id)) {
                if (!KEYMAPPINGS.buildings[id]) {
                    assertAlways(
                        false,
                        "Building " + id + " has no keybinding assigned! Add it to key_action_mapper.js"
                    );
                }

                if (!T.buildings[id]) {
                    assertAlways(false, "Translation for building " + id + " missing!");
                }

                if (!T.buildings[id].default) {
                    assertAlways(false, "Translation for building " + id + " missing (default variant)!");
                }
            }
        });
    }

    logger.log("Registered", gMetaBuildingRegistry.getNumEntries(), "buildings");
    logger.log("Registered", Object.keys(gBuildingVariants).length, "building codes");
}

/**
 * Once all sprites are loaded, propagates the cache
 */
export function initBuildingCodesAfterResourcesLoaded() {
    logger.log("Propagating sprite cache");
    for (const key in gBuildingVariants) {
        const variant = gBuildingVariants[key];

        variant.sprite = variant.metaInstance.getSprite(variant.rotationVariant, variant.variant);
        variant.blueprintSprite = variant.metaInstance.getBlueprintSprite(
            variant.rotationVariant,
            variant.variant
        );
        variant.silhouetteColor = variant.metaInstance.getSilhouetteColor(
            variant.variant,
            variant.rotationVariant
        );
    }

    // Update caches
    buildBuildingCodeCache();
}
