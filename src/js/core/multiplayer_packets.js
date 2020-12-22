import { BaseItem } from "../game/base_item";
import { BeltPath } from "../game/belt_path";
import { Camera } from "../game/camera";
import { Component } from "../game/component";
import { BeltComponent } from "../game/components/belt";
import { BeltReaderComponent } from "../game/components/belt_reader";
import { BeltUnderlaysComponent } from "../game/components/belt_underlays";
import { ConstantSignalComponent } from "../game/components/constant_signal";
import { DisplayComponent } from "../game/components/display";
import { FilterComponent } from "../game/components/filter";
import { HubComponent } from "../game/components/hub";
import { ItemAcceptorComponent } from "../game/components/item_acceptor";
import { ItemEjectorComponent } from "../game/components/item_ejector";
import { ItemProcessorComponent } from "../game/components/item_processor";
import { ItemProducerComponent } from "../game/components/item_producer";
import { LeverComponent } from "../game/components/lever";
import { LogicGateComponent } from "../game/components/logic_gate";
import { MinerComponent } from "../game/components/miner";
import { StaticMapEntityComponent } from "../game/components/static_map_entity";
import { StorageComponent } from "../game/components/storage";
import { UndergroundBeltComponent } from "../game/components/underground_belt";
import { WireComponent } from "../game/components/wire";
import { WiredPinsComponent } from "../game/components/wired_pins";
import { WireTunnelComponent } from "../game/components/wire_tunnel";
import { Entity } from "../game/entity";
import { EntityManager } from "../game/entity_manager";
import { HubGoals } from "../game/hub_goals";
import { BooleanItem } from "../game/items/boolean_item";
import { ColorItem } from "../game/items/color_item";
import { ShapeItem } from "../game/items/shape_item";
import { BaseMap } from "../game/map";
import { MapView } from "../game/map_view";
import { ProductionAnalytics } from "../game/production_analytics";
import { GameRoot } from "../game/root";
import { ShapeDefinition } from "../game/shape_definition";
import { ShapeDefinitionManager } from "../game/shape_definition_manager";
import { BaseGameSpeed } from "../game/time/base_game_speed";
import { FastForwardGameSpeed } from "../game/time/fast_forward_game_speed";
import { GameTime } from "../game/time/game_time";
import { PausedGameSpeed } from "../game/time/paused_game_speed";
import { RegularGameSpeed } from "../game/time/regular_game_speed";
import { BasicSerializableObject, types } from "../savegame/serialization";
import { SerializerInternal } from "../savegame/serializer_internal";

const Peer = require("simple-peer");
/**
 * SerializedObject
 * @typedef {{
 *   serialized: Object,
 *   class: String,
 *   }} SerializedObject
 */

export const MultiplayerPacketTypes = {
    DATA: 0,
    FLAG: 1,
    SIGNAL: 2,
};

export class StringSerializable extends BasicSerializableObject {
    /**
     * @param {string} value
     */
    constructor(value) {
        super();
        this.value = value;
    }

    static getId() {
        return "string";
    }

    static getSchema() {
        return { value: types.string };
    }

    serialize() {
        return { value: this.value };
    }

    deserialize(data) {
        this.value = data.value;
    }
}

export class NumberSerializable extends BasicSerializableObject {
    /**
     * @param {number} value
     */
    constructor(value) {
        super();
        this.value = value;
    }

    static getId() {
        return "number";
    }

    static getSchema() {
        return { value: types.float };
    }

    serialize() {
        return { value: this.value };
    }

    deserialize(data) {
        this.value = data.value;
    }
}

export const MultiplayerPacketSerializableObject = {
    BaseGameSpeed: BaseGameSpeed,
    BaseItem: BaseItem,
    BaseMap: BaseMap,
    BeltComponent: BeltComponent,
    BeltPath: BeltPath,
    BeltReaderComponent: BeltReaderComponent,
    BeltUnderlaysComponent: BeltUnderlaysComponent,
    BooleanItem: BooleanItem,
    Camera: Camera,
    ColorItem: ColorItem,
    Component: Component,
    ConstantSignalComponent: ConstantSignalComponent,
    DisplayComponent: DisplayComponent,
    Entity: Entity,
    EntityManager: EntityManager,
    FastForwardGameSpeed: FastForwardGameSpeed,
    FilterComponent: FilterComponent,
    GameTime: GameTime,
    HubComponent: HubComponent,
    HubGoals: HubGoals,
    ItemAcceptorComponent: ItemAcceptorComponent,
    ItemEjectorComponent: ItemEjectorComponent,
    ItemProcessorComponent: ItemProcessorComponent,
    ItemProducerComponent: ItemProducerComponent,
    LeverComponent: LeverComponent,
    LogicGateComponent: LogicGateComponent,
    MapView: MapView,
    MinerComponent: MinerComponent,
    NumberSerializable: NumberSerializable,
    PausedGameSpeed: PausedGameSpeed,
    ProductionAnalytics: ProductionAnalytics,
    RegularGameSpeed: RegularGameSpeed,
    ShapeDefinition: ShapeDefinition,
    ShapeDefinitionManager: ShapeDefinitionManager,
    ShapeItem: ShapeItem,
    StaticMapEntityComponent: StaticMapEntityComponent,
    StorageComponent: StorageComponent,
    StringSerializable: StringSerializable,
    UndergroundBeltComponent: UndergroundBeltComponent,
    WireComponent: WireComponent,
    WiredPinsComponent: WiredPinsComponent,
    WireTunnelComponent: WireTunnelComponent,
};

export class MultiplayerPacket {
    constructor(type) {
        this.type = type;
    }

    /**
     * Sends the packet over a peer via the datachannel
     * @param {Peer} peer
     * @param {MultiplayerPacket} packet
     * @param {Array} packet
     */
    static sendPacket(peer, packet, connections = undefined) {
        try {
            peer.send(JSON.stringify(packet));
        } catch (error) {
            if (G_IS_DEV) console.log(error);

            if (connections)
                connections.splice(connections.indexOf(connections.find(x => x.peer === peer)), 1);
        }
    }

    /**
     * Serializes data
     * @param {Array<BasicSerializableObject>} args
     * @returns {Array<SerializedObject>}
     */
    static serialize(args) {
        var argsNew = [];
        for (let i = 0; i < args.length; i++) {
            const element = args[i];
            argsNew.push({ serialized: element.serialize(), class: element.constructor.name });
        }
        return argsNew;
    }

    /**
     * Deserializes data
     * @param {Array<SerializedObject>} args
     * @returns {Array<BasicSerializableObject>}
     */
    static deserialize(args, root) {
        var argsNew = [];
        for (let i = 0; i < args.length; i++) {
            const element = args[i];
            var object = new MultiplayerPacketSerializableObject[element.class]({});
            if (object instanceof Entity)
                object = new SerializerInternal().deserializeEntity(root, element.serialized, false);
            else object.deserialize(element.serialized, root);
            argsNew.push(object);
        }
        return argsNew;
    }
}

export class DataPacket extends MultiplayerPacket {
    constructor(size, data) {
        super(MultiplayerPacketTypes.DATA);

        /** @type {number} */
        this.size = size;

        /** @type {number} */
        this.data = data;
    }

    /**
     *
     * @param {string} str
     * @param {number} size
     */
    static chunkSubstr(str, size) {
        const numChunks = Math.ceil(str.length / size);
        const chunks = new Array(numChunks);

        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
            chunks[i] = str.substr(o, size);
        }

        return chunks;
    }

    /**
     *
     * @param {any} data
     * @param {number} size
     */
    static createFromData(data, size) {
        var chunks = this.chunkSubstr(JSON.stringify(data), size);
        var dataPackets = [];
        for (let i = 0; i < chunks.length; i++) dataPackets[i] = new DataPacket(size, chunks[i]);
        return dataPackets;
    }
}

export const FlagPacketFlags = {
    STARTDATA: 0,
    ENDDATA: 1,
};

export class FlagPacket extends MultiplayerPacket {
    constructor(flag) {
        super(MultiplayerPacketTypes.FLAG);

        /** @type {number} */
        this.flag = flag;
    }
}

export const SignalPacketSignals = {
    entityManuallyPlaced: 0,
    entityAdded: 1,
    entityGotNewComponent: 2,
    entityComponentChanged: 3,
    entityComponentRemoved: 4,
    entityQueuedForDestroy: 5,
    entityDestroyed: 6,

    storyGoalCompleted: 7,
    upgradePurchased: 8,

    shapeDelivered: 9,
    itemProduced: 10,
};

export class SignalPacket extends MultiplayerPacket {
    /**
     * Constructor of SignalPacket
     * @param {number} signal
     * @param {Array<BasicSerializableObject>} args
     */
    constructor(signal, args) {
        super(MultiplayerPacketTypes.SIGNAL);

        /** @type {number} */
        this.signal = signal;

        /** @type {Array<SerializedObject>} */
        this.args = MultiplayerPacket.serialize(args);
    }
}