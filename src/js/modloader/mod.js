import { GameState } from "../core/game_state";
import { GLOBAL_APP } from "../core/globals";
import { gMetaBuildingRegistry } from "../core/global_registries";
import { Loader } from "../core/loader";
import { Signal } from "../core/signal";
import { addBuildingCodeCache, gBuildingVariants, registerBuildingVariant } from "../game/building_codes";
import { defaultBuildingVariant, MetaBuilding } from "../game/meta_building";
import { updateApplicationLanguageMods } from "../translations";

/**
 * @typedef {{
 * name: string,
 * description: string,
 * authors: Array<String>,
 * version: string,
 * }} ModInfo
 */

/**
 * @typedef {{
 * [x: string]: {
 *  type: "bool" | "enum" | "range",
 *  value: boolean | string | number,
 *  title?: string,
 *  description?: string,
 *  enabled?: Function
 * }
 * }} ModSettings
 */

/**
 * Creates a new Mod instance.
 * @class
 */
export class Mod {
    /**
     * Creates a Mod
     * @param {string} id Id of mod
     * @param {ModInfo} info Information about the mod
     * @param {ModSettings} settings Mod settings, defauts to {}
     * @param {boolean} enabled Starts mod enabled, defauts to true
     */
    constructor(id, info, settings = {}, enabled = true) {
        this.id = id;
        this.info = info;
        this.settings = settings;
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
     * Registers a new atlas
     * @param {string} src
     * @param {import("../core/loader").AtlasDefinition} sourceData
     */
    registerAtlas(src, sourceData) {
        const sourceImage = new Image();
        sourceImage.crossOrigin = "anonymous";
        sourceImage.onload = () => {
            Loader.internalParseAtlas(sourceData, sourceImage);
        };
        sourceImage.src = src;
    }

    /**
     * Register new translations for language
     * @param {string} language
     * @param {object} translations
     */
    registerTranslation(language, translations) {
        this.modManager.translations.push({
            language,
            data: translations,
        });

        // Update language to add mod translations
        if (this.modManager.app.settings.initialized) {
            updateApplicationLanguageMods(this.modManager.app, this.modManager.app.settings.getLanguage());
        } else {
            this.modManager.app.settings.signals.initialized.add(() =>
                updateApplicationLanguageMods(this.modManager.app, this.modManager.app.settings.getLanguage())
            );
        }
    }

    registerCss(css) {
        // Get style element
        let style = document.getElementById(this.id + "-style");
        if (!style) {
            const head = document.head || document.getElementsByTagName("head")[0];

            // Create style element
            style = document.createElement("style");
            style.id = this.id + "-style";
            style.appendChild(document.createTextNode(""));

            head.appendChild(style);
        }

        // Add css
        style.appendChild(document.createTextNode(css));
    }

    /**
     * Registers a new icon
     * @param {string} id
     * @param {string} icon
     */
    registerIcon(id, icon) {
        // Add icon style
        this.registerCss(`[data-icon="${id}.png"] { background-image: url(${icon}) !important; }`);
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

    /**
     * Registers a new state class, should be a GameState derived class
     * @param {typeof GameState} stateClass
     */
    registerState(stateClass) {
        this.modManager.app.stateMgr.register(stateClass);
    }
}
