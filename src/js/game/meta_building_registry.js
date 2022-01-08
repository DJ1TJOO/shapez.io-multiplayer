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
    registerBuildingVariant("vanilla", 1, MetaBeltBuilding, defaultBuildingVariant, 0);
    registerBuildingVariant("vanilla", 2, MetaBeltBuilding, defaultBuildingVariant, 1);
    registerBuildingVariant("vanilla", 3, MetaBeltBuilding, defaultBuildingVariant, 2);

    // Balancer
    registerBuildingVariant("vanilla", 4, MetaBalancerBuilding);
    registerBuildingVariant("vanilla", 5, MetaBalancerBuilding, enumBalancerVariants.merger);
    registerBuildingVariant("vanilla", 6, MetaBalancerBuilding, enumBalancerVariants.mergerInverse);
    registerBuildingVariant("vanilla", 47, MetaBalancerBuilding, enumBalancerVariants.splitter);
    registerBuildingVariant("vanilla", 48, MetaBalancerBuilding, enumBalancerVariants.splitterInverse);

    // Miner
    registerBuildingVariant("vanilla", 7, MetaMinerBuilding);
    registerBuildingVariant("vanilla", 8, MetaMinerBuilding, enumMinerVariants.chainable);

    // Cutter
    registerBuildingVariant("vanilla", 9, MetaCutterBuilding);
    registerBuildingVariant("vanilla", 10, MetaCutterBuilding, enumCutterVariants.quad);

    // Rotater
    registerBuildingVariant("vanilla", 11, MetaRotaterBuilding);
    registerBuildingVariant("vanilla", 12, MetaRotaterBuilding, enumRotaterVariants.ccw);
    registerBuildingVariant("vanilla", 13, MetaRotaterBuilding, enumRotaterVariants.rotate180);

    // Stacker
    registerBuildingVariant("vanilla", 14, MetaStackerBuilding);

    // Mixer
    registerBuildingVariant("vanilla", 15, MetaMixerBuilding);

    // Painter
    registerBuildingVariant("vanilla", 16, MetaPainterBuilding);
    registerBuildingVariant("vanilla", 17, MetaPainterBuilding, enumPainterVariants.mirrored);
    registerBuildingVariant("vanilla", 18, MetaPainterBuilding, enumPainterVariants.double);
    registerBuildingVariant("vanilla", 19, MetaPainterBuilding, enumPainterVariants.quad);

    // Trash
    registerBuildingVariant("vanilla", 20, MetaTrashBuilding);

    // Storage
    registerBuildingVariant("vanilla", 21, MetaStorageBuilding);

    // Underground belt
    registerBuildingVariant("vanilla", 22, MetaUndergroundBeltBuilding, defaultBuildingVariant, 0);
    registerBuildingVariant("vanilla", 23, MetaUndergroundBeltBuilding, defaultBuildingVariant, 1);
    registerBuildingVariant("vanilla", 24, MetaUndergroundBeltBuilding, enumUndergroundBeltVariants.tier2, 0);
    registerBuildingVariant("vanilla", 25, MetaUndergroundBeltBuilding, enumUndergroundBeltVariants.tier2, 1);

    // Hub
    registerBuildingVariant("vanilla", 26, MetaHubBuilding);

    // Wire
    registerBuildingVariant("vanilla", 27, MetaWireBuilding, defaultBuildingVariant, 0);
    registerBuildingVariant("vanilla", 28, MetaWireBuilding, defaultBuildingVariant, 1);
    registerBuildingVariant("vanilla", 29, MetaWireBuilding, defaultBuildingVariant, 2);
    registerBuildingVariant("vanilla", 30, MetaWireBuilding, defaultBuildingVariant, 3);

    registerBuildingVariant("vanilla", 52, MetaWireBuilding, enumWireVariant.second, 0);
    registerBuildingVariant("vanilla", 53, MetaWireBuilding, enumWireVariant.second, 1);
    registerBuildingVariant("vanilla", 54, MetaWireBuilding, enumWireVariant.second, 2);
    registerBuildingVariant("vanilla", 55, MetaWireBuilding, enumWireVariant.second, 3);

    // Constant signal
    registerBuildingVariant("vanilla", 31, MetaConstantSignalBuilding);

    // Logic gate
    registerBuildingVariant("vanilla", 32, MetaLogicGateBuilding);
    registerBuildingVariant("vanilla", 34, MetaLogicGateBuilding, enumLogicGateVariants.not);
    registerBuildingVariant("vanilla", 35, MetaLogicGateBuilding, enumLogicGateVariants.xor);
    registerBuildingVariant("vanilla", 36, MetaLogicGateBuilding, enumLogicGateVariants.or);

    // Transistor
    registerBuildingVariant("vanilla", 38, MetaTransistorBuilding, defaultBuildingVariant);
    registerBuildingVariant("vanilla", 60, MetaTransistorBuilding, enumTransistorVariants.mirrored);

    // Lever
    registerBuildingVariant("vanilla", 33, MetaLeverBuilding);

    // Filter
    registerBuildingVariant("vanilla", 37, MetaFilterBuilding);

    // Wire tunnel
    registerBuildingVariant("vanilla", 39, MetaWireTunnelBuilding);

    // Display
    registerBuildingVariant("vanilla", 40, MetaDisplayBuilding);

    // Virtual Processor
    registerBuildingVariant("vanilla", 42, MetaVirtualProcessorBuilding);
    registerBuildingVariant(
        "vanilla",
        44,
        MetaVirtualProcessorBuilding,
        enumVirtualProcessorVariants.rotater
    );
    registerBuildingVariant(
        "vanilla",
        45,
        MetaVirtualProcessorBuilding,
        enumVirtualProcessorVariants.unstacker
    );
    registerBuildingVariant(
        "vanilla",
        50,
        MetaVirtualProcessorBuilding,
        enumVirtualProcessorVariants.stacker
    );
    registerBuildingVariant(
        "vanilla",
        51,
        MetaVirtualProcessorBuilding,
        enumVirtualProcessorVariants.painter
    );

    // Analyzer
    registerBuildingVariant("vanilla", 46, MetaComparatorBuilding);
    registerBuildingVariant("vanilla", 43, MetaAnalyzerBuilding);

    // Reader
    registerBuildingVariant("vanilla", 49, MetaReaderBuilding);

    // Item producer
    registerBuildingVariant("vanilla", 61, MetaItemProducerBuilding);

    // Constant producer
    registerBuildingVariant("vanilla", 62, MetaConstantProducerBuilding);

    // Goal acceptor
    registerBuildingVariant("vanilla", 63, MetaGoalAcceptorBuilding);

    // Block
    registerBuildingVariant("vanilla", 64, MetaBlockBuilding);

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
