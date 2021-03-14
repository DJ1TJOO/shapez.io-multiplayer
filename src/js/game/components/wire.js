/* typehints:start */
import { wireVariants } from "../buildings/variants/wire";
/* typehints:end */

import { Component } from "../component";

/** @enum {string} */
export const enumWireType = {
    forward: "forward",
    turn: "turn",
    split: "split",
    cross: "cross",
};

export class WireComponent extends Component {
    static getId() {
        return "Wire";
    }

    /**
     * @param {object} param0
     * @param {enumWireType=} param0.type
     * @param {wireVariants=} param0.variant
     */
    // @ts-ignore
    constructor({ type = enumWireType.forward, variant = "first" /*MetaWireBuilding.wireVariants.first*/ }) {
        super();
        this.type = type;

        /**
         * The variant of the wire, different variants do not connect
         * @type {wireVariants}
         */
        this.variant = variant;

        /**
         * @type {import("../systems/wire").WireNetwork}
         */
        this.linkedNetwork = null;
    }
}
