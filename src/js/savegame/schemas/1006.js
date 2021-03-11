import { gMetaBuildingRegistry } from "../../core/global_registries.js";
import { createLogger } from "../../core/logging.js";
import { MetaBalancerBuilding } from "../../game/buildings/balancer.js";
import { MetaBeltBuilding } from "../../game/buildings/belt.js";
import { MetaCutterBuilding } from "../../game/buildings/cutter.js";
import { MetaHubBuilding } from "../../game/buildings/hub.js";
import { MetaMinerBuilding } from "../../game/buildings/miner.js";
import { MetaMixerBuilding } from "../../game/buildings/mixer.js";
import { MetaPainterBuilding } from "../../game/buildings/painter.js";
import { MetaRotaterBuilding } from "../../game/buildings/rotater.js";
import { MetaStackerBuilding } from "../../game/buildings/stacker.js";
import { MetaStorageBuilding } from "../../game/buildings/storage.js";
import { MetaTrashBuilding } from "../../game/buildings/trash.js";
import { MetaUndergroundBeltBuilding } from "../../game/buildings/underground_belt.js";
import {
    MergerBalancerVariant,
    MergerInverseBalancerVariant,
} from "../../game/buildings/variants/balancer.js";
import { QuadCutterVariant } from "../../game/buildings/variants/cutter.js";
import { ChainableMinerVariant } from "../../game/buildings/variants/miner.js";
import {
    DoublePainterVariant,
    MirroredPainterVariant,
    QuadPainterVariant,
} from "../../game/buildings/variants/painter.js";
import { getCodeFromBuildingData } from "../../game/building_codes.js";
import { StaticMapEntityComponent } from "../../game/components/static_map_entity.js";
import { Entity } from "../../game/entity.js";
import { MetaBuilding } from "../../game/meta_building.js";
import { defaultBuildingVariant } from "../../game/meta_building_variant.js";
import { SavegameInterface_V1005 } from "./1005.js";

const schema = require("./1006.json");
const logger = createLogger("savegame_interface/1006");

/**
 * Rebalances a value from the old balancing to the new one
 * @param {number} value
 * @returns {number}
 */
function rebalance(value) {
    return Math.round(Math.pow(value, 0.75));
}

export class SavegameInterface_V1006 extends SavegameInterface_V1005 {
    getVersion() {
        return 1006;
    }

    getSchemaUncached() {
        return schema;
    }

    static computeSpriteMapping() {
        return {
            // Belt
            "sprites/blueprints/belt_top.png": 1,
            "sprites/blueprints/belt_left.png": 2,
            "sprites/blueprints/belt_right.png": 3,

            // Splitter (=Balancer)
            "sprites/blueprints/splitter.png": 47,
            "sprites/blueprints/splitter-compact-inverse.png": 48,

            // Underground belt
            "sprites/blueprints/underground_belt_entry.png": 22,
            "sprites/blueprints/underground_belt_exit.png": 23,

            "sprites/blueprints/underground_belt_entry-tier2.png": 24,
            "sprites/blueprints/underground_belt_exit-tier2.png": 25,

            // Miner
            "sprites/blueprints/miner.png": 7,
            "sprites/blueprints/miner-chainable.png": 8,

            // Cutter
            "sprites/blueprints/cutter.png": 9,
            "sprites/blueprints/cutter-quad.png": 10,

            // Rotater
            "sprites/blueprints/rotater.png": 11,

            // Stacker
            "sprites/blueprints/stacker.png": 14,

            // Mixer
            "sprites/blueprints/mixer.png": 15,

            // Painter
            "sprites/blueprints/painter.png": 16,
            "sprites/blueprints/painter-mirrored.png": 17,
            "sprites/blueprints/painter-double.png": 18,
            "sprites/blueprints/painter-quad.png": 19,

            // Trash
            "sprites/blueprints/trash.png": 20,

            // Storage
            "sprites/blueprints/trash-storage.png": 21,
        };
    }

    /**
     * @param {import("../savegame_typedefs.js").SavegameData} data
     */
    static migrate1005to1006(data) {
        logger.log("Migrating 1005 to 1006");
        const dump = data.dump;
        if (!dump) {
            return true;
        }

        // Reduce stored shapes
        const stored = dump.hubGoals.storedShapes;
        for (const shapeKey in stored) {
            stored[shapeKey] = rebalance(stored[shapeKey]);
        }

        // Reset final game shape
        stored["RuCw--Cw:----Ru--"] = 0;

        // Reduce goals
        if (dump.hubGoals.currentGoal) {
            dump.hubGoals.currentGoal.required = rebalance(dump.hubGoals.currentGoal.required);
        }

        let level = Math.min(19, dump.hubGoals.level);

        const levelMapping = {
            14: 15,
            15: 16,
            16: 17,
            17: 18,
            18: 19,
            19: 20,
        };

        dump.hubGoals.level = levelMapping[level] || level;

        // Update entities
        const entities = dump.entities;
        for (let i = 0; i < entities.length; ++i) {
            const entity = entities[i];
            const components = entity.components;
            this.migrateStaticComp1005to1006(entity);

            // HUB
            if (components.Hub) {
                // @ts-ignore
                components.Hub = {};
            }

            // Item Processor
            if (components.ItemProcessor) {
                // @ts-ignore
                components.ItemProcessor = {
                    nextOutputSlot: 0,
                };
            }

            // OLD: Unremovable component
            // @ts-ignore
            if (components.Unremovable) {
                // @ts-ignore
                delete components.Unremovable;
            }

            // OLD: ReplaceableMapEntity
            // @ts-ignore
            if (components.ReplaceableMapEntity) {
                // @ts-ignore
                delete components.ReplaceableMapEntity;
            }

            // ItemAcceptor
            if (components.ItemAcceptor) {
                // @ts-ignore
                components.ItemAcceptor = {};
            }

            // Belt
            if (components.Belt) {
                // @ts-ignore
                components.Belt = {};
            }

            // Item Ejector
            if (components.ItemEjector) {
                // @ts-ignore
                components.ItemEjector = {
                    slots: [],
                };
            }

            // UndergroundBelt
            if (components.UndergroundBelt) {
                // @ts-ignore
                components.UndergroundBelt = {
                    pendingItems: [],
                };
            }

            // Miner
            if (components.Miner) {
                // @ts-ignore
                delete components.Miner.chainable;

                components.Miner.lastMiningTime = 0;
                components.Miner.itemChainBuffer = [];
            }

            // Storage
            if (components.Storage) {
                // @ts-ignore
                components.Storage = {
                    storedCount: rebalance(components.Storage.storedCount),
                    storedItem: null,
                };
            }
        }
    }

    /**
     *
     * @param {Entity} entity
     */
    static migrateStaticComp1005to1006(entity) {
        const spriteMapping = this.computeSpriteMapping();
        const staticComp = entity.components.StaticMapEntity;

        /** @type {StaticMapEntityComponent} */
        const newStaticComp = {};
        newStaticComp.origin = staticComp.origin;
        newStaticComp.originalRotation = staticComp.originalRotation;
        newStaticComp.rotation = staticComp.rotation;

        // @ts-ignore
        newStaticComp.code = spriteMapping[staticComp.blueprintSpriteKey];

        // Hub special case
        if (entity.components.Hub) {
            // @ts-ignore
            newStaticComp.code = 26;
        }

        // Belt special case
        if (entity.components.Belt) {
            const actualCode = {
                top: 1,
                left: 2,
                right: 3,
            }[entity.components.Belt.direction];
            if (actualCode !== newStaticComp.code) {
                if (G_IS_DEV) {
                    console.warn("Belt mismatch");
                }
                newStaticComp.code = actualCode;
            }
        }

        if (!newStaticComp.code) {
            throw new Error(
                // @ts-ignore
                "1006 Migration: Could not reconstruct code for " + staticComp.blueprintSpriteKey
            );
        }

        entity.components.StaticMapEntity = newStaticComp;
    }
}
