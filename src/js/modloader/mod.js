import { GameState } from "../core/game_state";
import { GLOBAL_APP } from "../core/globals";
import { gMetaBuildingRegistry } from "../core/global_registries";
import { Signal } from "../core/signal";
import { addBuildingCodeCache, gBuildingVariants, registerBuildingVariant } from "../game/building_codes";
import { defaultBuildingVariant, MetaBuilding } from "../game/meta_building";

/**
 * @typedef {{
 * name: string,
 * description: string,
 * authors: Array<String>,
 * version: string,
 * }} ModInfo
 */

export class Mod {
    /**
     * Creates a Mod
     * @param {string} id Id of mod
     * @param {ModInfo} info Information about the mod
     * @param {boolean} enabled Starts mod enabled, defauts to true
     */
    constructor(id, info, enabled = true) {
        this.id = id;
        this.info = info;
        this.enabled = enabled;

        // Setup signals
        this.signals = {
            enable: new Signal(),
            disable: new Signal(),
        };

        // Register mod
        this.modManager = GLOBAL_APP.modManager.registerMod(this);
    }

    /**
     * Registers a new icon
     * @param {string} id
     * @param {string} icon
     */
    registerIcon(id, icon) {
        // Get style element
        let style = document.getElementById("mod-loader-icons");
        if (!style) {
            const head = document.head || document.getElementsByTagName("head")[0];

            // Create style element
            style = document.createElement("style");
            style.id = "mod-loader-icons";
            style.appendChild(document.createTextNode(""));

            head.appendChild(style);
        }

        // Add icon style
        style.appendChild(
            document.createTextNode(`[data-icon="${id}.png"] { background-image: url(${icon}) !important; }`)
        );
    }

    /**
     * Registers a new variant
     * @param {number} code
     * @param {typeof MetaBuilding} meta
     * @param {string} variant
     * @param {number} rotationVariant
     */
    registerBuildingVariant(code, meta, variant = defaultBuildingVariant, rotationVariant = 0) {
        // Register building
        if (!gMetaBuildingRegistry.hasId(new meta(null).getId())) {
            gMetaBuildingRegistry.register(meta);
        }

        // Register variant
        registerBuildingVariant(this.id, code, meta, variant, rotationVariant);

        const variantCode = `${this.id}:${code}`;
        const buildingVariant = gBuildingVariants[variantCode];

        // Propagate instance
        buildingVariant.metaInstance = gMetaBuildingRegistry.findByClass(meta);

        // Propagate sprite cache
        buildingVariant.sprite = buildingVariant.metaInstance.getSprite(rotationVariant, variant);
        buildingVariant.blueprintSprite = buildingVariant.metaInstance.getBlueprintSprite(
            rotationVariant,
            variant
        );
        buildingVariant.silhouetteColor = buildingVariant.metaInstance.getSilhouetteColor(
            variant,
            rotationVariant
        );

        // Add cache for building code
        addBuildingCodeCache(variantCode);
    }
}
