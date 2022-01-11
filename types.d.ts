declare module "core/signal" {
    export const STOP_PROPAGATION: "stop_propagation";
    export class Signal {
        receivers: any[];
        modifyCount: number;
        /**
         * Adds a new signal listener
         * @param {function} receiver
         * @param {object} scope
         */
        add(receiver: Function, scope?: object): void;
        /**
         * Adds a new signal listener
         * @param {function} receiver
         * @param {object} scope
         */
        addToTop(receiver: Function, scope?: object): void;
        /**
         * Dispatches the signal
         * @param  {...any} payload
         */
        dispatch(...args: any[]): string;
        /**
         * Removes a receiver
         * @param {function} receiver
         */
        remove(receiver: Function): void;
        /**
         * Removes all receivers
         */
        removeAll(): void;
    }
}
declare function tick(): void;
declare const bgFps: 30;
declare const desiredMsDelay: number;
declare let lastTick: number;
declare module "core/config.local" {
    var _default: {};
    export default _default;
}
declare module "core/config" {
    export const IS_DEBUG: boolean;
    export const SUPPORT_TOUCH: false;
    export const IS_MAC: boolean;
    export namespace THIRDPARTY_URLS {
        export const discord: string;
        export const github: string;
        export const reddit: string;
        export const shapeViewer: string;
        export const privacyPolicy: string;
        export const standaloneStorePage: string;
        export const stanaloneCampaignLink: string;
        export const puzzleDlcStorePage: string;
        export const levelTutorialVideos: {
            21: string;
            25: string;
            26: string;
        };
    }
    export const A_B_TESTING_LINK_TYPE: "steam_2_npr";
    export namespace globalConfig {
        export const minerSpeedItemsPerSecond: number;
        export const mapChunkWorldSize: number;
        export const mapChunkOverviewMinZoom: number;
        export const warmupTimeSecondsFast: number;
        export const warmupTimeSecondsRegular: number;
    }
    export const IS_MOBILE: boolean;
}
declare module "core/logging" {
    export function createLogger(context: any): Logger;
    /**
     * Serializes an error
     * @param {Error|ErrorEvent} err
     */
    export function serializeError(err: Error | ErrorEvent): {
        type: any;
    };
    /**
     * Stringifies an object containing circular references and errors
     * @param {any} payload
     */
    export function stringifyObjectContainingErrors(payload: any): any;
    export function globalDebug(context: any, ...args: any[]): void;
    export function globalLog(context: any, ...args: any[]): void;
    export function globalWarn(context: any, ...args: any[]): void;
    export function globalError(context: any, ...args: any[]): void;
    export function logSection(name: any, color: any): void;
    /**
     * Base logger class
     */
    class Logger {
        constructor(context: any);
        context: any;
        debug(...args: any[]): void;
        log(...args: any[]): void;
        warn(...args: any[]): void;
        error(...args: any[]): void;
    }
    export {};
}
declare module "core/animation_frame" {
    export class AnimationFrame {
        frameEmitted: Signal;
        bgFrameEmitted: Signal;
        lastTime: number;
        bgLastTime: number;
        boundMethod: any;
        backgroundWorker: any;
        handleBackgroundTick(): void;
        start(): void;
        handleAnimationFrame(time: any): void;
    }
    import { Signal } from "core/signal";
}
declare module "languages" {
    /**
     * @type {Object<string, {name: string, data: any, code: string, region: string}>}
     */
    export const LANGUAGES: {
        [x: string]: {
            name: string;
            data: any;
            code: string;
            region: string;
        };
    };
}
declare module "translations" {
    export function applyLanguage(languageCode: any): boolean;
    /**
     * Tries to auto-detect a language
     * @returns {string}
     */
    export function autoDetectLanguageId(): string;
    /**
     * Updates application language
     * @param {import('./application').Application} app
     * @param {string} id
     */
    export function updateApplicationLanguage(app: import("application").Application, id: string): void;
    export let T: any;
}
declare module "core/utils" {
    /**
     * Returns if this platform is android
     * @returns {boolean}
     */
    export function isAndroid(): boolean;
    /**
     * Returns if this platform is iOs
     * @returns {boolean}
     */
    export function isIos(): boolean;
    /**
     * Returns a platform name
     * @returns {"android" | "browser" | "ios" | "standalone" | "unknown"}
     */
    export function getPlatformName(): "android" | "browser" | "ios" | "standalone" | "unknown";
    export function getIPCRenderer(): any;
    /**
     * Makes a new 2D array with undefined contents
     * @param {number} w
     * @param {number} h
     * @returns {Array<Array<any>>}
     */
    export function make2DUndefinedArray(w: number, h: number): Array<Array<any>>;
    /**
     * Creates a new map (an empty object without any props)
     */
    export function newEmptyMap(): any;
    /**
     * Returns a random integer in the range [start,end]
     * @param {number} start
     * @param {number} end
     */
    export function randomInt(start: number, end: number): number;
    /**
     * Access an object in a very annoying way, used for obsfuscation.
     * @param {any} obj
     * @param {Array<string>} keys
     */
    export function accessNestedPropertyReverse(obj: any, keys: Array<string>): any;
    /**
     * Chooses a random entry of an array
     * @template T
     * @param {T[]} arr
     * @returns {T}
     */
    export function randomChoice<T>(arr: T[]): T;
    /**
     * Deletes from an array by swapping with the last element
     * @param {Array<any>} array
     * @param {number} index
     */
    export function fastArrayDelete(array: Array<any>, index: number): void;
    /**
     * Deletes from an array by swapping with the last element. Searches
     * for the value in the array first
     * @param {Array<any>} array
     * @param {any} value
     */
    export function fastArrayDeleteValue(array: Array<any>, value: any): any;
    /**
     * @see fastArrayDeleteValue
     * @param {Array<any>} array
     * @param {any} value
     */
    export function fastArrayDeleteValueIfContained(array: Array<any>, value: any): any;
    /**
     * Deletes from an array at the given index
     * @param {Array<any>} array
     * @param {number} index
     */
    export function arrayDelete(array: Array<any>, index: number): void;
    /**
     * Deletes the given value from an array
     * @param {Array<any>} array
     * @param {any} value
     */
    export function arrayDeleteValue(array: Array<any>, value: any): any;
    /**
     * Compare two floats for epsilon equality
     * @param {number} a
     * @param {number} b
     * @returns {boolean}
     */
    export function epsilonCompare(a: number, b: number, epsilon?: number): boolean;
    /**
     * Interpolates two numbers
     * @param {number} a
     * @param {number} b
     * @param {number} x Mix factor, 0 means 100% a, 1 means 100%b, rest is interpolated
     */
    export function lerp(a: number, b: number, x: number): number;
    /**
     * Finds a value which is nice to display, e.g. 15669 -> 15000. Also handles fractional stuff
     * @param {number} num
     */
    export function findNiceValue(num: number): number;
    /**
     * Finds a nice integer value
     * @see findNiceValue
     * @param {number} num
     */
    export function findNiceIntegerValue(num: number): number;
    /**
     * Formats a big number
     * @param {number} num
     * @param {string=} separator The decimal separator for numbers like 50.1 (separator='.')
     * @returns {string}
     */
    export function formatBigNumber(num: number, separator?: string | undefined): string;
    /**
     * Formats a big number, but does not add any suffix and instead uses its full representation
     * @param {number} num
     * @param {string=} divider The divider for numbers like 50,000 (divider=',')
     * @returns {string}
     */
    export function formatBigNumberFull(num: number, divider?: string | undefined): string;
    /**
     * Waits two frames so the ui is updated
     * @returns {Promise<void>}
     */
    export function waitNextFrame(): Promise<void>;
    /**
     * Rounds 1 digit
     * @param {number} n
     * @returns {number}
     */
    export function round1Digit(n: number): number;
    /**
     * Rounds 2 digits
     * @param {number} n
     * @returns {number}
     */
    export function round2Digits(n: number): number;
    /**
     * Rounds 3 digits
     * @param {number} n
     * @returns {number}
     */
    export function round3Digits(n: number): number;
    /**
     * Rounds 4 digits
     * @param {number} n
     * @returns {number}
     */
    export function round4Digits(n: number): number;
    /**
     * Clamps a value between [min, max]
     * @param {number} v
     * @param {number=} minimum Default 0
     * @param {number=} maximum Default 1
     */
    export function clamp(v: number, minimum?: number | undefined, maximum?: number | undefined): number;
    /**
     * Helper method to create a new div
     * @param {Element} parent
     * @param {string=} id
     * @param {Array<string>=} classes
     * @param {string=} innerHTML
     */
    export function makeDiv(parent: Element, id?: string | undefined, classes?: Array<string> | undefined, innerHTML?: string | undefined): HTMLDivElement;
    /**
     * Helper method to create a new button element
     * @param {Array<string>=} classes
     * @param {string=} innerHTML
     */
    export function makeButtonElement(classes?: Array<string> | undefined, innerHTML?: string | undefined): HTMLButtonElement;
    /**
     * Helper method to create a new button
     * @param {Element} parent
     * @param {Array<string>=} classes
     * @param {string=} innerHTML
     */
    export function makeButton(parent: Element, classes?: Array<string> | undefined, innerHTML?: string | undefined): HTMLButtonElement;
    /**
     * Removes all children of the given element
     * @param {Element} elem
     */
    export function removeAllChildren(elem: Element): void;
    /**
     * Returns if the game supports this browser
     */
    export function isSupportedBrowser(): boolean;
    /**
     * Formats an amount of seconds into something like "5s ago"
     * @param {number} secs Seconds
     * @returns {string}
     */
    export function formatSecondsToTimeAgo(secs: number): string;
    /**
     * Formats seconds into a readable string like "5h 23m"
     * @param {number} secs Seconds
     * @returns {string}
     */
    export function formatSeconds(secs: number): string;
    /**
     * Formats a number like 2.51 to "2.5"
     * @param {number} speed
     * @param {string=} separator The decimal separator for numbers like 50.1 (separator='.')
     */
    export function round1DigitLocalized(speed: number, separator?: string | undefined): string;
    /**
     * Formats a number like 2.51 to "2.51 items / s"
     * @param {number} speed
     * @param {boolean=} double
     * @param {string=} separator The decimal separator for numbers like 50.1 (separator='.')
     */
    export function formatItemsPerSecond(speed: number, double?: boolean | undefined, separator?: string | undefined): string;
    /**
     * Rotates a flat 3x3 matrix clockwise
     * Entries:
     * 0 lo
     * 1 mo
     * 2 ro
     * 3 lm
     * 4 mm
     * 5 rm
     * 6 lu
     * 7 mu
     * 8 ru
     * @param {Array<number>} flatMatrix
     */
    export function rotateFlatMatrix3x3(flatMatrix: Array<number>): number[];
    /**
     * Generates rotated variants of the matrix
     * @param {Array<number>} originalMatrix
     * @returns {Object<number, Array<number>>}
     */
    export function generateMatrixRotations(originalMatrix: Array<number>): {
        [x: number]: Array<number>;
    };
    /**
     *
     * @typedef {{
     *   top: any,
     *   right: any,
     *   bottom: any,
     *   left: any
     * }} DirectionalObject
     */
    /**
     * Rotates a directional object
     * @param {DirectionalObject} obj
     * @returns {DirectionalObject}
     */
    export function rotateDirectionalObject(obj: DirectionalObject, rotation: any): DirectionalObject;
    /**
     * Modulo which works for negative numbers
     * @param {number} n
     * @param {number} m
     */
    export function safeModulo(n: number, m: number): number;
    /**
     * Returns a smooth pulse between 0 and 1
     * @param {number} time time in seconds
     * @returns {number}
     */
    export function smoothPulse(time: number): number;
    /**
     * Fills in a <link> tag
     * @param {string} translation
     * @param {string} link
     */
    export function fillInLinkIntoTranslation(translation: string, link: string): string;
    /**
     * Generates a file download
     * @param {string} filename
     * @param {string} text
     */
    export function generateFileDownload(filename: string, text: string): void;
    /**
     * Starts a file chooser
     * @param {string} acceptedType
     */
    export function startFileChoose(acceptedType?: string): any;
    /**
     *
     * @param {number} number
     * @returns {string}
     */
    export function getRomanNumber(number: number): string;
    export type DirectionalObject = {
        top: any;
        right: any;
        bottom: any;
        left: any;
    };
}
declare module "core/buffer_utils" {
    /**
     * Enables images smoothing on a context
     * @param {CanvasRenderingContext2D} context
     */
    export function enableImageSmoothing(context: CanvasRenderingContext2D): void;
    /**
     * Disables image smoothing on a context
     * @param {CanvasRenderingContext2D} context
     */
    export function disableImageSmoothing(context: CanvasRenderingContext2D): void;
    /**
     *
     * @param {HTMLCanvasElement} canvas
     */
    export function getBufferVramUsageBytes(canvas: HTMLCanvasElement): number;
    /**
     * Returns stats on the allocated buffers
     */
    export function getBufferStats(): {
        backlogKeys: any;
        backlogSize: number;
        vramUsage: number;
        backlogVramUsage: number;
        bufferCount: number;
        numReused: number;
        numCreated: number;
    };
    /**
     * Clears the backlog buffers if they grew too much
     */
    export function clearBufferBacklog(): void;
    /**
     * Creates a new offscreen buffer
     * @param {Number} w
     * @param {Number} h
     * @returns {[HTMLCanvasElement, CanvasRenderingContext2D]}
     */
    export function makeOffscreenBuffer(w: number, h: number, { smooth, reusable, label }: {
        smooth?: boolean;
        reusable?: boolean;
        label?: string;
    }): [HTMLCanvasElement, CanvasRenderingContext2D];
    /**
     * Frees a canvas
     * @param {HTMLCanvasElement} canvas
     */
    export function registerCanvas(canvas: HTMLCanvasElement, context: any): void;
    /**
     * Frees a canvas
     * @param {HTMLCanvasElement} canvas
     */
    export function freeCanvas(canvas: HTMLCanvasElement): void;
    export type CanvasCacheEntry = {
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
    };
}
declare module "core/rng" {
    export class RandomNumberGenerator {
        /**
         *
         * @param {number|string=} seed
         */
        constructor(seed?: (number | string) | undefined);
        internalRng: {
            (): number;
            exportState(): number[];
            importState(i: any): void;
        };
        /**
         * Re-seeds the generator
         * @param {number|string} seed
         */
        reseed(seed: number | string): void;
        /**
         * @returns {number} between 0 and 1
         */
        next(): number;
        /**
         * Random choice of an array
         * @param {array} array
         */
        choice(array: any[]): any;
        /**
         * @param {number} min
         * @param {number} max
         * @returns {number} Integer in range [min, max[
         */
        nextIntRange(min: number, max: number): number;
        /**
         * @param {number} min
         * @param {number} max
         * @returns {number} Number in range [min, max[
         */
        nextRange(min: number, max: number): number;
        /**
         * Updates the seed
         * @param {number} seed
         */
        setSeed(seed: number): void;
    }
}
declare module "core/vector" {
    /**
     * Interpolates two vectors, for a = 0, returns v1 and for a = 1 return v2, otherwise interpolate
     * @param {Vector} v1
     * @param {Vector} v2
     * @param {number} a
     */
    export function mixVector(v1: Vector, v2: Vector, a: number): Vector;
    export type enumDirection = string;
    export namespace enumDirection {
        export const top: string;
        export const right: string;
        export const bottom: string;
        export const left: string;
    }
    export type enumInvertedDirections = string;
    /**
     * @enum {string}
     */
    export const enumInvertedDirections: {
        [x: string]: string;
    };
    export type enumDirectionToAngle = number;
    /**
     * @enum {number}
     */
    export const enumDirectionToAngle: {
        [x: string]: number;
    };
    export type enumAngleToDirection = string;
    /**
     * @enum {enumDirection}
     */
    export const enumAngleToDirection: {
        0: string;
        90: string;
        180: string;
        270: string;
    };
    /** @type {Array<enumDirection>} */
    export const arrayAllDirections: Array<enumDirection>;
    export class Vector {
        /**
         * Helper method to rotate a direction
         * @param {enumDirection} direction
         * @param {number} angle
         * @returns {enumDirection}
         */
        static transformDirectionFromMultipleOf90(direction: enumDirection, angle: number): enumDirection;
        /**
         *
         * @param {number} i
         * @returns {Vector}
         */
        static deserializeTileFromInt(i: number): Vector;
        /**
         * Deserializes a vector from a string
         * @param {string} s
         * @returns {Vector}
         */
        static deserializeTile(s: string): Vector;
        /**
         * Deserializes a vector from a serialized json object
         * @param {object} obj
         * @returns {Vector}
         */
        static fromSerializedObject(obj: object): Vector;
        /**
         *
         * @param {number=} x
         * @param {number=} y
         */
        constructor(x?: number | undefined, y?: number | undefined);
        x: any;
        y: any;
        /**
         * return a copy of the vector
         * @returns {Vector}
         */
        copy(): Vector;
        /**
         * Adds a vector and return a new vector
         * @param {Vector} other
         * @returns {Vector}
         */
        add(other: Vector): Vector;
        /**
         * Adds a vector
         * @param {Vector} other
         * @returns {Vector}
         */
        addInplace(other: Vector): Vector;
        /**
         * Substracts a vector and return a new vector
         * @param {Vector} other
         * @returns {Vector}
         */
        sub(other: Vector): Vector;
        /**
         * Subs a vector
         * @param {Vector} other
         * @returns {Vector}
         */
        subInplace(other: Vector): Vector;
        /**
         * Multiplies with a vector and return a new vector
         * @param {Vector} other
         * @returns {Vector}
         */
        mul(other: Vector): Vector;
        /**
         * Adds two scalars and return a new vector
         * @param {number} x
         * @param {number} y
         * @returns {Vector}
         */
        addScalars(x: number, y: number): Vector;
        /**
         * Substracts a scalar and return a new vector
         * @param {number} f
         * @returns {Vector}
         */
        subScalar(f: number): Vector;
        /**
         * Substracts two scalars and return a new vector
         * @param {number} x
         * @param {number} y
         * @returns {Vector}
         */
        subScalars(x: number, y: number): Vector;
        /**
         * Returns the euclidian length
         * @returns {number}
         */
        length(): number;
        /**
         * Returns the square length
         * @returns {number}
         */
        lengthSquare(): number;
        /**
         * Divides both components by a scalar and return a new vector
         * @param {number} f
         * @returns {Vector}
         */
        divideScalar(f: number): Vector;
        /**
         * Divides both components by the given scalars and return a new vector
         * @param {number} a
         * @param {number} b
         * @returns {Vector}
         */
        divideScalars(a: number, b: number): Vector;
        /**
         * Divides both components by a scalar
         * @param {number} f
         * @returns {Vector}
         */
        divideScalarInplace(f: number): Vector;
        /**
         * Multiplies both components with a scalar and return a new vector
         * @param {number} f
         * @returns {Vector}
         */
        multiplyScalar(f: number): Vector;
        /**
         * Multiplies both components with two scalars and returns a new vector
         * @param {number} a
         * @param {number} b
         * @returns {Vector}
         */
        multiplyScalars(a: number, b: number): Vector;
        /**
         * For both components, compute the maximum of each component and the given scalar, and return a new vector.
         * For example:
         *   - new Vector(-1, 5).maxScalar(0) -> Vector(0, 5)
         * @param {number} f
         * @returns {Vector}
         */
        maxScalar(f: number): Vector;
        /**
         * Adds a scalar to both components and return a new vector
         * @param {number} f
         * @returns {Vector}
         */
        addScalar(f: number): Vector;
        /**
         * Computes the component wise minimum and return a new vector
         * @param {Vector} v
         * @returns {Vector}
         */
        min(v: Vector): Vector;
        /**
         * Computes the component wise maximum and return a new vector
         * @param {Vector} v
         * @returns {Vector}
         */
        max(v: Vector): Vector;
        /**
         * Computes the component wise absolute
         * @returns {Vector}
         */
        abs(): Vector;
        /**
         * Computes the scalar product
         * @param {Vector} v
         * @returns {number}
         */
        dot(v: Vector): number;
        /**
         * Computes the distance to a given vector
         * @param {Vector} v
         * @returns {number}
         */
        distance(v: Vector): number;
        /**
         * Computes the square distance to a given vectort
         * @param {Vector} v
         * @returns {number}
         */
        distanceSquare(v: Vector): number;
        /**
         * Returns x % f, y % f
         * @param {number} f
         * @returns {Vector} new vector
         */
        modScalar(f: number): Vector;
        /**
         * Computes and returns the center between both points
         * @param {Vector} v
         * @returns {Vector}
         */
        centerPoint(v: Vector): Vector;
        /**
         * Computes componentwise floor and returns a new vector
         * @returns {Vector}
         */
        floor(): Vector;
        /**
         * Computes componentwise ceil and returns a new vector
         * @returns {Vector}
         */
        ceil(): Vector;
        /**
         * Computes componentwise round and return a new vector
         * @returns {Vector}
         */
        round(): Vector;
        /**
         * Converts this vector from world to tile space and return a new vector
         * @returns {Vector}
         */
        toTileSpace(): Vector;
        /**
         * Converts this vector from world to street space and return a new vector
         * @returns {Vector}
         */
        toStreetSpace(): Vector;
        /**
         * Converts this vector to world space and return a new vector
         * @returns {Vector}
         */
        toWorldSpace(): Vector;
        /**
         * Converts this vector to world space and return a new vector
         * @returns {Vector}
         */
        toWorldSpaceCenterOfTile(): Vector;
        /**
         * Converts the top left tile position of this vector
         * @returns {Vector}
         */
        snapWorldToTile(): Vector;
        /**
         * Normalizes the vector, dividing by the length(), and return a new vector
         * @returns {Vector}
         */
        normalize(): Vector;
        /**
         * Normalizes the vector, dividing by the length(), and return a new vector
         * @returns {Vector}
         */
        normalizeIfGreaterOne(): Vector;
        /**
         * Returns the normalized vector to the other point
         * @param {Vector} v
         * @returns {Vector}
         */
        normalizedDirection(v: Vector): Vector;
        /**
         * Returns a perpendicular vector
         * @returns {Vector}
         */
        findPerpendicular(): Vector;
        /**
         * Returns the unnormalized direction to the other point
         * @param {Vector} v
         * @returns {Vector}
         */
        direction(v: Vector): Vector;
        /**
         * Returns a string representation of the vector
         * @returns {string}
         */
        toString(): string;
        /**
         * Compares both vectors for exact equality. Does not do an epsilon compare
         * @param {Vector} v
         * @returns {Boolean}
         */
        equals(v: Vector): boolean;
        /**
         * Rotates this vector
         * @param {number} angle
         * @returns {Vector} new vector
         */
        rotated(angle: number): Vector;
        /**
         * Rotates this vector
         * @param {number} angle
         * @returns {Vector} this vector
         */
        rotateInplaceFastMultipleOf90(angle: number): Vector;
        /**
         * Rotates this vector
         * @param {number} angle
         * @returns {Vector} new vector
         */
        rotateFastMultipleOf90(angle: number): Vector;
        /**
         * Compares both vectors for epsilon equality
         * @param {Vector} v
         * @returns {Boolean}
         */
        equalsEpsilon(v: Vector, epsilon?: number): boolean;
        /**
         * Returns the angle
         * @returns {number} 0 .. 2 PI
         */
        angle(): number;
        /**
         * Serializes the vector to a string
         * @returns {string}
         */
        serializeTile(): string;
        /**
         * Creates a simple representation of the vector
         */
        serializeSimple(): {
            x: any;
            y: any;
        };
        /**
         * @returns {number}
         */
        serializeTileToInt(): number;
    }
    /**
     * Mapping from string direction to actual vector
     */
    export type enumDirectionToVector = Vector;
    export namespace enumDirectionToVector {
        const top_1: Vector;
        export { top_1 as top };
        const right_1: Vector;
        export { right_1 as right };
        const bottom_1: Vector;
        export { bottom_1 as bottom };
        const left_1: Vector;
        export { left_1 as left };
    }
}
declare module "savegame/serialization_data_types" {
    /**
     *
     * @param {import("./serialization").Schema} schema
     */
    export function schemaToJsonSchema(schema: import("savegame/serialization").Schema): {
        type: string;
        additionalProperties: boolean;
        required: any[];
        properties: {};
    };
    export const globalJsonSchemaDefs: {};
    /**
     * Base serialization data type
     */
    export class BaseDataType {
        /**
         * Serializes a given raw value
         * @param {any} value
         */
        serialize(value: any): {};
        /**
         * Verifies a given serialized value
         * @param {any} value
         * @returns {string|void} String error code or null on success
         */
        verifySerializedValue(value: any): string | void;
        /**
         * Deserializes a serialized value into the target object under the given key
         * @param {any} value
         * @param {GameRoot} root
         * @param {object} targetObject
         * @param {string|number} targetKey
         * @returns {string|void} String error code or null on success
         */
        deserialize(value: any, targetObject: object, targetKey: string | number, root: GameRoot): string | void;
        /**
         * Returns the json schema
         */
        getAsJsonSchema(): {
            $ref: string;
        };
        /**
         * INTERNAL Should return the json schema representation
         */
        getAsJsonSchemaUncached(): void;
        /**
         * Returns whether null values are okay
         * @returns {boolean}
         */
        allowNull(): boolean;
        /**
         * Deserializes a serialized value, but performs integrity checks before
         * @param {any} value
         * @param {GameRoot} root
         * @param {object} targetObject
         * @param {string|number} targetKey
         * @returns {string|void} String error code or null on success
         */
        deserializeWithVerify(value: any, targetObject: object, targetKey: string | number, root: GameRoot): string | void;
        /**
         * Should return a cacheable key
         */
        getCacheKey(): string;
    }
    export class TypeInteger extends BaseDataType {
    }
    export class TypePositiveInteger extends BaseDataType {
    }
    export class TypeBoolean extends BaseDataType {
    }
    export class TypeString extends BaseDataType {
    }
    export class TypeVector extends BaseDataType {
    }
    export class TypeTileVector extends BaseDataType {
    }
    export class TypeNumber extends BaseDataType {
    }
    export class TypePositiveNumber extends BaseDataType {
    }
    export class TypeEnum extends BaseDataType {
        /**
         * @param {Object.<string, any>} enumeration
         */
        constructor(enumeration?: {
            [x: string]: any;
        });
        availableValues: any;
    }
    export class TypeEntity extends BaseDataType {
    }
    export class TypeEntityWeakref extends BaseDataType {
    }
    export class TypeClass extends BaseDataType {
        /**
         *
         * @param {FactoryTemplate<*>} registry
         * @param {(GameRoot, object) => object} customResolver
         */
        constructor(registry: any, customResolver?: (GameRoot: any, object: any) => object);
        registry: any;
        customResolver: (GameRoot: any, object: any) => object;
    }
    export class TypeClassData extends BaseDataType {
        /**
         *
         * @param {FactoryTemplate<*>} registry
         */
        constructor(registry: any);
        registry: any;
    }
    export class TypeClassFromMetaclass extends BaseDataType {
        /**
         *
         * @param {typeof BasicSerializableObject} classHandle
         * @param {SingletonFactoryTemplate<*>} registry
         */
        constructor(classHandle: typeof BasicSerializableObject, registry: any);
        registry: any;
        classHandle: typeof BasicSerializableObject;
    }
    export class TypeMetaClass extends BaseDataType {
        /**
         *
         * @param {SingletonFactoryTemplate<*>} registry
         */
        constructor(registry: any);
        registry: any;
    }
    export class TypeArray extends BaseDataType {
        /**
         * @param {BaseDataType} innerType
         */
        constructor(innerType: BaseDataType, fixedSize?: boolean);
        fixedSize: boolean;
        innerType: BaseDataType;
    }
    export class TypeFixedClass extends BaseDataType {
        /**
         *
         * @param {typeof BasicSerializableObject} baseclass
         */
        constructor(baseclass: typeof BasicSerializableObject);
        baseclass: typeof BasicSerializableObject;
    }
    export class TypeKeyValueMap extends BaseDataType {
        /**
         * @param {BaseDataType} valueType
         * @param {boolean=} includeEmptyValues
         */
        constructor(valueType: BaseDataType, includeEmptyValues?: boolean | undefined);
        valueType: BaseDataType;
        includeEmptyValues: boolean;
    }
    export class TypeClassId extends BaseDataType {
        /**
         * @param {FactoryTemplate<*>|SingletonFactoryTemplate<*>} registry
         */
        constructor(registry: any | any);
        registry: any;
    }
    export class TypePair extends BaseDataType {
        /**
         * @param {BaseDataType} type1
         * @param {BaseDataType} type2
         */
        constructor(type1: BaseDataType, type2: BaseDataType);
        type1: BaseDataType;
        type2: BaseDataType;
    }
    export class TypeNullable extends BaseDataType {
        /**
         * @param {BaseDataType} wrapped
         */
        constructor(wrapped: BaseDataType);
        wrapped: BaseDataType;
    }
    export class TypeStructuredObject extends BaseDataType {
        /**
         * @param {Object.<string, BaseDataType>} descriptor
         */
        constructor(descriptor: {
            [x: string]: BaseDataType;
        });
        descriptor: {
            [x: string]: BaseDataType;
        };
    }
    import { GameRoot } from "game/root";
    import { BasicSerializableObject } from "savegame/serialization";
}
declare module "core/explained_result" {
    export class ExplainedResult {
        static good(): ExplainedResult;
        static bad(reason: any, additionalProps: any): ExplainedResult;
        static requireAll(...args: any[]): any;
        constructor(result?: boolean, reason?: any, additionalProps?: {});
        /** @type {boolean} */
        result: boolean;
        /** @type {string} */
        reason: string;
        isGood(): boolean;
        isBad(): boolean;
    }
}
declare module "core/singleton_factory" {
    export class SingletonFactory {
        constructor(id: any);
        id: any;
        entries: any[];
        idToEntry: {};
        getId(): any;
        register(classHandle: any): void;
        /**
         * Checks if a given id is registered
         * @param {string} id
         * @returns {boolean}
         */
        hasId(id: string): boolean;
        /**
         * Finds an instance by a given id
         * @param {string} id
         * @returns {object}
         */
        findById(id: string): object;
        /**
         * Finds an instance by its constructor (The class handle)
         * @param {object} classHandle
         * @returns {object}
         */
        findByClass(classHandle: object): object;
        /**
         * Returns all entries
         * @returns {Array<object>}
         */
        getEntries(): Array<object>;
        /**
         * Returns all registered ids
         * @returns {Array<string>}
         */
        getAllIds(): Array<string>;
        /**
         * Returns amount of stored entries
         * @returns {number}
         */
        getNumEntries(): number;
    }
}
declare module "core/factory" {
    export class Factory {
        constructor(id: any);
        id: any;
        entries: any[];
        entryIds: any[];
        idToEntry: {};
        getId(): any;
        register(entry: any): void;
        /**
         * Checks if a given id is registered
         * @param {string} id
         * @returns {boolean}
         */
        hasId(id: string): boolean;
        /**
         * Finds an instance by a given id
         * @param {string} id
         * @returns {object}
         */
        findById(id: string): object;
        /**
         * Returns all entries
         * @returns {Array<object>}
         */
        getEntries(): Array<object>;
        /**
         * Returns all registered ids
         * @returns {Array<string>}
         */
        getAllIds(): Array<string>;
        /**
         * Returns amount of stored entries
         * @returns {number}
         */
        getNumEntries(): number;
    }
}
declare module "game/time/base_game_speed" {
    export class BaseGameSpeed extends BasicSerializableObject {
        /** @returns {string} */
        static getId(): string;
        static getSchema(): {};
        /**
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        getId(): any;
        initializeAfterDeserialize(root: any): void;
        /**
         * Returns the time multiplier
         */
        getTimeMultiplier(): number;
        /**
         * Returns how many logic steps there may be queued
         */
        getMaxLogicStepsInQueue(): number;
        /** @returns {BaseGameSpeed} */
        newSpeed(instance: any): BaseGameSpeed;
    }
    import { BasicSerializableObject } from "savegame/serialization";
    import { GameRoot } from "game/root";
}
declare module "game/component" {
    export class Component extends BasicSerializableObject {
        /**
         * Returns the components unique id
         * @returns {string}
         */
        static getId(): string;
        /**
         * Should return the schema used for serialization
         */
        static getSchema(): {};
        /**
         * Fixes typeof DerivedComponent is not assignable to typeof Component, compiled out
         * in non-dev builds
         */
        constructor(...args: any[]);
        /**
         * Copy the current state to another component
         * @param {Component} otherComponent
         */
        copyAdditionalStateTo(otherComponent: Component): void;
        /**
         * Clears all items and state
         */
        clear(): void;
        /**
         * Returns a string representing the components data, only in dev builds
         * @returns {string}
         */
        getDebugString(): string;
    }
    /**
     * TypeScript does not support Abstract Static methods (https://github.com/microsoft/TypeScript/issues/34516)
     * One workaround is to declare the type of the component and reference that for static methods
     */
    export type StaticComponent = typeof Component;
    import { BasicSerializableObject } from "savegame/serialization";
}
declare module "game/base_item" {
    /** @type {ItemType[]} **/
    export const itemTypes: any[];
    /**
     * Class for items on belts etc. Not an entity for performance reasons
     */
    export class BaseItem extends BasicSerializableObject {
        static getId(): string;
        /** @returns {object} */
        static getSchema(): object;
        _type: any;
        /** @returns {ItemType} **/
        getItemType(): any;
        /**
         * Returns a string id of the item
         * @returns {string}
         */
        getAsCopyableKey(): string;
        /**
         * Returns if the item equals the other itme
         * @param {BaseItem} other
         * @returns {boolean}
         */
        equals(other: BaseItem): boolean;
        /**
         * Override for custom comparison
         * @abstract
         * @param {BaseItem} other
         * @returns {boolean}
         */
        equalsImpl(other: BaseItem): boolean;
        /**
         * Draws the item to a canvas
         * @param {CanvasRenderingContext2D} context
         * @param {number} size
         */
        drawFullSizeOnCanvas(context: CanvasRenderingContext2D, size: number): void;
        /**
         * Draws the item at the given position
         * @param {number} x
         * @param {number} y
         * @param {DrawParameters} parameters
         * @param {number=} diameter
         */
        drawItemCenteredClipped(x: number, y: number, parameters: DrawParameters, diameter?: number | undefined): void;
        /**
         * INTERNAL
         * @param {number} x
         * @param {number} y
         * @param {DrawParameters} parameters
         * @param {number=} diameter
         */
        drawItemCenteredImpl(x: number, y: number, parameters: DrawParameters, diameter?: number | undefined): void;
        getBackgroundColorAsResource(): string;
    }
    import { BasicSerializableObject } from "savegame/serialization";
    import { DrawParameters } from "core/draw_parameters";
}
declare module "core/rectangle" {
    export class Rectangle {
        /**
         * Creates a rectangle from top right bottom and left offsets
         * @param {number} top
         * @param {number} right
         * @param {number} bottom
         * @param {number} left
         */
        static fromTRBL(top: number, right: number, bottom: number, left: number): Rectangle;
        /**
         * Constructs a new square rectangle
         * @param {number} x
         * @param {number} y
         * @param {number} size
         */
        static fromSquare(x: number, y: number, size: number): Rectangle;
        /**
         *
         * @param {Vector} p1
         * @param {Vector} p2
         */
        static fromTwoPoints(p1: Vector, p2: Vector): Rectangle;
        /**
         *
         * @param {number} width
         * @param {number} height
         */
        static centered(width: number, height: number): Rectangle;
        /**
         * Returns if a intersects b
         * @param {Rectangle} a
         * @param {Rectangle} b
         */
        static intersects(a: Rectangle, b: Rectangle): boolean;
        constructor(x?: number, y?: number, w?: number, h?: number);
        x: number;
        y: number;
        w: number;
        h: number;
        /**
         * Copies this instance
         * @returns {Rectangle}
         */
        clone(): Rectangle;
        /**
         * Returns if this rectangle is empty
         * @returns {boolean}
         */
        isEmpty(): boolean;
        /**
         * Returns if this rectangle is equal to the other while taking an epsilon into account
         * @param {Rectangle} other
         * @param {number} [epsilon]
         */
        equalsEpsilon(other: Rectangle, epsilon?: number): boolean;
        /**
         * @returns {number}
         */
        left(): number;
        /**
         * @returns {number}
         */
        right(): number;
        /**
         * @returns {number}
         */
        top(): number;
        /**
         * @returns {number}
         */
        bottom(): number;
        /**
         * Returns Top, Right, Bottom, Left
         * @returns {[number, number, number, number]}
         */
        trbl(): [number, number, number, number];
        /**
         * Returns the center of the rect
         * @returns {Vector}
         */
        getCenter(): Vector;
        /**
         * Sets the right side of the rect without moving it
         * @param {number} right
         */
        setRight(right: number): void;
        /**
         * Sets the bottom side of the rect without moving it
         * @param {number} bottom
         */
        setBottom(bottom: number): void;
        /**
         * Sets the top side of the rect without scaling it
         * @param {number} top
         */
        setTop(top: number): void;
        /**
         * Sets the left side of the rect without scaling it
         * @param {number} left
         */
        setLeft(left: number): void;
        /**
         * Returns the top left point
         * @returns {Vector}
         */
        topLeft(): Vector;
        /**
         * Returns the bottom left point
         * @returns {Vector}
         */
        bottomRight(): Vector;
        /**
         * Moves the rectangle by the given parameters
         * @param {number} x
         * @param {number} y
         */
        moveBy(x: number, y: number): void;
        /**
         * Moves the rectangle by the given vector
         * @param {Vector} vec
         */
        moveByVector(vec: Vector): void;
        /**
         * Scales every parameter (w, h, x, y) by the given factor. Useful to transform from world to
         * tile space and vice versa
         * @param {number} factor
         */
        allScaled(factor: number): Rectangle;
        /**
         * Expands the rectangle in all directions
         * @param {number} amount
         * @returns {Rectangle} new rectangle
         */
        expandedInAllDirections(amount: number): Rectangle;
        /**
         * Returns if the given rectangle is contained
         * @param {Rectangle} rect
         * @returns {boolean}
         */
        containsRect(rect: Rectangle): boolean;
        /**
         * Returns if this rectangle contains the other rectangle specified by the parameters
         * @param {number} x
         * @param {number} y
         * @param {number} w
         * @param {number} h
         * @returns {boolean}
         */
        containsRect4Params(x: number, y: number, w: number, h: number): boolean;
        /**
         * Returns if the rectangle contains the given circle at (x, y) with the radius (radius)
         * @param {number} x
         * @param {number} y
         * @param {number} radius
         * @returns {boolean}
         */
        containsCircle(x: number, y: number, radius: number): boolean;
        /**
         * Returns if hte rectangle contains the given point
         * @param {number} x
         * @param {number} y
         * @returns {boolean}
         */
        containsPoint(x: number, y: number): boolean;
        /**
         * Returns the shared area with another rectangle, or null if there is no intersection
         * @param {Rectangle} rect
         * @returns {Rectangle|null}
         */
        getIntersection(rect: Rectangle): Rectangle | null;
        /**
         * Returns whether the rectangle fully intersects the given rectangle
         * @param {Rectangle} rect
         */
        intersectsFully(rect: Rectangle): boolean;
        /**
         * Returns the union of this rectangle with another
         * @param {Rectangle} rect
         */
        getUnion(rect: Rectangle): Rectangle;
        /**
         * Good for caching stuff
         */
        toCompareableString(): string;
        /**
         * Good for printing stuff
         */
        toString(): string;
        /**
         * Returns a new rectangle in tile space which includes all tiles which are visible in this rect
         * @returns {Rectangle}
         */
        toTileCullRectangle(): Rectangle;
    }
    import { Vector } from "core/vector";
}
declare module "platform/sound" {
    export namespace SOUNDS {
        export const uiClick: string;
        export const uiError: string;
        export const dialogError: string;
        export const dialogOk: string;
        export const swishHide: string;
        export const swishShow: string;
        export const badgeNotification: string;
        export const levelComplete: string;
        export const destroyBuilding: string;
        export const placeBuilding: string;
        export const placeBelt: string;
        export const copy: string;
    }
    export namespace MUSIC {
        export const theme: string;
        export const menu: string;
    }
    export class SoundInstanceInterface {
        constructor(key: any, url: any);
        key: any;
        url: any;
        /** @returns {Promise<void>} */
        load(): Promise<void>;
        play(volume: any): void;
        deinitialize(): void;
    }
    export class MusicInstanceInterface {
        constructor(key: any, url: any);
        key: any;
        url: any;
        stop(): void;
        play(volume: any): void;
        setVolume(volume: any): void;
        /** @returns {Promise<void>} */
        load(): Promise<void>;
        /** @returns {boolean} */
        isPlaying(): boolean;
        deinitialize(): void;
    }
    export class SoundInterface {
        constructor(app: any, soundClass: any, musicClass: any);
        /** @type {Application} */
        app: Application;
        soundClass: any;
        musicClass: any;
        /** @type {Object<string, SoundInstanceInterface>} */
        sounds: {
            [x: string]: SoundInstanceInterface;
        };
        /** @type {Object<string, MusicInstanceInterface>} */
        music: {
            [x: string]: MusicInstanceInterface;
        };
        /** @type {MusicInstanceInterface} */
        currentMusic: MusicInstanceInterface;
        pageIsVisible: boolean;
        musicVolume: number;
        soundVolume: number;
        /**
         * Initializes the sound
         * @returns {Promise<any>}
         */
        initialize(): Promise<any>;
        /**
         * Pre-Loads the given sounds
         * @param {string} key
         * @returns {Promise<void>}
         */
        loadSound(key: string): Promise<void>;
        /** Deinits the sound
         * @returns {Promise<void>}
         */
        deinitialize(): Promise<void>;
        /**
         * Returns the music volume
         * @returns {number}
         */
        getMusicVolume(): number;
        /**
         * Returns the sound volume
         * @returns {number}
         */
        getSoundVolume(): number;
        /**
         * Sets the music volume
         * @param {number} volume
         */
        setMusicVolume(volume: number): void;
        /**
         * Sets the sound volume
         * @param {number} volume
         */
        setSoundVolume(volume: number): void;
        /**
         * Focus change handler, called by the pap
         * @param {boolean} pageIsVisible
         */
        onPageRenderableStateChanged(pageIsVisible: boolean): void;
        /**
         * @param {string} key
         */
        playUiSound(key: string): void;
        /**
         *
         * @param {string} key
         * @param {Vector} worldPosition
         * @param {GameRoot} root
         */
        play3DSound(key: string, worldPosition: Vector, root: GameRoot): void;
        /**
         * @param {string} key
         */
        playThemeMusic(key: string): void;
    }
    import { Application } from "application";
    import { Vector } from "core/vector";
    import { GameRoot } from "game/root";
}
declare module "game/building_codes" {
    /**
     * Registers a new variant
     * @param {string} group
     * @param {number} code
     * @param {typeof MetaBuilding} meta
     * @param {string} variant
     * @param {number} rotationVariant
     */
    export function registerBuildingVariant(group: string, code: number, meta: typeof MetaBuilding, variant?: string, rotationVariant?: number): void;
    /**
     *
     * @param {string} code
     * @returns {BuildingVariantIdentifier}
     */
    export function getBuildingDataFromCode(code: string): BuildingVariantIdentifier;
    /**
     * Builds the cache for the codes
     */
    export function buildBuildingCodeCache(): void;
    /**
     * Add cache for a code
     * @param {string} code
     */
    export function addBuildingCodeCache(code: string): void;
    /**
     * Finds the code for a given variant
     * @param {MetaBuilding} metaBuilding
     * @param {string} variant
     * @param {number} rotationVariant
     * @returns {string}
     */
    export function getCodeFromBuildingData(metaBuilding: MetaBuilding, variant: string, rotationVariant: number): string;
    /**
     * @typedef {{
     *   metaClass: typeof MetaBuilding,
     *   metaInstance?: MetaBuilding,
     *   variant?: string,
     *   rotationVariant?: number,
     *   tileSize?: Vector,
     *   sprite?: AtlasSprite,
     *   blueprintSprite?: AtlasSprite,
     *   silhouetteColor?: string
     * }} BuildingVariantIdentifier
     */
    /**
     * Stores a lookup table for all building variants (for better performance)
     * @type {Object<number, BuildingVariantIdentifier>}
     */
    export const gBuildingVariants: {
        [x: number]: BuildingVariantIdentifier;
    };
    export type BuildingVariantIdentifier = {
        metaClass: typeof MetaBuilding;
        metaInstance?: MetaBuilding;
        variant?: string;
        rotationVariant?: number;
        tileSize?: Vector;
        sprite?: AtlasSprite;
        blueprintSprite?: AtlasSprite;
        silhouetteColor?: string;
    };
    import { MetaBuilding } from "game/meta_building";
    import { Vector } from "core/vector";
    import { AtlasSprite } from "core/sprites";
}
declare module "game/components/static_map_entity" {
    export class StaticMapEntityComponent extends Component {
        static getSchema(): {
            origin: import("savegame/serialization_data_types").TypeVector;
            rotation: import("savegame/serialization_data_types").TypeNumber;
            originalRotation: import("savegame/serialization_data_types").TypeNumber;
            code: import("savegame/serialization_data_types").TypeString;
        };
        /**
         *
         * @param {object} param0
         * @param {Vector=} param0.origin Origin (Top Left corner) of the entity
         * @param {Vector=} param0.tileSize Size of the entity in tiles
         * @param {number=} param0.rotation Rotation in degrees. Must be multiple of 90
         * @param {number=} param0.originalRotation Original Rotation in degrees. Must be multiple of 90
         * @param {string=} param0.code Building code
         */
        constructor({ origin, tileSize, rotation, originalRotation, code, }: {
            origin?: Vector | undefined;
            tileSize?: Vector | undefined;
            rotation?: number | undefined;
            originalRotation?: number | undefined;
            code?: string | undefined;
        });
        /**
         * Returns the effective tile size
         * @returns {Vector}
         */
        getTileSize(): Vector;
        /**
         * Returns the sprite
         * @returns {AtlasSprite}
         */
        getSprite(): AtlasSprite;
        /**
         * Returns the blueprint sprite
         * @returns {AtlasSprite}
         */
        getBlueprintSprite(): AtlasSprite;
        /**
         * Returns the silhouette color
         * @returns {string}
         */
        getSilhouetteColor(): string;
        /**
         * Returns the meta building
         * @returns {import("../meta_building").MetaBuilding}
         */
        getMetaBuilding(): import("../meta_building").MetaBuilding;
        /**
         * Returns the buildings variant
         * @returns {string}
         */
        getVariant(): string;
        /**
         * Returns the buildings rotation variant
         * @returns {number}
         */
        getRotationVariant(): number;
        origin: Vector;
        rotation: number;
        code: string;
        originalRotation: number;
        /**
         * Returns the effective rectangle of this entity in tile space
         * @returns {Rectangle}
         */
        getTileSpaceBounds(): Rectangle;
        /**
         * Transforms the given vector/rotation from local space to world space
         * @param {Vector} vector
         * @returns {Vector}
         */
        applyRotationToVector(vector: Vector): Vector;
        /**
         * Transforms the given vector/rotation from world space to local space
         * @param {Vector} vector
         * @returns {Vector}
         */
        unapplyRotationToVector(vector: Vector): Vector;
        /**
         * Transforms the given direction from local space
         * @param {enumDirection} direction
         * @returns {enumDirection}
         */
        localDirectionToWorld(direction: enumDirection): enumDirection;
        /**
         * Transforms the given direction from world to local space
         * @param {enumDirection} direction
         * @returns {enumDirection}
         */
        worldDirectionToLocal(direction: enumDirection): enumDirection;
        /**
         * Transforms from local tile space to global tile space
         * @param {Vector} localTile
         * @returns {Vector}
         */
        localTileToWorld(localTile: Vector): Vector;
        /**
         * Transforms from world space to local space
         * @param {Vector} worldTile
         */
        worldToLocalTile(worldTile: Vector): Vector;
        /**
         * Returns whether the entity should be drawn for the given parameters
         * @param {DrawParameters} parameters
         */
        shouldBeDrawn(parameters: DrawParameters): boolean;
        /**
         * Draws a sprite over the whole space of the entity
         * @param {DrawParameters} parameters
         * @param {AtlasSprite} sprite
         * @param {number=} extrudePixels How many pixels to extrude the sprite
         * @param {Vector=} overridePosition Whether to drwa the entity at a different location
         */
        drawSpriteOnBoundsClipped(parameters: DrawParameters, sprite: AtlasSprite, extrudePixels?: number | undefined, overridePosition?: Vector | undefined): void;
    }
    import { Component } from "game/component";
    import { Vector } from "core/vector";
    import { AtlasSprite } from "core/sprites";
    import { Rectangle } from "core/rectangle";
    import { enumDirection } from "core/vector";
    import { DrawParameters } from "core/draw_parameters";
}
declare module "game/items/boolean_item" {
    /**
     * Returns whether the item is Boolean and TRUE
     * @param {BaseItem} item
     * @returns {boolean}
     */
    export function isTrueItem(item: BaseItem): boolean;
    /**
     * Returns whether the item is truthy
     * @param {BaseItem} item
     * @returns {boolean}
     */
    export function isTruthyItem(item: BaseItem): boolean;
    export class BooleanItem extends BaseItem {
        static getSchema(): import("savegame/serialization_data_types").TypePositiveInteger;
        /**
         * @param {number} value
         */
        constructor(value: number);
        value: number;
    }
    export const BOOL_FALSE_SINGLETON: BooleanItem;
    export const BOOL_TRUE_SINGLETON: BooleanItem;
    import { BaseItem } from "game/base_item";
}
declare module "core/dpi_manager" {
    /**
     * Returns the current dpi
     * @returns {number}
     */
    export function getDeviceDPI(): number;
    /**
     *
     * @param {number} dpi
     * @returns {number} Smoothed dpi
     */
    export function smoothenDpi(dpi: number): number;
    /**
     * Prepares a context for hihg dpi rendering
     * @param {CanvasRenderingContext2D} context
     */
    export function prepareHighDPIContext(context: CanvasRenderingContext2D, smooth?: boolean): void;
    /**
     * Resizes a high dpi canvas
     * @param {HTMLCanvasElement} canvas
     * @param {number} w
     * @param {number} h
     */
    export function resizeHighDPICanvas(canvas: HTMLCanvasElement, w: number, h: number, smooth?: boolean): void;
    /**
     * Resizes a canvas
     * @param {HTMLCanvasElement} canvas
     * @param {number} w
     * @param {number} h
     */
    export function resizeCanvas(canvas: HTMLCanvasElement, w: number, h: number, setStyle?: boolean): void;
    /**
     * Resizes a canvas and makes sure its cleared
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     * @param {number} w
     * @param {number} h
     */
    export function resizeCanvasAndClear(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, w: number, h: number): void;
}
declare module "game/colors" {
    export type enumColors = string;
    export namespace enumColors {
        export const red: string;
        export const green: string;
        export const blue: string;
        export const yellow: string;
        export const purple: string;
        export const cyan: string;
        export const white: string;
        export const uncolored: string;
    }
    export type enumColorToShortcode = string;
    /** @enum {string} */
    export const enumColorToShortcode: {
        [x: string]: string;
    };
    export type enumShortcodeToColor = string;
    /** @enum {enumColors} */
    export const enumShortcodeToColor: {};
    export type enumColorsToHexCode = string;
    /** @enum {string} */
    export const enumColorsToHexCode: {
        [x: string]: string;
    };
    export type enumColorMixingResults = {
        [x: string]: string;
    };
    /** @enum {Object.<string, string>} */
    export const enumColorMixingResults: {
        [x: string]: {
            [x: string]: string;
        };
    };
}
declare module "game/theme" {
    export function applyGameTheme(id: any): void;
    export namespace THEMES {
        export const dark: any;
        export const light: any;
    }
    export let THEME: any;
}
declare module "game/shape_definition" {
    /**
     * Converts the given parameters to a valid shape definition
     * @param {*} layers
     * @returns {Array<import("./shape_definition").ShapeLayer>}
     */
    export function createSimpleShape(layers: any): Array<import("game/shape_definition").ShapeLayer>;
    export type enumSubShape = string;
    export namespace enumSubShape {
        export const rect: string;
        export const circle: string;
        export const star: string;
        export const windmill: string;
    }
    export type enumSubShapeToShortcode = string;
    /** @enum {string} */
    export const enumSubShapeToShortcode: {
        [x: string]: string;
    };
    export type enumShortcodeToSubShape = string;
    /** @enum {enumSubShape} */
    export const enumShortcodeToSubShape: {};
    export class ShapeDefinition extends BasicSerializableObject {
        static getId(): string;
        static getSchema(): {};
        /**
         * Generates the definition from the given short key
         * @param {string} key
         * @returns {ShapeDefinition}
         */
        static fromShortKey(key: string): ShapeDefinition;
        /**
         * Checks if a given string is a valid short key
         * @param {string} key
         * @returns {boolean}
         */
        static isValidShortKey(key: string): boolean;
        /**
         * INTERNAL
         * Checks if a given string is a valid short key
         * @param {string} key
         * @returns {boolean}
         */
        static isValidShortKeyInternal(key: string): boolean;
        /**
         *
         * @param {object} param0
         * @param {Array<ShapeLayer>=} param0.layers
         */
        constructor({ layers }: {
            layers?: Array<ShapeLayer> | undefined;
        });
        layers: any;
        /** @type {string} */
        cachedHash: string;
        bufferGenerator: any;
        /**
         * Internal method to clone the shape definition
         * @returns {Array<ShapeLayer>}
         */
        internalCloneLayers(): Array<ShapeLayer>;
        /**
         * Returns if the definition is entirely empty^
         * @returns {boolean}
         */
        isEntirelyEmpty(): boolean;
        /**
         * Returns a unique id for this shape
         * @returns {string}
         */
        getHash(): string;
        /**
         * Draws the shape definition
         * @param {number} x
         * @param {number} y
         * @param {DrawParameters} parameters
         * @param {number=} diameter
         */
        drawCentered(x: number, y: number, parameters: DrawParameters, diameter?: number | undefined): void;
        /**
         * Draws the item to a canvas
         * @param {CanvasRenderingContext2D} context
         * @param {number} size
         */
        drawFullSizeOnCanvas(context: CanvasRenderingContext2D, size: number): void;
        /**
         * Generates this shape as a canvas
         * @param {number} size
         */
        generateAsCanvas(size?: number): HTMLCanvasElement;
        /**
         *
         * @param {HTMLCanvasElement} canvas
         * @param {CanvasRenderingContext2D} context
         * @param {number} w
         * @param {number} h
         * @param {number} dpi
         */
        internalGenerateShapeBuffer(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, w: number, h: number, dpi: number): void;
        /**
         * Returns a definition with only the given quadrants
         * @param {Array<number>} includeQuadrants
         * @returns {ShapeDefinition}
         */
        cloneFilteredByQuadrants(includeQuadrants: Array<number>): ShapeDefinition;
        /**
         * Returns a definition which was rotated clockwise
         * @returns {ShapeDefinition}
         */
        cloneRotateCW(): ShapeDefinition;
        /**
         * Returns a definition which was rotated counter clockwise
         * @returns {ShapeDefinition}
         */
        cloneRotateCCW(): ShapeDefinition;
        /**
         * Returns a definition which was rotated 180 degrees
         * @returns {ShapeDefinition}
         */
        cloneRotate180(): ShapeDefinition;
        /**
         * Stacks the given shape definition on top.
         * @param {ShapeDefinition} definition
         */
        cloneAndStackWith(definition: ShapeDefinition): ShapeDefinition;
        /**
         * Clones the shape and colors everything in the given color
         * @param {enumColors} color
         */
        cloneAndPaintWith(color: enumColors): ShapeDefinition;
        /**
         * Clones the shape and colors everything in the given colors
         * @param {[enumColors, enumColors, enumColors, enumColors]} colors
         */
        cloneAndPaintWith4Colors(colors: [enumColors, enumColors, enumColors, enumColors]): ShapeDefinition;
    }
    export type ShapeLayerItem = {
        subShape: enumSubShape;
        color: enumColors;
    };
    /**
     * Order is Q1 (tr), Q2(br), Q3(bl), Q4(tl)
     */
    export type ShapeLayer = [{
        subShape: enumSubShape;
        color: enumColors;
    }, {
        subShape: enumSubShape;
        color: enumColors;
    }, {
        subShape: enumSubShape;
        color: enumColors;
    }, {
        subShape: enumSubShape;
        color: enumColors;
    }];
    import { BasicSerializableObject } from "savegame/serialization";
    import { DrawParameters } from "core/draw_parameters";
    import { enumColors } from "game/colors";
}
declare module "game/items/shape_item" {
    export class ShapeItem extends BaseItem {
        static getSchema(): import("savegame/serialization_data_types").TypeString;
        /**
         * @param {ShapeDefinition} definition
         */
        constructor(definition: ShapeDefinition);
        definition: ShapeDefinition;
    }
    import { BaseItem } from "game/base_item";
    import { ShapeDefinition } from "game/shape_definition";
}
declare module "game/items/color_item" {
    export class ColorItem extends BaseItem {
        static getSchema(): import("savegame/serialization_data_types").TypeEnum;
        /**
         * @param {enumColors} color
         */
        constructor(color: enumColors);
        color: string;
        cachedSprite: import("core/sprites").AtlasSprite;
    }
    /**
     * Singleton instances
     * @type {Object<enumColors, ColorItem>}
     */
    export const COLOR_ITEM_SINGLETONS: any;
    import { BaseItem } from "game/base_item";
    import { enumColors } from "game/colors";
}
declare module "game/item_resolver" {
    /**
     * Resolves items so we share instances
     * @param {import("../savegame/savegame_serializer").GameRoot} root
     * @param {{$: string, data: any }} data
     */
    export function itemResolverSingleton(root: import("savegame/savegame_serializer").GameRoot, data: {
        $: string;
        data: any;
    }): any;
    export const typeItemSingleton: import("savegame/serialization_data_types").TypeClass;
}
declare module "game/belt_path" {
    /**
     * Stores a path of belts, used for optimizing performance
     */
    export class BeltPath extends BasicSerializableObject {
        static getId(): string;
        static getSchema(): {
            entityPath: import("savegame/serialization_data_types").TypeArray;
            items: import("savegame/serialization_data_types").TypeArray;
            spacingToFirstItem: import("savegame/serialization_data_types").TypePositiveNumber;
        };
        /**
         * Creates a path from a serialized object
         * @param {GameRoot} root
         * @param {Object} data
         * @returns {BeltPath|string}
         */
        static fromSerialized(root: GameRoot, data: any): BeltPath | string;
        /**
         * @param {GameRoot} root
         * @param {Array<Entity>} entityPath
         */
        constructor(root: GameRoot, entityPath: Array<Entity>);
        root: GameRoot;
        entityPath: Entity[];
        /**
         * Stores the items sorted, and their distance to the previous item (or start)
         * Layout: [distanceToNext, item]
         * @type {Array<[number, BaseItem]>}
         */
        items: Array<[number, BaseItem]>;
        /**
         * Initializes the path by computing the properties which are not saved
         * @param {boolean} computeSpacing Whether to also compute the spacing
         */
        init(computeSpacing?: boolean): void;
        totalLength: number;
        spacingToFirstItem: any;
        /**
         * Current bounds of this path
         * @type {Rectangle}
         */
        worldBounds: Rectangle;
        /**
         * Clears all items
         */
        clearAllItems(): void;
        numCompressedItemsAfterFirstItem: any;
        /**
         * Returns whether this path can accept a new item
         * @returns {boolean}
         */
        canAcceptItem(): boolean;
        /**
         * Tries to accept the item
         * @param {BaseItem} item
         */
        tryAcceptItem(item: BaseItem): boolean;
        /**
         * SLOW / Tries to find the item closest to the given tile
         * @param {Vector} tile
         * @returns {BaseItem|null}
         */
        findItemAtTile(tile: Vector): BaseItem | null;
        /**
         * Computes the tile bounds of the path
         * @returns {Rectangle}
         */
        computeBounds(): Rectangle;
        /**
         * Recomputes cache variables once the path was changed
         */
        onPathChanged(): void;
        boundAcceptor: (BaseItem: any, number?: any) => boolean;
        /**
         * Called by the belt system when the surroundings changed
         */
        onSurroundingsChanged(): void;
        /**
         * Finds the entity which accepts our items
         * @param {boolean=} debug_Silent Whether debug output should be silent
         * @return { (BaseItem, number?) => boolean }
         */
        computeAcceptingEntityAndSlot(debug_Silent?: boolean | undefined): (BaseItem: any, number?: any) => boolean;
        /**
         * Computes a method to pass over the item to the entity
         * @param {Entity} entity
         * @param {number} matchingSlotIndex
         * @returns {(item: BaseItem, slotIndex: number) => boolean | void}
         */
        computePassOverFunctionWithoutBelts(entity: Entity, matchingSlotIndex: number): (item: BaseItem, slotIndex: number) => boolean | void;
        /**
         * Helper to throw an error on mismatch
         * @param {string} change
         * @param {Array<any>} reason
         */
        debug_failIntegrity(change: string, ...reason: Array<any>): void;
        /**
         * Checks if this path is valid
         */
        debug_checkIntegrity(currentChange?: string): void;
        /**
         * Extends the belt path by the given belt
         * @param {Entity} entity
         */
        extendOnEnd(entity: Entity): void;
        /**
         * Extends the path with the given entity on the beginning
         * @param {Entity} entity
         */
        extendOnBeginning(entity: Entity): void;
        /**
         * Returns if the given entity is the end entity of the path
         * @param {Entity} entity
         * @returns {boolean}
         */
        isEndEntity(entity: Entity): boolean;
        /**
         * Returns if the given entity is the start entity of the path
         * @param {Entity} entity
         * @returns {boolean}
         */
        isStartEntity(entity: Entity): boolean;
        /**
         * Splits this path at the given entity by removing it, and
         * returning the new secondary paht
         * @param {Entity} entity
         * @returns {BeltPath}
         */
        deleteEntityOnPathSplitIntoTwo(entity: Entity): BeltPath;
        /**
         * Deletes the last entity
         * @param {Entity} entity
         */
        deleteEntityOnEnd(entity: Entity): void;
        /**
         * Deletes the entity of the start of the path
         * @see deleteEntityOnEnd
         * @param {Entity} entity
         */
        deleteEntityOnStart(entity: Entity): void;
        /**
         * Extends the path by the given other path
         * @param {BeltPath} otherPath
         */
        extendByPath(otherPath: BeltPath): void;
        /**
         * Computes the total length of the path
         * @returns {number}
         */
        computeTotalLength(): number;
        /**
         * Performs one tick
         */
        update(): void;
        /**
         * Computes a world space position from the given progress
         * @param {number} progress
         * @returns {Vector}
         */
        computePositionFromProgress(progress: number): Vector;
        /**
         *
         * @param {DrawParameters} parameters
         */
        drawDebug(parameters: DrawParameters): void;
        /**
         * Checks if this belt path should render simplified
         */
        checkIsPotatoMode(): boolean;
        /**
         * Draws the path
         * @param {DrawParameters} parameters
         */
        draw(parameters: DrawParameters): void;
    }
    import { BasicSerializableObject } from "savegame/serialization";
    import { GameRoot } from "game/root";
    import { Entity } from "game/entity";
    import { BaseItem } from "game/base_item";
    import { Rectangle } from "core/rectangle";
    import { Vector } from "core/vector";
    import { DrawParameters } from "core/draw_parameters";
}
declare module "game/components/item_acceptor" {
    /** @typedef {{
     * pos: Vector,
     * directions: enumDirection[],
     * filter?: ItemType
     * }} ItemAcceptorSlot */
    /**
     * Contains information about a slot plus its location
     * @typedef {{
     *  slot: ItemAcceptorSlot,
     *  index: number,
     *  acceptedDirection: enumDirection
     * }} ItemAcceptorLocatedSlot */
    /** @typedef {{
     * pos: Vector,
     * directions: enumDirection[],
     * filter?: ItemType
     * }} ItemAcceptorSlotConfig */
    export class ItemAcceptorComponent extends Component {
        /**
         *
         * @param {object} param0
         * @param {Array<ItemAcceptorSlotConfig>} param0.slots The slots from which we accept items
         */
        constructor({ slots }: {
            slots: Array<ItemAcceptorSlotConfig>;
        });
        /**
         * Fixes belt animations
         * @type {Array<{
         *  item: BaseItem,
         * slotIndex: number,
         * animProgress: number,
         * direction: enumDirection
         * }>}
         */
        itemConsumptionAnimations: {
            item: BaseItem;
            slotIndex: number;
            animProgress: number;
            direction: enumDirection;
        }[];
        /**
         *
         * @param {Array<ItemAcceptorSlotConfig>} slots
         */
        setSlots(slots: Array<ItemAcceptorSlotConfig>): void;
        /** @type {Array<ItemAcceptorSlot>} */
        slots: Array<ItemAcceptorSlot>;
        /**
         * Returns if this acceptor can accept a new item at slot N
         *
         * NOTICE: The belt path ignores this for performance reasons and does his own check
         * @param {number} slotIndex
         * @param {BaseItem=} item
         */
        canAcceptItem(slotIndex: number, item?: BaseItem | undefined): boolean;
        /**
         * Called when an item has been accepted so that
         * @param {number} slotIndex
         * @param {enumDirection} direction
         * @param {BaseItem} item
         * @param {number} remainingProgress World space remaining progress, can be set to set the start position of the item
         */
        onItemAccepted(slotIndex: number, direction: enumDirection, item: BaseItem, remainingProgress?: number): void;
        /**
         * Tries to find a slot which accepts the current item
         * @param {Vector} targetLocalTile
         * @param {enumDirection} fromLocalDirection
         * @returns {ItemAcceptorLocatedSlot|null}
         */
        findMatchingSlot(targetLocalTile: Vector, fromLocalDirection: enumDirection): ItemAcceptorLocatedSlot | null;
    }
    export type ItemAcceptorSlot = {
        pos: Vector;
        directions: enumDirection[];
        filter?: any;
    };
    /**
     * Contains information about a slot plus its location
     */
    export type ItemAcceptorLocatedSlot = {
        slot: ItemAcceptorSlot;
        index: number;
        acceptedDirection: enumDirection;
    };
    export type ItemAcceptorSlotConfig = {
        pos: Vector;
        directions: enumDirection[];
        filter?: any;
    };
    import { Component } from "game/component";
    import { BaseItem } from "game/base_item";
    import { enumDirection } from "core/vector";
    import { Vector } from "core/vector";
}
declare module "game/components/item_ejector" {
    /**
     * @typedef {{
     *    pos: Vector,
     *    direction: enumDirection,
     *    item: BaseItem,
     *    lastItem: BaseItem,
     *    progress: number?,
     *    cachedDestSlot?: import("./item_acceptor").ItemAcceptorLocatedSlot,
     *    cachedBeltPath?: BeltPath,
     *    cachedTargetEntity?: Entity
     * }} ItemEjectorSlot
     */
    export class ItemEjectorComponent extends Component {
        static getSchema(): {
            slots: import("savegame/serialization_data_types").TypeArray;
        };
        /**
         *
         * @param {object} param0
         * @param {Array<{pos: Vector, direction: enumDirection }>=} param0.slots The slots to eject on
         * @param {boolean=} param0.renderFloatingItems Whether to render items even if they are not connected
         */
        constructor({ slots, renderFloatingItems }: {
            slots?: Array<{
                pos: Vector;
                direction: enumDirection;
            }> | undefined;
            renderFloatingItems?: boolean | undefined;
        });
        renderFloatingItems: boolean;
        /**
         * @param {Array<{pos: Vector, direction: enumDirection }>} slots The slots to eject on
         */
        setSlots(slots: Array<{
            pos: Vector;
            direction: enumDirection;
        }>): void;
        /** @type {Array<ItemEjectorSlot>} */
        slots: Array<ItemEjectorSlot>;
        /**
         * Returns where this slot ejects to
         * @param {ItemEjectorSlot} slot
         * @returns {Vector}
         */
        getSlotTargetLocalTile(slot: ItemEjectorSlot): Vector;
        /**
         * Returns whether any slot ejects to the given local tile
         * @param {Vector} tile
         */
        anySlotEjectsToLocalTile(tile: Vector): boolean;
        /**
         * Returns if we can eject on a given slot
         * @param {number} slotIndex
         * @returns {boolean}
         */
        canEjectOnSlot(slotIndex: number): boolean;
        /**
         * Returns the first free slot on this ejector or null if there is none
         * @returns {number?}
         */
        getFirstFreeSlot(): number | null;
        /**
         * Tries to eject a given item
         * @param {number} slotIndex
         * @param {BaseItem} item
         * @returns {boolean}
         */
        tryEject(slotIndex: number, item: BaseItem): boolean;
        /**
         * Clears the given slot and returns the item it had
         * @param {number} slotIndex
         * @returns {BaseItem|null}
         */
        takeSlotItem(slotIndex: number): BaseItem | null;
    }
    export type ItemEjectorSlot = {
        pos: Vector;
        direction: enumDirection;
        item: BaseItem;
        lastItem: BaseItem;
        progress: number | null;
        cachedDestSlot?: import("./item_acceptor").ItemAcceptorLocatedSlot;
        cachedBeltPath?: BeltPath;
        cachedTargetEntity?: Entity;
    };
    import { Component } from "game/component";
    import { Vector } from "core/vector";
    import { enumDirection } from "core/vector";
    import { BaseItem } from "game/base_item";
    import { BeltPath } from "game/belt_path";
    import { Entity } from "game/entity";
}
declare module "game/components/belt" {
    export const curvedBeltLength: 0.78;
    /** @type {import("./item_acceptor").ItemAcceptorSlot} */
    export const FAKE_BELT_ACCEPTOR_SLOT: import("game/components/item_acceptor").ItemAcceptorSlot;
    /** @type {Object<enumDirection, import("./item_ejector").ItemEjectorSlot>} */
    export const FAKE_BELT_EJECTOR_SLOT_BY_DIRECTION: any;
    export class BeltComponent extends Component {
        /**
         *
         * @param {object} param0
         * @param {enumDirection=} param0.direction The direction of the belt
         */
        constructor({ direction }: {
            direction?: enumDirection | undefined;
        });
        direction: string;
        /**
         * The path this belt is contained in, not serialized
         * @type {BeltPath}
         */
        assignedPath: BeltPath;
        /**
         * Returns the effective length of this belt in tile space
         * @returns {number}
         */
        getEffectiveLengthTiles(): number;
        /**
         * Returns fake acceptor slot used for matching
         * @returns {import("./item_acceptor").ItemAcceptorSlot}
         */
        getFakeAcceptorSlot(): import("./item_acceptor").ItemAcceptorSlot;
        /**
         * Returns fake acceptor slot used for matching
         * @returns {import("./item_ejector").ItemEjectorSlot}
         */
        getFakeEjectorSlot(): import("./item_ejector").ItemEjectorSlot;
        /**
         * Converts from belt space (0 = start of belt ... 1 = end of belt) to the local
         * belt coordinates (-0.5|-0.5 to 0.5|0.5)
         * @param {number} progress
         * @returns {Vector}
         */
        transformBeltToLocalSpace(progress: number): Vector;
    }
    import { Component } from "game/component";
    import { BeltPath } from "game/belt_path";
    import { Vector } from "core/vector";
    import { enumDirection } from "core/vector";
}
declare module "game/components/belt_underlays" {
    /**
     * Store which type an underlay is, this is cached so we can easily
     * render it.
     *
     * Full: Render underlay at top and bottom of tile
     * Bottom Only: Only render underlay at the bottom half
     * Top Only:
     */
    export type enumClippedBeltUnderlayType = string;
    export namespace enumClippedBeltUnderlayType {
        export const full: string;
        export const bottomOnly: string;
        export const topOnly: string;
        export const none: string;
    }
    /**
     * @typedef {{
     *   pos: Vector,
     *   direction: enumDirection,
     *   cachedType?: enumClippedBeltUnderlayType
     * }} BeltUnderlayTile
     */
    export class BeltUnderlaysComponent extends Component {
        /**
         * @param {object} param0
         * @param {Array<BeltUnderlayTile>=} param0.underlays Where to render belt underlays
         */
        constructor({ underlays }: {
            underlays?: Array<BeltUnderlayTile> | undefined;
        });
        underlays: {
            pos: Vector;
            direction: enumDirection;
            cachedType?: enumClippedBeltUnderlayType;
        }[];
    }
    export type BeltUnderlayTile = {
        pos: Vector;
        direction: enumDirection;
        cachedType?: enumClippedBeltUnderlayType;
    };
    import { Component } from "game/component";
    import { Vector } from "core/vector";
    import { enumDirection } from "core/vector";
}
declare module "game/components/hub" {
    export class HubComponent extends Component {
        constructor(...args: any[]);
    }
    import { Component } from "game/component";
}
declare module "game/components/item_processor" {
    export type enumItemProcessorTypes = string;
    export namespace enumItemProcessorTypes {
        export const balancer: string;
        export const cutter: string;
        export const cutterQuad: string;
        export const rotater: string;
        export const rotaterCCW: string;
        export const rotater180: string;
        export const stacker: string;
        export const trash: string;
        export const mixer: string;
        export const painter: string;
        export const painterDouble: string;
        export const painterQuad: string;
        export const hub: string;
        export const filter: string;
        export const reader: string;
        export const goal: string;
    }
    export type enumItemProcessorRequirements = string;
    export namespace enumItemProcessorRequirements {
        const painterQuad_1: string;
        export { painterQuad_1 as painterQuad };
    }
    /** @typedef {{
     *  item: BaseItem,
     *  requiredSlot?: number,
     *  preferredSlot?: number
     * }} EjectorItemToEject */
    /** @typedef {{
     *  remainingTime: number,
     *  items: Array<EjectorItemToEject>,
     * }} EjectorCharge */
    export class ItemProcessorComponent extends Component {
        static getSchema(): {
            nextOutputSlot: import("savegame/serialization_data_types").TypePositiveInteger;
        };
        /**
         *
         * @param {object} param0
         * @param {enumItemProcessorTypes=} param0.processorType Which type of processor this is
         * @param {enumItemProcessorRequirements=} param0.processingRequirement Applied processing requirement
         * @param {number=} param0.inputsPerCharge How many items this machine needs until it can start working
         *
         */
        constructor({ processorType, processingRequirement, inputsPerCharge, }: {
            processorType?: enumItemProcessorTypes | undefined;
            processingRequirement?: enumItemProcessorRequirements | undefined;
            inputsPerCharge?: number | undefined;
        });
        inputsPerCharge: number;
        type: string;
        processingRequirement: string;
        /**
         * Our current inputs
         * @type {Map<number, BaseItem>}
         */
        inputSlots: any;
        nextOutputSlot: number;
        /**
         * Current input count
         * @type {number}
         */
        inputCount: number;
        /**
         * What we are currently processing, empty if we don't produce anything rn
         * requiredSlot: Item *must* be ejected on this slot
         * preferredSlot: Item *can* be ejected on this slot, but others are fine too if the one is not usable
         * @type {Array<EjectorCharge>}
         */
        ongoingCharges: Array<EjectorCharge>;
        /**
         * How much processing time we have left from the last tick
         * @type {number}
         */
        bonusTime: number;
        /**
         * Tries to take the item
         * @param {BaseItem} item
         * @param {number} sourceSlot
         */
        tryTakeItem(item: BaseItem, sourceSlot: number): boolean;
    }
    export type EjectorItemToEject = {
        item: BaseItem;
        requiredSlot?: number;
        preferredSlot?: number;
    };
    export type EjectorCharge = {
        remainingTime: number;
        items: Array<EjectorItemToEject>;
    };
    import { Component } from "game/component";
    import { BaseItem } from "game/base_item";
}
declare module "game/components/miner" {
    export class MinerComponent extends Component {
        static getSchema(): {
            lastMiningTime: import("savegame/serialization_data_types").TypePositiveNumber;
            itemChainBuffer: import("savegame/serialization_data_types").TypeArray;
        };
        constructor({ chainable }: {
            chainable?: boolean;
        });
        lastMiningTime: number;
        chainable: boolean;
        /**
         * @type {BaseItem}
         */
        cachedMinedItem: BaseItem;
        /**
         * Which miner this miner ejects to, in case its a chainable one.
         * If the value is false, it means there is no entity, and we don't have to re-check
         * @type {Entity|null|false}
         */
        cachedChainedMiner: Entity | null | false;
        /**
         * Stores items from other miners which were chained to this
         * miner.
         * @type {Array<BaseItem>}
         */
        itemChainBuffer: Array<BaseItem>;
        /**
         *
         * @param {BaseItem} item
         */
        tryAcceptChainedItem(item: BaseItem): boolean;
    }
    import { Component } from "game/component";
    import { BaseItem } from "game/base_item";
    import { Entity } from "game/entity";
}
declare module "game/components/storage" {
    export class StorageComponent extends Component {
        static getSchema(): {
            storedCount: import("savegame/serialization_data_types").TypePositiveInteger;
            storedItem: import("savegame/serialization_data_types").TypeNullable;
        };
        /**
         * @param {object} param0
         * @param {number=} param0.maximumStorage How much this storage can hold
         */
        constructor({ maximumStorage }: {
            maximumStorage?: number | undefined;
        });
        maximumStorage: number;
        /**
         * Currently stored item
         * @type {BaseItem}
         */
        storedItem: BaseItem;
        /**
         * How many of this item we have stored
         */
        storedCount: number;
        /**
         * We compute an opacity to make sure it doesn't flicker
         */
        overlayOpacity: number;
        /**
         * Returns whether this storage can accept the item
         * @param {BaseItem} item
         */
        canAcceptItem(item: BaseItem): boolean;
        /**
         * Returns whether the storage is full
         * @returns {boolean}
         */
        getIsFull(): boolean;
        /**
         * @param {BaseItem} item
         */
        takeItem(item: BaseItem): void;
    }
    import { Component } from "game/component";
    import { BaseItem } from "game/base_item";
}
declare module "game/components/underground_belt" {
    export type enumUndergroundBeltMode = string;
    export namespace enumUndergroundBeltMode {
        export const sender: string;
        export const receiver: string;
    }
    /**
     * @typedef {{
     *   entity: Entity,
     *   distance: number
     * }} LinkedUndergroundBelt
     */
    export class UndergroundBeltComponent extends Component {
        static getSchema(): {
            pendingItems: import("savegame/serialization_data_types").TypeArray;
        };
        /**
         *
         * @param {object} param0
         * @param {enumUndergroundBeltMode=} param0.mode As which type of belt the entity acts
         * @param {number=} param0.tier
         */
        constructor({ mode, tier }: {
            mode?: enumUndergroundBeltMode | undefined;
            tier?: number | undefined;
        });
        mode: string;
        tier: number;
        /**
         * The linked entity, used to speed up performance. This contains either
         * the entrance or exit depending on the tunnel type
         * @type {LinkedUndergroundBelt}
         */
        cachedLinkedEntity: LinkedUndergroundBelt;
        /** @type {Array<{ item: BaseItem, progress: number }>} */
        consumptionAnimations: {
            item: BaseItem;
            progress: number;
        }[];
        /**
         * Used on both receiver and sender.
         * Reciever: Used to store the next item to transfer, and to block input while doing this
         * Sender: Used to store which items are currently "travelling"
         * @type {Array<[BaseItem, number]>} Format is [Item, ingame time to eject the item]
         */
        pendingItems: Array<[BaseItem, number]>;
        /**
         * Tries to accept an item from an external source like a regular belt or building
         * @param {BaseItem} item
         * @param {number} beltSpeed How fast this item travels
         */
        tryAcceptExternalItem(item: BaseItem, beltSpeed: number): boolean;
        /**
         * Tries to accept a tunneled item
         * @param {BaseItem} item
         * @param {number} travelDistance How many tiles this item has to travel
         * @param {number} beltSpeed How fast this item travels
         * @param {number} now Current ingame time
         */
        tryAcceptTunneledItem(item: BaseItem, travelDistance: number, beltSpeed: number, now: number): boolean;
    }
    export type LinkedUndergroundBelt = {
        entity: Entity;
        distance: number;
    };
    import { Component } from "game/component";
    import { BaseItem } from "game/base_item";
    import { Entity } from "game/entity";
}
declare module "core/stale_area_detector" {
    export class StaleAreaDetector {
        /**
         *
         * @param {object} param0
         * @param {import("../game/root").GameRoot} param0.root
         * @param {string} param0.name The name for reference
         * @param {(Rectangle) => void} param0.recomputeMethod Method which recomputes the given area
         */
        constructor({ root, name, recomputeMethod }: {
            root: import("../game/root").GameRoot;
            name: string;
            recomputeMethod: (Rectangle: any) => void;
        });
        root: import("game/root").GameRoot;
        name: string;
        recomputeMethod: (Rectangle: any) => void;
        /** @type {Rectangle} */
        staleArea: Rectangle;
        /**
         * Invalidates the given area
         * @param {Rectangle} area
         */
        invalidate(area: Rectangle): void;
        /**
         * Makes this detector recompute the area of an entity whenever
         * it changes in any way
         * @param {Array<typeof Component>} components
         * @param {number} tilesAround How many tiles arround to expand the area
         */
        recomputeOnComponentsChanged(components: Array<typeof Component>, tilesAround: number): void;
        /**
         * Updates the stale area
         */
        update(): void;
    }
    import { Rectangle } from "core/rectangle";
    import { Component } from "game/component";
}
declare module "game/production_analytics" {
    export type enumAnalyticsDataSource = string;
    export namespace enumAnalyticsDataSource {
        export const produced: string;
        export const stored: string;
        export const delivered: string;
    }
    export class ProductionAnalytics extends BasicSerializableObject {
        static getId(): string;
        /**
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        history: {
            [x: string]: any[];
        };
        lastAnalyticsSlice: number;
        /**
         * @param {ShapeDefinition} definition
         */
        onShapeDelivered(definition: ShapeDefinition): void;
        /**
         * @param {BaseItem} item
         */
        onItemProduced(item: BaseItem): void;
        /**
         * Starts a new time slice
         */
        startNewSlice(): void;
        /**
         * Returns the current rate of a given shape
         * @param {enumAnalyticsDataSource} dataSource
         * @param {ShapeDefinition} definition
         */
        getCurrentShapeRateRaw(dataSource: enumAnalyticsDataSource, definition: ShapeDefinition): any;
        /**
         * Returns the rate of a given shape, <historyOffset> frames ago
         * @param {enumAnalyticsDataSource} dataSource
         * @param {ShapeDefinition} definition
         * @param {number} historyOffset
         */
        getPastShapeRate(dataSource: enumAnalyticsDataSource, definition: ShapeDefinition, historyOffset: number): any;
        /**
         * Returns the rates of all shapes
         * @param {enumAnalyticsDataSource} dataSource
         */
        getCurrentShapeRatesRaw(dataSource: enumAnalyticsDataSource): any;
        update(): void;
    }
    import { BasicSerializableObject } from "savegame/serialization";
    import { GameRoot } from "game/root";
    import { ShapeDefinition } from "game/shape_definition";
    import { BaseItem } from "game/base_item";
}
declare module "platform/achievement_provider" {
    export namespace ACHIEVEMENTS {
        export const belt500Tiles: string;
        export const blueprint100k: string;
        export const blueprint1m: string;
        export const completeLvl26: string;
        export const cutShape: string;
        export const darkMode: string;
        export const destroy1000: string;
        export const irrelevantShape: string;
        export const level100: string;
        export const level50: string;
        export const logoBefore18: string;
        export const mam: string;
        export const mapMarkers15: string;
        export const noBeltUpgradesUntilBp: string;
        export const noInverseRotater: string;
        export const oldLevel17: string;
        export const openWires: string;
        export const paintShape: string;
        export const place5000Wires: string;
        export const placeBlueprint: string;
        export const placeBp1000: string;
        export const play1h: string;
        export const play10h: string;
        export const play20h: string;
        export const produceLogo: string;
        export const produceMsLogo: string;
        export const produceRocket: string;
        export const rotateShape: string;
        export const speedrunBp30: string;
        export const speedrunBp60: string;
        export const speedrunBp120: string;
        export const stack4Layers: string;
        export const stackShape: string;
        export const store100Unique: string;
        export const storeShape: string;
        export const throughputBp25: string;
        export const throughputBp50: string;
        export const throughputLogo25: string;
        export const throughputLogo50: string;
        export const throughputRocket10: string;
        export const throughputRocket20: string;
        export const trash1000: string;
        export const unlockWires: string;
        export const upgradesTier5: string;
        export const upgradesTier8: string;
    }
    export class AchievementProviderInterface {
        /** @param {Application} app */
        constructor(app: Application);
        collection: AchievementCollection | undefined;
        app: Application;
        /**
         * Initializes the achievement provider.
         * @returns {Promise<void>}
         */
        initialize(): Promise<void>;
        /**
         * Opportunity to do additional initialization work with the GameRoot.
         * @param {GameRoot} root
         * @returns {Promise<void>}
         */
        onLoad(root: GameRoot): Promise<void>;
        /** @returns {boolean} */
        hasLoaded(): boolean;
        /**
         * Call to activate an achievement with the provider
         * @param {string} key - Maps to an Achievement
         * @returns {Promise<void>}
         */
        activate(key: string): Promise<void>;
        /**
         * Checks if achievements are supported in the current build
         * @returns {boolean}
         */
        hasAchievements(): boolean;
    }
    export class Achievement {
        /** @param {string} key - An ACHIEVEMENTS key */
        constructor(key: string);
        key: string;
        activate: any;
        activatePromise: any;
        receiver: any;
        signal: any;
        init(): void;
        isValid(): boolean;
        unlock(): any;
    }
    export class AchievementCollection {
        /**
         * @param {function} activate - Resolves when provider activation is complete
         */
        constructor(activate: Function);
        map: any;
        activate: Function;
        /** @param {GameRoot} root */
        initialize(root: GameRoot): void;
        root: GameRoot;
        /**
         * @param {string} key - Maps to an Achievement
         * @param {object} [options]
         * @param {function} [options.init]
         * @param {function} [options.isValid]
         * @param {string} [options.signal]
         */
        add(key: string, options?: {
            init: Function;
            isValid: Function;
            signal: string;
        }): void;
        bulkUnlock(...args: any[]): void;
        /**
         * @param {string} key - Maps to an Achievement
         * @param {any} data - Data received from signal dispatches for validation
         */
        unlock(key: string, data: any): void;
        /**
         * Cleans up after achievement activation attempt with the provider. Could
         * utilize err to retry some number of times if needed.
         * @param {?Error} err - Error is null if activation was successful
         * @param {string} key - Maps to an Achievement
         */
        onActivate(err: Error | null, key: string): void;
        /** @param {string} key - Maps to an Achievement */
        remove(key: string): void;
        /**
         * Check if the collection-level achievementCheck receivers are still
         * necessary.
         */
        hasDefaultReceivers(): boolean;
        hasAllUpgradesAtLeastAtTier(tier: any): boolean;
        /**
         * @param {ShapeItem} item
         * @param {string} shape
         * @returns {boolean}
         */
        isShape(item: ShapeItem, shape: string): boolean;
        createBlueprintOptions(count: any): {
            init: ({ key }: {
                key: any;
            }) => void;
            isValid: (definition: any) => boolean;
            signal: string;
        };
        createLevelOptions(level: any): {
            init: ({ key }: {
                key: any;
            }) => void;
            isValid: (currentLevel: any) => boolean;
            signal: string;
        };
        createRateOptions(shape: any, rate: any): {
            isValid: () => boolean;
        };
        createShapeOptions(shape: any): {
            isValid: (item: any) => boolean;
            signal: string;
        };
        createSpeedOptions(level: any, time: any): {
            isValid: (currentLevel: any) => boolean;
            signal: string;
        };
        createTimeOptions(duration: any): {
            isValid: () => boolean;
        };
        createUpgradeOptions(tier: any): {
            init: ({ key }: {
                key: any;
            }) => void;
            isValid: () => boolean;
            signal: string;
        };
        /** @param {Entity} entity @returns {boolean} */
        isBelt500TilesValid(entity: Entity): boolean;
        /** @returns {boolean} */
        isDarkModeValid(): boolean;
        /** @param {number} count @returns {boolean} */
        isDestroy1000Valid(count: number): boolean;
        /** @param {ShapeDefinition} definition @returns {boolean} */
        isIrrelevantShapeValid(definition: ShapeDefinition): boolean;
        /** @param {ShapeItem} item @returns {boolean} */
        isLogoBefore18Valid(item: ShapeItem): boolean;
        /** @returns {boolean} */
        isMamValid(): boolean;
        /** @param {number} count @returns {boolean} */
        isMapMarkers15Valid(count: number): boolean;
        /**
         * @param {number} level
         * @returns {boolean}
         */
        isNoBeltUpgradesUntilBpValid(level: number): boolean;
        initNoInverseRotater(): void;
        /** @param {number} level @returns {boolean} */
        isNoInverseRotaterValid(level: number): boolean;
        /** @param {string} currentLayer @returns {boolean} */
        isOpenWiresValid(currentLayer: string): boolean;
        /** @param {Entity} entity @returns {boolean} */
        isPlace5000WiresValid(entity: Entity): boolean;
        /** @param {number} count @returns {boolean} */
        isPlaceBlueprintValid(count: number): boolean;
        /** @param {number} count @returns {boolean} */
        isPlaceBp1000Valid(count: number): boolean;
        /** @param {ShapeItem} item @returns {boolean} */
        isStack4LayersValid(item: ShapeItem): boolean;
        /** @param {Achievement} achievement */
        initStore100Unique({ key }: Achievement): void;
        /** @returns {boolean} */
        isStore100UniqueValid(): boolean;
        /** @param {Achievement} achievement */
        initStoreShape({ key }: Achievement): void;
        /** @returns {boolean} */
        isStoreShapeValid(): boolean;
        /** @param {Achievement} achievement */
        initTrash1000({ key }: Achievement): void;
        /** @param {number} count @returns {boolean} */
        isTrash1000Valid(count: number): boolean;
    }
    import { Application } from "application";
    import { GameRoot } from "game/root";
    import { ShapeItem } from "game/items/shape_item";
    import { Entity } from "game/entity";
    import { ShapeDefinition } from "game/shape_definition";
}
declare module "game/components/wire" {
    export type enumWireType = string;
    export namespace enumWireType {
        export const forward: string;
        export const turn: string;
        export const split: string;
        export const cross: string;
    }
    export type enumWireVariant = string;
    export namespace enumWireVariant {
        export const first: string;
        export const second: string;
    }
    export class WireComponent extends Component {
        /**
         * @param {object} param0
         * @param {enumWireType=} param0.type
         * @param {enumWireVariant=} param0.variant
         */
        constructor({ type, variant }: {
            type?: enumWireType | undefined;
            variant?: enumWireVariant | undefined;
        });
        type: string;
        /**
         * The variant of the wire, different variants do not connect
         * @type {enumWireVariant}
         */
        variant: enumWireVariant;
        /**
         * @type {import("../systems/wire").WireNetwork}
         */
        linkedNetwork: import("game/systems/wire").WireNetwork;
    }
    import { Component } from "game/component";
}
declare module "game/tutorial_goals" {
    /**
     * Don't forget to also update tutorial_goals_mappings.js as well as the translations!
     */
    export type enumHubGoalRewards = string;
    export namespace enumHubGoalRewards {
        export const reward_cutter_and_trash: string;
        export const reward_rotater: string;
        export const reward_painter: string;
        export const reward_mixer: string;
        export const reward_stacker: string;
        export const reward_balancer: string;
        export const reward_tunnel: string;
        export const reward_rotater_ccw: string;
        export const reward_rotater_180: string;
        export const reward_miner_chainable: string;
        export const reward_underground_belt_tier_2: string;
        export const reward_belt_reader: string;
        export const reward_splitter: string;
        export const reward_cutter_quad: string;
        export const reward_painter_double: string;
        export const reward_storage: string;
        export const reward_merger: string;
        export const reward_wires_painter_and_levers: string;
        export const reward_display: string;
        export const reward_constant_signal: string;
        export const reward_logic_gates: string;
        export const reward_virtual_processing: string;
        export const reward_filter: string;
        export const reward_demo_end: string;
        export const reward_blueprints: string;
        export const reward_freeplay: string;
        export const no_reward: string;
        export const no_reward_freeplay: string;
    }
}
declare module "core/draw_utils" {
    export function initDrawUtils(): void;
    /**
     *
     * @param {object} param0
     * @param {DrawParameters} param0.parameters
     * @param {AtlasSprite} param0.sprite
     * @param {number} param0.x
     * @param {number} param0.y
     * @param {number} param0.angle
     * @param {number} param0.size
     * @param {number=} param0.offsetX
     * @param {number=} param0.offsetY
     */
    export function drawRotatedSprite({ parameters, sprite, x, y, angle, size, offsetX, offsetY }: {
        parameters: DrawParameters;
        sprite: AtlasSprite;
        x: number;
        y: number;
        angle: number;
        size: number;
        offsetX?: number | undefined;
        offsetY?: number | undefined;
    }): void;
    /**
     * Draws a sprite with clipping
     * @param {object} param0
     * @param {DrawParameters} param0.parameters
     * @param {HTMLCanvasElement} param0.sprite
     * @param {number} param0.x
     * @param {number} param0.y
     * @param {number} param0.w
     * @param {number} param0.h
     * @param {number} param0.originalW
     * @param {number} param0.originalH
     */
    export function drawSpriteClipped({ parameters, sprite, x, y, w, h, originalW, originalH }: {
        parameters: DrawParameters;
        sprite: HTMLCanvasElement;
        x: number;
        y: number;
        w: number;
        h: number;
        originalW: number;
        originalH: number;
    }): void;
    export type AtlasSprite = import("core/sprites").AtlasSprite;
    export type DrawParameters = import("core/draw_parameters").DrawParameters;
}
declare module "game/buildings/wire" {
    export const arrayWireRotationVariantToType: string[];
    export const wireOverlayMatrices: {
        [x: string]: {
            [x: number]: number[];
        };
    };
    export type wireVariants = string;
    export namespace wireVariants {
        export const second: string;
    }
    export class MetaWireBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/components/wire_tunnel" {
    export class WireTunnelComponent extends Component {
        /**
         * Linked network, only if its not multiple directions
         * @type {Array<import("../systems/wire").WireNetwork>}
         */
        linkedNetworks: Array<import("game/systems/wire").WireNetwork>;
    }
    import { Component } from "game/component";
}
declare module "game/game_system" {
    /**
     * A game system processes all entities which match a given schema, usually a list of
     * required components. This is the core of the game logic.
     */
    export class GameSystem {
        /**
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        /**
         * Updates the game system, override to perform logic
         */
        update(): void;
        /**
         * Override, do not call this directly, use startDraw()
         * @param {DrawParameters} parameters
         */
        draw(parameters: DrawParameters): void;
        /**
         * Should refresh all caches
         */
        refreshCaches(): void;
        /**
         * @see GameSystem.draw Wrapper arround the draw method
         * @param {DrawParameters} parameters
         */
        startDraw(parameters: DrawParameters): void;
    }
    import { GameRoot } from "game/root";
    import { DrawParameters } from "core/draw_parameters";
}
declare module "game/game_system_with_filter" {
    export class GameSystemWithFilter extends GameSystem {
        /**
         * Constructs a new game system with the given component filter. It will process
         * all entities which have *all* of the passed components
         * @param {GameRoot} root
         * @param {Array<typeof Component>} requiredComponents
         */
        constructor(root: GameRoot, requiredComponents: Array<typeof Component>);
        requiredComponents: (typeof Component)[];
        requiredComponentIds: string[];
        /**
         * All entities which match the current components
         * @type {Array<Entity>}
         */
        allEntities: Array<Entity>;
        /**
         * @param {Entity} entity
         */
        internalPushEntityIfMatching(entity: Entity): void;
        /**
         *
         * @param {Entity} entity
         */
        internalCheckEntityAfterComponentRemoval(entity: Entity): void;
        /**
         *
         * @param {Entity} entity
         */
        internalReconsiderEntityToAdd(entity: Entity): void;
        /**
         * Recomputes all target entities after the game has loaded
         */
        internalPostLoadHook(): void;
        /**
         *
         * @param {Entity} entity
         */
        internalRegisterEntity(entity: Entity): void;
        /**
         *
         * @param {Entity} entity
         */
        internalPopEntityIfMatching(entity: Entity): void;
    }
    import { GameSystem } from "game/game_system";
    import { Component } from "game/component";
    import { Entity } from "game/entity";
    import { GameRoot } from "game/root";
}
declare module "game/map_chunk" {
    export class MapChunk {
        /**
         *
         * @param {GameRoot} root
         * @param {number} x
         * @param {number} y
         */
        constructor(root: GameRoot, x: number, y: number);
        root: GameRoot;
        x: number;
        y: number;
        tileX: number;
        tileY: number;
        /**
         * Stores the contents of the lower (= map resources) layer
         *  @type {Array<Array<?BaseItem>>}
         */
        lowerLayer: Array<Array<BaseItem | null>>;
        /**
         * Stores the contents of the regular layer
         * @type {Array<Array<?Entity>>}
         */
        contents: Array<Array<Entity | null>>;
        /**
         * Stores the contents of the wires layer
         *  @type {Array<Array<?Entity>>}
         */
        wireContents: Array<Array<Entity | null>>;
        /** @type {Array<Entity>} */
        containedEntities: Array<Entity>;
        /**
         * World space rectangle, can be used for culling
         */
        worldSpaceRectangle: Rectangle;
        /**
         * Tile space rectangle, can be used for culling
         */
        tileSpaceRectangle: Rectangle;
        /**
         * Which entities this chunk contains, sorted by layer
         * @type {Record<Layer, Array<Entity>>}
         */
        containedEntitiesByLayer: Record<any, Array<Entity>>;
        /**
         * Store which patches we have so we can render them in the overview
         * @type {Array<{pos: Vector, item: BaseItem, size: number }>}
         */
        patches: {
            pos: Vector;
            item: BaseItem;
            size: number;
        }[];
        /**
         * Generates a patch filled with the given item
         * @param {RandomNumberGenerator} rng
         * @param {number} patchSize
         * @param {BaseItem} item
         * @param {number=} overrideX Override the X position of the patch
         * @param {number=} overrideY Override the Y position of the patch
         */
        internalGeneratePatch(rng: RandomNumberGenerator, patchSize: number, item: BaseItem, overrideX?: number | undefined, overrideY?: number | undefined): void;
        /**
         * Generates a color patch
         * @param {RandomNumberGenerator} rng
         * @param {number} colorPatchSize
         * @param {number} distanceToOriginInChunks
         */
        internalGenerateColorPatch(rng: RandomNumberGenerator, colorPatchSize: number, distanceToOriginInChunks: number): void;
        /**
         * Generates a shape patch
         * @param {RandomNumberGenerator} rng
         * @param {number} shapePatchSize
         * @param {number} distanceToOriginInChunks
         */
        internalGenerateShapePatch(rng: RandomNumberGenerator, shapePatchSize: number, distanceToOriginInChunks: number): void;
        /**
         * Chooses a random shape with the given weights
         * @param {RandomNumberGenerator} rng
         * @param {Object.<enumSubShape, number>} weights
         * @returns {enumSubShape}
         */
        internalGenerateRandomSubShape(rng: RandomNumberGenerator, weights: any): enumSubShape;
        /**
         * Generates the lower layer "terrain"
         */
        generateLowerLayer(): void;
        /**
         * Checks if this chunk has predefined contents, and if so returns true and generates the
         * predefined contents
         * @param {RandomNumberGenerator} rng
         * @returns {boolean}
         */
        generatePredefined(rng: RandomNumberGenerator): boolean;
        /**
         *
         * @param {number} worldX
         * @param {number} worldY
         * @returns {BaseItem=}
         */
        getLowerLayerFromWorldCoords(worldX: number, worldY: number): BaseItem | undefined;
        /**
         * Returns the contents of this chunk from the given world space coordinates
         * @param {number} worldX
         * @param {number} worldY
         * @returns {Entity=}
         */
        getTileContentFromWorldCoords(worldX: number, worldY: number): Entity | undefined;
        /**
         * Returns the contents of this chunk from the given world space coordinates
         * @param {number} worldX
         * @param {number} worldY
         * @param {Layer} layer
         * @returns {Entity=}
         */
        getLayerContentFromWorldCoords(worldX: number, worldY: number, layer: any): Entity | undefined;
        /**
         * Returns the contents of this chunk from the given world space coordinates
         * @param {number} worldX
         * @param {number} worldY
         * @returns {Array<Entity>}
         */
        getLayersContentsMultipleFromWorldCoords(worldX: number, worldY: number): Array<Entity>;
        /**
         * Returns the chunks contents from the given local coordinates
         * @param {number} localX
         * @param {number} localY
         * @returns {Entity=}
         */
        getTileContentFromLocalCoords(localX: number, localY: number): Entity | undefined;
        /**
         * Sets the chunks contents
         * @param {number} tileX
         * @param {number} tileY
         * @param {Entity=} contents
         * @param {Layer} layer
         */
        setLayerContentFromWorldCords(tileX: number, tileY: number, contents?: Entity | undefined, layer: any): void;
    }
    import { GameRoot } from "game/root";
    import { BaseItem } from "game/base_item";
    import { Entity } from "game/entity";
    import { Rectangle } from "core/rectangle";
    import { Vector } from "core/vector";
    import { RandomNumberGenerator } from "core/rng";
    import { enumSubShape } from "game/shape_definition";
}
declare module "game/map_chunk_view" {
    export const CHUNK_OVERLAY_RES: 3;
    export class MapChunkView extends MapChunk {
        /**
         * @param {object} param0
         * @param {CanvasRenderingContext2D} param0.context
         * @param {number} param0.x
         * @param {number} param0.y
         * @param {Entity} param0.entity
         * @param {number} param0.tileSizePixels
         * @param {string=} param0.overrideColor Optionally override the color to be rendered
         */
        static drawSingleWiresOverviewTile({ context, x, y, entity, tileSizePixels, overrideColor }: {
            context: CanvasRenderingContext2D;
            x: number;
            y: number;
            entity: Entity;
            tileSizePixels: number;
            overrideColor?: string | undefined;
        }): void;
        /**
         *
         * @param {GameRoot} root
         * @param {number} x
         * @param {number} y
         */
        constructor(root: GameRoot, x: number, y: number);
        /**
         * Whenever something changes, we increase this number - so we know we need to redraw
         */
        renderIteration: number;
        /**
         * Marks this chunk as dirty, rerendering all caches
         */
        markDirty(): void;
        renderKey: string;
        /**
         * Draws the background layer
         * @param {DrawParameters} parameters
         */
        drawBackgroundLayer(parameters: DrawParameters): void;
        /**
         * Draws the dynamic foreground layer
         * @param {DrawParameters} parameters
         */
        drawForegroundDynamicLayer(parameters: DrawParameters): void;
        /**
         * Draws the static foreground layer
         * @param {DrawParameters} parameters
         */
        drawForegroundStaticLayer(parameters: DrawParameters): void;
        /**
         * @param {DrawParameters} parameters
         * @param {number} xoffs
         * @param {number} yoffs
         * @param {number} diameter
         */
        drawOverlayPatches(parameters: DrawParameters, xoffs: number, yoffs: number, diameter: number): void;
        /**
         *
         * @param {CanvasRenderingContext2D} context
         * @param {number} w
         * @param {number} h
         * @param {number=} xoffs
         * @param {number=} yoffs
         */
        generateOverlayBuffer(context: CanvasRenderingContext2D, w: number, h: number, xoffs?: number | undefined, yoffs?: number | undefined): void;
        /**
         * Draws the wires layer
         * @param {DrawParameters} parameters
         */
        drawWiresForegroundLayer(parameters: DrawParameters): void;
    }
    import { MapChunk } from "game/map_chunk";
    import { DrawParameters } from "core/draw_parameters";
    import { Entity } from "game/entity";
    import { GameRoot } from "game/root";
}
declare module "game/systems/wire" {
    export class WireNetwork {
        /**
         * Who contributes to this network
         * @type {Array<{ entity: Entity, slot: import("../components/wired_pins").WirePinSlot }>} */
        providers: {
            entity: Entity;
            slot: import("../components/wired_pins").WirePinSlot;
        }[];
        /**
         * Who takes values from this network
         * @type {Array<{ entity: Entity, slot: import("../components/wired_pins").WirePinSlot }>} */
        receivers: {
            entity: Entity;
            slot: import("../components/wired_pins").WirePinSlot;
        }[];
        /**
         * All connected slots
         * @type {Array<{ entity: Entity, slot: import("../components/wired_pins").WirePinSlot }>}
         */
        allSlots: {
            entity: Entity;
            slot: import("../components/wired_pins").WirePinSlot;
        }[];
        /**
         * All connected tunnels
         * @type {Array<Entity>}
         */
        tunnels: Array<Entity>;
        /**
         * Which wires are in this network
         * @type {Array<Entity>}
         */
        wires: Array<Entity>;
        /**
         * The current value of this network
         * @type {BaseItem}
         */
        currentValue: BaseItem;
        /**
         * Whether this network has a value conflict, that is, more than one
         * sender has sent a value
         * @type {boolean}
         */
        valueConflict: boolean;
        /**
         * Unique network identifier
         * @type {number}
         */
        uid: number;
        /**
         * Returns whether this network currently has a value
         * @returns {boolean}
         */
        hasValue(): boolean;
    }
    export class WireSystem extends GameSystemWithFilter {
        constructor(root: any);
        /**
         * @type {Object<enumWireVariant, Object<enumWireType, AtlasSprite>>}
         */
        wireSprites: any;
        needsRecompute: boolean;
        isFirstRecompute: boolean;
        staleArea: StaleAreaDetector;
        /**
         * @type {Array<WireNetwork>}
         */
        networks: Array<WireNetwork>;
        /**
         * Invalidates the wires network if the given entity is relevant for it
         * @param {Entity} entity
         */
        queueRecomputeIfWire(entity: Entity): void;
        /**
         * Recomputes the whole wires network
         */
        recomputeWiresNetwork(): void;
        /**
         * Finds the network for the given slot
         * @param {Entity} initialEntity
         * @param {import("../components/wired_pins").WirePinSlot} slot
         */
        findNetworkForEjector(initialEntity: Entity, slot: import("../components/wired_pins").WirePinSlot): void;
        /**
         * Finds surrounding entities which are not yet assigned to a network
         * @param {Vector} initialTile
         * @param {Array<enumDirection>} directions
         * @param {WireNetwork} network
         * @param {enumWireVariant=} variantMask Only accept connections to this mask
         * @returns {Array<any>}
         */
        findSurroundingWireTargets(initialTile: Vector, directions: Array<enumDirection>, network: WireNetwork, variantMask?: enumWireVariant | undefined): Array<any>;
        /**
         * Returns the given tileset and opacity
         * @param {WireComponent} wireComp
         * @returns {{ spriteSet: Object<enumWireType, import("../../core/draw_utils").AtlasSprite>, opacity: number}}
         */
        getSpriteSetAndOpacityForWire(wireComp: WireComponent): {
            spriteSet: any;
            opacity: number;
        };
        /**
         * Draws a given chunk
         * @param {import("../../core/draw_utils").DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: import("../../core/draw_utils").DrawParameters, chunk: MapChunkView): void;
        /**
         * Returns whether this entity is relevant for the wires network
         * @param {Entity} entity
         */
        isEntityRelevantForWires(entity: Entity): WireComponent | WireTunnelComponent | WiredPinsComponent;
        /**
         *
         * @param {Entity} entity
         */
        queuePlacementUpdate(entity: Entity): void;
        /**
         * Updates the wire placement after an entity has been added / deleted
         * @param {Rectangle} affectedArea
         */
        updateSurroundingWirePlacement(affectedArea: Rectangle): void;
    }
    import { Entity } from "game/entity";
    import { BaseItem } from "game/base_item";
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { StaleAreaDetector } from "core/stale_area_detector";
    import { Vector } from "core/vector";
    import { enumDirection } from "core/vector";
    import { enumWireVariant } from "game/components/wire";
    import { WireComponent } from "game/components/wire";
    import { MapChunkView } from "game/map_chunk_view";
    import { WireTunnelComponent } from "game/components/wire_tunnel";
    import { WiredPinsComponent } from "game/components/wired_pins";
    import { Rectangle } from "core/rectangle";
}
declare module "game/components/wired_pins" {
    export type enumPinSlotType = string;
    export namespace enumPinSlotType {
        export const logicalEjector: string;
        export const logicalAcceptor: string;
    }
    /** @typedef {{
     *   pos: Vector,
     *   type: enumPinSlotType,
     *   direction: enumDirection
     * }} WirePinSlotDefinition */
    /** @typedef {{
     *   pos: Vector,
     *   type: enumPinSlotType,
     *   direction: enumDirection,
     *   value: BaseItem,
     *   linkedNetwork: import("../systems/wire").WireNetwork
     * }} WirePinSlot */
    export class WiredPinsComponent extends Component {
        static getSchema(): {
            slots: import("savegame/serialization_data_types").TypeArray;
        };
        /**
         *
         * @param {object} param0
         * @param {Array<WirePinSlotDefinition>} param0.slots
         */
        constructor({ slots }: {
            slots: Array<WirePinSlotDefinition>;
        });
        /**
         * Sets the slots of this building
         * @param {Array<WirePinSlotDefinition>} slots
         */
        setSlots(slots: Array<WirePinSlotDefinition>): void;
        /** @type {Array<WirePinSlot>} */
        slots: Array<WirePinSlot>;
    }
    export type WirePinSlotDefinition = {
        pos: Vector;
        type: enumPinSlotType;
        direction: enumDirection;
    };
    export type WirePinSlot = {
        pos: Vector;
        type: enumPinSlotType;
        direction: enumDirection;
        value: BaseItem;
        linkedNetwork: import("../systems/wire").WireNetwork;
    };
    import { Component } from "game/component";
    import { Vector } from "core/vector";
    import { enumDirection } from "core/vector";
    import { BaseItem } from "game/base_item";
}
declare module "game/components/constant_signal" {
    export class ConstantSignalComponent extends Component {
        static getSchema(): {
            signal: import("savegame/serialization_data_types").TypeNullable;
        };
        /**
         *
         * @param {object} param0
         * @param {BaseItem=} param0.signal The signal to store
         */
        constructor({ signal }: {
            signal?: BaseItem | undefined;
        });
        signal: BaseItem;
    }
    import { Component } from "game/component";
    import { BaseItem } from "game/base_item";
}
declare module "game/components/logic_gate" {
    export type enumLogicGateType = string;
    export namespace enumLogicGateType {
        export const and: string;
        export const not: string;
        export const xor: string;
        export const or: string;
        export const transistor: string;
        export const analyzer: string;
        export const rotater: string;
        export const unstacker: string;
        export const cutter: string;
        export const compare: string;
        export const stacker: string;
        export const painter: string;
    }
    export class LogicGateComponent extends Component {
        /**
         *
         * @param {object} param0
         * @param {enumLogicGateType=} param0.type
         */
        constructor({ type }: {
            type?: enumLogicGateType | undefined;
        });
        type: string;
    }
    import { Component } from "game/component";
}
declare module "game/components/lever" {
    export class LeverComponent extends Component {
        static getSchema(): {
            toggled: import("savegame/serialization_data_types").TypeBoolean;
        };
        /**
         * @param {object} param0
         * @param {boolean=} param0.toggled
         */
        constructor({ toggled }: {
            toggled?: boolean | undefined;
        });
        toggled: boolean;
    }
    import { Component } from "game/component";
}
declare module "game/components/display" {
    export class DisplayComponent extends Component {
        constructor(...args: any[]);
    }
    import { Component } from "game/component";
}
declare module "game/components/belt_reader" {
    export type enumBeltReaderType = string;
    export namespace enumBeltReaderType {
        export const wired: string;
        export const wireless: string;
    }
    export class BeltReaderComponent extends Component {
        static getSchema(): {
            lastItem: import("savegame/serialization_data_types").TypeNullable;
        };
        /**
         * Which items went through the reader, we only store the time
         * @type {Array<number>}
         */
        lastItemTimes: Array<number>;
        /**
         * Which item passed the reader last
         * @type {BaseItem}
         */
        lastItem: BaseItem;
        /**
         * Stores the last throughput we computed
         * @type {number}
         */
        lastThroughput: number;
        /**
         * Stores when we last computed the throughput
         * @type {number}
         */
        lastThroughputComputation: number;
    }
    import { Component } from "game/component";
    import { BaseItem } from "game/base_item";
}
declare module "game/components/filter" {
    /**
     * @typedef {{
     *   item: BaseItem,
     *   progress: number
     * }} PendingFilterItem
     */
    export class FilterComponent extends Component {
        static getSchema(): {
            pendingItemsToLeaveThrough: import("savegame/serialization_data_types").TypeArray;
            pendingItemsToReject: import("savegame/serialization_data_types").TypeArray;
        };
        duplicateWithoutContents(): FilterComponent;
        /**
         * Items in queue to leave through
         * @type {Array<PendingFilterItem>}
         */
        pendingItemsToLeaveThrough: Array<PendingFilterItem>;
        /**
         * Items in queue to reject
         * @type {Array<PendingFilterItem>}
         */
        pendingItemsToReject: Array<PendingFilterItem>;
    }
    export type PendingFilterItem = {
        item: BaseItem;
        progress: number;
    };
    import { Component } from "game/component";
    import { BaseItem } from "game/base_item";
}
declare module "game/components/item_producer" {
    export class ItemProducerComponent extends Component {
        constructor(...args: any[]);
    }
    import { Component } from "game/component";
}
declare module "game/components/goal_acceptor" {
    export class GoalAcceptorComponent extends Component {
        static getSchema(): {
            item: import("savegame/serialization_data_types").TypeClass;
        };
        /**
         * @param {object} param0
         * @param {BaseItem=} param0.item
         * @param {number=} param0.rate
         */
        constructor({ item, rate }: {
            item?: BaseItem | undefined;
            rate?: number | undefined;
        });
        /** @type {BaseItem | undefined} */
        item: BaseItem | undefined;
        /**
         * The last item we delivered
         * @type {{ item: BaseItem; time: number; } | null} */
        lastDelivery: {
            item: BaseItem;
            time: number;
        };
        currentDeliveredItems: number;
        displayPercentage: number;
        /**
         * Clears items but doesn't instantly reset the progress bar
         */
        clearItems(): void;
        getRequiredSecondsPerItem(): number;
    }
    import { Component } from "game/component";
    import { BaseItem } from "game/base_item";
}
declare module "game/entity_components" {
    /**
     * Typedefs for all entity components. These are not actually present on the entity,
     * thus they are undefined by default
     */
    export class EntityComponentStorage {
        /** @type {StaticMapEntityComponent} */
        StaticMapEntity: StaticMapEntityComponent;
        /** @type {BeltComponent} */
        Belt: BeltComponent;
        /** @type {ItemEjectorComponent} */
        ItemEjector: ItemEjectorComponent;
        /** @type {ItemAcceptorComponent} */
        ItemAcceptor: ItemAcceptorComponent;
        /** @type {MinerComponent} */
        Miner: MinerComponent;
        /** @type {ItemProcessorComponent} */
        ItemProcessor: ItemProcessorComponent;
        /** @type {UndergroundBeltComponent} */
        UndergroundBelt: UndergroundBeltComponent;
        /** @type {HubComponent} */
        Hub: HubComponent;
        /** @type {StorageComponent} */
        Storage: StorageComponent;
        /** @type {WiredPinsComponent} */
        WiredPins: WiredPinsComponent;
        /** @type {BeltUnderlaysComponent} */
        BeltUnderlays: BeltUnderlaysComponent;
        /** @type {WireComponent} */
        Wire: WireComponent;
        /** @type {ConstantSignalComponent} */
        ConstantSignal: ConstantSignalComponent;
        /** @type {LogicGateComponent} */
        LogicGate: LogicGateComponent;
        /** @type {LeverComponent} */
        Lever: LeverComponent;
        /** @type {WireTunnelComponent} */
        WireTunnel: WireTunnelComponent;
        /** @type {DisplayComponent} */
        Display: DisplayComponent;
        /** @type {BeltReaderComponent} */
        BeltReader: BeltReaderComponent;
        /** @type {FilterComponent} */
        Filter: FilterComponent;
        /** @type {ItemProducerComponent} */
        ItemProducer: ItemProducerComponent;
        /** @type {GoalAcceptorComponent} */
        GoalAcceptor: GoalAcceptorComponent;
    }
    import { StaticMapEntityComponent } from "game/components/static_map_entity";
    import { BeltComponent } from "game/components/belt";
    import { ItemEjectorComponent } from "game/components/item_ejector";
    import { ItemAcceptorComponent } from "game/components/item_acceptor";
    import { MinerComponent } from "game/components/miner";
    import { ItemProcessorComponent } from "game/components/item_processor";
    import { UndergroundBeltComponent } from "game/components/underground_belt";
    import { HubComponent } from "game/components/hub";
    import { StorageComponent } from "game/components/storage";
    import { WiredPinsComponent } from "game/components/wired_pins";
    import { BeltUnderlaysComponent } from "game/components/belt_underlays";
    import { WireComponent } from "game/components/wire";
    import { ConstantSignalComponent } from "game/components/constant_signal";
    import { LogicGateComponent } from "game/components/logic_gate";
    import { LeverComponent } from "game/components/lever";
    import { WireTunnelComponent } from "game/components/wire_tunnel";
    import { DisplayComponent } from "game/components/display";
    import { BeltReaderComponent } from "game/components/belt_reader";
    import { FilterComponent } from "game/components/filter";
    import { ItemProducerComponent } from "game/components/item_producer";
    import { GoalAcceptorComponent } from "game/components/goal_acceptor";
}
declare module "game/entity" {
    export class Entity extends BasicSerializableObject {
        static getId(): string;
        /**
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        /**
         * Handle to the global game root
         */
        root: GameRoot;
        /**
         * The components of the entity
         */
        components: EntityComponentStorage;
        /**
         * Whether this entity was registered on the @see EntityManager so far
         */
        registered: boolean;
        /**
         * On which layer this entity is
         * @type {Layer}
         */
        layer: any;
        /**
         * Internal entity unique id, set by the @see EntityManager
         */
        uid: number;
        /**
         * Stores if this entity is destroyed, set by the @see EntityManager
         * @type {boolean} */
        destroyed: boolean;
        /**
         * Stores if this entity is queued to get destroyed in the next tick
         * of the @see EntityManager
         * @type {boolean} */
        queuedForDestroy: boolean;
        /**
         * Stores the reason why this entity was destroyed
         * @type {string} */
        destroyReason: string;
        /**
         * Returns a clone of this entity
         */
        clone(): Entity;
        /**
         * Adds a new component, only possible until the entity is registered on the entity manager,
         * after that use @see EntityManager.addDynamicComponent
         * @param {Component} componentInstance
         * @param {boolean} force Used by the entity manager. Internal parameter, do not change
         */
        addComponent(componentInstance: Component, force?: boolean): void;
        /**
         * Removes a given component, only possible until the entity is registered on the entity manager,
         * after that use @see EntityManager.removeDynamicComponent
         * @param {typeof Component} componentClass
         * @param {boolean} force
         */
        removeComponent(componentClass: typeof Component, force?: boolean): void;
        /**
         * Draws the entity, to override use @see Entity.drawImpl
         * @param {DrawParameters} parameters
         */
        drawDebugOverlays(parameters: DrawParameters): void;
        /**
         * override, should draw the entity
         * @param {DrawParameters} parameters
         */
        drawImpl(parameters: DrawParameters): void;
    }
    import { BasicSerializableObject } from "savegame/serialization";
    import { GameRoot } from "game/root";
    import { EntityComponentStorage } from "game/entity_components";
    import { Component } from "game/component";
    import { DrawParameters } from "core/draw_parameters";
}
declare module "game/meta_building" {
    export const defaultBuildingVariant: "default";
    export class MetaBuilding {
        /**
         *
         * @param {string} id Building id
         */
        constructor(id: string);
        id: string;
        /**
         * Returns the id of this building
         */
        getId(): string;
        /**
         * Returns the edit layer of the building
         * @returns {Layer}
         */
        getLayer(): any;
        /**
         * Should return the dimensions of the building
         */
        getDimensions(variant?: string): Vector;
        /**
         * Returns whether the building has the direction lock switch available
         */
        getHasDirectionLockAvailable(): boolean;
        /**
         * Whether to stay in placement mode after having placed a building
         */
        getStayInPlacementMode(): boolean;
        /**
         * Can return a special interlaved 9 elements overlay matrix for rendering
         * @param {number} rotation
         * @param {number} rotationVariant
         * @param {string} variant
         * @param {Entity} entity
         * @returns {Array<number>|null}
         */
        getSpecialOverlayRenderMatrix(rotation: number, rotationVariant: number, variant: string, entity: Entity): Array<number> | null;
        /**
         * Should return additional statistics about this building
         * @param {GameRoot} root
         * @param {string} variant
         * @returns {Array<[string, string]>}
         */
        getAdditionalStatistics(root: GameRoot, variant: string): Array<[string, string]>;
        /**
         * Returns whether this building can get replaced
         */
        getIsReplaceable(): boolean;
        /**
         * Whether to flip the orientation after a building has been placed - useful
         * for tunnels.
         */
        getFlipOrientationAfterPlacement(): boolean;
        /**
         * Whether to show a preview of the wires layer when placing the building
         */
        getShowWiresLayerPreview(): boolean;
        /**
         * Whether to rotate automatically in the dragging direction while placing
         * @param {string} variant
         */
        getRotateAutomaticallyWhilePlacing(variant: string): boolean;
        /**
         * Returns whether this building is removable
         * @param {GameRoot} root
         * @returns {boolean}
         */
        getIsRemovable(root: GameRoot): boolean;
        /**
         * Returns the placement sound
         * @returns {string}
         */
        getPlacementSound(): string;
        /**
         * @param {GameRoot} root
         */
        getAvailableVariants(root: GameRoot): string[];
        /**
         * Returns a preview sprite
         * @returns {AtlasSprite}
         */
        getPreviewSprite(rotationVariant?: number, variant?: string): AtlasSprite;
        /**
         * Returns a sprite for blueprints
         * @returns {AtlasSprite}
         */
        getBlueprintSprite(rotationVariant?: number, variant?: string): AtlasSprite;
        /**
         * Returns whether this building is rotateable
         * @returns {boolean}
         */
        getIsRotateable(): boolean;
        /**
         * Returns whether this building is unlocked for the given game
         * @param {GameRoot} root
         */
        getIsUnlocked(root: GameRoot): boolean;
        /**
         * Should return a silhouette color for the map overview or null if not set
         * @param {string} variant
         * @param {number} rotationVariant
         */
        getSilhouetteColor(variant: string, rotationVariant: number): any;
        /**
         * Should return false if the pins are already included in the sprite of the building
         * @returns {boolean}
         */
        getRenderPins(): boolean;
        /**
         * Creates the entity without placing it
         * @param {object} param0
         * @param {GameRoot} param0.root
         * @param {Vector} param0.origin Origin tile
         * @param {number=} param0.rotation Rotation
         * @param {number} param0.originalRotation Original Rotation
         * @param {number} param0.rotationVariant Rotation variant
         * @param {string} param0.variant
         */
        createEntity({ root, origin, rotation, originalRotation, rotationVariant, variant }: {
            root: GameRoot;
            origin: Vector;
            rotation?: number | undefined;
            originalRotation: number;
            rotationVariant: number;
            variant: string;
        }): Entity;
        /**
         * Returns the sprite for a given variant
         * @param {number} rotationVariant
         * @param {string} variant
         * @returns {AtlasSprite}
         */
        getSprite(rotationVariant: number, variant: string): AtlasSprite;
        /**
         * Should compute the optimal rotation variant on the given tile
         * @param {object} param0
         * @param {GameRoot} param0.root
         * @param {Vector} param0.tile
         * @param {number} param0.rotation
         * @param {string} param0.variant
         * @param {Layer} param0.layer
         * @return {{ rotation: number, rotationVariant: number, connectedEntities?: Array<Entity> }}
         */
        computeOptimalDirectionAndRotationVariantAtTile({ root, tile, rotation, variant, layer }: {
            root: GameRoot;
            tile: Vector;
            rotation: number;
            variant: string;
            layer: any;
        }): {
            rotation: number;
            rotationVariant: number;
            connectedEntities?: Array<Entity>;
        };
        /**
         * Should update the entity to match the given variants
         * @param {Entity} entity
         * @param {number} rotationVariant
         * @param {string} variant
         */
        updateVariants(entity: Entity, rotationVariant: number, variant: string): void;
        /**
         * Should setup the entity components
         * @param {Entity} entity
         * @param {GameRoot} root
         */
        setupEntityComponents(entity: Entity, root: GameRoot): void;
    }
    import { Vector } from "core/vector";
    import { Entity } from "game/entity";
    import { GameRoot } from "game/root";
    import { AtlasSprite } from "core/sprites";
}
declare module "game/buildings/item_producer" {
    export class MetaItemProducerBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "core/globals" {
    /**
     * @param {Application} app
     */
    export function setGlobalApp(app: Application): void;
    /**
     * Used for the bug reporter, and the click detector which both have no handles to this.
     * It would be nicer to have no globals, but this is the only one. I promise!
     * @type {Application} */
    export let GLOBAL_APP: Application;
    import { Application } from "application";
}
declare module "core/click_detector" {
    export const MAX_MOVE_DISTANCE_PX: 20 | 80;
    export namespace clickDetectorGlobals {
        export const lastTouchTime: number;
    }
    /**
     * Click detector creation payload typehints
     * @typedef {{
     *  consumeEvents?: boolean,
     *  preventDefault?: boolean,
     *  applyCssClass?: string,
     *  captureTouchmove?: boolean,
     *  targetOnly?: boolean,
     *  maxDistance?: number,
     *  clickSound?: string,
     *  preventClick?: boolean,
     * }} ClickDetectorConstructorArgs
     */
    export class ClickDetector {
        /**
         * Extracts the mous position from an event
         * @param {TouchEvent|MouseEvent} event
         * @returns {Vector} The client space position
         */
        static extractPointerPosition(event: TouchEvent | MouseEvent): Vector;
        /**
         *
         * @param {Element} element
         * @param {object} param1
         * @param {boolean=} param1.consumeEvents Whether to call stopPropagation
         *                                       (Useful for nested elements where the parent has a click handler as wel)
         * @param {boolean=} param1.preventDefault  Whether to call preventDefault (Usually makes the handler faster)
         * @param {string=} param1.applyCssClass The css class to add while the element is pressed
         * @param {boolean=} param1.captureTouchmove Whether to capture touchmove events as well
         * @param {boolean=} param1.targetOnly Whether to also accept clicks on child elements (e.target !== element)
         * @param {number=} param1.maxDistance The maximum distance in pixels to accept clicks
         * @param {string=} param1.clickSound Sound key to play on touchdown
         * @param {boolean=} param1.preventClick Whether to prevent click events
         */
        constructor(element: Element, { consumeEvents, preventDefault, applyCssClass, captureTouchmove, targetOnly, maxDistance, clickSound, preventClick, }: {
            consumeEvents?: boolean | undefined;
            preventDefault?: boolean | undefined;
            applyCssClass?: string | undefined;
            captureTouchmove?: boolean | undefined;
            targetOnly?: boolean | undefined;
            maxDistance?: number | undefined;
            clickSound?: string | undefined;
            preventClick?: boolean | undefined;
        });
        clickDownPosition: Vector;
        consumeEvents: boolean;
        preventDefault: boolean;
        applyCssClass: string;
        captureTouchmove: boolean;
        targetOnly: boolean;
        clickSound: string;
        maxDistance: number;
        preventClick: boolean;
        click: Signal;
        rightClick: Signal;
        touchstart: Signal;
        touchmove: Signal;
        touchend: Signal;
        touchcancel: Signal;
        touchstartSimple: Signal;
        touchmoveSimple: Signal;
        touchendSimple: Signal;
        clickStartTime: number;
        cancelled: boolean;
        /**
         * Cleans up all event listeners of this detector
         */
        cleanup(): void;
        element: HTMLElement;
        /**
         *
         * @param {Event} event
         */
        internalPreventClick(event: Event): void;
        /**
         * Internal method to get the options to pass to an event listener
         */
        internalGetEventListenerOptions(): {
            capture: boolean;
            passive: boolean;
        };
        /**
         * Binds the click detector to an element
         * @param {HTMLElement} element
         */
        internalBindTo(element: HTMLElement): void;
        handlerTouchStart: any;
        handlerTouchEnd: any;
        handlerTouchMove: any;
        handlerTouchCancel: any;
        handlerPreventClick: any;
        /**
         * Returns if the bound element is currently in the DOM.
         */
        internalIsDomElementAttached(): boolean;
        /**
         * Checks if the given event is relevant for this detector
         * @param {TouchEvent|MouseEvent} event
         */
        internalEventPreHandler(event: TouchEvent | MouseEvent, expectedRemainingTouches?: number): boolean;
        /**
         * Cacnels all ongoing events on this detector
         */
        cancelOngoingEvents(): void;
        /**
         * Internal pointer down handler
         * @param {TouchEvent|MouseEvent} event
         */
        internalOnPointerDown(event: TouchEvent | MouseEvent): boolean;
        /**
         * Internal pointer move handler
         * @param {TouchEvent|MouseEvent} event
         */
        internalOnPointerMove(event: TouchEvent | MouseEvent): boolean;
        /**
         * Internal pointer end handler
         * @param {TouchEvent|MouseEvent} event
         */
        internalOnPointerEnd(event: TouchEvent | MouseEvent): boolean;
        /**
         * Internal touch cancel handler
         * @param {TouchEvent|MouseEvent} event
         */
        internalOnTouchCancel(event: TouchEvent | MouseEvent): boolean;
    }
    /**
     * Click detector creation payload typehints
     */
    export type ClickDetectorConstructorArgs = {
        consumeEvents?: boolean;
        preventDefault?: boolean;
        applyCssClass?: string;
        captureTouchmove?: boolean;
        targetOnly?: boolean;
        maxDistance?: number;
        clickSound?: string;
        preventClick?: boolean;
    };
    import { Vector } from "core/vector";
    import { Signal } from "core/signal";
}
declare module "core/input_receiver" {
    export class InputReceiver {
        constructor(context?: string);
        context: string;
        backButton: Signal;
        keydown: Signal;
        keyup: Signal;
        pageBlur: Signal;
        destroyed: Signal;
        cleanup(): void;
    }
    import { Signal } from "core/signal";
}
declare module "game/key_action_mapper" {
    /**
     * Returns a keycode -> string
     * @param {number} code
     * @returns {string}
     */
    export function getStringForKeyCode(code: number): string;
    export namespace KEYMAPPINGS {
        export namespace general {
            export namespace confirm {
                export const keyCode: number;
            }
            export namespace back {
                const keyCode_1: number;
                export { keyCode_1 as keyCode };
                export const builtin: boolean;
            }
        }
        export namespace ingame {
            export namespace menuOpenShop {
                const keyCode_2: any;
                export { keyCode_2 as keyCode };
            }
            export namespace menuOpenStats {
                const keyCode_3: any;
                export { keyCode_3 as keyCode };
            }
            export namespace menuClose {
                const keyCode_4: any;
                export { keyCode_4 as keyCode };
            }
            export namespace toggleHud {
                const keyCode_5: number;
                export { keyCode_5 as keyCode };
            }
            export namespace exportScreenshot {
                const keyCode_6: number;
                export { keyCode_6 as keyCode };
            }
            export namespace toggleFPSInfo {
                const keyCode_7: number;
                export { keyCode_7 as keyCode };
            }
            export namespace switchLayers {
                const keyCode_8: any;
                export { keyCode_8 as keyCode };
            }
            export namespace showShapeTooltip {
                const keyCode_9: number;
                export { keyCode_9 as keyCode };
            }
        }
        export namespace navigation {
            export namespace mapMoveUp {
                const keyCode_10: any;
                export { keyCode_10 as keyCode };
            }
            export namespace mapMoveRight {
                const keyCode_11: any;
                export { keyCode_11 as keyCode };
            }
            export namespace mapMoveDown {
                const keyCode_12: any;
                export { keyCode_12 as keyCode };
            }
            export namespace mapMoveLeft {
                const keyCode_13: any;
                export { keyCode_13 as keyCode };
            }
            export namespace mapMoveFaster {
                const keyCode_14: number;
                export { keyCode_14 as keyCode };
            }
            export namespace centerMap {
                const keyCode_15: number;
                export { keyCode_15 as keyCode };
            }
            export namespace mapZoomIn {
                const keyCode_16: number;
                export { keyCode_16 as keyCode };
                export const repeated: boolean;
            }
            export namespace mapZoomOut {
                const keyCode_17: number;
                export { keyCode_17 as keyCode };
                const repeated_1: boolean;
                export { repeated_1 as repeated };
            }
            export namespace createMarker {
                const keyCode_18: any;
                export { keyCode_18 as keyCode };
            }
        }
        export namespace buildings {
            export namespace constant_producer {
                const keyCode_19: any;
                export { keyCode_19 as keyCode };
            }
            export namespace goal_acceptor {
                const keyCode_20: any;
                export { keyCode_20 as keyCode };
            }
            export namespace block {
                const keyCode_21: any;
                export { keyCode_21 as keyCode };
            }
            export namespace belt {
                const keyCode_22: any;
                export { keyCode_22 as keyCode };
            }
            export namespace balancer {
                const keyCode_23: any;
                export { keyCode_23 as keyCode };
            }
            export namespace underground_belt {
                const keyCode_24: any;
                export { keyCode_24 as keyCode };
            }
            export namespace miner {
                const keyCode_25: any;
                export { keyCode_25 as keyCode };
            }
            export namespace cutter {
                const keyCode_26: any;
                export { keyCode_26 as keyCode };
            }
            export namespace rotater {
                const keyCode_27: any;
                export { keyCode_27 as keyCode };
            }
            export namespace stacker {
                const keyCode_28: any;
                export { keyCode_28 as keyCode };
            }
            export namespace mixer {
                const keyCode_29: any;
                export { keyCode_29 as keyCode };
            }
            export namespace painter {
                const keyCode_30: any;
                export { keyCode_30 as keyCode };
            }
            export namespace trash {
                const keyCode_31: any;
                export { keyCode_31 as keyCode };
            }
            export namespace item_producer {
                const keyCode_32: any;
                export { keyCode_32 as keyCode };
            }
            export namespace storage {
                const keyCode_33: any;
                export { keyCode_33 as keyCode };
            }
            export namespace reader {
                const keyCode_34: any;
                export { keyCode_34 as keyCode };
            }
            export namespace lever {
                const keyCode_35: any;
                export { keyCode_35 as keyCode };
            }
            export namespace filter {
                const keyCode_36: any;
                export { keyCode_36 as keyCode };
            }
            export namespace display {
                const keyCode_37: any;
                export { keyCode_37 as keyCode };
            }
            export namespace wire {
                const keyCode_38: any;
                export { keyCode_38 as keyCode };
            }
            export namespace wire_tunnel {
                const keyCode_39: any;
                export { keyCode_39 as keyCode };
            }
            export namespace constant_signal {
                const keyCode_40: any;
                export { keyCode_40 as keyCode };
            }
            export namespace logic_gate {
                const keyCode_41: any;
                export { keyCode_41 as keyCode };
            }
            export namespace virtual_processor {
                const keyCode_42: any;
                export { keyCode_42 as keyCode };
            }
            export namespace analyzer {
                const keyCode_43: any;
                export { keyCode_43 as keyCode };
            }
            export namespace comparator {
                const keyCode_44: any;
                export { keyCode_44 as keyCode };
            }
            export namespace transistor {
                const keyCode_45: any;
                export { keyCode_45 as keyCode };
            }
        }
        export namespace placement {
            export namespace pipette {
                const keyCode_46: any;
                export { keyCode_46 as keyCode };
            }
            export namespace rotateWhilePlacing {
                const keyCode_47: any;
                export { keyCode_47 as keyCode };
            }
            export namespace rotateInverseModifier {
                const keyCode_48: number;
                export { keyCode_48 as keyCode };
            }
            export namespace rotateToUp {
                export { KEYCODE_UP_ARROW as keyCode };
            }
            export namespace rotateToDown {
                export { KEYCODE_DOWN_ARROW as keyCode };
            }
            export namespace rotateToRight {
                export { KEYCODE_RIGHT_ARROW as keyCode };
            }
            export namespace rotateToLeft {
                export { KEYCODE_LEFT_ARROW as keyCode };
            }
            export namespace cycleBuildingVariants {
                const keyCode_49: any;
                export { keyCode_49 as keyCode };
            }
            export namespace cycleBuildings {
                const keyCode_50: number;
                export { keyCode_50 as keyCode };
            }
            export namespace switchDirectionLockSide {
                const keyCode_51: any;
                export { keyCode_51 as keyCode };
            }
            export namespace copyWireValue {
                const keyCode_52: any;
                export { keyCode_52 as keyCode };
            }
        }
        export namespace massSelect {
            export namespace massSelectStart {
                const keyCode_53: number;
                export { keyCode_53 as keyCode };
            }
            export namespace massSelectSelectMultiple {
                const keyCode_54: number;
                export { keyCode_54 as keyCode };
            }
            export namespace massSelectCopy {
                const keyCode_55: any;
                export { keyCode_55 as keyCode };
            }
            export namespace massSelectCut {
                const keyCode_56: any;
                export { keyCode_56 as keyCode };
            }
            export namespace massSelectClear {
                const keyCode_57: any;
                export { keyCode_57 as keyCode };
            }
            export namespace confirmMassDelete {
                const keyCode_58: number;
                export { keyCode_58 as keyCode };
            }
            export namespace pasteLastBlueprint {
                const keyCode_59: any;
                export { keyCode_59 as keyCode };
            }
        }
        export namespace placementModifiers {
            export namespace lockBeltDirection {
                const keyCode_60: number;
                export { keyCode_60 as keyCode };
            }
            export namespace placementDisableAutoOrientation {
                const keyCode_61: number;
                export { keyCode_61 as keyCode };
            }
            export namespace placeMultiple {
                const keyCode_62: number;
                export { keyCode_62 as keyCode };
            }
            export namespace placeInverse {
                const keyCode_63: number;
                export { keyCode_63 as keyCode };
            }
        }
    }
    export const KEYCODE_LMB: 1;
    export const KEYCODE_MMB: 2;
    export const KEYCODE_RMB: 3;
    export class Keybinding {
        /**
         *
         * @param {KeyActionMapper} keyMapper
         * @param {Application} app
         * @param {object} param0
         * @param {number} param0.keyCode
         * @param {boolean=} param0.builtin
         * @param {boolean=} param0.repeated
         */
        constructor(keyMapper: KeyActionMapper, app: Application, { keyCode, builtin, repeated }: {
            keyCode: number;
            builtin?: boolean | undefined;
            repeated?: boolean | undefined;
        });
        keyMapper: KeyActionMapper;
        app: Application;
        keyCode: number;
        builtin: boolean;
        repeated: boolean;
        signal: Signal;
        toggled: Signal;
        /**
         * Returns whether this binding is currently pressed
         * @returns {boolean}
         */
        get pressed(): boolean;
        /**
         * Adds an event listener
         * @param {function() : void} receiver
         * @param {object=} scope
         */
        add(receiver: () => void, scope?: object | undefined): void;
        /**
         * Adds an event listener
         * @param {function() : void} receiver
         * @param {object=} scope
         */
        addToTop(receiver: () => void, scope?: object | undefined): void;
        /**
         * @param {Element} elem
         * @returns {HTMLElement} the created element, or null if the keybindings are not shown
         *  */
        appendLabelToElement(elem: Element): HTMLElement;
        /**
         * Returns the key code as a nice string
         */
        getKeyCodeString(): string;
        /**
         * Remvoes all signal receivers
         */
        clearSignalReceivers(): void;
    }
    export class KeyActionMapper {
        /**
         *
         * @param {GameRoot} root
         * @param {InputReceiver} inputReciever
         */
        constructor(root: GameRoot, inputReciever: InputReceiver);
        root: GameRoot;
        inputReceiver: InputReceiver;
        /** @type {Object.<string, Keybinding>} */
        keybindings: {
            [x: string]: Keybinding;
        };
        /**
         * Returns all keybindings starting with the given id
         * @param {string} pattern
         * @returns {Array<Keybinding>}
         */
        getKeybindingsStartingWith(pattern: string): Array<Keybinding>;
        /**
         * Forwards the given events to the other mapper (used in tooltips)
         * @param {KeyActionMapper} receiver
         * @param {Array<string>} bindings
         */
        forward(receiver: KeyActionMapper, bindings: Array<string>): void;
        cleanup(): void;
        onPageBlur(): void;
        /**
         * Internal keydown handler
         * @param {object} param0
         * @param {number} param0.keyCode
         * @param {boolean} param0.shift
         * @param {boolean} param0.alt
         * @param {boolean=} param0.initial
         */
        handleKeydown({ keyCode, shift, alt, initial }: {
            keyCode: number;
            shift: boolean;
            alt: boolean;
            initial?: boolean | undefined;
        }): string;
        /**
         * Internal keyup handler
         * @param {object} param0
         * @param {number} param0.keyCode
         * @param {boolean} param0.shift
         * @param {boolean} param0.alt
         */
        handleKeyup({ keyCode, shift, alt }: {
            keyCode: number;
            shift: boolean;
            alt: boolean;
        }): void;
        /**
         * Returns a given keybinding
         * @param {{ keyCode: number }} binding
         * @returns {Keybinding}
         */
        getBinding(binding: {
            keyCode: number;
        }): Keybinding;
    }
    const KEYCODE_UP_ARROW: 38;
    const KEYCODE_DOWN_ARROW: 40;
    const KEYCODE_RIGHT_ARROW: 39;
    const KEYCODE_LEFT_ARROW: 37;
    import { Application } from "application";
    import { Signal } from "core/signal";
    import { GameRoot } from "game/root";
    import { InputReceiver } from "core/input_receiver";
    export {};
}
declare module "game/hud/base_hud_part" {
    export class BaseHUDPart {
        /**
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        /** @type {Array<ClickDetector>} */
        clickDetectors: Array<ClickDetector>;
        /**
         * Should create all require elements
         * @param {HTMLElement} parent
         */
        createElements(parent: HTMLElement): void;
        /**
         * Should initialize the element, called *after* the elements have been created
         */
        initialize(): void;
        /**
         * Should update any required logic
         */
        update(): void;
        /**
         * Should draw the hud
         * @param {DrawParameters} parameters
         */
        draw(parameters: DrawParameters): void;
        /**
         * Should draw any overlays (screen space)
         * @param {DrawParameters} parameters
         */
        drawOverlays(parameters: DrawParameters): void;
        /**
         * Should return true if the widget has a modal dialog opened and thus
         * the game does not need to update / redraw
         * @returns {boolean}
         */
        shouldPauseRendering(): boolean;
        /**
         * Should return false if the game should be paused
         * @returns {boolean}
         */
        shouldPauseGame(): boolean;
        /**
         * Should return true if this overlay is open and currently blocking any user interaction
         */
        isBlockingOverlay(): boolean;
        /**
         * Cleans up the hud element, if overridden make sure to call super.cleanup
         */
        cleanup(): void;
        /**
         * Cleans up all click detectors
         */
        cleanupClickDetectors(): void;
        /**
         * Should close the element, in case its supported
         */
        close(): void;
        /**
         * Helper method to construct a new click detector
         * @param {Element} element The element to listen on
         * @param {function} handler The handler to call on this object
         * @param {import("../../core/click_detector").ClickDetectorConstructorArgs=} args Click detector arguments
         *
         */
        trackClicks(element: Element, handler: Function, args?: import("../../core/click_detector").ClickDetectorConstructorArgs | undefined): void;
        /**
         * Registers a new click detector
         * @param {ClickDetector} detector
         */
        registerClickDetector(detector: ClickDetector): void;
        /**
         * Closes this element when its background is clicked
         * @param {HTMLElement} element
         * @param {function} closeMethod
         */
        closeOnBackgroundClick(element: HTMLElement, closeMethod?: Function): void;
        /**
         * Forwards the game speed keybindings so you can toggle pause / Fastforward
         * in the building tooltip and such
         * @param {KeyActionMapper} sourceMapper
         */
        forwardGameSpeedKeybindings(sourceMapper: KeyActionMapper): void;
        /**
         * Forwards the map movement keybindings so you can move the map with the
         * arrow keys
         * @param {KeyActionMapper} sourceMapper
         */
        forwardMapMovementKeybindings(sourceMapper: KeyActionMapper): void;
    }
    import { GameRoot } from "game/root";
    import { ClickDetector } from "core/click_detector";
    import { DrawParameters } from "core/draw_parameters";
    import { KeyActionMapper } from "game/key_action_mapper";
}
declare module "game/game_mode" {
    export type enumGameModeIds = string;
    export namespace enumGameModeIds {
        export const puzzleEdit: string;
        export const puzzlePlay: string;
        export const regular: string;
    }
    export type enumGameModeTypes = string;
    /** @enum {string} */
    export const enumGameModeTypes: {
        default: string;
        puzzle: string;
    };
    export class GameMode extends BasicSerializableObject {
        /** @returns {string} */
        static getId(): string;
        /** @returns {string} */
        static getType(): string;
        /**
         * @param {GameRoot} root
         * @param {string} [id=Regular]
         * @param {object|undefined} payload
         */
        static create(root: GameRoot, id?: string, payload?: object | undefined): any;
        /**
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        /**
         * @type {Record<string, typeof BaseHUDPart>}
         */
        additionalHudParts: Record<string, typeof BaseHUDPart>;
        /** @type {typeof MetaBuilding[]} */
        hiddenBuildings: (typeof MetaBuilding)[];
        /** @returns {string} */
        getId(): string;
        /** @returns {string} */
        getType(): string;
        /**
         * @param {typeof MetaBuilding} building - Class name of building
         * @returns {boolean}
         */
        isBuildingExcluded(building: typeof MetaBuilding): boolean;
        /** @returns {undefined|Rectangle[]} */
        getBuildableZones(): undefined | Rectangle[];
        /** @returns {Rectangle|undefined} */
        getCameraBounds(): Rectangle | undefined;
        /** @returns {boolean} */
        hasHub(): boolean;
        /** @returns {boolean} */
        hasResources(): boolean;
        /** @returns {boolean} */
        hasAchievements(): boolean;
        /** @returns {number} */
        getMinimumZoom(): number;
        /** @returns {number} */
        getMaximumZoom(): number;
        /** @returns {Object<string, Array>} */
        getUpgrades(): {
            [x: string]: Array;
        };
        throughputDoesNotMatter(): boolean;
        /**
         * @param {number} w
         * @param {number} h
         */
        adjustZone(w?: number, h?: number): void;
        /** @returns {array} */
        getLevelDefinitions(): any[];
        /** @returns {boolean} */
        getIsFreeplayAvailable(): boolean;
        /** @returns {boolean} */
        getIsSaveable(): boolean;
        /** @returns {boolean} */
        getHasFreeCopyPaste(): boolean;
        /** @returns {boolean} */
        getSupportsWires(): boolean;
        /** @returns {boolean} */
        getIsEditor(): boolean;
        /** @returns {boolean} */
        getIsDeterministic(): boolean;
        /** @returns {number | undefined} */
        getFixedTickrate(): number | undefined;
        /** @returns {string} */
        getBlueprintShapeKey(): string;
    }
    import { BasicSerializableObject } from "savegame/serialization";
    import { GameRoot } from "game/root";
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { MetaBuilding } from "game/meta_building";
    import { Rectangle } from "core/rectangle";
}
declare module "core/global_registries" {
    /**
     * @param {Object.<string, Array<Class<MetaBuilding>>>} buildings
     */
    export function initBuildingsByCategory(buildings: {
        [x: string]: Array<any>;
    }): void;
    /**
     * @typedef {import("../game/time/base_game_speed").BaseGameSpeed} BaseGameSpeed
     * @typedef {import("../game/component").Component} Component
     * @typedef {import("../game/base_item").BaseItem} BaseItem
     * @typedef {import("../game/game_mode").GameMode} GameMode
     * @typedef {import("../game/meta_building").MetaBuilding} MetaBuilding
    
    
    // These factories are here to remove circular dependencies
    
    /** @type {SingletonFactoryTemplate<MetaBuilding>} */
    export let gMetaBuildingRegistry: any;
    /** @type {Object.<string, Array<Class<MetaBuilding>>>} */
    export let gBuildingsByCategory: {
        [x: string]: Array<any>;
    };
    /** @type {FactoryTemplate<Component>} */
    export let gComponentRegistry: any;
    /** @type {FactoryTemplate<GameMode>} */
    export let gGameModeRegistry: any;
    /** @type {FactoryTemplate<BaseGameSpeed>} */
    export let gGameSpeedRegistry: any;
    /** @type {FactoryTemplate<BaseItem>} */
    export let gItemRegistry: any;
    export type BaseGameSpeed = import("game/time/base_game_speed").BaseGameSpeed;
    export type Component = import("game/component").Component;
    export type BaseItem = import("game/base_item").BaseItem;
    export type GameMode = import("game/game_mode").GameMode;
    /**
     * // These factories are here to remove circular dependencies
    /**
     */
    export type MetaBuilding = import("game/meta_building").MetaBuilding;
}
declare module "savegame/serializer_internal" {
    export class SerializerInternal {
        /**
         * Serializes an array of entities
         * @param {Array<Entity>} array
         */
        serializeEntityArray(array: Array<Entity>): any[];
        /**
         *
         * @param {GameRoot} root
         * @param {Array<Entity>} array
         * @returns {string|void}
         */
        deserializeEntityArray(root: GameRoot, array: Array<Entity>): string | void;
        /**
         *
         * @param {GameRoot} root
         * @param {Entity} payload
         */
        deserializeEntity(root: GameRoot, payload: Entity): void;
        /**
         * Deserializes components of an entity
         * @param {GameRoot} root
         * @param {Entity} entity
         * @param {Object.<string, any>} data
         * @returns {string|void}
         */
        deserializeComponents(root: GameRoot, entity: Entity, data: {
            [x: string]: any;
        }): string | void;
    }
    import { Entity } from "game/entity";
    import { GameRoot } from "game/root";
}
declare module "game/hud/parts/pinned_shapes" {
    /**
     * Manages the pinned shapes on the left side of the screen
     */
    export class HUDPinnedShapes extends BaseHUDPart {
        constructor(root: any);
        /**
         * Store a list of pinned shapes
         * @type {Array<string>}
         */
        pinnedShapes: Array<string>;
        /**
         * Store handles to the currently rendered elements, so we can update them more
         * convenient. Also allows for cleaning up handles.
         * @type {Array<{
         *  key: string,
         *  definition: ShapeDefinition,
         *  amountLabel: HTMLElement,
         *  lastRenderedValue: string,
         *  element: HTMLElement,
         *  detector?: ClickDetector,
         *  infoDetector?: ClickDetector,
         *  throughputOnly?: boolean
         * }>}
         */
        handles: {
            key: string;
            definition: ShapeDefinition;
            amountLabel: HTMLElement;
            lastRenderedValue: string;
            element: HTMLElement;
            detector?: ClickDetector;
            infoDetector?: ClickDetector;
            throughputOnly?: boolean;
        }[];
        element: HTMLDivElement;
        /**
         * Serializes the pinned shapes
         */
        serialize(): {
            shapes: string[];
        };
        /**
         * Deserializes the pinned shapes
         * @param {{ shapes: Array<string>}} data
         */
        deserialize(data: {
            shapes: Array<string>;
        }): string;
        /**
         * Updates all shapes after an upgrade has been purchased and removes the unused ones
         */
        updateShapesAfterUpgrade(): void;
        /**
         * Finds the current goal for the given key. If the key is the story goal, returns
         * the story goal. If its the blueprint shape, no goal is returned. Otherwise
         * it's searched for upgrades.
         * @param {string} key
         */
        findGoalValueForShape(key: string): any;
        /**
         * Returns whether a given shape is currently pinned
         * @param {string} key
         */
        isShapePinned(key: string): boolean;
        /**
         * Rerenders the whole component
         */
        rerenderFull(): void;
        /**
         * Pins a new shape
         * @param {object} param0
         * @param {string} param0.key
         * @param {boolean=} param0.canUnpin
         * @param {string=} param0.className
         * @param {boolean=} param0.throughputOnly
         */
        internalPinShape({ key, canUnpin, className, throughputOnly }: {
            key: string;
            canUnpin?: boolean | undefined;
            className?: string | undefined;
            throughputOnly?: boolean | undefined;
        }): void;
        /**
         * Unpins a shape
         * @param {string} key
         */
        unpinShape(key: string): void;
        /**
         * Requests to pin a new shape
         * @param {ShapeDefinition} definition
         */
        pinNewShape(definition: ShapeDefinition): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { ShapeDefinition } from "game/shape_definition";
    import { ClickDetector } from "core/click_detector";
}
declare module "core/modal_dialog_forms" {
    export class FormElement {
        constructor(id: any, label: any);
        id: any;
        label: any;
        valueChosen: Signal;
        getHtml(): string;
        getFormElement(parent: any): any;
        bindEvents(parent: any, clickTrackers: any): void;
        focus(): void;
        isValid(): boolean;
        /** @returns {any} */
        getValue(): any;
    }
    export class FormElementInput extends FormElement {
        constructor({ id, label, placeholder, defaultValue, inputType, validator }: {
            id: any;
            label?: any;
            placeholder: any;
            defaultValue?: string;
            inputType?: string;
            validator?: any;
        });
        placeholder: any;
        defaultValue: string;
        inputType: string;
        validator: any;
        element: any;
        updateErrorState(): void;
        setValue(value: any): void;
    }
    export class FormElementCheckbox extends FormElement {
        constructor({ id, label, defaultValue }: {
            id: any;
            label: any;
            defaultValue?: boolean;
        });
        defaultValue: boolean;
        value: boolean;
        element: any;
        toggle(): void;
    }
    export class FormElementItemChooser extends FormElement {
        /**
         *
         * @param {object} param0
         * @param {string} param0.id
         * @param {string=} param0.label
         * @param {Array<BaseItem>} param0.items
         */
        constructor({ id, label, items }: {
            id: string;
            label?: string | undefined;
            items: Array<BaseItem>;
        });
        items: BaseItem[];
        element: any;
        /**
         * @type {BaseItem}
         */
        chosenItem: BaseItem;
    }
    import { Signal } from "core/signal";
    import { BaseItem } from "game/base_item";
}
declare module "core/modal_dialog_elements" {
    /**
     * Basic text based dialog
     */
    export class Dialog {
        /**
         *
         * Constructs a new dialog with the given options
         * @param {object} param0
         * @param {Application} param0.app
         * @param {string} param0.title Title of the dialog
         * @param {string} param0.contentHTML Inner dialog html
         * @param {Array<string>} param0.buttons
         *  Button list, each button contains of up to 3 parts separated by ':'.
         *  Part 0: The id, one of the one defined in dialog_buttons.yaml
         *  Part 1: The style, either good, bad or misc
         *  Part 2 (optional): Additional parameters separated by '/', available are:
         *    timeout: This button is only available after some waiting time
         *    kb_enter: This button is triggered by the enter key
         *    kb_escape This button is triggered by the escape key
         * @param {string=} param0.type The dialog type, either "info" or "warn"
         * @param {boolean=} param0.closeButton Whether this dialog has a close button
         */
        constructor({ app, title, contentHTML, buttons, type, closeButton }: {
            app: Application;
            title: string;
            contentHTML: string;
            buttons: Array<string>;
            type?: string | undefined;
            closeButton?: boolean | undefined;
        });
        app: Application;
        title: string;
        contentHTML: string;
        type: string;
        buttonIds: string[];
        closeButton: boolean;
        closeRequested: Signal;
        buttonSignals: {};
        valueChosen: Signal;
        timeouts: any[];
        clickDetectors: any[];
        inputReciever: InputReceiver;
        enterHandler: string;
        escapeHandler: string;
        /**
         * Internal keydown handler
         * @param {object} param0
         * @param {number} param0.keyCode
         * @param {boolean} param0.shift
         * @param {boolean} param0.alt
         */
        handleKeydown({ keyCode, shift, alt }: {
            keyCode: number;
            shift: boolean;
            alt: boolean;
        }): string;
        internalButtonHandler(id: any, ...payload: any[]): void;
        createElement(): HTMLDivElement;
        dialogElem: HTMLDivElement;
        element: HTMLDivElement;
        setIndex(index: any): void;
        destroy(): void;
        hide(): void;
        show(): void;
        /**
         * Helper method to track clicks on an element
         * @param {Element} elem
         * @param {function():void} handler
         * @param {import("./click_detector").ClickDetectorConstructorArgs=} args
         * @returns {ClickDetector}
         */
        trackClicks(elem: Element, handler: () => void, args?: import("./click_detector").ClickDetectorConstructorArgs | undefined): ClickDetector;
    }
    /**
     * Dialog which simply shows a loading spinner
     */
    export class DialogLoading extends Dialog {
        constructor(app: any, text?: string);
        text: string;
    }
    export class DialogOptionChooser extends Dialog {
        constructor({ app, title, options }: {
            app: any;
            title: any;
            options: any;
        });
        options: any;
        initialOption: any;
    }
    export class DialogWithForm extends Dialog {
        /**
         *
         * @param {object} param0
         * @param {Application} param0.app
         * @param {string} param0.title
         * @param {string} param0.desc
         * @param {array=} param0.buttons
         * @param {string=} param0.confirmButtonId
         * @param {string=} param0.extraButton
         * @param {boolean=} param0.closeButton
         * @param {Array<FormElement>} param0.formElements
         */
        constructor({ app, title, desc, formElements, buttons, confirmButtonId, closeButton, }: {
            app: Application;
            title: string;
            desc: string;
            buttons?: any[] | undefined;
            confirmButtonId?: string | undefined;
            extraButton?: string | undefined;
            closeButton?: boolean | undefined;
            formElements: Array<FormElement>;
        });
        confirmButtonId: string;
        formElements: FormElement[];
        hasAnyInvalid(): boolean;
    }
    import { Application } from "application";
    import { Signal } from "core/signal";
    import { InputReceiver } from "core/input_receiver";
    import { ClickDetector } from "core/click_detector";
    import { FormElement } from "core/modal_dialog_forms";
}
declare module "game/buildings/hub" {
    export class MetaHubBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/camera" {
    export const USER_INTERACT_MOVE: "move";
    export const USER_INTERACT_ZOOM: "zoom";
    export const USER_INTERACT_TOUCHEND: "touchend";
    export type enumMouseButton = string;
    export namespace enumMouseButton {
        export const left: string;
        export const middle: string;
        export const right: string;
    }
    export class Camera extends BasicSerializableObject {
        static getId(): string;
        static getSchema(): {
            zoomLevel: import("savegame/serialization_data_types").TypeNumber;
            center: import("savegame/serialization_data_types").TypeVector;
        };
        constructor(root: any);
        /** @type {GameRoot} */
        root: GameRoot;
        zoomLevel: number;
        /** @type {Vector} */
        center: Vector;
        currentlyMoving: boolean;
        lastMovingPosition: Vector;
        lastMovingPositionLastTick: any;
        numTicksStandingStill: number;
        cameraUpdateTimeBucket: number;
        didMoveSinceTouchStart: boolean;
        currentlyPinching: boolean;
        lastPinchPositions: Vector[];
        keyboardForce: Vector;
        userInteraction: Signal;
        /** @type {Vector} */
        currentShake: Vector;
        /** @type {Vector} */
        currentPan: Vector;
        /** @type {Vector} */
        desiredPan: Vector;
        /** @type {Vector} */
        desiredCenter: Vector;
        /** @type {number} */
        desiredZoom: number;
        /** @type {Vector} */
        touchPostMoveVelocity: Vector;
        downPreHandler: any;
        movePreHandler: any;
        upPostHandler: any;
        addScreenShake(amount: any): void;
        /**
         * Sets a point in world space to focus on
         * @param {Vector} center
         */
        setDesiredCenter(center: Vector): void;
        /**
         * Sets a desired zoom level
         * @param {number} zoom
         */
        setDesiredZoom(zoom: number): void;
        /**
         * Returns if this camera is currently moving by a non-user interaction
         */
        isCurrentlyMovingToDesiredCenter(): boolean;
        /**
         * Sets the camera pan, every frame the camera will move by this amount
         * @param {Vector} pan
         */
        setPan(pan: Vector): void;
        /**
         * Finds a good initial zoom level
         */
        findInitialZoom(): number;
        /**
         * Clears all animations
         */
        clearAnimations(): void;
        /**
         * Returns if the user is currently interacting with the camera
         * @returns {boolean} true if the user interacts
         */
        isCurrentlyInteracting(): boolean;
        /**
         * Returns if in the next frame the viewport will change
         * @returns {boolean} true if it willchange
         */
        viewportWillChange(): boolean;
        /**
         * Cancels all interactions, that is user interaction and non user interaction
         */
        cancelAllInteractions(): void;
        /**
         * Returns effective viewport width
         */
        getViewportWidth(): number;
        /**
         * Returns effective viewport height
         */
        getViewportHeight(): number;
        /**
         * Returns effective world space viewport left
         */
        getViewportLeft(): number;
        /**
         * Returns effective world space viewport right
         */
        getViewportRight(): any;
        /**
         * Returns effective world space viewport top
         */
        getViewportTop(): number;
        /**
         * Returns effective world space viewport bottom
         */
        getViewportBottom(): any;
        /**
         * Returns the visible world space rect
         * @returns {Rectangle}
         */
        getVisibleRect(): Rectangle;
        getIsMapOverlayActive(): boolean;
        /**
         * Attaches all event listeners
         */
        internalInitEvents(): void;
        eventListenerTouchStart: any;
        eventListenerTouchEnd: any;
        eventListenerTouchMove: any;
        eventListenerMousewheel: any;
        eventListenerMouseDown: any;
        eventListenerMouseMove: any;
        eventListenerMouseUp: any;
        /**
         * Cleans up all event listeners
         */
        cleanup(): void;
        /**
         * Binds the arrow keys
         */
        bindKeys(): void;
        centerOnMap(): void;
        /**
         * Converts from screen to world space
         * @param {Vector} screen
         * @returns {Vector} world space
         */
        screenToWorld(screen: Vector): Vector;
        /**
         * Converts from world to screen space
         * @param {Vector} world
         * @returns {Vector} screen space
         */
        worldToScreen(world: Vector): Vector;
        /**
         * Returns if a point is on screen
         * @param {Vector} point
         * @returns {boolean} true if its on screen
         */
        isWorldPointOnScreen(point: Vector): boolean;
        getMaximumZoom(): number;
        getMinimumZoom(): number;
        /**
         * Returns if we can further zoom in
         * @returns {boolean}
         */
        canZoomIn(): boolean;
        /**
         * Returns if we can further zoom out
         * @returns {boolean}
         */
        canZoomOut(): boolean;
        /**
         * Checks if the mouse event is too close after a touch event and thus
         * should get ignored
         */
        checkPreventDoubleMouse(): boolean;
        /**
         * Mousedown handler
         * @param {MouseEvent} event
         */
        onMouseDown(event: MouseEvent): boolean;
        /**
         * Mousemove handler
         * @param {MouseEvent} event
         */
        onMouseMove(event: MouseEvent): boolean;
        /**
         * Mouseup handler
         * @param {MouseEvent=} event
         */
        onMouseUp(event?: MouseEvent | undefined): boolean;
        /**
         * Mousewheel event
         * @param {WheelEvent} event
         */
        onMouseWheel(event: WheelEvent): boolean;
        /**
         * Touch start handler
         * @param {TouchEvent} event
         */
        onTouchStart(event: TouchEvent): boolean;
        /**
         * Touch move handler
         * @param {TouchEvent} event
         */
        onTouchMove(event: TouchEvent): boolean;
        /**
         * Touch end and cancel handler
         * @param {TouchEvent=} event
         */
        onTouchEnd(event?: TouchEvent | undefined): boolean;
        /**
         * Internal touch start handler
         * @param {number} x
         * @param {number} y
         */
        combinedSingleTouchStartHandler(x: number, y: number): void;
        /**
         * Internal touch move handler
         * @param {number} x
         * @param {number} y
         */
        combinedSingleTouchMoveHandler(x: number, y: number): boolean;
        /**
         * Internal touch stop handler
         */
        combinedSingleTouchStopHandler(x: any, y: any): void;
        /**
         * Clamps the camera zoom level within the allowed range
         */
        clampZoomLevel(): void;
        /**
         * Clamps the center within set boundaries
         */
        clampToBounds(): void;
        /**
         * Updates the camera
         * @param {number} dt Delta time in milliseconds
         */
        update(dt: number): void;
        /**
         * Prepares a context to transform it
         * @param {CanvasRenderingContext2D} context
         */
        transform(context: CanvasRenderingContext2D): void;
        /**
         * Internal shake handler
         * @param {number} now Time now in seconds
         * @param {number} dt Delta time
         */
        internalUpdateShake(now: number, dt: number): void;
        /**
         * Internal pan handler
         * @param {number} now Time now in seconds
         * @param {number} dt Delta time
         */
        internalUpdatePanning(now: number, dt: number): void;
        /**
         * Internal screen panning handler
         * @param {number} now
         * @param {number} dt
         */
        internalUpdateMousePanning(now: number, dt: number): void;
        /**
         * Updates the non user interaction zooming
         * @param {number} now Time now in seconds
         * @param {number} dt Delta time
         */
        internalUpdateZooming(now: number, dt: number): void;
        /**
         * Updates the non user interaction centering
         * @param {number} now Time now in seconds
         * @param {number} dt Delta time
         */
        internalUpdateCentering(now: number, dt: number): void;
        /**
         * Updates the keyboard forces
         * @param {number} now
         * @param {number} dt Delta time
         */
        internalUpdateKeyboardForce(now: number, dt: number): void;
    }
    import { BasicSerializableObject } from "savegame/serialization";
    import { GameRoot } from "game/root";
    import { Vector } from "core/vector";
    import { Signal } from "core/signal";
    import { Rectangle } from "core/rectangle";
}
declare module "core/tracked_state" {
    export class TrackedState {
        constructor(callbackMethod?: any, callbackScope?: any);
        lastSeenValue: any;
        callback: any;
        set(value: any, changeHandler?: any, changeScope?: any): void;
        setSilent(value: any): void;
        get(): any;
    }
}
declare module "game/hud/dynamic_dom_attach" {
    export class DynamicDomAttach {
        /**
         *
         * @param {GameRoot} root
         * @param {HTMLElement} element
         * @param {object} param2
         * @param {number=} param2.timeToKeepSeconds How long to keep the element visible (in ms) after it should be hidden.
         *                                           Useful for fade-out effects
         * @param {string=} param2.attachClass If set, attaches a class while the element is visible
         * @param {boolean=} param2.trackHover If set, attaches the 'hovered' class if the cursor is above the element. Useful
         *                                     for fading out the element if its below the cursor for example.
         */
        constructor(root: GameRoot, element: HTMLElement, { timeToKeepSeconds, attachClass, trackHover }?: {
            timeToKeepSeconds?: number | undefined;
            attachClass?: string | undefined;
            trackHover?: boolean | undefined;
        });
        /** @type {GameRoot} */
        root: GameRoot;
        /** @type {HTMLElement} */
        element: HTMLElement;
        parent: HTMLElement;
        attachClass: string;
        trackHover: boolean;
        timeToKeepSeconds: number;
        lastVisibleTime: number;
        attached: boolean;
        internalIsClassAttached: any;
        classAttachTimeout: number;
        /** @type {DOMRect} */
        lastComputedBounds: DOMRect;
        lastComputedBoundsTime: number;
        trackedIsHovered: TrackedState;
        /**
         * Internal method to attach the element
         */
        internalAttach(): void;
        /**
         * Internal method to detach the element
         */
        internalDetach(): void;
        /**
         * Returns whether the element is currently attached
         */
        isAttached(): boolean;
        /**
         * Actually sets the 'hovered' class
         * @param {boolean} isHovered
         */
        setIsHoveredClass(isHovered: boolean): void;
        /**
         * Call this every frame, and the dom attach class will take care of
         * everything else
         * @param {boolean} isVisible Whether the element should currently be visible or not
         */
        update(isVisible: boolean): void;
    }
    import { GameRoot } from "game/root";
    import { TrackedState } from "core/tracked_state";
}
declare module "game/hud/parts/notifications" {
    export type enumNotificationType = string;
    export namespace enumNotificationType {
        export const saved: string;
        export const upgrade: string;
        export const success: string;
    }
    export class HUDNotifications extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        /** @type {Array<{ element: HTMLElement, expireAt: number}>} */
        notificationElements: {
            element: HTMLElement;
            expireAt: number;
        }[];
        /**
         * @param {string} message
         * @param {enumNotificationType} type
         */
        onNotification(message: string, type: enumNotificationType): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "game/hud/parts/waypoints" {
    export class HUDWaypoints extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        hintElement: HTMLDivElement;
        waypointsListElement: HTMLDivElement;
        /**
         * Serializes the waypoints
         */
        serialize(): {
            waypoints: {
                label: string | null;
                center: {
                    x: number;
                    y: number;
                };
                zoomLevel: number;
                layer: any;
            }[];
        };
        /**
         * Deserializes the waypoints
         * @param {{waypoints: Array<Waypoint>}} data
         */
        deserialize(data: {
            waypoints: Array<Waypoint>;
        }): string;
        waypoints: Array<Waypoint>;
        waypointSprites: {
            regular: import("core/sprites").AtlasSprite;
            wires: import("core/sprites").AtlasSprite;
        };
        directionIndicatorSprite: import("core/sprites").AtlasSprite;
        dummyBuffer: CanvasRenderingContext2D;
        domAttach: DynamicDomAttach;
        /**
         * Stores at how much opacity the markers should be rendered on the map.
         * This is interpolated over multiple frames so we have some sort of fade effect
         */
        currentMarkerOpacity: any;
        currentCompassOpacity: any;
        compassBuffer: {
            canvas: HTMLCanvasElement;
            context: CanvasRenderingContext2D;
        };
        /**
         * Stores a cache from a shape short key to its canvas representation
         */
        cachedKeyToCanvas: {};
        /**
         * Store cached text widths
         * @type {Object<string, number>}
         */
        cachedTextWidths: {
            [x: string]: number;
        };
        /**
         * Returns how long a text will be rendered
         * @param {string} text
         * @returns {number}
         */
        getTextWidth(text: string): number;
        /**
         * Returns how big the text should be rendered
         */
        getTextScale(): number;
        /**
         * Returns the scale for rendering waypoints
         */
        getWaypointUiScale(): number;
        /**
         * Re-renders the waypoint list to account for changes
         */
        rerenderWaypointList(): void;
        /**
         * Moves the camera to a given waypoint
         * @param {Waypoint} waypoint
         */
        moveToWaypoint(waypoint: Waypoint): void;
        /**
         * Deletes a waypoint from the list
         * @param {Waypoint} waypoint
         */
        deleteWaypoint(waypoint: Waypoint): void;
        /**
         * Gets the canvas for a given waypoint
         * @param {Waypoint} waypoint
         * @returns {HTMLCanvasElement}
         */
        getWaypointCanvas(waypoint: Waypoint): HTMLCanvasElement;
        /**
         * Requests to save a marker at the current camera position. If worldPos is set,
         * uses that position instead.
         * @param {object} param0
         * @param {Vector=} param0.worldPos Override the world pos, otherwise it is the camera position
         * @param {Waypoint=} param0.waypoint Waypoint to be edited. If omitted, create new
         */
        requestSaveMarker({ worldPos, waypoint }: {
            worldPos?: Vector | undefined;
            waypoint?: Waypoint | undefined;
        }): void;
        /**
         * Adds a new waypoint at the given location with the given label
         * @param {string} label
         * @param {Vector} position
         */
        addWaypoint(label: string, position: Vector): void;
        /**
         * Renames a waypoint with the given label
         * @param {Waypoint} waypoint
         * @param {string} label
         */
        renameWaypoint(waypoint: Waypoint, label: string): void;
        /**
         * Sort waypoints by name
         */
        sortWaypoints(): void;
        /**
         * Returns the label for a given waypoint
         * @param {Waypoint} waypoint
         * @returns {string}
         */
        getWaypointLabel(waypoint: Waypoint): string;
        /**
         * Returns if a waypoint is deletable
         * @param {Waypoint} waypoint
         * @returns {boolean}
         */
        isWaypointDeletable(waypoint: Waypoint): boolean;
        /**
         * Returns the screen space bounds of the given waypoint or null
         * if it couldn't be determined. Also returns wheter its a shape or not
         * @param {Waypoint} waypoint
         * @return {{
         *   screenBounds: Rectangle
         *   item: BaseItem|null,
         *   text: string
         * }}
         */
        getWaypointScreenParams(waypoint: Waypoint): {
            screenBounds: Rectangle;
            item: BaseItem | null;
            text: string;
        };
        /**
         * Finds the currently intersected waypoint on the map overview under
         * the cursor.
         *
         * @returns {Waypoint | null}
         */
        findCurrentIntersectedWaypoint(): Waypoint | null;
        /**
         * Mouse-Down handler
         * @param {Vector} pos
         * @param {enumMouseButton} button
         */
        onMouseDown(pos: Vector, button: enumMouseButton): string;
        /**
         * Rerenders the compass
         */
        rerenderWaypointsCompass(): void;
    }
    export type Waypoint = {
        label: string | null;
        center: {
            x: number;
            y: number;
        };
        zoomLevel: number;
        layer: any;
    };
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { Vector } from "core/vector";
    import { Rectangle } from "core/rectangle";
    import { BaseItem } from "game/base_item";
    import { enumMouseButton } from "game/camera";
}
declare module "savegame/savegame_typedefs" {
    var _default: {};
    export default _default;
    export type Entity = import("game/entity").Entity;
    export type SavegameStats = {
        failedMam: boolean;
        trashedCount: number;
        usedInverseRotater: boolean;
    };
    export type SerializedGame = {
        camera: any;
        time: any;
        entityMgr: any;
        map: any;
        gameMode: object;
        hubGoals: any;
        pinnedShapes: any;
        waypoints: any;
        entities: Array<Entity>;
        beltPaths: Array<any>;
    };
    export type SavegameData = {
        version: number;
        dump: SerializedGame;
        stats: SavegameStats;
        lastUpdate: number;
    };
    export type SavegameMetadata = {
        lastUpdate: number;
        version: number;
        internalId: string;
        level: number;
        name: string | null;
    };
    export type SavegamesData = {
        version: number;
        savegames: Array<SavegameMetadata>;
    };
    export type PuzzleMetadata = {
        id: number;
        shortKey: string;
        likes: number;
        downloads: number;
        completions: number;
        difficulty: number | null;
        averageTime: number | null;
        title: string;
        author: string;
        completed: boolean;
    };
    export type PuzzleGameBuildingConstantProducer = {
        type: "emitter";
        item: string;
        pos: {
            x: number;
            y: number;
            r: number;
        };
    };
    export type PuzzleGameBuildingGoal = {
        type: "goal";
        item: string;
        pos: {
            x: number;
            y: number;
            r: number;
        };
    };
    export type PuzzleGameBuildingBlock = {
        type: "block";
        pos: {
            x: number;
            y: number;
            r: number;
        };
    };
    export type PuzzleGameData = {
        version: number;
        bounds: {
            w: number;
            h: number;
        };
        buildings: (PuzzleGameBuildingGoal | PuzzleGameBuildingConstantProducer | PuzzleGameBuildingBlock)[];
        excludedBuildings: Array<string>;
    };
    export type PuzzleFullData = {
        meta: PuzzleMetadata;
        game: PuzzleGameData;
    };
}
declare module "savegame/savegame_serializer" {
    /**
     * Serializes a savegame
     */
    export class SavegameSerializer {
        internal: SerializerInternal;
        /**
         * Serializes the game root into a dump
         * @param {GameRoot} root
         * @param {boolean=} sanityChecks Whether to check for validity
         * @returns {object}
         */
        generateDumpFromGameRoot(root: GameRoot, sanityChecks?: boolean | undefined): object;
        /**
         * Verifies if there are logical errors in the savegame
         * @param {SerializedGame} savegame
         * @returns {ExplainedResult}
         */
        verifyLogicalErrors(savegame: SerializedGame): ExplainedResult;
        /**
         * Tries to load the savegame from a given dump
         * @param {SerializedGame} savegame
         * @param {GameRoot} root
         * @returns {ExplainedResult}
         */
        deserialize(savegame: SerializedGame, root: GameRoot): ExplainedResult;
    }
    export type Component = import("game/component").Component;
    export type StaticComponent = typeof import("game/component").Component;
    export type Entity = import("game/entity").Entity;
    export type GameRoot = import("game/root").GameRoot;
    export type SerializedGame = {
        camera: any;
        time: any;
        entityMgr: any;
        map: any;
        gameMode: any;
        hubGoals: any;
        pinnedShapes: any;
        waypoints: any;
        entities: import("game/entity").Entity[];
        beltPaths: any[];
    };
    import { SerializerInternal } from "savegame/serializer_internal";
    import { ExplainedResult } from "core/explained_result";
}
declare module "savegame/serialization" {
    /**
     * Serializes an object using the given schema, mergin with the given properties
     * @param {object} obj The object to serialize
     * @param {Schema} schema The schema to use
     * @param {object=} mergeWith Any additional properties to merge with the schema, useful for super calls
     * @returns {object} Serialized data object
     */
    export function serializeSchema(obj: object, schema: Schema, mergeWith?: object | undefined): object;
    /**
     * Deserializes data into an object
     * @param {object} obj The object to store the deserialized data into
     * @param {Schema} schema The schema to use
     * @param {object} data The serialized data
     * @param {string|void|null=} baseclassErrorResult Convenience, if this is a string error code, do nothing and return it
     * @param {import("../game/root").GameRoot=} root Optional game root reference
     * @returns {string|void} String error code or nothing on success
     */
    export function deserializeSchema(obj: object, schema: Schema, data: object, baseclassErrorResult?: (string | void | null) | undefined, root?: import("game/root").GameRoot | undefined): string | void;
    /**
     * Verifies stored data using the given schema
     * @param {Schema} schema The schema to use
     * @param {object} data The data to verify
     * @returns {string|void} String error code or nothing on success
     */
    export function verifySchema(schema: Schema, data: object): string | void;
    /**
     * Extends a schema by adding the properties from the new schema to the existing base schema
     * @param {Schema} base
     * @param {Schema} newOne
     * @returns {Schema}
     */
    export function extendSchema(base: Schema, newOne: Schema): Schema;
    export const types: {
        int: TypeInteger;
        uint: TypePositiveInteger;
        float: TypeNumber;
        ufloat: TypePositiveNumber;
        string: TypeString;
        entity: TypeEntity;
        weakEntityRef: TypeEntityWeakref;
        vector: TypeVector;
        tileVector: TypeVector;
        bool: TypeBoolean;
        /**
         * @param {BaseDataType} wrapped
         */
        nullable(wrapped: BaseDataType): TypeNullable;
        /**
         * @param {FactoryTemplate<*>|SingletonFactoryTemplate<*>} registry
         */
        classId(registry: any | any): TypeClassId;
        /**
         * @param {BaseDataType} valueType
         * @param {boolean=} includeEmptyValues
         */
        keyValueMap(valueType: BaseDataType, includeEmptyValues?: boolean | undefined): TypeKeyValueMap;
        /**
         * @param {Object<string, any>} values
         */
        enum(values: {
            [x: string]: any;
        }): TypeEnum;
        /**
         * @param {FactoryTemplate<*>} registry
         * @param {(GameRoot, any) => object=} resolver
         */
        obj(registry: any, resolver?: (GameRoot: any, any: any) => object): TypeClass;
        /**
         * @param {FactoryTemplate<*>} registry
         */
        objData(registry: any): TypeClassData;
        /**
         * @param {typeof BasicSerializableObject} cls
         */
        knownType(cls: typeof BasicSerializableObject): TypeFixedClass;
        /**
         * @param {BaseDataType} innerType
         */
        array(innerType: BaseDataType): TypeArray;
        /**
         * @param {BaseDataType} innerType
         */
        fixedSizeArray(innerType: BaseDataType): TypeArray;
        /**
         * @param {SingletonFactoryTemplate<*>} innerType
         */
        classRef(registry: any): TypeMetaClass;
        /**
         * @param {Object.<string, BaseDataType>} descriptor
         */
        structured(descriptor: {
            [x: string]: BaseDataType;
        }): TypeStructuredObject;
        /**
         * @param {BaseDataType} a
         * @param {BaseDataType} b
         */
        pair(a: BaseDataType, b: BaseDataType): TypePair;
        /**
         * @param {typeof BasicSerializableObject} classHandle
         * @param {SingletonFactoryTemplate<*>} registry
         */
        classWithMetaclass(classHandle: typeof BasicSerializableObject, registry: any): TypeClassFromMetaclass;
    };
    export class BasicSerializableObject {
        static getId(): void;
        /**
         * Should return the serialization schema
         * @returns {Schema}
         */
        static getSchema(): Schema;
        /** @returns {Schema} */
        static getCachedSchema(): Schema;
        /** @returns {string|void} */
        static verify(data: any): string | void;
        /**
         * Fixes typeof DerivedComponent is not assignable to typeof Component, compiled out
         * in non-dev builds
         */
        constructor(...args: any[]);
        /** @returns {object} */
        serialize(): object;
        /**
         * @param {any} data
         * @param {import("./savegame_serializer").GameRoot} root
         * @returns {string|void}
         */
        deserialize(data: any, root?: import("./savegame_serializer").GameRoot): string | void;
    }
    /**
     * A full schema declaration
     */
    export type Schema = {
        [x: string]: BaseDataType;
    };
    import { TypeInteger } from "savegame/serialization_data_types";
    import { TypePositiveInteger } from "savegame/serialization_data_types";
    import { TypeNumber } from "savegame/serialization_data_types";
    import { TypePositiveNumber } from "savegame/serialization_data_types";
    import { TypeString } from "savegame/serialization_data_types";
    import { TypeEntity } from "savegame/serialization_data_types";
    import { TypeEntityWeakref } from "savegame/serialization_data_types";
    import { TypeVector } from "savegame/serialization_data_types";
    import { TypeBoolean } from "savegame/serialization_data_types";
    import { BaseDataType } from "savegame/serialization_data_types";
    import { TypeNullable } from "savegame/serialization_data_types";
    import { TypeClassId } from "savegame/serialization_data_types";
    import { TypeKeyValueMap } from "savegame/serialization_data_types";
    import { TypeEnum } from "savegame/serialization_data_types";
    import { TypeClass } from "savegame/serialization_data_types";
    import { TypeClassData } from "savegame/serialization_data_types";
    import { TypeFixedClass } from "savegame/serialization_data_types";
    import { TypeArray } from "savegame/serialization_data_types";
    import { TypeMetaClass } from "savegame/serialization_data_types";
    import { TypeStructuredObject } from "savegame/serialization_data_types";
    import { TypePair } from "savegame/serialization_data_types";
    import { TypeClassFromMetaclass } from "savegame/serialization_data_types";
}
declare module "game/time/regular_game_speed" {
    export class RegularGameSpeed extends BaseGameSpeed {
        constructor(root: import("game/root").GameRoot);
    }
    import { BaseGameSpeed } from "game/time/base_game_speed";
}
declare module "game/time/paused_game_speed" {
    export class PausedGameSpeed extends BaseGameSpeed {
        constructor(root: import("game/root").GameRoot);
    }
    import { BaseGameSpeed } from "game/time/base_game_speed";
}
declare module "game/time/game_time" {
    export class GameTime extends BasicSerializableObject {
        static getId(): string;
        static getSchema(): {
            timeSeconds: import("savegame/serialization_data_types").TypeNumber;
            speed: import("savegame/serialization_data_types").TypeClass;
            realtimeSeconds: import("savegame/serialization_data_types").TypeNumber;
        };
        /**
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        timeSeconds: number;
        realtimeSeconds: any;
        realtimeAdjust: any;
        /** @type {BaseGameSpeed} */
        speed: BaseGameSpeed;
        logicTimeBudget: number;
        /**
         * Fetches the new "real" time, called from the core once per frame, since performance now() is kinda slow
         */
        updateRealtimeNow(): void;
        /**
         * Returns the ingame time in milliseconds
         */
        getTimeMs(): number;
        /**
         * Returns how many seconds we are in the grace period
         * @returns {number}
         */
        getRemainingGracePeriodSeconds(): number;
        /**
         * Returns if we are currently in the grace period
         * @returns {boolean}
         */
        getIsWithinGracePeriod(): boolean;
        /**
         * Internal method to generate new logic time budget
         * @param {number} deltaMs
         */
        internalAddDeltaToBudget(deltaMs: number): void;
        /**
         * Performs update ticks based on the queued logic budget
         * @param {number} deltaMs
         * @param {function():boolean} updateMethod
         */
        performTicks(deltaMs: number, updateMethod: () => boolean): void;
        /**
         * Returns ingame time in seconds
         * @returns {number} seconds
         */
        now(): number;
        /**
         * Returns "real" time in seconds
         * @returns {number} seconds
         */
        realtimeNow(): number;
        /**
         * Returns "real" time in seconds
         * @returns {number} seconds
         */
        systemNow(): number;
        getIsPaused(): boolean;
        getSpeed(): BaseGameSpeed;
        setSpeed(speed: any): void;
    }
    import { BasicSerializableObject } from "savegame/serialization";
    import { GameRoot } from "game/root";
    import { BaseGameSpeed } from "game/time/base_game_speed";
}
declare module "game/entity_manager" {
    export class EntityManager extends BasicSerializableObject {
        static getId(): string;
        static getSchema(): {
            nextUid: import("savegame/serialization_data_types").TypePositiveInteger;
        };
        constructor(root: any);
        /** @type {GameRoot} */
        root: GameRoot;
        /** @type {Array<Entity>} */
        entities: Array<Entity>;
        /** @type {Array<Entity>} */
        destroyList: Array<Entity>;
        /** @type {Object.<string, Array<Entity>>} */
        componentToEntity: {
            [x: string]: Array<Entity>;
        };
        nextUid: number;
        getStatsText(): string;
        update(): void;
        /**
         * Registers a new entity
         * @param {Entity} entity
         * @param {number=} uid Optional predefined uid
         */
        registerEntity(entity: Entity, uid?: number | undefined): void;
        /**
         * Generates a new uid
         * @returns {number}
         */
        generateUid(): number;
        /**
         * Call to attach a new component after the creation of the entity
         * @param {Entity} entity
         * @param {Component} component
         */
        attachDynamicComponent(entity: Entity, component: Component): void;
        /**
         * Call to remove a component after the creation of the entity
         * @param {Entity} entity
         * @param {typeof Component} component
         */
        removeDynamicComponent(entity: Entity, component: typeof Component): void;
        /**
         * Finds an entity buy its uid, kinda slow since it loops over all entities
         * @param {number} uid
         * @param {boolean=} errorWhenNotFound
         * @returns {Entity}
         */
        findByUid(uid: number, errorWhenNotFound?: boolean | undefined): Entity;
        /**
         * Returns a map which gives a mapping from UID to Entity.
         * This map is not updated.
         *
         * @returns {Map<number, Entity>}
         */
        getFrozenUidSearchMap(): any;
        /**
         * Returns all entities having the given component
         * @param {typeof Component} componentHandle
         * @returns {Array<Entity>} entities
         */
        getAllWithComponent(componentHandle: typeof Component): Array<Entity>;
        /**
         * Unregisters all components of an entity from the component to entity mapping
         * @param {Entity} entity
         */
        unregisterEntityComponents(entity: Entity): void;
        processDestroyList(): void;
        /**
         * Queues an entity for destruction
         * @param {Entity} entity
         */
        destroyEntity(entity: Entity): void;
    }
    import { BasicSerializableObject } from "savegame/serialization";
    import { GameRoot } from "game/root";
    import { Entity } from "game/entity";
    import { Component } from "game/component";
}
declare module "game/buildings/belt" {
    export const arrayBeltVariantToRotation: string[];
    export const beltOverlayMatrices: {
        [x: string]: {
            [x: number]: number[];
        };
    };
    export class MetaBeltBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/systems/belt" {
    export const BELT_ANIM_COUNT: 14;
    /**
     * Manages all belts
     */
    export class BeltSystem extends GameSystemWithFilter {
        constructor(root: any);
        /**
         * @type {Object.<enumDirection, Array<AtlasSprite>>}
         */
        beltSprites: any;
        /**
         * @type {Object.<enumDirection, Array<AtlasSprite>>}
         */
        beltAnimations: any;
        /** @type {Array<BeltPath>} */
        beltPaths: Array<BeltPath>;
        /**
         * Serializes all belt paths
         * @returns {Array<object>}
         */
        serializePaths(): Array<object>;
        /**
         * Deserializes all belt paths
         * @param {Array<any>} data
         */
        deserializePaths(data: Array<any>): string;
        /**
         * Updates the belt placement after an entity has been added / deleted
         * @param {Entity} entity
         */
        updateSurroundingBeltPlacement(entity: Entity): void;
        /**
         * Called when an entity got destroyed
         * @param {Entity} entity
         */
        onEntityDestroyed(entity: Entity): void;
        /**
         * Attempts to delete the belt from its current path
         * @param {BeltPath} path
         * @param {Entity} entity
         */
        deleteEntityFromPath(path: BeltPath, entity: Entity): void;
        /**
         * Adds the given entity to the appropriate paths
         * @param {Entity} entity
         */
        addEntityToPaths(entity: Entity): void;
        /**
         * Called when an entity got added
         * @param {Entity} entity
         */
        onEntityAdded(entity: Entity): void;
        /**
         * Draws all belt paths
         * @param {DrawParameters} parameters
         */
        drawBeltItems(parameters: DrawParameters): void;
        /**
         * Verifies all belt paths
         */
        debug_verifyBeltPaths(): void;
        /**
         * Finds the follow up entity for a given belt. Used for building the dependencies
         * @param {Entity} entity
         * @returns {Entity|null}
         */
        findFollowUpEntity(entity: Entity): Entity | null;
        /**
         * Finds the supplying belt for a given belt. Used for building the dependencies
         * @param {Entity} entity
         * @returns {Entity|null}
         */
        findSupplyingEntity(entity: Entity): Entity | null;
        /**
         * Recomputes the belt path network. Only required for old savegames
         */
        recomputeAllBeltPaths(): void;
        /**
         * Draws a given chunk
         * @param {DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
        /**
         * Draws the belt path debug overlays
         * @param {DrawParameters} parameters
         */
        drawBeltPathDebug(parameters: DrawParameters): void;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { BeltPath } from "game/belt_path";
    import { Entity } from "game/entity";
    import { DrawParameters } from "core/draw_parameters";
    import { MapChunkView } from "game/map_chunk_view";
}
declare module "game/systems/item_ejector" {
    export class ItemEjectorSystem extends GameSystemWithFilter {
        constructor(root: any);
        staleAreaDetector: StaleAreaDetector;
        /**
         * Recomputes an area after it changed
         * @param {Rectangle} area
         */
        recomputeArea(area: Rectangle): void;
        /**
         * Recomputes the whole cache after the game has loaded
         */
        recomputeCacheFull(): void;
        /**
         * @param {Entity} entity
         */
        recomputeSingleEntityCache(entity: Entity): void;
        /**
         *
         * @param {BaseItem} item
         * @param {Entity} receiver
         * @param {number} slotIndex
         */
        tryPassOverItem(item: BaseItem, receiver: Entity, slotIndex: number): boolean;
        /**
         * @param {DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { StaleAreaDetector } from "core/stale_area_detector";
    import { Rectangle } from "core/rectangle";
    import { Entity } from "game/entity";
    import { BaseItem } from "game/base_item";
    import { DrawParameters } from "core/draw_parameters";
    import { MapChunkView } from "game/map_chunk_view";
}
declare module "game/systems/map_resources" {
    export class MapResourcesSystem extends GameSystem {
        constructor(root: import("game/root").GameRoot);
        /**
         * Draws the map resources
         * @param {DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
        /**
         *
         * @param {MapChunkView} chunk
         * @param {HTMLCanvasElement} canvas
         * @param {CanvasRenderingContext2D} context
         * @param {number} w
         * @param {number} h
         * @param {number} dpi
         */
        generateChunkBackground(chunk: MapChunkView, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, w: number, h: number, dpi: number): void;
    }
    import { GameSystem } from "game/game_system";
    import { DrawParameters } from "core/draw_parameters";
    import { MapChunkView } from "game/map_chunk_view";
}
declare module "game/systems/miner" {
    export class MinerSystem extends GameSystemWithFilter {
        constructor(root: any);
        needsRecompute: boolean;
        /**
         * Called whenever an entity got changed
         * @param {Entity} entity
         */
        onEntityChanged(entity: Entity): void;
        /**
         * Finds the target chained miner for a given entity
         * @param {Entity} entity
         * @returns {Entity|false} The chained entity or null if not found
         */
        findChainedMiner(entity: Entity): Entity | false;
        /**
         *
         * @param {Entity} entity
         * @param {BaseItem} item
         */
        tryPerformMinerEject(entity: Entity, item: BaseItem): boolean;
        /**
         *
         * @param {DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { Entity } from "game/entity";
    import { BaseItem } from "game/base_item";
    import { DrawParameters } from "core/draw_parameters";
    import { MapChunkView } from "game/map_chunk_view";
}
declare module "game/systems/item_processor" {
    /**
     * Whole data for a produced item
     *
     * @typedef {{
     *   item: BaseItem,
     *   preferredSlot?: number,
     *   requiredSlot?: number,
     *   doNotTrack?: boolean
     * }} ProducedItem
     */
    /**
     * Type of a processor implementation
     * @typedef {{
     *   entity: Entity,
     *   items: Map<number, BaseItem>,
     *   inputCount: number,
     *   outItems: Array<ProducedItem>
     *   }} ProcessorImplementationPayload
     */
    export class ItemProcessorSystem extends GameSystemWithFilter {
        constructor(root: any);
        /**
         * @type {Object<enumItemProcessorTypes, function(ProcessorImplementationPayload) : string>}
         */
        handlers: any;
        /**
         * Returns true if the entity should accept the given item on the given slot.
         * This should only be called with matching items! I.e. if a color item is expected
         * on the given slot, then only a color item must be passed.
         * @param {Entity} entity
         * @param {BaseItem} item The item to accept
         * @param {number} slotIndex The slot index
         * @returns {boolean}
         */
        checkRequirements(entity: Entity, item: BaseItem, slotIndex: number): boolean;
        /**
         * Checks whether it's possible to process something
         * @param {Entity} entity
         */
        canProcess(entity: Entity): boolean;
        /**
         * Starts a new charge for the entity
         * @param {Entity} entity
         */
        startNewCharge(entity: Entity): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_BALANCER(payload: ProcessorImplementationPayload): boolean;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_CUTTER(payload: ProcessorImplementationPayload): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_CUTTER_QUAD(payload: ProcessorImplementationPayload): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_ROTATER(payload: ProcessorImplementationPayload): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_ROTATER_CCW(payload: ProcessorImplementationPayload): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_ROTATER_180(payload: ProcessorImplementationPayload): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_STACKER(payload: ProcessorImplementationPayload): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_TRASH(payload: ProcessorImplementationPayload): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_MIXER(payload: ProcessorImplementationPayload): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_PAINTER(payload: ProcessorImplementationPayload): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_PAINTER_DOUBLE(payload: ProcessorImplementationPayload): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_PAINTER_QUAD(payload: ProcessorImplementationPayload): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_READER(payload: ProcessorImplementationPayload): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_HUB(payload: ProcessorImplementationPayload): void;
        /**
         * @param {ProcessorImplementationPayload} payload
         */
        process_GOAL(payload: ProcessorImplementationPayload): void;
    }
    /**
     * Whole data for a produced item
     */
    export type ProducedItem = {
        item: BaseItem;
        preferredSlot?: number;
        requiredSlot?: number;
        doNotTrack?: boolean;
    };
    /**
     * Type of a processor implementation
     */
    export type ProcessorImplementationPayload = {
        entity: Entity;
        items: any;
        inputCount: number;
        outItems: Array<ProducedItem>;
    };
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { Entity } from "game/entity";
    import { BaseItem } from "game/base_item";
}
declare module "game/systems/underground_belt" {
    export class UndergroundBeltSystem extends GameSystemWithFilter {
        constructor(root: any);
        beltSprites: {
            [x: string]: import("core/sprites").AtlasSprite;
        };
        staleAreaWatcher: StaleAreaDetector;
        /**
         * Callback when an entity got placed, used to remove belts between underground belts
         * @param {Entity} entity
         */
        onEntityManuallyPlaced(entity: Entity): void;
        /**
         * Recomputes the cache in the given area, invalidating all entries there
         * @param {Rectangle} area
         */
        recomputeArea(area: Rectangle): void;
        /**
         * Finds the receiver for a given sender
         * @param {Entity} entity
         * @returns {import("../components/underground_belt").LinkedUndergroundBelt}
         */
        findRecieverForSender(entity: Entity): import("../components/underground_belt").LinkedUndergroundBelt;
        /**
         *
         * @param {Entity} entity
         */
        handleSender(entity: Entity): void;
        /**
         *
         * @param {Entity} entity
         * @param {number} now
         */
        handleReceiver(entity: Entity, now: number): void;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { StaleAreaDetector } from "core/stale_area_detector";
    import { Entity } from "game/entity";
    import { Rectangle } from "core/rectangle";
}
declare module "game/systems/hub" {
    export class HubSystem extends GameSystemWithFilter {
        constructor(root: any);
        hubSprite: import("core/sprites").AtlasSprite;
        /**
         *
         * @param {HTMLCanvasElement} canvas
         * @param {CanvasRenderingContext2D} context
         * @param {number} w
         * @param {number} h
         * @param {number} dpi
         */
        redrawHubBaseTexture(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, w: number, h: number, dpi: number): void;
        /**
         * @param {DrawParameters} parameters
         * @param {Entity} entity
         */
        drawEntity(parameters: DrawParameters, entity: Entity): void;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { DrawParameters } from "core/draw_parameters";
    import { Entity } from "game/entity";
}
declare module "game/systems/static_map_entity" {
    export class StaticMapEntitySystem extends GameSystem {
        constructor(root: any);
        /** @type {Set<number>} */
        drawnUids: any;
        /**
         * Clears the uid list when a new frame started
         */
        clearUidList(): void;
        /**
         * Draws the static entities
         * @param {DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
        /**
         * Draws the static wire entities
         * @param {DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawWiresChunk(parameters: DrawParameters, chunk: MapChunkView): void;
    }
    import { GameSystem } from "game/game_system";
    import { DrawParameters } from "core/draw_parameters";
    import { MapChunkView } from "game/map_chunk_view";
}
declare module "game/systems/item_acceptor" {
    export class ItemAcceptorSystem extends GameSystemWithFilter {
        constructor(root: any);
        accumulatedTicksWhileInMapOverview: number;
        /**
         * @param {DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { DrawParameters } from "core/draw_parameters";
    import { MapChunkView } from "game/map_chunk_view";
}
declare module "game/systems/storage" {
    export class StorageSystem extends GameSystemWithFilter {
        constructor(root: any);
        storageOverlaySprite: import("core/sprites").AtlasSprite;
        /**
         * Stores which uids were already drawn to avoid drawing entities twice
         * @type {Set<number>}
         */
        drawnUids: any;
        clearDrawnUids(): void;
        /**
         * @param {DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { DrawParameters } from "core/draw_parameters";
    import { MapChunkView } from "game/map_chunk_view";
}
declare module "game/systems/wired_pins" {
    export class WiredPinsSystem extends GameSystemWithFilter {
        constructor(root: any);
        pinSprites: {
            [x: string]: import("core/sprites").AtlasSprite;
        };
        /**
         * Performs pre-placement checks
         * @param {Entity} entity
         * @param {Vector} offset
         */
        prePlacementCheck(entity: Entity, offset: Vector): string;
        /**
         * Checks if the pins of the given entity collide on the wires layer
         * @param {Entity} entity
         * @param {Vector=} offset Optional, move the entity by the given offset first
         * @returns {boolean} True if the pins collide
         */
        checkEntityPinsCollide(entity: Entity, offset?: Vector | undefined): boolean;
        /**
         * Called to free space for the given entity
         * @param {Entity} entity
         */
        freeEntityAreaBeforeBuild(entity: Entity): void;
        /**
         * Draws a given entity
         * @param {DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { Entity } from "game/entity";
    import { Vector } from "core/vector";
    import { DrawParameters } from "core/draw_parameters";
    import { MapChunkView } from "game/map_chunk_view";
}
declare module "game/systems/belt_underlays" {
    export class BeltUnderlaysSystem extends GameSystemWithFilter {
        constructor(root: any);
        underlayBeltSprites: any[];
        staleArea: StaleAreaDetector;
        /**
         * Called when an area changed - Resets all caches in the given area
         * @param {Rectangle} area
         */
        recomputeStaleArea(area: Rectangle): void;
        /**
         * Checks if a given tile is connected and has an acceptor
         * @param {Vector} tile
         * @param {enumDirection} fromDirection
         * @returns {boolean}
         */
        checkIsAcceptorConnected(tile: Vector, fromDirection: enumDirection): boolean;
        /**
         * Checks if a given tile is connected and has an ejector
         * @param {Vector} tile
         * @param {enumDirection} toDirection
         * @returns {boolean}
         */
        checkIsEjectorConnected(tile: Vector, toDirection: enumDirection): boolean;
        /**
         * Computes the flag for a given tile
         * @param {Entity} entity
         * @param {import("../components/belt_underlays").BeltUnderlayTile} underlayTile
         * @returns {enumClippedBeltUnderlayType} The type of the underlay
         */
        computeBeltUnderlayType(entity: Entity, underlayTile: import("../components/belt_underlays").BeltUnderlayTile): enumClippedBeltUnderlayType;
        /**
         * Draws a given chunk
         * @param {DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { StaleAreaDetector } from "core/stale_area_detector";
    import { Rectangle } from "core/rectangle";
    import { Vector } from "core/vector";
    import { enumDirection } from "core/vector";
    import { Entity } from "game/entity";
    import { enumClippedBeltUnderlayType } from "game/components/belt_underlays";
    import { DrawParameters } from "core/draw_parameters";
    import { MapChunkView } from "game/map_chunk_view";
}
declare module "game/systems/constant_signal" {
    export class ConstantSignalSystem extends GameSystemWithFilter {
        constructor(root: any);
        /**
         * Asks the entity to enter a valid signal code
         * @param {Entity} entity
         * @param {object} param0
         * @param {boolean=} param0.deleteOnCancel
         */
        editConstantSignal(entity: Entity, { deleteOnCancel }: {
            deleteOnCancel?: boolean | undefined;
        }): void;
        /**
         * Tries to parse a signal code
         * @param {Entity} entity
         * @param {string} code
         * @returns {BaseItem}
         */
        parseSignalCode(entity: Entity, code: string): BaseItem;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { Entity } from "game/entity";
    import { BaseItem } from "game/base_item";
}
declare module "game/systems/logic_gate" {
    export class LogicGateSystem extends GameSystemWithFilter {
        constructor(root: any);
        boundOperations: {
            [x: string]: any;
        };
        /**
         * @param {Array<BaseItem|null>} parameters
         * @returns {BaseItem}
         */
        compute_AND(parameters: Array<BaseItem | null>): BaseItem;
        /**
         * @param {Array<BaseItem|null>} parameters
         * @returns {BaseItem}
         */
        compute_NOT(parameters: Array<BaseItem | null>): BaseItem;
        /**
         * @param {Array<BaseItem|null>} parameters
         * @returns {BaseItem}
         */
        compute_XOR(parameters: Array<BaseItem | null>): BaseItem;
        /**
         * @param {Array<BaseItem|null>} parameters
         * @returns {BaseItem}
         */
        compute_OR(parameters: Array<BaseItem | null>): BaseItem;
        /**
         * @param {Array<BaseItem|null>} parameters
         * @returns {BaseItem}
         */
        compute_IF(parameters: Array<BaseItem | null>): BaseItem;
        /**
         * @param {Array<BaseItem|null>} parameters
         * @returns {BaseItem}
         */
        compute_ROTATE(parameters: Array<BaseItem | null>): BaseItem;
        /**
         * @param {Array<BaseItem|null>} parameters
         * @returns {[BaseItem, BaseItem]}
         */
        compute_ANALYZE(parameters: Array<BaseItem | null>): [BaseItem, BaseItem];
        /**
         * @param {Array<BaseItem|null>} parameters
         * @returns {[BaseItem, BaseItem]}
         */
        compute_CUT(parameters: Array<BaseItem | null>): [BaseItem, BaseItem];
        /**
         * @param {Array<BaseItem|null>} parameters
         * @returns {[BaseItem, BaseItem]}
         */
        compute_UNSTACK(parameters: Array<BaseItem | null>): [BaseItem, BaseItem];
        /**
         * @param {Array<BaseItem|null>} parameters
         * @returns {BaseItem}
         */
        compute_STACKER(parameters: Array<BaseItem | null>): BaseItem;
        /**
         * @param {Array<BaseItem|null>} parameters
         * @returns {BaseItem}
         */
        compute_PAINTER(parameters: Array<BaseItem | null>): BaseItem;
        /**
         * @param {Array<BaseItem|null>} parameters
         * @returns {BaseItem}
         */
        compute_COMPARE(parameters: Array<BaseItem | null>): BaseItem;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { BaseItem } from "game/base_item";
}
declare module "game/systems/lever" {
    export class LeverSystem extends GameSystemWithFilter {
        constructor(root: any);
        spriteOn: import("core/sprites").AtlasSprite;
        spriteOff: import("core/sprites").AtlasSprite;
        /**
         * Draws a given chunk
         * @param {import("../../core/draw_utils").DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: import("../../core/draw_utils").DrawParameters, chunk: MapChunkView): void;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { MapChunkView } from "game/map_chunk_view";
}
declare module "game/systems/display" {
    export class DisplaySystem extends GameSystemWithFilter {
        constructor(root: any);
        /** @type {Object<string, import("../../core/draw_utils").AtlasSprite>} */
        displaySprites: {
            [x: string]: import("core/draw_utils").AtlasSprite;
        };
        /**
         * Returns the color / value a display should show
         * @param {BaseItem} value
         * @returns {BaseItem}
         */
        getDisplayItem(value: BaseItem): BaseItem;
        /**
         * Draws a given chunk
         * @param {import("../../core/draw_utils").DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: import("../../core/draw_utils").DrawParameters, chunk: MapChunkView): void;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { BaseItem } from "game/base_item";
    import { MapChunkView } from "game/map_chunk_view";
}
declare module "game/systems/item_processor_overlays" {
    export class ItemProcessorOverlaysSystem extends GameSystem {
        constructor(root: any);
        spriteDisabled: import("core/sprites").AtlasSprite;
        spriteDisconnected: import("core/sprites").AtlasSprite;
        readerOverlaySprite: import("core/sprites").AtlasSprite;
        drawnUids: any;
        clearDrawnUids(): void;
        /**
         *
         * @param {import("../../core/draw_utils").DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: import("../../core/draw_utils").DrawParameters, chunk: MapChunkView): void;
        /**
         *
         * @param {import("../../core/draw_utils").DrawParameters} parameters
         * @param {Entity} entity
         */
        drawReaderOverlays(parameters: import("../../core/draw_utils").DrawParameters, entity: Entity): void;
        /**
         *
         * @param {import("../../core/draw_utils").DrawParameters} parameters
         * @param {Entity} entity
         * @param {object} param0
         * @param {boolean=} param0.drawIfFalse
         */
        drawConnectedSlotRequirement(parameters: import("../../core/draw_utils").DrawParameters, entity: Entity, { drawIfFalse }: {
            drawIfFalse?: boolean | undefined;
        }): void;
    }
    import { GameSystem } from "game/game_system";
    import { MapChunkView } from "game/map_chunk_view";
    import { Entity } from "game/entity";
}
declare module "game/systems/belt_reader" {
    export class BeltReaderSystem extends GameSystemWithFilter {
        constructor(root: any);
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
}
declare module "game/systems/filter" {
    export class FilterSystem extends GameSystemWithFilter {
        constructor(root: any);
        /**
         *
         * @param {Entity} entity
         * @param {number} slot
         * @param {BaseItem} item
         */
        tryAcceptItem(entity: Entity, slot: number, item: BaseItem): boolean;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { Entity } from "game/entity";
    import { BaseItem } from "game/base_item";
}
declare module "game/systems/item_producer" {
    export class ItemProducerSystem extends GameSystemWithFilter {
        /** @param {GameRoot} root */
        constructor(root: GameRoot);
        item: import("game/base_item").BaseItem;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { GameRoot } from "game/root";
}
declare module "game/systems/constant_producer" {
    export class ConstantProducerSystem extends GameSystemWithFilter {
        /** @param {GameRoot} root */
        constructor(root: GameRoot);
        /**
         *
         * @param {DrawParameters} parameters
         * @param {MapChunk} chunk
         * @returns
         */
        drawChunk(parameters: DrawParameters, chunk: MapChunk): void;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { DrawParameters } from "core/draw_parameters";
    import { MapChunk } from "game/map_chunk";
    import { GameRoot } from "game/root";
}
declare module "game/systems/goal_acceptor" {
    export class GoalAcceptorSystem extends GameSystemWithFilter {
        /** @param {GameRoot} root */
        constructor(root: GameRoot);
        puzzleCompleted: boolean;
        /**
         *
         * @param {DrawParameters} parameters
         * @param {MapChunk} chunk
         * @returns
         */
        drawChunk(parameters: DrawParameters, chunk: MapChunk): void;
    }
    import { GameSystemWithFilter } from "game/game_system_with_filter";
    import { DrawParameters } from "core/draw_parameters";
    import { MapChunk } from "game/map_chunk";
    import { GameRoot } from "game/root";
}
declare module "game/systems/zone" {
    export class ZoneSystem extends GameSystem {
        /** @param {GameRoot} root */
        constructor(root: GameRoot);
        drawn: boolean;
        /**
         *
         * @param {Entity} entity
         * @param {Vector | undefined} tile
         * @returns
         */
        prePlacementCheck(entity: Entity, tile?: Vector | undefined): string;
        /**
         * Draws the zone
         * @param {DrawParameters} parameters
         * @param {MapChunkView} chunk
         */
        drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
    }
    import { GameSystem } from "game/game_system";
    import { Entity } from "game/entity";
    import { Vector } from "core/vector";
    import { DrawParameters } from "core/draw_parameters";
    import { MapChunkView } from "game/map_chunk_view";
    import { GameRoot } from "game/root";
}
declare module "game/game_system_manager" {
    export class GameSystemManager {
        /**
         *
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        systems: {
            /** @type {BeltSystem} */
            belt: BeltSystem;
            /** @type {ItemEjectorSystem} */
            itemEjector: ItemEjectorSystem;
            /** @type {MapResourcesSystem} */
            mapResources: MapResourcesSystem;
            /** @type {MinerSystem} */
            miner: MinerSystem;
            /** @type {ItemProcessorSystem} */
            itemProcessor: ItemProcessorSystem;
            /** @type {UndergroundBeltSystem} */
            undergroundBelt: UndergroundBeltSystem;
            /** @type {HubSystem} */
            hub: HubSystem;
            /** @type {StaticMapEntitySystem} */
            staticMapEntities: StaticMapEntitySystem;
            /** @type {ItemAcceptorSystem} */
            itemAcceptor: ItemAcceptorSystem;
            /** @type {StorageSystem} */
            storage: StorageSystem;
            /** @type {WiredPinsSystem} */
            wiredPins: WiredPinsSystem;
            /** @type {BeltUnderlaysSystem} */
            beltUnderlays: BeltUnderlaysSystem;
            /** @type {WireSystem} */
            wire: WireSystem;
            /** @type {ConstantSignalSystem} */
            constantSignal: ConstantSignalSystem;
            /** @type {LogicGateSystem} */
            logicGate: LogicGateSystem;
            /** @type {LeverSystem} */
            lever: LeverSystem;
            /** @type {DisplaySystem} */
            display: DisplaySystem;
            /** @type {ItemProcessorOverlaysSystem} */
            itemProcessorOverlays: ItemProcessorOverlaysSystem;
            /** @type {BeltReaderSystem} */
            beltReader: BeltReaderSystem;
            /** @type {FilterSystem} */
            filter: FilterSystem;
            /** @type {ItemProducerSystem} */
            itemProducer: ItemProducerSystem;
            /** @type {ConstantProducerSystem} */
            ConstantProducer: ConstantProducerSystem;
            /** @type {GoalAcceptorSystem} */
            GoalAcceptor: GoalAcceptorSystem;
            /** @type {ZoneSystem} */
            zone: ZoneSystem;
        };
        systemUpdateOrder: any[];
        /**
         * Initializes all systems
         */
        internalInitSystems(): void;
        /**
         * Updates all systems
         */
        update(): void;
        refreshCaches(): void;
    }
    import { GameRoot } from "game/root";
    import { BeltSystem } from "game/systems/belt";
    import { ItemEjectorSystem } from "game/systems/item_ejector";
    import { MapResourcesSystem } from "game/systems/map_resources";
    import { MinerSystem } from "game/systems/miner";
    import { ItemProcessorSystem } from "game/systems/item_processor";
    import { UndergroundBeltSystem } from "game/systems/underground_belt";
    import { HubSystem } from "game/systems/hub";
    import { StaticMapEntitySystem } from "game/systems/static_map_entity";
    import { ItemAcceptorSystem } from "game/systems/item_acceptor";
    import { StorageSystem } from "game/systems/storage";
    import { WiredPinsSystem } from "game/systems/wired_pins";
    import { BeltUnderlaysSystem } from "game/systems/belt_underlays";
    import { WireSystem } from "game/systems/wire";
    import { ConstantSignalSystem } from "game/systems/constant_signal";
    import { LogicGateSystem } from "game/systems/logic_gate";
    import { LeverSystem } from "game/systems/lever";
    import { DisplaySystem } from "game/systems/display";
    import { ItemProcessorOverlaysSystem } from "game/systems/item_processor_overlays";
    import { BeltReaderSystem } from "game/systems/belt_reader";
    import { FilterSystem } from "game/systems/filter";
    import { ItemProducerSystem } from "game/systems/item_producer";
    import { ConstantProducerSystem } from "game/systems/constant_producer";
    import { GoalAcceptorSystem } from "game/systems/goal_acceptor";
    import { ZoneSystem } from "game/systems/zone";
}
declare module "game/achievement_proxy" {
    export class AchievementProxy {
        /** @param {GameRoot} root */
        constructor(root: GameRoot);
        root: GameRoot;
        provider: import("platform/achievement_provider").AchievementProviderInterface;
        disabled: boolean;
        sliceTime: number;
        onLoad(): void;
        initialize(): void;
        startSlice(): void;
        update(): void;
        /**
         * @param {string} key
         * @returns {boolean}
         */
        has(key: string): boolean;
        /** @param {Entity} entity */
        onEntityAdded(entity: Entity): void;
        /** @param {number} level */
        onStoryGoalCompleted(level: number): void;
        onMamFailure(): void;
    }
    import { GameRoot } from "game/root";
    import { Entity } from "game/entity";
}
declare module "game/hud/parts/beta_overlay" {
    export class HUDBetaOverlay extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "game/blueprint" {
    export class Blueprint {
        /**
         * Creates a new blueprint from the given entity uids
         * @param {GameRoot} root
         * @param {Array<number>} uids
         */
        static fromUids(root: GameRoot, uids: Array<number>): Blueprint;
        /**
         * @param {Array<Entity>} entities
         */
        constructor(entities: Array<Entity>);
        entities: Entity[];
        /**
         * Returns the layer of this blueprint
         * @returns {Layer}
         */
        get layer(): any;
        /**
         * Returns the cost of this blueprint in shapes
         */
        getCost(): number;
        /**
         * Draws the blueprint at the given origin
         * @param {DrawParameters} parameters
         */
        draw(parameters: DrawParameters, tile: any): void;
        /**
         * Rotates the blueprint clockwise
         */
        rotateCw(): void;
        /**
         * Rotates the blueprint counter clock wise
         */
        rotateCcw(): void;
        /**
         * Checks if the blueprint can be placed at the given tile
         * @param {GameRoot} root
         * @param {Vector} tile
         */
        canPlace(root: GameRoot, tile: Vector): boolean;
        /**
         * @param {GameRoot} root
         */
        canAfford(root: GameRoot): boolean;
        /**
         * Attempts to place the blueprint at the given tile
         * @param {GameRoot} root
         * @param {Vector} tile
         */
        tryPlace(root: GameRoot, tile: Vector): any;
    }
    import { Entity } from "game/entity";
    import { DrawParameters } from "core/draw_parameters";
    import { GameRoot } from "game/root";
    import { Vector } from "core/vector";
}
declare module "game/hud/parts/blueprint_placer" {
    export class HUDBlueprintPlacer extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        costDisplayParent: HTMLDivElement;
        costDisplayText: HTMLDivElement;
        /** @type {TypedTrackedState<Blueprint?>} */
        currentBlueprint: any;
        /** @type {Blueprint?} */
        lastBlueprintUsed: Blueprint | null;
        domAttach: DynamicDomAttach;
        trackedCanAfford: TrackedState;
        getHasFreeCopyPaste(): boolean;
        abortPlacement(): string;
        /**
         * Called when the layer was changed
         * @param {Layer} layer
         */
        onEditModeChanged(layer: any): void;
        /**
         * Called when the blueprint is now affordable or not
         * @param {boolean} canAfford
         */
        onCanAffordChanged(canAfford: boolean): void;
        /**
         * Called when the blueprint was changed
         * @param {Blueprint} blueprint
         */
        onBlueprintChanged(blueprint: Blueprint): void;
        /**
         * mouse down pre handler
         * @param {Vector} pos
         * @param {enumMouseButton} button
         */
        onMouseDown(pos: Vector, button: enumMouseButton): string;
        /**
         * Mouse move handler
         */
        onMouseMove(): string;
        /**
         * Called when an array of bulidings was selected
         * @param {Array<number>} uids
         */
        createBlueprintFromBuildings(uids: Array<number>): void;
        /**
         * Attempts to rotate the current blueprint
         */
        rotateBlueprint(): void;
        /**
         * Attempts to paste the last blueprint
         */
        pasteBlueprint(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { Blueprint } from "game/blueprint";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { TrackedState } from "core/tracked_state";
    import { Vector } from "core/vector";
    import { enumMouseButton } from "game/camera";
}
declare module "game/buildings/cutter" {
    export type enumCutterVariants = string;
    export namespace enumCutterVariants {
        export const quad: string;
    }
    export class MetaCutterBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/display" {
    export class MetaDisplayBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/filter" {
    export class MetaFilterBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/lever" {
    export class MetaLeverBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/miner" {
    export type enumMinerVariants = string;
    export namespace enumMinerVariants {
        export const chainable: string;
    }
    export class MetaMinerBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/mixer" {
    export class MetaMixerBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/painter" {
    export type enumPainterVariants = string;
    export namespace enumPainterVariants {
        export const mirrored: string;
        export const double: string;
        export const quad: string;
    }
    export class MetaPainterBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/reader" {
    export class MetaReaderBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/rotater" {
    export type enumRotaterVariants = string;
    export namespace enumRotaterVariants {
        export const ccw: string;
        export const rotate180: string;
    }
    export class MetaRotaterBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/balancer" {
    export type enumBalancerVariants = string;
    export namespace enumBalancerVariants {
        export const merger: string;
        export const mergerInverse: string;
        export const splitter: string;
        export const splitterInverse: string;
    }
    export class MetaBalancerBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/stacker" {
    export class MetaStackerBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/trash" {
    export class MetaTrashBuilding extends MetaBuilding {
        addAchievementReceiver(entity: any): void;
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/underground_belt" {
    export type arrayUndergroundRotationVariantToMode = string;
    /** @enum {string} */
    export const arrayUndergroundRotationVariantToMode: string[];
    export type enumUndergroundBeltVariants = string;
    export namespace enumUndergroundBeltVariants {
        export const tier2: string;
    }
    export const enumUndergroundBeltVariantToTier: {
        [x: string]: number;
        default: number;
    };
    export class MetaUndergroundBeltBuilding extends MetaBuilding {
    }
    import { defaultBuildingVariant } from "game/meta_building";
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/block" {
    export class MetaBlockBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/constant_producer" {
    export class MetaConstantProducerBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/goal_acceptor" {
    export class MetaGoalAcceptorBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/hud/parts/base_toolbar" {
    export class HUDBaseToolbar extends BaseHUDPart {
        /**
         * @param {GameRoot} root
         * @param {object} param0
         * @param {Array<typeof MetaBuilding>} param0.primaryBuildings
         * @param {Array<typeof MetaBuilding>=} param0.secondaryBuildings
         * @param {function} param0.visibilityCondition
         * @param {string} param0.htmlElementId
         * @param {Layer=} param0.layer
         */
        constructor(root: GameRoot, { primaryBuildings, secondaryBuildings, visibilityCondition, htmlElementId, layer }: {
            primaryBuildings: Array<typeof MetaBuilding>;
            secondaryBuildings?: Array<typeof MetaBuilding> | undefined;
            visibilityCondition: Function;
            htmlElementId: string;
            layer?: any | undefined;
        });
        primaryBuildings: (typeof MetaBuilding)[];
        secondaryBuildings: (typeof MetaBuilding)[];
        visibilityCondition: Function;
        htmlElementId: string;
        layer: any;
        /** @type {Object.<string, {
         * metaBuilding: MetaBuilding,
         * unlocked: boolean,
         * selected: boolean,
         * element: HTMLElement,
         * index: number
         * puzzleLocked: boolean;
         * }>} */
        buildingHandles: {
            [x: string]: {
                metaBuilding: MetaBuilding;
                unlocked: boolean;
                selected: boolean;
                element: HTMLElement;
                index: number;
                puzzleLocked: boolean;
            };
        };
        element: HTMLDivElement;
        /**
         * @param {Array<typeof MetaBuilding>} buildings
         * @returns {Array<typeof MetaBuilding>}
         */
        filterBuildings(buildings: Array<typeof MetaBuilding>): Array<typeof MetaBuilding>;
        /**
         * Returns all buildings
         * @returns {Array<typeof MetaBuilding>}
         */
        get allBuildings(): (typeof MetaBuilding)[];
        secondaryDomAttach: DynamicDomAttach;
        domAttach: DynamicDomAttach;
        lastSelectedIndex: number;
        /**
         * Cycles through all buildings
         */
        cycleBuildings(): void;
        /**
         * Called when the selected building got changed
         * @param {MetaBuilding} metaBuilding
         */
        onSelectedPlacementBuildingChanged(metaBuilding: MetaBuilding): void;
        /**
         * @param {MetaBuilding} metaBuilding
         */
        selectBuildingForPlacement(metaBuilding: MetaBuilding): string;
        /**
         * @param {MetaBuilding} metaBuilding
         */
        toggleBuildingLock(metaBuilding: MetaBuilding): string;
        /**
         * @param {MetaBuilding} metaBuilding
         */
        inRequiredBuildings(metaBuilding: MetaBuilding): any;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { MetaBuilding } from "game/meta_building";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { GameRoot } from "game/root";
}
declare module "game/buildings/storage" {
    export class MetaStorageBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/hud/parts/buildings_toolbar" {
    export class HUDBuildingsToolbar extends HUDBaseToolbar {
        constructor(root: any);
    }
    import { HUDBaseToolbar } from "game/hud/parts/base_toolbar";
}
declare module "game/hud/parts/building_placer_logic" {
    /**
     * Contains all logic for the building placer - this doesn't include the rendering
     * of info boxes or drawing.
     */
    export class HUDBuildingPlacerLogic extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        /**
         * We use a fake entity to get information about how a building will look
         * once placed
         * @type {Entity}
         */
        fakeEntity: Entity;
        signals: {
            variantChanged: Signal;
            draggingStarted: Signal;
        };
        /**
         * The current building
         * @type {TypedTrackedState<MetaBuilding?>}
         */
        currentMetaBuilding: any;
        /**
         * The current rotation
         * @type {number}
         */
        currentBaseRotationGeneral: number;
        /**
         * The current rotation preference for each building.
         * @type{Object.<string,number>}
         */
        preferredBaseRotations: {
            [x: string]: number;
        };
        /**
         * Whether we are currently dragging
         * @type {boolean}
         */
        currentlyDragging: boolean;
        /**
         * Current building variant
         * @type {TypedTrackedState<string>}
         */
        currentVariant: any;
        /**
         * Whether we are currently drag-deleting
         * @type {boolean}
         */
        currentlyDeleting: boolean;
        /**
         * Stores which variants for each building we prefer, this is based on what
         * the user last selected
         * @type {Object.<string, string>}
         */
        preferredVariants: {
            [x: string]: string;
        };
        /**
         * The tile we last dragged from
         * @type {Vector}
         */
        lastDragTile: Vector;
        /**
         * The side for direction lock
         * @type {number} (0|1)
         */
        currentDirectionLockSide: number;
        /**
         * Whether the side for direction lock has not yet been determined.
         * @type {boolean}
         */
        currentDirectionLockSideIndeterminate: boolean;
        /**
         * Initializes all bindings
         */
        initializeBindings(): void;
        /**
         * Called when the edit mode got changed
         * @param {Layer} layer
         */
        onEditModeChanged(layer: any): void;
        /**
         * Sets the base rotation for the current meta-building.
         * @param {number} rotation The new rotation/angle.
         */
        set currentBaseRotation(arg: number);
        /**
         * Returns the current base rotation for the current meta-building.
         * @returns {number}
         */
        get currentBaseRotation(): number;
        /**
         * Returns if the direction lock is currently active
         * @returns {boolean}
         */
        get isDirectionLockActive(): boolean;
        /**
         * Returns the current direction lock corner, that is, the corner between
         * mouse and original start point
         * @returns {Vector|null}
         */
        get currentDirectionLockCorner(): Vector;
        /**
         * Aborts the placement
         */
        abortPlacement(): string;
        /**
         * Aborts any dragging
         */
        abortDragging(): void;
        initialPlacementVector: any;
        /**
         * Tries to rotate the current building
         */
        tryRotate(): void;
        /**
         * Rotates the current building to the specified direction.
         */
        trySetRotate(): void;
        /**
         * Tries to delete the building under the mouse
         */
        deleteBelowCursor(): boolean;
        /**
         * Starts the pipette function
         */
        startPipette(): void;
        /**
         * Switches the side for the direction lock manually
         */
        switchDirectionLockSide(): void;
        /**
         * Checks if the direction lock key got released and if such, resets the placement
         * @param {any} args
         */
        checkForDirectionLockSwitch({ keyCode }: any): void;
        /**
         * Tries to place the current building at the given tile
         * @param {Vector} tile
         */
        tryPlaceCurrentBuildingAt(tile: Vector): boolean;
        /**
         * Cycles through the variants
         */
        cycleVariants(): void;
        /**
         * Sets the current variant to the given variant
         * @param {string} variant
         */
        setVariant(variant: string): void;
        /**
         * Performs the direction locked placement between two points after
         * releasing the mouse
         */
        executeDirectionLockedPlacement(): void;
        /**
         * Finds the path which the current direction lock will use
         * @returns {Array<{ tile: Vector, rotation: number }>}
         */
        computeDirectionLockPath(): {
            tile: Vector;
            rotation: number;
        }[];
        /**
         * Selects a given building
         * @param {MetaBuilding} metaBuilding
         */
        startSelection(metaBuilding: MetaBuilding): void;
        /**
         * Called when the selected buildings changed
         * @param {MetaBuilding} metaBuilding
         */
        onSelectedMetaBuildingChanged(metaBuilding: MetaBuilding): void;
        /**
         * mouse down pre handler
         * @param {Vector} pos
         * @param {enumMouseButton} button
         */
        onMouseDown(pos: Vector, button: enumMouseButton): string;
        /**
         * mouse move pre handler
         * @param {Vector} pos
         */
        onMouseMove(pos: Vector): string;
        /**
         * Mouse up handler
         */
        onMouseUp(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { Entity } from "game/entity";
    import { Signal } from "core/signal";
    import { Vector } from "core/vector";
    import { MetaBuilding } from "game/meta_building";
    import { enumMouseButton } from "game/camera";
}
declare module "game/hud/parts/building_placer" {
    export class HUDBuildingPlacer extends HUDBuildingPlacerLogic {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        buildingInfoElements: {};
        variantsElement: HTMLDivElement;
        domAttach: DynamicDomAttach;
        variantsAttach: DynamicDomAttach;
        currentInterpolatedCornerTile: Vector;
        lockIndicatorSprites: {};
        /**
         * Stores the click detectors for the variants so we can clean them up later
         * @type {Array<ClickDetector>}
         */
        variantClickDetectors: Array<ClickDetector>;
        /**
         * Makes the lock indicator sprite for the given layer
         * @param {Layer} layer
         */
        makeLockIndicatorSprite(layer: any): HTMLCanvasElement;
        /**
         * Rerenders the building info dialog
         */
        rerenderInfoDialog(): void;
        /**
         * Cleans up all variant click detectors
         */
        cleanupVariantClickDetectors(): void;
        /**
         * Rerenders the variants displayed
         */
        rerenderVariants(): void;
        /**
         *
         * @param {DrawParameters} parameters
         */
        drawLayerPeek(parameters: DrawParameters): void;
        /**
         * @param {DrawParameters} parameters
         */
        drawRegularPlacement(parameters: DrawParameters): void;
        /**
         * @param {DrawParameters} parameters
         */
        drawDirectionLock(parameters: DrawParameters): void;
        /**
         * @param {DrawParameters} parameters
         */
        drawMatchingAcceptorsAndEjectors(parameters: DrawParameters): void;
    }
    import { HUDBuildingPlacerLogic } from "game/hud/parts/building_placer_logic";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { Vector } from "core/vector";
    import { ClickDetector } from "core/click_detector";
    import { DrawParameters } from "core/draw_parameters";
}
declare module "game/hud/parts/color_blind_helper" {
    export class HUDColorBlindHelper extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        belowTileIndicator: HTMLDivElement;
        trackedColorBelowTile: TrackedState;
        /**
         * Called when the color below the current tile changed
         * @param {enumColors|null} color
         */
        onColorBelowTileChanged(color: enumColors | null): void;
        /**
         * Computes the color below the current tile
         * @returns {enumColors}
         */
        computeColorBelowTile(): enumColors;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { TrackedState } from "core/tracked_state";
    import { enumColors } from "game/colors";
}
declare module "game/hud/parts/debug_changes" {
    /**
     * @typedef {{
     *    label: string,
     *    area: Rectangle,
     *    hideAt: number,
     *    fillColor: string
     * }} DebugChange
     */
    export class HUDChangesDebugger extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot); /** @type {Array<DebugChange>} */
        /** @type {Array<DebugChange>} */
        changes: Array<DebugChange>;
        /**
         * Renders a new change
         * @param {string} label Text to display
         * @param {Rectangle} area Affected area world space
         * @param {string} fillColor Color to display (Hex)
         * @param {number=} timeToDisplay How long to display the change
         */
        renderChange(label: string, area: Rectangle, fillColor: string, timeToDisplay?: number | undefined): void;
    }
    export type DebugChange = {
        label: string;
        area: Rectangle;
        hideAt: number;
        fillColor: string;
    };
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { Rectangle } from "core/rectangle";
}
declare module "game/hud/parts/debug_info" {
    export class HUDDebugInfo extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        trackedTickRate: TrackedState;
        trackedTickDuration: TrackedState;
        trackedFPS: TrackedState;
        trackedMousePosition: TrackedState;
        trackedCameraPosition: TrackedState;
        versionElement: HTMLDivElement;
        lastTick: number;
        trackedMode: TrackedState;
        domAttach: DynamicDomAttach;
        /**
         * Called when the mode changed
         * @param {enumDebugOverlayMode} mode
         */
        onModeChanged(mode: enumDebugOverlayMode): void;
        /**
         * Updates the labels
         */
        updateLabels(): void;
        /**
         * Updates the detailed information
         */
        updateDetailedInformation(): void;
        /**
         * Cycles through the different modes
         */
        cycleModes(): void;
    }
    export type enumDebugOverlayMode = string;
    /**
     * Specifies which mode follows after which mode
     */
    export type enumDebugOverlayModeNext = string;
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { TrackedState } from "core/tracked_state";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    namespace enumDebugOverlayMode {
        export const disabled: string;
        export const regular: string;
        export const detailed: string;
    }
    export {};
}
declare module "game/hud/parts/entity_debugger" {
    /**
     * Allows to inspect entities by pressing F8 while hovering them
     */
    export class HUDEntityDebugger extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        componentsElem: Element;
        /**
         * The currently selected entity
         * @type {Entity}
         */
        selectedEntity: Entity;
        lastUpdate: number;
        domAttach: DynamicDomAttach;
        pickEntity(): void;
        /**
         *
         * @param {string} name
         * @param {any} val
         * @param {number} indent
         * @param {Array} recursion
         */
        propertyToHTML(name: string, val: any, indent?: number, recursion?: any[]): string;
        /**
         * Rerenders the whole container
         * @param {Entity} entity
         */
        rerenderFull(entity: Entity): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { Entity } from "game/entity";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
}
declare module "game/hud/parts/modal_dialogs" {
    export class HUDModalDialogs extends BaseHUDPart {
        constructor(root: any, app: any);
        /** @type {Application} */
        app: Application;
        dialogParent: any;
        dialogStack: any[];
        domWatcher: DynamicDomAttach;
        initializeToElement(element: any): void;
        /**
         * @param {string} title
         * @param {string} text
         * @param {Array<string>} buttons
         */
        showInfo(title: string, text: string, buttons?: Array<string>): {};
        /**
         * @param {string} title
         * @param {string} text
         * @param {Array<string>} buttons
         */
        showWarning(title: string, text: string, buttons?: Array<string>): {};
        /**
         * @param {string} feature
         * @param {string} textPrefab
         */
        showFeatureRestrictionInfo(feature: string, textPrefab?: string): {};
        showOptionChooser(title: any, options: any): {};
        showLoadingDialog(text?: string): any;
        internalShowDialog(dialog: any): void;
        closeDialog(dialog: any): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { Application } from "application";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
}
declare module "game/hud/parts/settings_menu" {
    export class HUDSettingsMenu extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        background: HTMLDivElement;
        menuElement: HTMLDivElement;
        statsElement: HTMLDivElement;
        buttonContainer: HTMLDivElement;
        returnToMenu(): void;
        goToSettings(): void;
        domAttach: DynamicDomAttach;
        inputReciever: InputReceiver;
        keyActionMapper: KeyActionMapper;
        show(): void;
        visible: boolean;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { InputReceiver } from "core/input_receiver";
    import { KeyActionMapper } from "game/key_action_mapper";
}
declare module "game/hud/parts/shape_tooltip" {
    export class HUDShapeTooltip extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        /** @type {Vector} */
        currentTile: Vector;
        /** @type {Entity} */
        currentEntity: Entity;
        isPlacingBuilding: any;
        isActive(): boolean;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { Vector } from "core/vector";
    import { Entity } from "game/entity";
}
declare module "game/hud/parts/vignette_overlay" {
    export class HUDVignetteOverlay extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "game/hud/trailer_points" {
    var _default: {
        pos: {
            x: number;
            y: number;
        };
        zoom: number;
        time: number;
        wait: number;
    }[];
    export default _default;
}
declare module "game/hud/trailer_maker" {
    export class TrailerMaker {
        /**
         *
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        markers: any[];
        playbackMarkers: any[];
        currentPlaybackOrigin: Vector;
        currentPlaybackZoom: any;
        update(): void;
    }
    import { GameRoot } from "game/root";
    import { Vector } from "core/vector";
}
declare module "game/hud/hud" {
    export class GameHUD {
        /**
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        /**
         * Initializes the hud parts
         */
        initialize(): void;
        signals: {
            buildingSelectedForPlacement: any;
            selectedPlacementBuildingChanged: any;
            shapePinRequested: any;
            shapeUnpinRequested: any;
            notification: any;
            buildingsSelectedForCopy: any;
            pasteBlueprintRequested: any;
            viewShapeDetailsRequested: any;
            unlockNotificationFinished: any;
        };
        parts: {
            buildingsToolbar: HUDBuildingsToolbar;
            blueprintPlacer: HUDBlueprintPlacer;
            buildingPlacer: HUDBuildingPlacer;
            shapeTooltip: HUDShapeTooltip;
            settingsMenu: HUDSettingsMenu;
            debugInfo: HUDDebugInfo;
            dialogs: HUDModalDialogs;
            /** @type {HUDChangesDebugger} */
            changesDebugger: HUDChangesDebugger;
        };
        trailerMaker: TrailerMaker;
        /**
         * Attempts to close all overlays
         */
        closeAllOverlays(): void;
        /**
         * Returns true if the game logic should be paused
         */
        shouldPauseGame(): boolean;
        /**
         * Returns true if the rendering can be paused
         */
        shouldPauseRendering(): boolean;
        /**
         * Returns true if the rendering can be paused
         */
        hasBlockingOverlayOpen(): boolean;
        /**
         * Toggles the ui
         */
        toggleUi(): void;
        /**
         * Updates all parts
         */
        update(): void;
        /**
         * Draws all parts
         * @param {DrawParameters} parameters
         */
        draw(parameters: DrawParameters): void;
        /**
         * Draws all part overlays
         * @param {DrawParameters} parameters
         */
        drawOverlays(parameters: DrawParameters): void;
        /**
         * Cleans up everything
         */
        cleanup(): void;
    }
    import { GameRoot } from "game/root";
    import { HUDBuildingsToolbar } from "game/hud/parts/buildings_toolbar";
    import { HUDBlueprintPlacer } from "game/hud/parts/blueprint_placer";
    import { HUDBuildingPlacer } from "game/hud/parts/building_placer";
    import { HUDShapeTooltip } from "game/hud/parts/shape_tooltip";
    import { HUDSettingsMenu } from "game/hud/parts/settings_menu";
    import { HUDDebugInfo } from "game/hud/parts/debug_info";
    import { HUDModalDialogs } from "game/hud/parts/modal_dialogs";
    import { HUDChangesDebugger } from "game/hud/parts/debug_changes";
    import { TrailerMaker } from "game/hud/trailer_maker";
    import { DrawParameters } from "core/draw_parameters";
}
declare module "game/map_chunk_aggregate" {
    export const CHUNK_OVERLAY_RES: 3;
    export class MapChunkAggregate {
        /**
         *
         * @param {GameRoot} root
         * @param {number} x
         * @param {number} y
         */
        constructor(root: GameRoot, x: number, y: number);
        root: GameRoot;
        x: number;
        y: number;
        /**
         * Whenever something changes, we increase this number - so we know we need to redraw
         */
        renderIteration: number;
        dirty: boolean;
        /** @type {Array<boolean>} */
        dirtyList: Array<boolean>;
        /**
         * Marks this chunk as dirty, rerendering all caches
         * @param {number} chunkX
         * @param {number} chunkY
         */
        markDirty(chunkX: number, chunkY: number): void;
        renderKey: string;
        /**
         *
         * @param {HTMLCanvasElement} canvas
         * @param {CanvasRenderingContext2D} context
         * @param {number} w
         * @param {number} h
         * @param {number} dpi
         */
        generateOverlayBuffer(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, w: number, h: number, dpi: number): void;
        /**
         * Overlay
         * @param {DrawParameters} parameters
         */
        drawOverlay(parameters: DrawParameters): void;
    }
    import { GameRoot } from "game/root";
    import { DrawParameters } from "core/draw_parameters";
}
declare module "game/map" {
    export class BaseMap extends BasicSerializableObject {
        static getId(): string;
        static getSchema(): {
            seed: import("savegame/serialization_data_types").TypePositiveInteger;
        };
        /**
         *
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        seed: number;
        /**
         * Mapping of 'X|Y' to chunk
         * @type {Map<string, MapChunkView>} */
        chunksById: any;
        /**
         * Mapping of 'X|Y' to chunk aggregate
         * @type {Map<string, MapChunkAggregate>} */
        aggregatesById: any;
        /**
         * Returns the given chunk by index
         * @param {number} chunkX
         * @param {number} chunkY
         */
        getChunk(chunkX: number, chunkY: number, createIfNotExistent?: boolean): any;
        /**
         * Returns the chunk aggregate containing a given chunk
         * @param {number} chunkX
         * @param {number} chunkY
         */
        getAggregateForChunk(chunkX: number, chunkY: number, createIfNotExistent?: boolean): any;
        /**
         * Returns the given chunk aggregate by index
         * @param {number} aggX
         * @param {number} aggY
         */
        getAggregate(aggX: number, aggY: number, createIfNotExistent?: boolean): any;
        /**
         * Gets or creates a new chunk if not existent for the given tile
         * @param {number} tileX
         * @param {number} tileY
         * @returns {MapChunkView}
         */
        getOrCreateChunkAtTile(tileX: number, tileY: number): MapChunkView;
        /**
         * Gets a chunk if not existent for the given tile
         * @param {number} tileX
         * @param {number} tileY
         * @returns {MapChunkView?}
         */
        getChunkAtTileOrNull(tileX: number, tileY: number): MapChunkView | null;
        /**
         * Checks if a given tile is within the map bounds
         * @param {Vector} tile
         * @returns {boolean}
         */
        isValidTile(tile: Vector): boolean;
        /**
         * Returns the tile content of a given tile
         * @param {Vector} tile
         * @param {Layer} layer
         * @returns {Entity} Entity or null
         */
        getTileContent(tile: Vector, layer: any): Entity;
        /**
         * Returns the lower layers content of the given tile
         * @param {number} x
         * @param {number} y
         * @returns {BaseItem=}
         */
        getLowerLayerContentXY(x: number, y: number): BaseItem | undefined;
        /**
         * Returns the tile content of a given tile
         * @param {number} x
         * @param {number} y
         * @param {Layer} layer
         * @returns {Entity} Entity or null
         */
        getLayerContentXY(x: number, y: number, layer: any): Entity;
        /**
         * Returns the tile contents of a given tile
         * @param {number} x
         * @param {number} y
         * @returns {Array<Entity>} Entity or null
         */
        getLayersContentsMultipleXY(x: number, y: number): Array<Entity>;
        /**
         * Checks if the tile is used
         * @param {Vector} tile
         * @param {Layer} layer
         * @returns {boolean}
         */
        isTileUsed(tile: Vector, layer: any): boolean;
        /**
         * Checks if the tile is used
         * @param {number} x
         * @param {number} y
         * @param {Layer} layer
         * @returns {boolean}
         */
        isTileUsedXY(x: number, y: number, layer: any): boolean;
        /**
         * Sets the tiles content
         * @param {Vector} tile
         * @param {Entity} entity
         */
        setTileContent(tile: Vector, entity: Entity): void;
        /**
         * Places an entity with the StaticMapEntity component
         * @param {Entity} entity
         */
        placeStaticEntity(entity: Entity): void;
        /**
         * Removes an entity with the StaticMapEntity component
         * @param {Entity} entity
         */
        removeStaticEntity(entity: Entity): void;
        /**
         * Checks a given tile for validty
         * @param {Vector} tile
         */
        internalCheckTile(tile: Vector): void;
    }
    import { BasicSerializableObject } from "savegame/serialization";
    import { GameRoot } from "game/root";
    import { MapChunkView } from "game/map_chunk_view";
    import { Vector } from "core/vector";
    import { Entity } from "game/entity";
    import { BaseItem } from "game/base_item";
}
declare module "game/map_view" {
    /**
     * This is the view of the map, it extends the map which is the raw model and allows
     * to draw it
     */
    export class MapView extends BaseMap {
        constructor(root: any);
        /**
         * DPI of the background cache images, required in some places
         */
        backgroundCacheDPI: number;
        /**
         * The cached background sprite, containing the flat background
         * @type {HTMLCanvasElement} */
        cachedBackgroundCanvas: HTMLCanvasElement;
        /** @type {CanvasRenderingContext2D} */
        cachedBackgroundContext: CanvasRenderingContext2D;
        cleanup(): void;
        /**
         * Called when an entity was added, removed or changed
         * @param {Entity} entity
         */
        onEntityChanged(entity: Entity): void;
        /**
         * Draws all static entities like buildings etc.
         * @param {DrawParameters} drawParameters
         */
        drawStaticEntityDebugOverlays(drawParameters: DrawParameters): void;
        /**
         * Initializes all canvases used for background rendering
         */
        internalInitializeCachedBackgroundCanvases(): void;
        /**
         * Draws the maps foreground
         * @param {DrawParameters} parameters
         */
        drawForeground(parameters: DrawParameters): void;
        /**
         * Calls a given method on all given chunks
         * @param {DrawParameters} parameters
         * @param {function} method
         */
        drawVisibleChunks(parameters: DrawParameters, method: Function): void;
        /**
         * Calls a given method on all given chunks
         * @param {DrawParameters} parameters
         * @param {function} method
         */
        drawVisibleAggregates(parameters: DrawParameters, method: Function): void;
        /**
         * Draws the wires foreground
         * @param {DrawParameters} parameters
         */
        drawWiresForegroundLayer(parameters: DrawParameters): void;
        /**
         * Draws the map overlay
         * @param {DrawParameters} parameters
         */
        drawOverlay(parameters: DrawParameters): void;
        /**
         * Draws the map background
         * @param {DrawParameters} parameters
         */
        drawBackground(parameters: DrawParameters): void;
    }
    import { BaseMap } from "game/map";
    import { Entity } from "game/entity";
    import { DrawParameters } from "core/draw_parameters";
}
declare module "core/error_handler" {
    export let APPLICATION_ERROR_OCCURED: boolean;
}
declare module "core/state_manager" {
    /**
     * This is the main state machine which drives the game states.
     */
    export class StateManager {
        /**
         * @param {Application} app
         */
        constructor(app: Application);
        app: Application;
        /** @type {GameState} */
        currentState: GameState;
        /** @type {Object.<string, new() => GameState>} */
        stateClasses: {
            [x: string]: new () => GameState;
        };
        /** @type {TypedSignal<[string, GameState]>} */
        stateChanged: any;
        /**
         * Registers a new state class, should be a GameState derived class
         * @param {object} stateClass
         */
        register(stateClass: object): void;
        /**
         * Constructs a new state or returns the instance from the cache
         * @param {string} key
         */
        constructState(key: string): GameState;
        /**
         * Moves to a given state
         * @param {string} key State Key
         */
        moveToState(key: string, payload?: {}): boolean;
        /**
         * Returns the current state
         * @returns {GameState}
         */
        getCurrentState(): GameState;
    }
    import { Application } from "application";
    import { GameState } from "core/game_state";
}
declare module "core/request_channel" {
    export const PROMISE_ABORTED: "promise-aborted";
    export class RequestChannel {
        /** @type {Array<Promise>} */
        pendingPromises: Array<Promise>;
        /**
         *
         * @param {Promise<any>} promise
         * @returns {Promise<any>}
         */
        watch(promise: Promise<any>): Promise<any>;
        cancelAll(): void;
    }
}
declare module "core/game_state" {
    /**
     * Basic state of the game state machine. This is the base of the whole game
     */
    export class GameState {
        /**
         * Constructs a new state with the given id
         * @param {string} key The id of the state. We use ids to refer to states because otherwise we get
         *                     circular references
         */
        constructor(key: string);
        key: string;
        /** @type {StateManager} */
        stateManager: StateManager;
        /** @type {Application} */
        app: Application;
        fadingOut: boolean;
        /** @type {Array<ClickDetector>} */
        clickDetectors: Array<ClickDetector>;
        inputReciever: InputReceiver;
        asyncChannel: RequestChannel;
        /**
         * Returns the states key
         * @returns {string}
         */
        getKey(): string;
        /**
         * Returns the html element of the state
         * @returns {HTMLElement}
         */
        getDivElement(): HTMLElement;
        /**
         * Transfers to a new state
         * @param {string} stateKey The id of the new state
         */
        moveToState(stateKey: string, payload?: {}, skipFadeOut?: boolean): void;
        /**
         * Tracks clicks on a given element and calls the given callback *on this state*.
         * If you want to call another function wrap it inside a lambda.
         * @param {Element} element The element to track clicks on
         * @param {function():void} handler The handler to call
         * @param {import("./click_detector").ClickDetectorConstructorArgs=} args Click detector arguments
         */
        trackClicks(element: Element, handler: () => void, args?: import("./click_detector").ClickDetectorConstructorArgs | undefined): void;
        /**
         * Cancels all promises on the api as well as our async channel
         */
        cancelAllAsyncOperations(): void;
        /**
         * Callback when entering the state, to be overriddemn
         * @param {any} payload Arbitrary data passed from the state which we are transferring from
         */
        onEnter(payload: any): void;
        /**
         * Callback when leaving the state
         */
        onLeave(): void;
        /**
         * Callback before leaving the game state or when the page is unloaded
         */
        onBeforeExit(): void;
        /**
         * Callback when the app got paused (on android, this means in background)
         */
        onAppPause(): void;
        /**
         * Callback when the app got resumed (on android, this means in foreground again)
         */
        onAppResume(): void;
        /**
         * Render callback
         * @param {number} dt Delta time in ms since last render
         */
        onRender(dt: number): void;
        /**
         * Background tick callback, called while the game is inactiev
         * @param {number} dt Delta time in ms since last tick
         */
        onBackgroundTick(dt: number): void;
        /**
         * Called when the screen resized
         * @param {number} w window/screen width
         * @param {number} h window/screen height
         */
        onResized(w: number, h: number): void;
        /**
         * Internal backbutton handler, called when the hardware back button is pressed or
         * the escape key is pressed
         */
        onBackButton(): void;
        /**
         * Should return how many mulliseconds to fade in / out the state. Not recommended to override!
         * @returns {number} Time in milliseconds to fade out
         */
        getInOutFadeTime(): number;
        /**
         * Should return whether to fade in the game state. This will then apply the right css classes
         * for the fadein.
         * @returns {boolean}
         */
        getHasFadeIn(): boolean;
        /**
         * Should return whether to fade out the game state. This will then apply the right css classes
         * for the fadeout and wait the delay before moving states
         * @returns {boolean}
         */
        getHasFadeOut(): boolean;
        /**
         * Returns if this state should get paused if it does not have focus
         * @returns {boolean} true to pause the updating of the game
         */
        getPauseOnFocusLost(): boolean;
        /**
         * Should return the html code of the state.
         * @returns {string}
         */
        getInnerHTML(): string;
        /**
         * Returns if the state has an unload confirmation, this is the
         * "Are you sure you want to leave the page" message.
         */
        getHasUnloadConfirmation(): boolean;
        /**
         * Should return the theme music for this state
         * @returns {string|null}
         */
        getThemeMusic(): string | null;
        /**
         * Internal callback from the manager. Do not override!
         * @param {StateManager} stateManager
         */
        internalRegisterCallback(stateManager: StateManager, app: any): void;
        /**
         * Internal callback when entering the state. Do not override!
         * @param {any} payload Arbitrary data passed from the state which we are transferring from
         * @param {boolean} callCallback Whether to call the onEnter callback
         */
        internalEnterCallback(payload: any, callCallback?: boolean): void;
        htmlElement: HTMLElement;
        /**
         * Internal callback when the state is left. Do not override!
         */
        internalLeaveCallback(): void;
        /**
         * Internal callback *before* the state is left. Also is called on page unload
         */
        internalOnBeforeExitCallback(): void;
        /**
         * Internal app pause callback
         */
        internalOnAppPauseCallback(): void;
        /**
         * Internal app resume callback
         */
        internalOnAppResumeCallback(): void;
        /**
         * Cleans up all click detectors
         */
        internalCleanUpClickDetectors(): void;
        /**
         * Internal method to get the HTML of the game state.
         * @returns {string}
         */
        internalGetFullHtml(): string;
        /**
         * Internal method to compute the time to fade in / out
         * @returns {number} time to fade in / out in ms
         */
        internalGetFadeInOutTime(): number;
    }
    import { StateManager } from "core/state_manager";
    import { Application } from "application";
    import { ClickDetector } from "core/click_detector";
    import { InputReceiver } from "core/input_receiver";
    import { RequestChannel } from "core/request_channel";
}
declare module "game/game_loading_overlay" {
    export class GameLoadingOverlay {
        /**
         *
         * @param {Application} app
         * @param {HTMLElement} parent
         */
        constructor(app: Application, parent: HTMLElement);
        app: Application;
        parent: HTMLElement;
        /** @type {HTMLElement} */
        element: HTMLElement;
        /**
         * Removes the overlay if its currently visible
         */
        removeIfAttached(): void;
        /**
         * Returns if the loading overlay is attached
         */
        isAttached(): HTMLElement;
        /**
         * Shows a super basic overlay
         */
        showBasic(): void;
        /**
         * Adds a text with 'loading' and a spinner
         * @param {HTMLElement} element
         */
        internalAddSpinnerAndText(element: HTMLElement): void;
        /**
         * Adds a random hint
         * @param {HTMLElement} element
         */
        internalAddHint(element: HTMLElement): void;
    }
    import { Application } from "application";
}
declare module "core/lzstring" {
    export function compressU8(uncompressed: any): Uint8Array;
    /**
     * @param {string} uncompressed
     * @param {number} header
     */
    export function compressU8WHeader(uncompressed: string, header: number): Uint8Array;
    /**
     *
     * @param {Uint8Array} compressed
     */
    export function decompressU8WHeader(compressed: Uint8Array): string;
    export function compressX64(input: any): string;
    export function decompressX64(input: any): string;
}
declare module "core/sensitive_utils.encrypt" {
    export function sha1(str: any): any;
    export function getNameOfProvider(): any;
    /**
     * Computes the crc for a given string
     * @param {string} str
     */
    export function computeCrc(str: string): any;
    export const CRC_PREFIX: any;
}
declare module "platform/storage" {
    export const FILE_NOT_FOUND: "file_not_found";
    export class StorageInterface {
        constructor(app: any);
        /** @type {Application} */
        app: Application;
        /**
         * Initializes the storage
         * @returns {Promise<void>}
         */
        initialize(): Promise<void>;
        /**
         * Writes a string to a file asynchronously
         * @param {string} filename
         * @param {string} contents
         * @returns {Promise<void>}
         */
        writeFileAsync(filename: string, contents: string): Promise<void>;
        /**
         * Reads a string asynchronously. Returns Promise<FILE_NOT_FOUND> if file was not found.
         * @param {string} filename
         * @returns {Promise<string>}
         */
        readFileAsync(filename: string): Promise<string>;
        /**
         * Tries to delete a file
         * @param {string} filename
         * @returns {Promise<void>}
         */
        deleteFileAsync(filename: string): Promise<void>;
    }
    import { Application } from "application";
}
declare module "savegame/savegame_compressor" {
    /**
     * @param {object} obj
     */
    export function compressObject(obj: object): {
        keys: any[];
        values: any[];
        data: any;
    };
    /**
     * @param {object} obj
     */
    export function decompressObject(obj: object): any;
}
declare module "webworkers/compression.worker" {
    export {};
}
declare module "core/async_compression" {
    export let compressionPrefix: any;
    export const asyncCompressor: AsynCompression;
    export type JobEntry = {
        errorHandler: (arg0: any) => void;
        resolver: (arg0: any) => void;
        startTime: number;
    };
    /**
     * @typedef {{
     *   errorHandler: function(any) : void,
     *   resolver: function(any) : void,
     *   startTime: number
     * }} JobEntry
     */
    class AsynCompression {
        worker: any;
        currentJobId: number;
        /** @type {Object.<number, JobEntry>} */
        currentJobs: {
            [x: number]: JobEntry;
        };
        /**
         * Compresses any object
         * @param {any} obj
         */
        compressObjectAsync(obj: any): Promise<any>;
        /**
         * Queues a new job
         * @param {string} job
         * @param {any} data
         * @returns {Promise<any>}
         */
        internalQueueJob(job: string, data: any): Promise<any>;
    }
    export {};
}
declare module "core/read_write_proxy" {
    export class ReadWriteProxy {
        /**
         *
         * @param {object} obj
         */
        static serializeObject(obj: object): string;
        /**
         *
         * @param {object} text
         */
        static deserializeObject(text: object): any;
        constructor(app: any, filename: any);
        /** @type {Application} */
        app: Application;
        filename: any;
        /** @type {object} */
        currentData: object;
        /**
         * Store a debounced handler to prevent double writes
         */
        debouncedWrite: any;
        /** @returns {ExplainedResult} */
        verify(data: any): ExplainedResult;
        getDefaultData(): {};
        getCurrentVersion(): number;
        /** @returns {ExplainedResult} */
        migrate(data: any): ExplainedResult;
        resetEverythingAsync(): Promise<void>;
        /**
         * Writes the data asychronously, fails if verify() fails.
         * Debounces the operation by up to 50ms
         * @returns {Promise<void>}
         */
        writeAsync(): Promise<void>;
        /**
         * Actually writes the data asychronously
         * @returns {Promise<void>}
         */
        doWriteAsync(): Promise<void>;
        readAsync(): Promise<any>;
        /**
         * Deletes the file
         * @returns {Promise<void>}
         */
        deleteAsync(): Promise<void>;
        /** @returns {ExplainedResult} */
        internalVerifyBasicStructure(data: any): ExplainedResult;
        /** @returns {ExplainedResult} */
        internalVerifyEntry(data: any): ExplainedResult;
    }
    import { Application } from "application";
    import { ExplainedResult } from "core/explained_result";
}
declare module "savegame/savegame_interface" {
    export class BaseSavegameInterface {
        /**
         * Constructs an new interface for the given savegame
         * @param {any} data
         */
        constructor(data: any);
        /**
         * Returns the interfaces version
         */
        getVersion(): void;
        /**
         * Returns the uncached json schema
         * @returns {object}
         */
        getSchemaUncached(): object;
        getValidator(): any;
        data: any;
        /**
         * Validates the data
         * @returns {boolean}
         */
        validate(): boolean;
        /**
         * Returns the time of last update
         * @returns {number}
         */
        readLastUpdate(): number;
        /**
         * Returns the ingame time in seconds
         * @returns {number}
         */
        readIngameTimeSeconds(): number;
    }
}
declare module "savegame/schemas/1000" {
    export class SavegameInterface_V1000 extends BaseSavegameInterface {
        constructor(data: any);
    }
    import { BaseSavegameInterface } from "savegame/savegame_interface.js";
}
declare module "savegame/schemas/1001" {
    export class SavegameInterface_V1001 extends SavegameInterface_V1000 {
        /**
         * @param {import("../savegame_typedefs.js").SavegameData} data
         */
        static migrate1000to1001(data: import("../savegame_typedefs.js").SavegameData): boolean;
        constructor(data: any);
    }
    import { SavegameInterface_V1000 } from "savegame/schemas/1000.js";
}
declare module "savegame/schemas/1002" {
    export class SavegameInterface_V1002 extends SavegameInterface_V1001 {
        /**
         * @param {import("../savegame_typedefs.js").SavegameData} data
         */
        static migrate1001to1002(data: import("../savegame_typedefs.js").SavegameData): boolean;
        constructor(data: any);
    }
    import { SavegameInterface_V1001 } from "savegame/schemas/1001.js";
}
declare module "savegame/schemas/1003" {
    export class SavegameInterface_V1003 extends SavegameInterface_V1002 {
        /**
         * @param {import("../savegame_typedefs.js").SavegameData} data
         */
        static migrate1002to1003(data: import("../savegame_typedefs.js").SavegameData): boolean;
        constructor(data: any);
    }
    import { SavegameInterface_V1002 } from "savegame/schemas/1002.js";
}
declare module "savegame/schemas/1004" {
    export class SavegameInterface_V1004 extends SavegameInterface_V1003 {
        /**
         * @param {import("../savegame_typedefs.js").SavegameData} data
         */
        static migrate1003to1004(data: import("../savegame_typedefs.js").SavegameData): boolean;
        constructor(data: any);
    }
    import { SavegameInterface_V1003 } from "savegame/schemas/1003.js";
}
declare module "savegame/schemas/1005" {
    export class SavegameInterface_V1005 extends SavegameInterface_V1004 {
        /**
         * @param {import("../savegame_typedefs.js").SavegameData} data
         */
        static migrate1004to1005(data: import("../savegame_typedefs.js").SavegameData): boolean;
        constructor(data: any);
    }
    import { SavegameInterface_V1004 } from "savegame/schemas/1004.js";
}
declare module "savegame/schemas/1006" {
    export class SavegameInterface_V1006 extends SavegameInterface_V1005 {
        static computeSpriteMapping(): {
            "sprites/blueprints/belt_top.png": string;
            "sprites/blueprints/belt_left.png": string;
            "sprites/blueprints/belt_right.png": string;
            "sprites/blueprints/splitter.png": string;
            "sprites/blueprints/splitter-compact.png": string;
            "sprites/blueprints/splitter-compact-inverse.png": string;
            "sprites/blueprints/underground_belt_entry.png": string;
            "sprites/blueprints/underground_belt_exit.png": string;
            "sprites/blueprints/underground_belt_entry-tier2.png": string;
            "sprites/blueprints/underground_belt_exit-tier2.png": string;
            "sprites/blueprints/miner.png": string;
            "sprites/blueprints/miner-chainable.png": string;
            "sprites/blueprints/cutter.png": string;
            "sprites/blueprints/cutter-quad.png": string;
            "sprites/blueprints/rotater.png": string;
            "sprites/blueprints/rotater-ccw.png": string;
            "sprites/blueprints/stacker.png": string;
            "sprites/blueprints/mixer.png": string;
            "sprites/blueprints/painter.png": string;
            "sprites/blueprints/painter-mirrored.png": string;
            "sprites/blueprints/painter-double.png": string;
            "sprites/blueprints/painter-quad.png": string;
            "sprites/blueprints/trash.png": string;
            "sprites/blueprints/trash-storage.png": string;
        };
        /**
         * @param {import("../savegame_typedefs.js").SavegameData} data
         */
        static migrate1005to1006(data: import("../savegame_typedefs.js").SavegameData): boolean;
        /**
         *
         * @param {Entity} entity
         */
        static migrateStaticComp1005to1006(entity: Entity): void;
        constructor(data: any);
    }
    import { SavegameInterface_V1005 } from "savegame/schemas/1005.js";
    import { Entity } from "game/entity.js";
}
declare module "savegame/schemas/1007" {
    export class SavegameInterface_V1007 extends SavegameInterface_V1006 {
        /**
         * @param {import("../savegame_typedefs.js").SavegameData} data
         */
        static migrate1006to1007(data: import("../savegame_typedefs.js").SavegameData): boolean;
        constructor(data: any);
    }
    import { SavegameInterface_V1006 } from "savegame/schemas/1006.js";
}
declare module "savegame/schemas/1008" {
    export class SavegameInterface_V1008 extends SavegameInterface_V1007 {
        /**
         * @param {import("../savegame_typedefs.js").SavegameData} data
         */
        static migrate1007to1008(data: import("../savegame_typedefs.js").SavegameData): boolean;
        constructor(data: any);
    }
    import { SavegameInterface_V1007 } from "savegame/schemas/1007.js";
}
declare module "game/buildings/constant_signal" {
    export class MetaConstantSignalBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/logic_gate" {
    export type enumLogicGateVariants = string;
    export namespace enumLogicGateVariants {
        export const not: string;
        export const xor: string;
        export const or: string;
    }
    export type enumVariantToGate = string;
    /** @enum {string} */
    export const enumVariantToGate: {
        [x: string]: string;
        default: string;
    };
    export class MetaLogicGateBuilding extends MetaBuilding {
    }
    import { defaultBuildingVariant } from "game/meta_building";
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/wire_tunnel" {
    export class MetaWireTunnelBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/virtual_processor" {
    export type enumVirtualProcessorVariants = string;
    export namespace enumVirtualProcessorVariants {
        export const rotater: string;
        export const unstacker: string;
        export const stacker: string;
        export const painter: string;
    }
    export type enumVariantToGate = string;
    /** @enum {string} */
    export const enumVariantToGate: {
        [x: string]: string;
        default: string;
    };
    export class MetaVirtualProcessorBuilding extends MetaBuilding {
    }
    import { defaultBuildingVariant } from "game/meta_building";
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/transistor" {
    export type enumTransistorVariants = string;
    export namespace enumTransistorVariants {
        export const mirrored: string;
    }
    export class MetaTransistorBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/analyzer" {
    export class MetaAnalyzerBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/buildings/comparator" {
    export class MetaComparatorBuilding extends MetaBuilding {
    }
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/hud/parts/wires_toolbar" {
    export class HUDWiresToolbar extends HUDBaseToolbar {
        constructor(root: any);
    }
    import { HUDBaseToolbar } from "game/hud/parts/base_toolbar";
}
declare module "game/tutorial_goals_mappings" {
    /**
     * Stores which reward unlocks what
     */
    export type enumHubGoalRewardsToContentUnlocked = [typeof MetaBuilding, string][];
    /**
     * Stores which reward unlocks what
     * @enum {TutorialGoalReward?}
     */
    export const enumHubGoalRewardsToContentUnlocked: {
        [x: string]: [typeof MetaBuilding, string][];
    };
    export type TutorialGoalReward = [typeof MetaBuilding, string][];
    import { MetaBuilding } from "game/meta_building";
}
declare module "game/hud/parts/unlock_notification" {
    export class HUDUnlockNotification extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        visible: boolean;
        domAttach: DynamicDomAttach;
        buttonShowTimeout: number;
        inputReciever: InputReceiver;
        element: HTMLDivElement;
        elemTitle: HTMLDivElement;
        elemSubTitle: HTMLDivElement;
        elemContents: HTMLDivElement;
        btnClose: HTMLButtonElement;
        /**
         * @param {number} level
         * @param {enumHubGoalRewards} reward
         */
        showForLevel(level: number, reward: enumHubGoalRewards): void;
        requestClose(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { InputReceiver } from "core/input_receiver";
    import { enumHubGoalRewards } from "game/tutorial_goals";
}
declare module "game/hud/parts/mass_selector" {
    export class HUDMassSelector extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        currentSelectionStartWorld: Vector;
        currentSelectionEnd: Vector;
        selectedUids: any;
        /**
         * Handles the destroy callback and makes sure we clean our list
         * @param {Entity} entity
         */
        onEntityDestroyed(entity: Entity): void;
        /**
         *
         */
        onBack(): string;
        /**
         * Clears the entire selection
         */
        clearSelection(): void;
        confirmDelete(): void;
        doDelete(): void;
        startCopy(): void;
        clearBelts(): void;
        confirmCut(): void;
        doCut(): void;
        /**
         * mouse down pre handler
         * @param {Vector} pos
         * @param {enumMouseButton} mouseButton
         */
        onMouseDown(pos: Vector, mouseButton: enumMouseButton): string;
        /**
         * mouse move pre handler
         * @param {Vector} pos
         */
        onMouseMove(pos: Vector): void;
        onMouseUp(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { Vector } from "core/vector";
    import { Entity } from "game/entity";
    import { enumMouseButton } from "game/camera";
}
declare module "game/hud/parts/shop" {
    export class HUDShop extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        background: HTMLDivElement;
        dialogInner: HTMLDivElement;
        title: HTMLDivElement;
        closeButton: HTMLDivElement;
        contentDiv: HTMLDivElement;
        upgradeToElements: {};
        rerenderFull(): void;
        renderCountsAndStatus(): void;
        domAttach: DynamicDomAttach;
        inputReciever: InputReceiver;
        keyActionMapper: KeyActionMapper;
        show(): void;
        visible: boolean;
        tryUnlockNextTier(upgradeId: any): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { InputReceiver } from "core/input_receiver";
    import { KeyActionMapper } from "game/key_action_mapper";
}
declare module "game/hud/parts/statistics_handle" {
    export type enumDisplayMode = string;
    export namespace enumDisplayMode {
        export const icons: string;
        export const detailed: string;
    }
    /**
     * Stores how many seconds one unit is
     * @type {Object<string, number>}
     */
    export const statisticsUnitsSeconds: {
        [x: string]: number;
    };
    /**
     * Simple wrapper for a shape definition within the shape statistics
     */
    export class HUDShapeStatisticsHandle {
        /**
         * @param {GameRoot} root
         * @param {ShapeDefinition} definition
         * @param {IntersectionObserver} intersectionObserver
         */
        constructor(root: GameRoot, definition: ShapeDefinition, intersectionObserver: IntersectionObserver);
        definition: ShapeDefinition;
        root: GameRoot;
        intersectionObserver: IntersectionObserver;
        visible: any;
        initElement(): void;
        element: HTMLDivElement;
        counter: HTMLSpanElement;
        /**
         * Sets whether the shape handle is visible currently
         * @param {boolean} visibility
         */
        setVisible(visibility: boolean): void;
        shapeCanvas: HTMLCanvasElement;
        /**
         *
         * @param {enumDisplayMode} displayMode
         * @param {enumAnalyticsDataSource} dataSource
         * @param {string} unit
         * @param {boolean=} forced
         */
        update(displayMode: enumDisplayMode, dataSource: enumAnalyticsDataSource, unit: string, forced?: boolean | undefined): void;
        graphCanvas: HTMLCanvasElement;
        graphContext: CanvasRenderingContext2D;
        /**
         * Attaches the handle
         * @param {HTMLElement} parent
         */
        attach(parent: HTMLElement): void;
        /**
         * Detaches the handle
         */
        detach(): void;
        /**
         * Cleans up all child elements
         */
        cleanupChildElements(): void;
        /**
         * Destroys the handle
         */
        destroy(): void;
    }
    import { ShapeDefinition } from "game/shape_definition";
    import { GameRoot } from "game/root";
    import { enumAnalyticsDataSource } from "game/production_analytics";
}
declare module "game/hud/parts/statistics" {
    export class HUDStatistics extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        background: HTMLDivElement;
        dialogInner: HTMLDivElement;
        title: HTMLDivElement;
        closeButton: HTMLDivElement;
        filterHeader: HTMLDivElement;
        sourceExplanation: HTMLDivElement;
        filtersDataSource: HTMLDivElement;
        filtersDisplayMode: HTMLDivElement;
        contentDiv: HTMLDivElement;
        /**
         * @param {enumAnalyticsDataSource} source
         */
        setDataSource(source: enumAnalyticsDataSource): void;
        dataSource: string;
        /**
         * @param {enumDisplayMode} mode
         */
        setDisplayMode(mode: enumDisplayMode): void;
        displayMode: string;
        /**
         * @param {boolean} sorted
         */
        setSorted(sorted: boolean): void;
        sorted: boolean;
        toggleSorted(): void;
        /**
         * Chooses the next unit
         */
        iterateUnit(): void;
        currentUnit: any;
        domAttach: DynamicDomAttach;
        inputReciever: InputReceiver;
        keyActionMapper: KeyActionMapper;
        /** @type {Object.<string, HUDShapeStatisticsHandle>} */
        activeHandles: {
            [x: string]: HUDShapeStatisticsHandle;
        };
        intersectionObserver: IntersectionObserver;
        lastFullRerender: number;
        intersectionCallback(entries: any): void;
        show(): void;
        visible: boolean;
        lastPartialRerender: number;
        /**
         * Performs a partial rerender, only updating graphs and counts
         */
        rerenderPartial(): void;
        /**
         * Performs a full rerender, regenerating everything
         */
        rerenderFull(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { enumAnalyticsDataSource } from "game/production_analytics";
    import { enumDisplayMode } from "game/hud/parts/statistics_handle";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { InputReceiver } from "core/input_receiver";
    import { KeyActionMapper } from "game/key_action_mapper";
    import { HUDShapeStatisticsHandle } from "game/hud/parts/statistics_handle";
}
declare module "game/hud/parts/wire_info" {
    export class HUDWireInfo extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        spriteEmpty: import("core/sprites").AtlasSprite;
        spriteConflict: import("core/sprites").AtlasSprite;
        /**
         *
         *
         * @param {import("../../../core/draw_utils").DrawParameters} parameters
         * @param {WireNetwork} network
         */
        drawHighlightedNetwork(parameters: import("../../../core/draw_utils").DrawParameters, network: WireNetwork): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { WireNetwork } from "game/systems/wire";
}
declare module "game/hud/parts/lever_toggle" {
    export class HUDLeverToggle extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        /**
         * @param {Vector} pos
         * @param {enumMouseButton} button
         */
        downPreHandler(pos: Vector, button: enumMouseButton): string;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { Vector } from "core/vector";
    import { enumMouseButton } from "game/camera";
}
declare module "game/hud/parts/screenshot_exporter" {
    export class HUDScreenshotExporter extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        startExport(): void;
        doExport(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "game/hud/parts/wires_overlay" {
    export class HUDWiresOverlay extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        currentAlpha: any;
        /**
         * Switches between layers
         */
        switchLayers(): void;
        /**
         * Generates the background pattern for the wires overlay
         */
        generateTilePattern(): void;
        tilePatternCanvas: HTMLCanvasElement;
        /**
         * Copies the wires value below the cursor
         */
        copyWireValue(): void;
        cachedPatternBackground: CanvasPattern;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "game/hud/parts/shape_viewer" {
    export class HUDShapeViewer extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        background: HTMLDivElement;
        dialogInner: HTMLDivElement;
        title: HTMLDivElement;
        closeButton: HTMLDivElement;
        contentDiv: HTMLDivElement;
        renderArea: HTMLDivElement;
        infoArea: HTMLDivElement;
        copyButton: HTMLButtonElement;
        domAttach: DynamicDomAttach;
        currentShapeKey: string;
        inputReciever: InputReceiver;
        keyActionMapper: KeyActionMapper;
        /**
         * Called when the copying of a key was requested
         */
        onCopyKeyRequested(): void;
        visible: boolean;
        /**
         * Shows the viewer for a given definition
         * @param {ShapeDefinition} definition
         */
        renderForShape(definition: ShapeDefinition): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { InputReceiver } from "core/input_receiver";
    import { KeyActionMapper } from "game/key_action_mapper";
    import { ShapeDefinition } from "game/shape_definition";
}
declare module "game/hud/parts/layer_preview" {
    /**
     * Helper class which allows peaking through to the wires layer
     */
    export class HUDLayerPreview extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        previewOverlay: import("core/sprites").AtlasSprite;
        /**
         * (re) initializes the canvas
         */
        initializeCanvas(): void;
        previewSize: number;
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        /**
         * Prepares the canvas to render at the given worldPos and the given camera scale
         *
         * @param {Vector} worldPos
         * @param {number} scale 1 / zoomLevel
         */
        prepareCanvasForPreview(worldPos: Vector, scale: number): HTMLCanvasElement;
        /**
         * Renders the preview at the given position
         * @param {import("../../../core/draw_utils").DrawParameters} parameters
         * @param {Vector} worldPos
         * @param {number} scale 1 / zoomLevel
         */
        renderPreview(parameters: import("../../../core/draw_utils").DrawParameters, worldPos: Vector, scale: number): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { Vector } from "core/vector";
}
declare module "game/hud/parts/tutorial_video_offer" {
    /**
     * Offers to open the tutorial video after completing a level
     */
    export class HUDTutorialVideoOffer extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "game/hud/parts/miner_highlight" {
    export class HUDMinerHighlight extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        /**
         * Finds all connected miners to the given entity
         * @param {Entity} entity
         * @param {Set<number>} seenUids Which entities have already been processed
         * @returns {Array<Entity>} The connected miners
         */
        findConnectedMiners(entity: Entity, seenUids?: any): Array<Entity>;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { Entity } from "game/entity";
}
declare module "game/hud/parts/game_menu" {
    export class HUDGameMenu extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        /** @type {Array<{
         * badge: function,
         * button: HTMLElement,
         * badgeElement: HTMLElement,
         * lastRenderAmount: number,
         * condition?: function,
         * notification: [string, enumNotificationType]
         * }>} */
        badgesToUpdate: {
            badge: Function;
            button: HTMLElement;
            badgeElement: HTMLElement;
            lastRenderAmount: number;
            condition?: Function;
            notification: [string, enumNotificationType];
        }[];
        /** @type {Array<{
         * button: HTMLElement,
         * condition: function,
         * domAttach: DynamicDomAttach
         * }>} */
        visibilityToUpdate: {
            button: HTMLElement;
            condition: Function;
            domAttach: DynamicDomAttach;
        }[];
        saveButton: HTMLDivElement;
        settingsButton: HTMLDivElement;
        trackedIsSaving: TrackedState;
        onIsSavingChanged(isSaving: any): void;
        onGameSaved(): void;
        startSave(): void;
        openSettings(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { enumNotificationType } from "game/hud/parts/notifications";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { TrackedState } from "core/tracked_state";
}
declare module "game/hud/parts/constant_signal_edit" {
    export class HUDConstantSignalEdit extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        /**
         * @param {Vector} pos
         * @param {enumMouseButton} button
         */
        downPreHandler(pos: Vector, button: enumMouseButton): string;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { Vector } from "core/vector";
    import { enumMouseButton } from "game/camera";
}
declare module "game/hud/parts/keybinding_overlay" {
    /**
     * @typedef {{ keyCode: number }} KeyCode
     */
    /**
     * @typedef {{
     *   condition: () => boolean,
     *   keys: Array<KeyCode|number|string>,
     *   label: string,
     *   cachedElement?: HTMLElement,
     *   cachedVisibility?: boolean
     * }} KeyBinding
     */
    export class HUDKeybindingOverlay extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        /**
         * HELPER / Returns if there is a building selected for placement
         * @returns {boolean}
         */
        get buildingPlacementActive(): boolean;
        /**
         * HELPER / Returns if there is a building selected for placement and
         * it supports the belt planner
         * @returns {boolean}
         */
        get buildingPlacementSupportsBeltPlanner(): boolean;
        /**
         * HELPER / Returns if there is a building selected for placement and
         * it has multiplace enabled by default
         * @returns {boolean}
         */
        get buildingPlacementStaysInPlacement(): boolean;
        /**
         * HELPER / Returns if there is a blueprint selected for placement
         * @returns {boolean}
         */
        get blueprintPlacementActive(): boolean;
        /**
         * HELPER / Returns if the belt planner is currently active
         * @returns {boolean}
         */
        get beltPlannerActive(): boolean;
        /**
         * HELPER / Returns if there is a last blueprint available
         * @returns {boolean}
         */
        get lastBlueprintAvailable(): boolean;
        /**
         * HELPER / Returns if there is anything selected on the map
         * @returns {boolean}
         */
        get anythingSelectedOnMap(): boolean;
        /**
         * HELPER / Returns if there is a building or blueprint selected for placement
         * @returns {boolean}
         */
        get anyPlacementActive(): boolean;
        /**
         * HELPER / Returns if the map overview is active
         * @returns {boolean}
         */
        get mapOverviewActive(): boolean;
        /** @type {Array<KeyBinding>} */
        keybindings: Array<KeyBinding>;
        element: HTMLDivElement;
        domAttach: DynamicDomAttach;
    }
    export type KeyCode = {
        keyCode: number;
    };
    export type KeyBinding = {
        condition: () => boolean;
        keys: Array<KeyCode | number | string>;
        label: string;
        cachedElement?: HTMLElement;
        cachedVisibility?: boolean;
    };
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
}
declare module "game/hud/parts/watermark" {
    export class HUDWatermark extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        linkElement: HTMLDivElement;
        domAttach: DynamicDomAttach;
        onWatermarkClick(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
}
declare module "game/hud/parts/standalone_advantages" {
    export class HUDStandaloneAdvantages extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        background: HTMLDivElement;
        dialogInner: HTMLDivElement;
        title: HTMLDivElement;
        contentDiv: HTMLDivElement;
        domAttach: DynamicDomAttach;
        inputReciever: InputReceiver;
        lastShown: number;
        show(): void;
        visible: boolean;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { InputReceiver } from "core/input_receiver";
}
declare module "game/hud/parts/cat_memes" {
    export class HUDCatMemes extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        domAttach: DynamicDomAttach;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
}
declare module "game/hud/parts/tutorial_hints" {
    export class HUDPartTutorialHints extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        videoElement: HTMLVideoElement;
        videoAttach: DynamicDomAttach;
        enlarged: boolean;
        inputReciever: InputReceiver;
        keyActionMapper: KeyActionMapper;
        domAttach: DynamicDomAttach;
        currentShownLevel: TrackedState;
        updateVideoUrl(level: any): void;
        show(): void;
        toggleHintEnlarged(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { InputReceiver } from "core/input_receiver";
    import { KeyActionMapper } from "game/key_action_mapper";
    import { TrackedState } from "core/tracked_state";
}
declare module "core/cachebust" {
    /**
     * Generates a cachebuster string. This only modifies the path in the browser version
     * @param {string} path
     */
    export function cachebust(path: string): string;
}
declare module "game/hud/parts/interactive_tutorial" {
    export class HUDInteractiveTutorial extends BaseHUDPart {
        constructor(root: GameRoot);
        element: HTMLDivElement;
        elementDescription: HTMLDivElement;
        elementGif: HTMLDivElement;
        domAttach: DynamicDomAttach;
        currentHintId: TrackedState;
        onHintChanged(hintId: any): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { TrackedState } from "core/tracked_state";
    import { GameRoot } from "game/root";
}
declare module "core/query_parameters" {
    export namespace queryParamOptions {
        export const embedProvider: any;
        export const fullVersion: boolean;
        export const sandboxMode: boolean;
    }
}
declare module "game/hud/parts/sandbox_controller" {
    export class HUDSandboxController extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        giveBlueprints(): void;
        maxOutAll(): void;
        modifyUpgrade(id: any, amount: any): void;
        modifyLevel(amount: any): void;
        visible: any;
        domAttach: DynamicDomAttach;
        toggle(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
}
declare module "game/modes/regular" {
    /**
     * Generates the level definitions
     * @param {boolean} limitedVersion
     */
    export function generateLevelDefinitions(limitedVersion?: boolean): ({
        shape: string;
        required: number;
        reward: string;
        throughputOnly?: undefined;
    } | {
        shape: string;
        required: number;
        reward: string;
        throughputOnly: boolean;
    })[];
    /** @typedef {{
     *   shape: string,
     *   amount: number
     * }} UpgradeRequirement */
    /** @typedef {{
     *   required: Array<UpgradeRequirement>
     *   improvement?: number,
     *   excludePrevious?: boolean
     * }} TierRequirement */
    /** @typedef {Array<TierRequirement>} UpgradeTiers */
    /** @typedef {{
     *   shape: string,
     *   required: number,
     *   reward: enumHubGoalRewards,
     *   throughputOnly?: boolean
     * }} LevelDefinition */
    export const rocketShape: "CbCuCbCu:Sr------:--CrSrCr:CwCwCwCw";
    export const finalGameShape: "RuCw--Cw:----Ru--";
    export class RegularGameMode extends GameMode {
        /** @param {GameRoot} root */
        constructor(root: GameRoot);
    }
    export type UpgradeRequirement = {
        shape: string;
        amount: number;
    };
    export type TierRequirement = {
        required: Array<UpgradeRequirement>;
        improvement?: number;
        excludePrevious?: boolean;
    };
    export type UpgradeTiers = {
        required: Array<UpgradeRequirement>;
        improvement?: number;
        excludePrevious?: boolean;
    }[];
    export type LevelDefinition = {
        shape: string;
        required: number;
        reward: enumHubGoalRewards;
        throughputOnly?: boolean;
    };
    import { GameMode } from "game/game_mode";
    import { GameRoot } from "game/root";
    import { enumHubGoalRewards } from "game/tutorial_goals";
}
declare module "savegame/schemas/1009" {
    export class SavegameInterface_V1009 extends SavegameInterface_V1008 {
        /**
         * @param {import("../savegame_typedefs.js").SavegameData} data
         */
        static migrate1008to1009(data: import("../savegame_typedefs.js").SavegameData): boolean;
        constructor(data: any);
    }
    import { SavegameInterface_V1008 } from "savegame/schemas/1008.js";
}
declare module "savegame/schemas/1010" {
    export class SavegameInterface_V1010 extends SavegameInterface_V1009 {
        /**
         * @param {import("../savegame_typedefs.js").SavegameData} data
         */
        static migrate1009to1010(data: import("../savegame_typedefs.js").SavegameData): boolean;
        constructor(data: any);
    }
    import { SavegameInterface_V1009 } from "savegame/schemas/1009.js";
}
declare module "savegame/savegame_interface_registry" {
    /**
     * Returns if the given savegame has any supported interface
     * @param {any} savegame
     * @returns {BaseSavegameInterface|null}
     */
    export function getSavegameInterface(savegame: any): BaseSavegameInterface | null;
    /** @type {Object.<number, typeof BaseSavegameInterface>} */
    export const savegameInterfaces: {
        [x: number]: typeof BaseSavegameInterface;
    };
    import { BaseSavegameInterface } from "savegame/savegame_interface";
}
declare module "savegame/savegame" {
    /**
     * @typedef {import("../application").Application} Application
     * @typedef {import("../game/root").GameRoot} GameRoot
     * @typedef {import("./savegame_typedefs").SavegameData} SavegameData
     * @typedef {import("./savegame_typedefs").SavegameMetadata} SavegameMetadata
     * @typedef {import("./savegame_typedefs").SavegameStats} SavegameStats
     * @typedef {import("./savegame_typedefs").SerializedGame} SerializedGame
     */
    export class Savegame extends ReadWriteProxy {
        /**
         * @returns {number}
         */
        static getCurrentVersion(): number;
        /**
         * @returns {typeof BaseSavegameInterface}
         */
        static getReaderClass(): typeof BaseSavegameInterface;
        /**
         *
         * @param {Application} app
         * @returns
         */
        static createPuzzleSavegame(app: Application): Savegame;
        /**
         *
         * @param {Application} app
         * @param {object} param0
         * @param {string} param0.internalId
         * @param {SavegameMetadata} param0.metaDataRef Handle to the meta data
         */
        constructor(app: Application, { internalId, metaDataRef }: {
            internalId: string;
            metaDataRef: SavegameMetadata;
        });
        internalId: string;
        metaDataRef: {
            lastUpdate: number;
            version: number;
            internalId: string;
            level: number;
            name: string;
        };
        /**
         * Returns if this game can be saved on disc
         * @returns {boolean}
         */
        isSaveable(): boolean;
        /**
         * Returns the statistics of the savegame
         * @returns {SavegameStats}
         */
        getStatistics(): SavegameStats;
        /**
         * Returns the *real* last update of the savegame, not the one of the metadata
         * which could also be the servers one
         */
        getRealLastUpdate(): number;
        /**
         * Returns if this game has a serialized game dump
         */
        hasGameDump(): boolean;
        /**
         * Returns the current game dump
         * @returns {SerializedGame}
         */
        getCurrentDump(): SerializedGame;
        /**
         * Returns a reader to access the data
         * @returns {BaseSavegameInterface}
         */
        getDumpReader(): BaseSavegameInterface;
        /**
         * Returns a reader to access external data
         * @returns {BaseSavegameInterface}
         */
        getDumpReaderForExternalData(data: any): BaseSavegameInterface;
        /**
         * Updates the last update field so we can send the savegame to the server,
         * WITHOUT Saving!
         */
        setLastUpdate(time: any): void;
        /**
         *
         * @param {GameRoot} root
         */
        updateData(root: GameRoot): boolean;
        /**
         * Writes the savegame as well as its metadata
         */
        writeSavegameAndMetadata(): Promise<void>;
        /**
         * Updates the savegames metadata
         */
        saveMetadata(): Promise<void>;
    }
    export type Application = import("application").Application;
    export type GameRoot = import("game/root").GameRoot;
    export type SavegameData = {
        version: number;
        dump: {
            camera: any;
            time: any;
            entityMgr: any;
            map: any;
            gameMode: any;
            hubGoals: any;
            pinnedShapes: any;
            waypoints: any;
            entities: import("game/entity").Entity[];
            beltPaths: any[];
        };
        stats: {
            failedMam: boolean;
            trashedCount: number;
            usedInverseRotater: boolean;
        };
        lastUpdate: number;
    };
    export type SavegameMetadata = {
        lastUpdate: number;
        version: number;
        internalId: string;
        level: number;
        name: string;
    };
    export type SavegameStats = {
        failedMam: boolean;
        trashedCount: number;
        usedInverseRotater: boolean;
    };
    export type SerializedGame = {
        camera: any;
        time: any;
        entityMgr: any;
        map: any;
        gameMode: any;
        hubGoals: any;
        pinnedShapes: any;
        waypoints: any;
        entities: import("game/entity").Entity[];
        beltPaths: any[];
    };
    import { ReadWriteProxy } from "core/read_write_proxy";
    import { BaseSavegameInterface } from "savegame/savegame_interface";
}
declare module "core/buffer_maintainer" {
    export class BufferMaintainer {
        /**
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        /** @type {Map<string, Map<string, CacheEntry>>} */
        cache: any;
        iterationIndex: number;
        lastIteration: number;
        /**
         * Returns the buffer stats
         */
        getStats(): {
            rootKeys: number;
            subKeys: number;
            vramBytes: number;
        };
        /**
         * Goes to the next buffer iteration, clearing all buffers which were not used
         * for a few iterations
         */
        garbargeCollect(): void;
        update(): void;
        /**
         * @param {object} param0
         * @param {string} param0.key
         * @param {string} param0.subKey
         * @param {number} param0.w
         * @param {number} param0.h
         * @param {number} param0.dpi
         * @param {function(HTMLCanvasElement, CanvasRenderingContext2D, number, number, number, object?) : void} param0.redrawMethod
         * @param {object=} param0.additionalParams
         * @returns {HTMLCanvasElement}
         *
         */
        getForKey({ key, subKey, w, h, dpi, redrawMethod, additionalParams }: {
            key: string;
            subKey: string;
            w: number;
            h: number;
            dpi: number;
            redrawMethod: (arg0: HTMLCanvasElement, arg1: CanvasRenderingContext2D, arg2: number, arg3: number, arg4: number, arg5: object | null) => void;
            additionalParams?: object | undefined;
        }): HTMLCanvasElement;
        /**
         * @param {object} param0
         * @param {string} param0.key
         * @param {string} param0.subKey
         * @returns {HTMLCanvasElement?}
         *
         */
        getForKeyOrNullNoUpdate({ key, subKey }: {
            key: string;
            subKey: string;
        }): HTMLCanvasElement | null;
    }
    export type CacheEntry = {
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        lastUse: number;
    };
    import { GameRoot } from "game/root";
}
declare module "game/automatic_save" {
    export type enumSavePriority = number;
    export namespace enumSavePriority {
        export const regular: number;
        export const asap: number;
    }
    export class AutomaticSave {
        constructor(root: any);
        /** @type {GameRoot} */
        root: GameRoot;
        saveImportance: number;
        lastSaveAttempt: number;
        setSaveImportance(importance: any): void;
        doSave(): void;
        update(): void;
    }
    import { GameRoot } from "game/root";
}
declare module "game/dynamic_tickrate" {
    export class DynamicTickrate {
        /**
         *
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        currentTickStart: number;
        capturedTicks: any[];
        averageTickDuration: number;
        accumulatedFps: number;
        accumulatedFpsLastUpdate: number;
        averageFps: number;
        onFrameRendered(): void;
        /**
         * Sets the tick rate to N updates per second
         * @param {number} rate
         */
        setTickRate(rate: number): void;
        currentTickRate: number;
        deltaMs: number;
        deltaSeconds: number;
        /**
         * Increases the tick rate marginally
         */
        increaseTickRate(): void;
        /**
         * Decreases the tick rate marginally
         */
        decreaseTickRate(): void;
        /**
         * Call whenever a tick began
         */
        beginTick(): void;
        /**
         * Call whenever a tick ended
         */
        endTick(): void;
    }
    import { GameRoot } from "game/root";
}
declare module "game/hub_goals" {
    export class HubGoals extends BasicSerializableObject {
        static getId(): string;
        static getSchema(): {
            level: import("savegame/serialization_data_types").TypePositiveInteger;
            storedShapes: import("savegame/serialization_data_types").TypeKeyValueMap;
            upgradeLevels: import("savegame/serialization_data_types").TypeKeyValueMap;
        };
        /**
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        level: number;
        root: GameRoot;
        /**
         * Which story rewards we already gained
         * @type {Object.<string, number>}
         */
        gainedRewards: {
            [x: string]: number;
        };
        /**
         * Mapping from shape hash -> amount
         * @type {Object<string, number>}
         */
        storedShapes: {
            [x: string]: number;
        };
        /**
         * Stores the levels for all upgrades
         * @type {Object<string, number>}
         */
        upgradeLevels: {
            [x: string]: number;
        };
        /**
         * Stores the improvements for all upgrades
         * @type {Object<string, number>}
         */
        upgradeImprovements: {
            [x: string]: number;
        };
        /**
         * Returns whether the end of the demo is reached
         * @returns {boolean}
         */
        isEndOfDemoReached(): boolean;
        /**
         * Returns how much of the current shape is stored
         * @param {ShapeDefinition} definition
         * @returns {number}
         */
        getShapesStored(definition: ShapeDefinition): number;
        /**
         * @param {string} key
         * @param {number} amount
         */
        takeShapeByKey(key: string, amount: number): void;
        /**
         * Returns how much of the current shape is stored
         * @param {string} key
         * @returns {number}
         */
        getShapesStoredByKey(key: string): number;
        /**
         * Returns how much of the current goal was already delivered
         */
        getCurrentGoalDelivered(): number;
        /**
         * Returns the current level of a given upgrade
         * @param {string} upgradeId
         */
        getUpgradeLevel(upgradeId: string): number;
        /**
         * Returns whether the given reward is already unlocked
         * @param {enumHubGoalRewards} reward
         */
        isRewardUnlocked(reward: enumHubGoalRewards): boolean;
        /**
         * Handles the given definition, by either accounting it towards the
         * goal or otherwise granting some points
         * @param {ShapeDefinition} definition
         */
        handleDefinitionDelivered(definition: ShapeDefinition): void;
        /**
         * Creates the next goal
         */
        computeNextGoal(): void;
        currentGoal: {
            /** @type {ShapeDefinition} */
            definition: ShapeDefinition;
            required: any;
            reward: any;
            throughputOnly: any;
        };
        /**
         * Called when the level was completed
         */
        onGoalCompleted(): void;
        /**
         * Returns whether we are playing in free-play
         */
        isFreePlay(): boolean;
        /**
         * Returns whether a given upgrade can be unlocked
         * @param {string} upgradeId
         */
        canUnlockUpgrade(upgradeId: string): boolean;
        /**
         * Returns the number of available upgrades
         * @returns {number}
         */
        getAvailableUpgradeCount(): number;
        /**
         * Tries to unlock the given upgrade
         * @param {string} upgradeId
         * @returns {boolean}
         */
        tryUnlockUpgrade(upgradeId: string): boolean;
        /**
         * Picks random colors which are close to each other
         * @param {RandomNumberGenerator} rng
         */
        generateRandomColorSet(rng: RandomNumberGenerator, allowUncolored?: boolean): string[];
        /**
         * Creates a (seeded) random shape
         * @param {number} level
         * @returns {ShapeDefinition}
         */
        computeFreeplayShape(level: number): ShapeDefinition;
        /**
         * Belt speed
         * @returns {number} items / sec
         */
        getBeltBaseSpeed(): number;
        /**
         * Underground belt speed
         * @returns {number} items / sec
         */
        getUndergroundBeltBaseSpeed(): number;
        /**
         * Miner speed
         * @returns {number} items / sec
         */
        getMinerBaseSpeed(): number;
        /**
         * Processor speed
         * @param {enumItemProcessorTypes} processorType
         * @returns {number} items / sec
         */
        getProcessorBaseSpeed(processorType: enumItemProcessorTypes): number;
    }
    import { BasicSerializableObject } from "savegame/serialization";
    import { GameRoot } from "game/root";
    import { ShapeDefinition } from "game/shape_definition";
    import { enumHubGoalRewards } from "game/tutorial_goals";
    import { RandomNumberGenerator } from "core/rng";
    import { enumItemProcessorTypes } from "game/components/item_processor";
}
declare module "game/logic" {
    /**
     * Typing helper
     * @typedef {Array<{
     *  entity: Entity,
     *  slot: import("./components/item_ejector").ItemEjectorSlot,
     *  fromTile: Vector,
     *  toDirection: enumDirection
     * }>} EjectorsAffectingTile
     */
    /**
     * Typing helper
     * @typedef {Array<{
     *  entity: Entity,
     *  slot: import("./components/item_acceptor").ItemAcceptorSlot,
     *  toTile: Vector,
     *  fromDirection: enumDirection
     * }>} AcceptorsAffectingTile
     */
    /**
     * @typedef {{
     *     acceptors: AcceptorsAffectingTile,
     *     ejectors: EjectorsAffectingTile
     * }} AcceptorsAndEjectorsAffectingTile
     */
    export class GameLogic {
        /**
         *
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        /**
         * Checks if the given entity can be placed
         * @param {Entity} entity
         * @param {Vector=} offset Optional, move the entity by the given offset first
         * @returns {boolean} true if the entity could be placed there
         */
        checkCanPlaceEntity(entity: Entity, offset?: Vector | undefined): boolean;
        /**
         * Attempts to place the given building
         * @param {object} param0
         * @param {Vector} param0.origin
         * @param {number} param0.rotation
         * @param {number} param0.originalRotation
         * @param {number} param0.rotationVariant
         * @param {string} param0.variant
         * @param {MetaBuilding} param0.building
         * @returns {Entity}
         */
        tryPlaceBuilding({ origin, rotation, rotationVariant, originalRotation, variant, building }: {
            origin: Vector;
            rotation: number;
            originalRotation: number;
            rotationVariant: number;
            variant: string;
            building: MetaBuilding;
        }): Entity;
        /**
         * Removes all entities with a RemovableMapEntityComponent which need to get
         * removed before placing this entity
         * @param {Entity} entity
         */
        freeEntityAreaBeforeBuild(entity: Entity): void;
        /**
         * Performs a bulk operation, not updating caches in the meantime
         * @param {function} operation
         */
        performBulkOperation(operation: Function): any;
        /**
         * Performs a immutable operation, causing no recalculations
         * @param {function} operation
         */
        performImmutableOperation(operation: Function): any;
        /**
         * Returns whether the given building can get removed
         * @param {Entity} building
         */
        canDeleteBuilding(building: Entity): boolean;
        /**
         * Tries to delete the given building
         * @param {Entity} building
         */
        tryDeleteBuilding(building: Entity): boolean;
        /**
         *
         * Computes the flag for a given tile
         * @param {object} param0
         * @param {enumWireVariant} param0.wireVariant
         * @param {Vector} param0.tile The tile to check at
         * @param {enumDirection} param0.edge The edge to check for
         */
        computeWireEdgeStatus({ wireVariant, tile, edge }: {
            wireVariant: enumWireVariant;
            tile: Vector;
            edge: enumDirection;
        }): boolean;
        /**
         * Returns all wire networks this entity participates in on the given tile
         * @param {Entity} entity
         * @param {Vector} tile
         * @returns {Array<WireNetwork>|null} Null if the entity is never able to be connected at the given tile
         */
        getEntityWireNetworks(entity: Entity, tile: Vector): Array<WireNetwork> | null;
        /**
         * Returns if the entities tile *and* his overlay matrix is intersected
         * @param {Entity} entity
         * @param {Vector} worldPos
         */
        getIsEntityIntersectedWithMatrix(entity: Entity, worldPos: Vector): boolean;
        /**
         * Returns the acceptors and ejectors which affect the current tile
         * @param {Vector} tile
         * @returns {AcceptorsAndEjectorsAffectingTile}
         */
        getEjectorsAndAcceptorsAtTile(tile: Vector): AcceptorsAndEjectorsAffectingTile;
        /**
         * Clears all belts and items
         */
        clearAllBeltsAndItems(): void;
    }
    /**
     * Typing helper
     */
    export type EjectorsAffectingTile = {
        entity: Entity;
        slot: import("./components/item_ejector").ItemEjectorSlot;
        fromTile: Vector;
        toDirection: enumDirection;
    }[];
    /**
     * Typing helper
     */
    export type AcceptorsAffectingTile = {
        entity: Entity;
        slot: import("./components/item_acceptor").ItemAcceptorSlot;
        toTile: Vector;
        fromDirection: enumDirection;
    }[];
    export type AcceptorsAndEjectorsAffectingTile = {
        acceptors: {
            entity: Entity;
            slot: import("./components/item_acceptor").ItemAcceptorSlot;
            toTile: Vector;
            fromDirection: enumDirection;
        }[];
        ejectors: {
            entity: Entity;
            slot: import("./components/item_ejector").ItemEjectorSlot;
            fromTile: Vector;
            toDirection: enumDirection;
        }[];
    };
    import { GameRoot } from "game/root";
    import { Entity } from "game/entity";
    import { Vector } from "core/vector";
    import { MetaBuilding } from "game/meta_building";
    import { enumWireVariant } from "game/components/wire";
    import { enumDirection } from "core/vector";
    import { WireNetwork } from "game/systems/wire";
}
declare module "game/shape_definition_manager" {
    export class ShapeDefinitionManager extends BasicSerializableObject {
        static getId(): string;
        /**
         *
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        /**
         * Store a cache from key -> definition
         * @type {Object<string, ShapeDefinition>}
         */
        shapeKeyToDefinition: {
            [x: string]: ShapeDefinition;
        };
        /**
         * Store a cache from key -> item
         */
        shapeKeyToItem: {};
        /** @type {Object.<string, Array<ShapeDefinition>|ShapeDefinition>} */
        operationCache: {
            [x: string]: Array<ShapeDefinition> | ShapeDefinition;
        };
        /**
         * Returns a shape instance from a given short key
         * @param {string} hash
         * @returns {ShapeDefinition}
         */
        getShapeFromShortKey(hash: string): ShapeDefinition;
        /**
         * Returns a item instance from a given short key
         * @param {string} hash
         * @returns {ShapeItem}
         */
        getShapeItemFromShortKey(hash: string): ShapeItem;
        /**
         * Returns a shape item for a given definition
         * @param {ShapeDefinition} definition
         * @returns {ShapeItem}
         */
        getShapeItemFromDefinition(definition: ShapeDefinition): ShapeItem;
        /**
         * Registers a new shape definition
         * @param {ShapeDefinition} definition
         */
        registerShapeDefinition(definition: ShapeDefinition): void;
        /**
         * Generates a definition for splitting a shape definition in two halfs
         * @param {ShapeDefinition} definition
         * @returns {[ShapeDefinition, ShapeDefinition]}
         */
        shapeActionCutHalf(definition: ShapeDefinition): [ShapeDefinition, ShapeDefinition];
        /**
         * Generates a definition for splitting a shape definition in four quads
         * @param {ShapeDefinition} definition
         * @returns {[ShapeDefinition, ShapeDefinition, ShapeDefinition, ShapeDefinition]}
         */
        shapeActionCutQuad(definition: ShapeDefinition): [ShapeDefinition, ShapeDefinition, ShapeDefinition, ShapeDefinition];
        /**
         * Generates a definition for rotating a shape clockwise
         * @param {ShapeDefinition} definition
         * @returns {ShapeDefinition}
         */
        shapeActionRotateCW(definition: ShapeDefinition): ShapeDefinition;
        /**
         * Generates a definition for rotating a shape counter clockwise
         * @param {ShapeDefinition} definition
         * @returns {ShapeDefinition}
         */
        shapeActionRotateCCW(definition: ShapeDefinition): ShapeDefinition;
        /**
         * Generates a definition for rotating a shape FL
         * @param {ShapeDefinition} definition
         * @returns {ShapeDefinition}
         */
        shapeActionRotate180(definition: ShapeDefinition): ShapeDefinition;
        /**
         * Generates a definition for stacking the upper definition onto the lower one
         * @param {ShapeDefinition} lowerDefinition
         * @param {ShapeDefinition} upperDefinition
         * @returns {ShapeDefinition}
         */
        shapeActionStack(lowerDefinition: ShapeDefinition, upperDefinition: ShapeDefinition): ShapeDefinition;
        /**
         * Generates a definition for painting it with the given color
         * @param {ShapeDefinition} definition
         * @param {enumColors} color
         * @returns {ShapeDefinition}
         */
        shapeActionPaintWith(definition: ShapeDefinition, color: enumColors): ShapeDefinition;
        /**
         * Generates a definition for painting it with the 4 colors
         * @param {ShapeDefinition} definition
         * @param {[enumColors, enumColors, enumColors, enumColors]} colors
         * @returns {ShapeDefinition}
         */
        shapeActionPaintWith4Colors(definition: ShapeDefinition, colors: [enumColors, enumColors, enumColors, enumColors]): ShapeDefinition;
        /**
         * Checks if we already have cached this definition, and if so throws it away and returns the already
         * cached variant
         * @param {ShapeDefinition} definition
         */
        registerOrReturnHandle(definition: ShapeDefinition): ShapeDefinition;
        /**
         *
         * @param {[enumSubShape, enumSubShape, enumSubShape, enumSubShape]} subShapes
         * @returns {ShapeDefinition}
         */
        getDefinitionFromSimpleShapes(subShapes: [enumSubShape, enumSubShape, enumSubShape, enumSubShape], color?: string): ShapeDefinition;
    }
    import { BasicSerializableObject } from "savegame/serialization";
    import { GameRoot } from "game/root";
    import { ShapeDefinition } from "game/shape_definition";
    import { ShapeItem } from "game/items/shape_item";
    import { enumColors } from "game/colors";
    import { enumSubShape } from "game/shape_definition";
}
declare module "game/sound_proxy" {
    export class SoundProxy {
        /**
         * @param {GameRoot} root
         */
        constructor(root: GameRoot);
        root: GameRoot;
        playing3DSounds: any[];
        playingUiSounds: any[];
        /**
         * Plays a new ui sound
         * @param {string} id Sound ID
         */
        playUi(id: string): boolean;
        /**
         * Plays the ui click sound
         */
        playUiClick(): void;
        /**
         * Plays the ui error sound
         */
        playUiError(): void;
        /**
         * Plays a 3D sound whose volume is scaled based on where it was emitted
         * @param {string} id Sound ID
         * @param {Vector} pos World space position
         */
        play3D(id: string, pos: Vector): boolean;
        /**
         * Updates the list of ongoing sounds
         */
        internalUpdateOngoingSounds(): void;
    }
    import { GameRoot } from "game/root";
    import { Vector } from "core/vector";
}
declare module "game/core" {
    /**
     * The core manages the root and represents the whole game. It wraps the root, since
     * the root class is just a data holder.
     */
    export class GameCore {
        /** @param {Application} app */
        constructor(app: Application);
        app: Application;
        /** @type {GameRoot} */
        root: GameRoot;
        /**
         * Set to true at the beginning of a logic update and cleared when its finished.
         * This is to prevent doing a recursive logic update which can lead to unexpected
         * behaviour.
         */
        duringLogicUpdate: boolean;
        boundInternalTick: any;
        /**
         * Opacity of the overview alpha
         * @TODO Doesn't belong here
         */
        overlayAlpha: number;
        /**
         * Initializes the root object which stores all game related data. The state
         * is required as a back reference (used sometimes)
         * @param {import("../states/ingame").InGameState} parentState
         * @param {Savegame} savegame
         */
        initializeRoot(parentState: import("../states/ingame").InGameState, savegame: Savegame, gameModeId: any): void;
        /**
         * Initializes a new game, this means creating a new map and centering on the
         * playerbase
         * */
        initNewGame(): void;
        /**
         * Inits an existing game by loading the raw savegame data and deserializing it.
         * Also runs basic validity checks.
         */
        initExistingGame(): boolean;
        /**
         * Initializes the render canvas
         */
        internalInitCanvas(): void;
        /**
         * Destructs the root, freeing all resources
         */
        destruct(): void;
        tick(deltaMs: any): boolean;
        shouldRender(): boolean;
        updateLogic(): boolean;
        resize(w: any, h: any): void;
        postLoadHook(): void;
        draw(): void;
    }
    import { Application } from "application";
    import { GameRoot } from "game/root";
    import { Savegame } from "savegame/savegame";
}
declare module "states/ingame" {
    export const gameCreationAction: {
        new: string;
        resume: string;
    };
    export class GameCreationPayload {
        /** @type {boolean|undefined} */
        fastEnter: boolean | undefined;
        /** @type {string} */
        gameModeId: string;
        /** @type {Savegame} */
        savegame: Savegame;
        /** @type {object|undefined} */
        gameModeParameters: object | undefined;
    }
    export class InGameState extends GameState {
        /** @type {GameCreationPayload} */
        creationPayload: GameCreationPayload;
        stage: any;
        /** @type {GameCore} */
        core: GameCore;
        /** @type {KeyActionMapper} */
        keyActionMapper: KeyActionMapper;
        /** @type {GameLoadingOverlay} */
        loadingOverlay: GameLoadingOverlay;
        /** @type {Savegame} */
        savegame: Savegame;
        boundInputFilter: any;
        /**
         * Whether we are currently saving the game
         * @TODO: This doesn't realy fit here
         */
        currentSavePromise: any;
        /**
         * Switches the game into another sub-state
         * @param {string} stage
         */
        switchStage(stage: string): boolean;
        /**
         * Goes back to the menu state
         */
        goBackToMenu(): void;
        /**
         * Goes back to the settings state
         */
        goToSettings(): void;
        /**
         * Goes back to the settings state
         */
        goToKeybindings(): void;
        /**
         * Moves to a state outside of the game
         * @param {string} stateId
         * @param {any=} payload
         */
        saveThenGoToState(stateId: string, payload?: any | undefined): void;
        /**
         * Called when the game somehow failed to initialize. Resets everything to basic state and
         * then goes to the main menu, showing the error
         * @param {string} err
         */
        onInitializationFailure(err: string): void;
        /**
         * Creates the game core instance, and thus the root
         */
        stage3CreateCore(): void;
        /**
         * Initializes a new empty game
         */
        stage4aInitEmptyGame(): void;
        /**
         * Resumes an existing game
         */
        stage4bResumeGame(): void;
        /**
         * Performs the first game update on the game which initializes most caches
         */
        stage5FirstUpdate(): void;
        /**
         * Call the post load hook, this means that we have loaded the game, and all systems
         * can operate and start to work now.
         */
        stage6PostLoadHook(): void;
        /**
         * This makes the game idle and draw for a while, because we run most code this way
         * the V8 engine can already start to optimize it. Also this makes sure the resources
         * are in the VRAM and we have a smooth experience once we start.
         */
        stage7Warmup(): void;
        warmupTimeSeconds: number;
        /**
         * The final stage where this game is running and updating regulary.
         */
        stage10GameRunning(): void;
        /**
         * This stage destroys the whole game, used to cleanup
         */
        stageDestroyed(): void;
        syncer: any;
        /**
         * When leaving the game
         */
        stageLeavingGame(): void;
        /**
         * Filters the input (keybindings)
         */
        filterInput(): boolean;
        gameModeId: string;
        /**
         * Saves the game
         */
        doSave(): any;
    }
    import { Savegame } from "savegame/savegame";
    import { GameState } from "core/game_state";
    import { GameCore } from "game/core";
    import { KeyActionMapper } from "game/key_action_mapper";
    import { GameLoadingOverlay } from "game/game_loading_overlay";
}
declare module "game/root" {
    /** @type {Array<Layer>} */
    export const layers: Array<any>;
    /**
     * The game root is basically the whole game state at a given point,
     * combining all important classes. We don't have globals, but this
     * class is passed to almost all game classes.
     */
    export class GameRoot {
        /**
         * Constructs a new game root
         * @param {Application} app
         */
        constructor(app: Application);
        app: Application;
        /** @type {Savegame} */
        savegame: Savegame;
        /** @type {InGameState} */
        gameState: InGameState;
        /** @type {KeyActionMapper} */
        keyMapper: KeyActionMapper;
        gameWidth: number;
        gameHeight: number;
        /** @type {boolean} */
        gameIsFresh: boolean;
        /** @type {boolean} */
        logicInitialized: boolean;
        /** @type {boolean} */
        gameInitialized: boolean;
        /**
         * Whether a bulk operation is running
         */
        bulkOperationRunning: boolean;
        /**
         * Whether a immutable operation is running
         */
        immutableOperationRunning: boolean;
        /** @type {Camera} */
        camera: Camera;
        /** @type {HTMLCanvasElement} */
        canvas: HTMLCanvasElement;
        /** @type {CanvasRenderingContext2D} */
        context: CanvasRenderingContext2D;
        /** @type {MapView} */
        map: MapView;
        /** @type {GameLogic} */
        logic: GameLogic;
        /** @type {EntityManager} */
        entityMgr: EntityManager;
        /** @type {GameHUD} */
        hud: GameHUD;
        /** @type {GameSystemManager} */
        systemMgr: GameSystemManager;
        /** @type {GameTime} */
        time: GameTime;
        /** @type {HubGoals} */
        hubGoals: HubGoals;
        /** @type {BufferMaintainer} */
        buffers: BufferMaintainer;
        /** @type {AutomaticSave} */
        automaticSave: AutomaticSave;
        /** @type {SoundProxy} */
        soundProxy: SoundProxy;
        /** @type {AchievementProxy} */
        achievementProxy: AchievementProxy;
        /** @type {ShapeDefinitionManager} */
        shapeDefinitionMgr: ShapeDefinitionManager;
        /** @type {ProductionAnalytics} */
        productionAnalytics: ProductionAnalytics;
        /** @type {DynamicTickrate} */
        dynamicTickrate: DynamicTickrate;
        /** @type {Layer} */
        currentLayer: any;
        /** @type {GameMode} */
        gameMode: GameMode;
        signals: {
            entityManuallyPlaced: any;
            entityAdded: any;
            entityChanged: any;
            entityGotNewComponent: any;
            entityComponentRemoved: any;
            entityQueuedForDestroy: any;
            entityDestroyed: any;
            resized: any;
            readyToRender: any;
            aboutToDestruct: Signal;
            gameSaved: any;
            gameRestored: any;
            gameFrameStarted: any;
            storyGoalCompleted: any;
            upgradePurchased: any;
            postLoadHook: any;
            shapeDelivered: any;
            itemProduced: any;
            bulkOperationFinished: any;
            immutableOperationFinished: any;
            editModeChanged: any;
            prePlacementCheck: any;
            freeEntityAreaBeforeBuild: any;
            achievementCheck: any;
            bulkAchievementCheck: any;
            puzzleComplete: any;
        };
        /** @type {Object.<string, Object.<string, RandomNumberGenerator>>} */
        rngs: {
            [x: string]: {
                [x: string]: RandomNumberGenerator;
            };
        };
        queue: {
            requireRedraw: boolean;
        };
        /**
         * Destructs the game root
         */
        destruct(): void;
        /**
         * Resets the whole root and removes all properties
         */
        reset(): void;
    }
    import { Application } from "application";
    import { Savegame } from "savegame/savegame";
    import { InGameState } from "states/ingame";
    import { KeyActionMapper } from "game/key_action_mapper";
    import { Camera } from "game/camera";
    import { MapView } from "game/map_view";
    import { GameLogic } from "game/logic";
    import { EntityManager } from "game/entity_manager";
    import { GameHUD } from "game/hud/hud";
    import { GameSystemManager } from "game/game_system_manager";
    import { GameTime } from "game/time/game_time";
    import { HubGoals } from "game/hub_goals";
    import { BufferMaintainer } from "core/buffer_maintainer";
    import { AutomaticSave } from "game/automatic_save";
    import { SoundProxy } from "game/sound_proxy";
    import { AchievementProxy } from "game/achievement_proxy";
    import { ShapeDefinitionManager } from "game/shape_definition_manager";
    import { ProductionAnalytics } from "game/production_analytics";
    import { DynamicTickrate } from "game/dynamic_tickrate";
    import { GameMode } from "game/game_mode";
    import { Signal } from "core/signal";
    import { RandomNumberGenerator } from "core/rng";
}
declare module "core/draw_parameters" {
    /**
     * @typedef {import("../game/root").GameRoot} GameRoot
     * @typedef {import("./rectangle").Rectangle} Rectangle
     */
    export class DrawParameters {
        constructor({ context, visibleRect, desiredAtlasScale, zoomLevel, root }: {
            context: any;
            visibleRect: any;
            desiredAtlasScale: any;
            zoomLevel: any;
            root: any;
        });
        /** @type {CanvasRenderingContext2D} */
        context: CanvasRenderingContext2D;
        /** @type {Rectangle} */
        visibleRect: Rectangle;
        /** @type {string} */
        desiredAtlasScale: string;
        /** @type {number} */
        zoomLevel: number;
        /** @type {GameRoot} */
        root: GameRoot;
    }
    export type GameRoot = import("game/root").GameRoot;
    export type Rectangle = import("core/rectangle").Rectangle;
}
declare module "core/sprites" {
    export const ORIGINAL_SPRITE_SCALE: "0.75";
    export const FULL_CLIP_RECT: Rectangle;
    export class BaseSprite {
        /**
         * Returns the raw handle
         * @returns {HTMLImageElement|HTMLCanvasElement}
         */
        getRawTexture(): HTMLImageElement | HTMLCanvasElement;
        /**
         * Draws the sprite
         * @param {CanvasRenderingContext2D} context
         * @param {number} x
         * @param {number} y
         * @param {number} w
         * @param {number} h
         */
        draw(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void;
    }
    /**
     * Position of a sprite within an atlas
     */
    export class SpriteAtlasLink {
        /**
         *
         * @param {object} param0
         * @param {number} param0.packedX
         * @param {number} param0.packedY
         * @param {number} param0.packOffsetX
         * @param {number} param0.packOffsetY
         * @param {number} param0.packedW
         * @param {number} param0.packedH
         * @param {number} param0.w
         * @param {number} param0.h
         * @param {HTMLImageElement|HTMLCanvasElement} param0.atlas
         */
        constructor({ w, h, packedX, packedY, packOffsetX, packOffsetY, packedW, packedH, atlas }: {
            packedX: number;
            packedY: number;
            packOffsetX: number;
            packOffsetY: number;
            packedW: number;
            packedH: number;
            w: number;
            h: number;
            atlas: HTMLImageElement | HTMLCanvasElement;
        });
        packedX: number;
        packedY: number;
        packedW: number;
        packedH: number;
        packOffsetX: number;
        packOffsetY: number;
        atlas: HTMLCanvasElement | HTMLImageElement;
        w: number;
        h: number;
    }
    export class AtlasSprite extends BaseSprite {
        /**
         *
         * @param {string} spriteName
         */
        constructor(spriteName?: string);
        /** @type {Object.<string, SpriteAtlasLink>} */
        linksByResolution: {
            [x: string]: SpriteAtlasLink;
        };
        spriteName: string;
        /**
         *
         * @param {DrawParameters} parameters
         * @param {number} x
         * @param {number} y
         * @param {number} size
         * @param {boolean=} clipping
         */
        drawCachedCentered(parameters: DrawParameters, x: number, y: number, size: number, clipping?: boolean | undefined): void;
        /**
         *
         * @param {CanvasRenderingContext2D} context
         * @param {number} x
         * @param {number} y
         * @param {number} size
         */
        drawCentered(context: CanvasRenderingContext2D, x: number, y: number, size: number): void;
        /**
         * Draws the sprite
         * @param {DrawParameters} parameters
         * @param {number} x
         * @param {number} y
         * @param {number} w
         * @param {number} h
         * @param {boolean=} clipping Whether to perform culling
         */
        drawCached(parameters: DrawParameters, x: number, y: number, w?: number, h?: number, clipping?: boolean | undefined): void;
        /**
         * Draws a subset of the sprite. Does NO culling
         * @param {DrawParameters} parameters
         * @param {number} x
         * @param {number} y
         * @param {number} w
         * @param {number} h
         * @param {Rectangle=} clipRect The rectangle in local space (0 ... 1) to draw of the image
         */
        drawCachedWithClipRect(parameters: DrawParameters, x: number, y: number, w?: number, h?: number, clipRect?: Rectangle | undefined): void;
        /**
         * Renders into an html element
         * @param {HTMLElement} element
         * @param {number} w
         * @param {number} h
         */
        renderToHTMLElement(element: HTMLElement, w?: number, h?: number): void;
        /**
         * Returns the html to render as icon
         * @param {number} w
         * @param {number} h
         */
        getAsHTML(w: number, h: number): string;
    }
    export class RegularSprite extends BaseSprite {
        constructor(sprite: any, w: any, h: any);
        w: any;
        h: any;
        sprite: any;
        /**
         * Draws the sprite, do *not* use this for sprites which are rendered! Only for drawing
         * images into buffers
         * @param {CanvasRenderingContext2D} context
         * @param {number} x
         * @param {number} y
         * @param {number} w
         * @param {number} h
         */
        drawCentered(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void;
    }
    import { Rectangle } from "core/rectangle";
    import { DrawParameters } from "core/draw_parameters";
}
declare module "core/atlas_definitions" {
    /**
     * @typedef {{ w: number, h: number }} Size
     * @typedef {{ x: number, y: number }} Position
     * @typedef {{
     *   frame: Position & Size,
     *   rotated: boolean,
     *   spriteSourceSize: Position & Size,
     *   sourceSize: Size,
     *   trimmed: boolean
     * }} SpriteDefinition
     *
     * @typedef {{
     *   app: string,
     *   version: string,
     *   image: string,
     *   format: string,
     *   size: Size,
     *   scale: string,
     *   smartupdate: string
     * }} AtlasMeta
     *
     * @typedef {{
     *   frames: Object.<string, SpriteDefinition>,
     *   meta: AtlasMeta
     * }} SourceData
     */
    export class AtlasDefinition {
        /**
         * @param {SourceData} sourceData
         */
        constructor({ frames, meta }: SourceData);
        meta: {
            app: string;
            version: string;
            image: string;
            format: string;
            size: Size;
            scale: string;
            smartupdate: string;
        };
        sourceData: {
            [x: string]: {
                frame: Position & Size;
                rotated: boolean;
                spriteSourceSize: Position & Size;
                sourceSize: Size;
                trimmed: boolean;
            };
        };
        sourceFileName: string;
        getFullSourcePath(): string;
    }
    /** @type {AtlasDefinition[]} **/
    export const atlasFiles: AtlasDefinition[];
    export type Size = {
        w: number;
        h: number;
    };
    export type Position = {
        x: number;
        y: number;
    };
    export type SpriteDefinition = {
        frame: Position & Size;
        rotated: boolean;
        spriteSourceSize: Position & Size;
        sourceSize: Size;
        trimmed: boolean;
    };
    export type AtlasMeta = {
        app: string;
        version: string;
        image: string;
        format: string;
        size: Size;
        scale: string;
        smartupdate: string;
    };
    export type SourceData = {
        frames: {
            [x: string]: SpriteDefinition;
        };
        meta: AtlasMeta;
    };
}
declare module "core/loader" {
    export const Loader: LoaderImpl;
    export type Application = import("application").Application;
    /**
     * ;
     */
    export type AtlasDefinition = import("core/atlas_definitions").AtlasDefinition;
    class LoaderImpl {
        app: import("application").Application;
        /** @type {Map<string, BaseSprite>} */
        sprites: any;
        rawImages: any[];
        /**
         * @param {Application} app
         */
        linkAppAfterBoot(app: Application): void;
        /**
         * Fetches a given sprite from the cache
         * @param {string} key
         * @returns {BaseSprite}
         */
        getSpriteInternal(key: string): BaseSprite;
        /**
         * Returns an atlas sprite from the cache
         * @param {string} key
         * @returns {AtlasSprite}
         */
        getSprite(key: string): AtlasSprite;
        /**
         * Returns a regular sprite from the cache
         * @param {string} key
         * @returns {RegularSprite}
         */
        getRegularSprite(key: string): RegularSprite;
        /**
         *
         * @param {string} key
         * @returns {Promise<HTMLImageElement|null>}
         */
        internalPreloadImage(key: string): Promise<HTMLImageElement | null>;
        /**
         * Preloads a sprite
         * @param {string} key
         * @returns {Promise<void>}
         */
        preloadCSSSprite(key: string): Promise<void>;
        /**
         * Preloads an atlas
         * @param {AtlasDefinition} atlas
         * @returns {Promise<void>}
         */
        preloadAtlas(atlas: AtlasDefinition): Promise<void>;
        /**
         *
         * @param {AtlasDefinition} atlas
         * @param {HTMLImageElement} loadedImage
         */
        internalParseAtlas({ meta: { scale }, sourceData }: AtlasDefinition, loadedImage: HTMLImageElement): void;
        /**
         * Makes the canvas which shows the question mark, shown when a sprite was not found
         */
        makeSpriteNotFoundCanvas(): void;
        spriteNotFoundSprite: AtlasSprite;
    }
    import { BaseSprite } from "core/sprites";
    import { AtlasSprite } from "core/sprites";
    import { RegularSprite } from "core/sprites";
    export {};
}
declare module "game/meta_building_registry" {
    export function initMetaBuildingRegistry(): void;
    /**
     * Once all sprites are loaded, propagates the cache
     */
    export function initBuildingCodesAfterResourcesLoaded(): void;
}
declare module "core/background_resources_loader" {
    export function getLogoSprite(): "logo_wegame.png" | "logo_cn.png" | "logo.png";
    export class BackgroundResourcesLoader {
        /**
         *
         * @param {Application} app
         */
        constructor(app: Application);
        app: Application;
        registerReady: boolean;
        mainMenuReady: boolean;
        bareGameReady: boolean;
        additionalReady: boolean;
        signalMainMenuLoaded: Signal;
        signalBareGameLoaded: Signal;
        signalAdditionalLoaded: Signal;
        numAssetsLoaded: number;
        numAssetsToLoadTotal: number;
        spritesLoaded: any[];
        soundsLoaded: any[];
        getNumAssetsLoaded(): number;
        getNumAssetsTotal(): number;
        getPromiseForMainMenu(): any;
        getPromiseForBareGame(): any;
        startLoading(): void;
        internalStartLoadingEssentialsForMainMenu(): void;
        internalStartLoadingEssentialsForBareGame(): void;
        internalStartLoadingAdditionalGameAssets(): void;
        internalPreloadCss(name: any): any;
        /**
         * @param {Array<string>} sprites
         * @param {Array<string>} sounds
         * @param {Array<AtlasDefinition>} atlases
         * @returns {Promise<void>}
         */
        internalLoadSpritesAndSounds(sprites: Array<string>, sounds: Array<string>, atlases?: Array<AtlasDefinition>): Promise<void>;
    }
    import { Application } from "application";
    import { Signal } from "core/signal";
    import { AtlasDefinition } from "core/atlas_definitions";
}
declare module "core/input_distributor" {
    export class InputDistributor {
        /**
         *
         * @param {Application} app
         */
        constructor(app: Application);
        app: Application;
        /** @type {Array<InputReceiver>} */
        recieverStack: Array<InputReceiver>;
        /** @type {Array<function(any) : boolean>} */
        filters: ((arg0: any) => boolean)[];
        /**
         * All keys which are currently down
         */
        keysDown: any;
        /**
         * Attaches a new filter which can filter and reject events
         * @param {function(any): boolean} filter
         */
        installFilter(filter: (arg0: any) => boolean): void;
        /**
         * Removes an attached filter
         * @param {function(any) : boolean} filter
         */
        dismountFilter(filter: (arg0: any) => boolean): void;
        /**
         * @param {InputReceiver} reciever
         */
        pushReciever(reciever: InputReceiver): void;
        /**
         * @param {InputReceiver} reciever
         */
        popReciever(reciever: InputReceiver): void;
        /**
         * @param {InputReceiver} reciever
         */
        isRecieverAttached(reciever: InputReceiver): boolean;
        /**
         * @param {InputReceiver} reciever
         */
        isRecieverOnTop(reciever: InputReceiver): boolean;
        /**
         * @param {InputReceiver} reciever
         */
        makeSureAttachedAndOnTop(reciever: InputReceiver): void;
        /**
         * @param {InputReceiver} reciever
         */
        makeSureDetached(reciever: InputReceiver): void;
        /**
         *
         * @param {InputReceiver} reciever
         */
        destroyReceiver(reciever: InputReceiver): void;
        getTopReciever(): InputReceiver;
        bindToEvents(): void;
        forwardToReceiver(eventId: any, payload?: any): any;
        /**
         * @param {Event} event
         */
        handleBackButton(event: Event): void;
        /**
         * Handles when the page got blurred
         */
        handleBlur(): void;
        /**
         * @param {KeyboardEvent | MouseEvent} event
         */
        handleKeyMouseDown(event: KeyboardEvent | MouseEvent): any;
        /**
         * @param {KeyboardEvent | MouseEvent} event
         */
        handleKeyMouseUp(event: KeyboardEvent | MouseEvent): void;
    }
    import { Application } from "application";
    import { InputReceiver } from "core/input_receiver";
}
declare module "platform/ad_provider" {
    export class AdProviderInterface {
        /** @param {Application} app */
        constructor(app: Application);
        app: Application;
        /**
         * Initializes the storage
         * @returns {Promise<void>}
         */
        initialize(): Promise<void>;
        /**
         * Returns if this provider serves ads at all
         * @returns {boolean}
         */
        getHasAds(): boolean;
        /**
         * Returns if it would be possible to show a video ad *now*. This can be false if for
         * example the last video ad is
         * @returns {boolean}
         */
        getCanShowVideoAd(): boolean;
        /**
         * Shows an video ad
         * @returns {Promise<void>}
         */
        showVideoAd(): Promise<void>;
    }
    import { Application } from "application";
}
declare module "platform/ad_providers/no_ad_provider" {
    export class NoAdProvider extends AdProviderInterface {
        constructor(app: import("application").Application);
    }
    import { AdProviderInterface } from "platform/ad_provider";
}
declare module "platform/browser/no_achievement_provider" {
    export class NoAchievementProvider extends AchievementProviderInterface {
        constructor(app: import("application").Application);
    }
    import { AchievementProviderInterface } from "platform/achievement_provider";
}
declare module "platform/analytics" {
    export class AnalyticsInterface {
        constructor(app: any);
        /** @type {Application} */
        app: Application;
        /**
         * Initializes the analytics
         * @returns {Promise<void>}
         */
        initialize(): Promise<void>;
        /**
         * Sets the player name for analytics
         * @param {string} userName
         */
        setUserContext(userName: string): void;
        /**
         * Tracks a click no an ui element
         * @param {string} elementName
         */
        trackUiClick(elementName: string): void;
        /**
         * Tracks when a new state is entered
         * @param {string} stateId
         */
        trackStateEnter(stateId: string): void;
        /**
         * Tracks a new user decision
         * @param {string} name
         */
        trackDecision(name: string): void;
    }
    import { Application } from "application";
}
declare module "platform/browser/google_analytics" {
    export class GoogleAnalyticsImpl extends AnalyticsInterface {
        constructor(app: any);
        lastUiClickTracked: number;
        /**
         * Tracks an event so GA keeps track of the user
         */
        internalTrackAfkEvent(): void;
    }
    import { AnalyticsInterface } from "platform/analytics";
}
declare module "platform/browser/sound" {
    export class SoundImplBrowser extends SoundInterface {
        constructor(app: any);
        sfxHandle: SoundSpritesContainer;
    }
    import { SoundInterface } from "platform/sound";
    class SoundSpritesContainer {
        howl: any;
        loadingPromise: any;
        load(): any;
        play(volume: any, key: any): void;
        deinitialize(): void;
    }
    export {};
}
declare module "platform/ad_providers/gamedistribution" {
    export class GamedistributionAdProvider extends AdProviderInterface {
        /**
         *
         * @param {Application} app
         */
        constructor(app: Application);
        /**
         * The resolve function to finish the current video ad. Null if none is currently running
         * @type {Function}
         */
        videoAdResolveFunction: Function;
        /**
         * The current timer which will timeout the resolve
         */
        videoAdResolveTimer: number;
        /**
         * When we showed the last video ad
         */
        lastVideoAdShowTime: number;
    }
    import { AdProviderInterface } from "platform/ad_provider";
    import { Application } from "application";
}
declare module "platform/electron/steam_achievement_provider" {
    export class SteamAchievementProvider extends AchievementProviderInterface {
        /** @param {Application} app */
        constructor(app: Application);
        initialized: boolean;
        root: GameRoot;
        ipc: any;
    }
    import { AchievementProviderInterface } from "platform/achievement_provider";
    import { GameRoot } from "game/root";
    import { Application } from "application";
}
declare module "platform/wrapper" {
    export class PlatformWrapperInterface {
        constructor(app: any);
        /** @type {Application} */
        app: Application;
        /** @returns {string} */
        getId(): string;
        /**
         * Returns the UI scale, called on every resize
         * @returns {number} */
        getUiScale(): number;
        /** @returns {boolean} */
        getSupportsRestart(): boolean;
        /**
         * Returns the strength of touch pans with the mouse
         */
        getTouchPanStrength(): number;
        /** @returns {Promise<void>} */
        initialize(): Promise<void>;
        /**
         * Should initialize the apps ad provider in case supported
         *  @returns {Promise<void>}
         */
        initializeAdProvider(): Promise<void>;
        /**
         * Should return the minimum supported zoom level
         * @returns {number}
         */
        getMinimumZoom(): number;
        /**
         * Should return the maximum supported zoom level
         * @returns {number}
         */
        getMaximumZoom(): number;
        getScreenScale(): number;
        /**
         * Should return if this platform supports ads at all
         */
        getSupportsAds(): boolean;
        /**
         * Attempt to open an external url
         * @param {string} url
         * @param {boolean=} force Whether to always open the url even if not allowed
         */
        openExternalLink(url: string, force?: boolean | undefined): void;
        /**
         * Attempt to restart the app
         */
        performRestart(): void;
        /**
         * Returns whether this platform supports a toggleable fullscreen
         */
        getSupportsFullscreen(): boolean;
        /**
         * Should set the apps fullscreen state to the desired state
         * @param {boolean} flag
         */
        setFullscreen(flag: boolean): void;
        /**
         * Returns whether this platform supports quitting the app
         */
        getSupportsAppExit(): boolean;
        /**
         * Attempts to quit the app
         */
        exitApp(): void;
        /**
         * Whether this platform supports a keyboard
         */
        getSupportsKeyboard(): boolean;
    }
    import { Application } from "application";
}
declare module "platform/browser/storage" {
    export class StorageImplBrowser extends StorageInterface {
        constructor(app: any);
        currentBusyFilename: boolean;
    }
    import { StorageInterface } from "platform/storage";
}
declare module "platform/browser/storage_indexed_db" {
    export class StorageImplBrowserIndexedDB extends StorageInterface {
        constructor(app: any);
        currentBusyFilename: boolean;
        /** @type {IDBDatabase} */
        database: IDBDatabase;
    }
    import { StorageInterface } from "platform/storage";
}
declare module "platform/browser/wrapper" {
    export class PlatformWrapperImplBrowser extends PlatformWrapperInterface {
        constructor(app: any);
        recaptchaTokenCallback: any;
        embedProvider: {
            id: string;
            adProvider: typeof NoAdProvider;
            iframed: boolean;
            externalLinks: boolean;
            iogLink: boolean;
        };
        detectStorageImplementation(): any;
        /**
         * Detects if there is an adblocker installed
         * @returns {Promise<boolean>}
         */
        detectAdblock(): Promise<boolean>;
        initializeAchievementProvider(): Promise<void>;
    }
    import { PlatformWrapperInterface } from "platform/wrapper";
    import { NoAdProvider } from "platform/ad_providers/no_ad_provider";
}
declare module "platform/electron/storage" {
    export class StorageImplElectron extends StorageInterface {
        constructor(app: any);
        /** @type {Object.<number, {resolve:Function, reject: Function}>} */
        jobs: {
            [x: number]: {
                resolve: Function;
                reject: Function;
            };
        };
        jobId: number;
    }
    import { StorageInterface } from "platform/storage";
}
declare module "platform/electron/wrapper" {
    export class PlatformWrapperImplElectron extends PlatformWrapperImplBrowser {
        constructor(app: any);
        dlcs: {
            puzzle: boolean;
        };
        steamOverlayCanvasFix: HTMLCanvasElement;
        steamOverlayContextFix: CanvasRenderingContext2D;
        steamOverlayFixRedrawCanvas(): void;
        initializeDlcStatus(): any;
    }
    import { PlatformWrapperImplBrowser } from "platform/browser/wrapper";
}
declare module "profile/setting_types" {
    export class BaseSetting {
        /**
         *
         * @param {string} id
         * @param {string} categoryId
         * @param {function(Application, any):void} changeCb
         * @param {function(Application) : boolean=} enabledCb
         */
        constructor(id: string, categoryId: string, changeCb: (arg0: Application, arg1: any) => void, enabledCb?: ((arg0: Application) => boolean) | undefined);
        id: string;
        categoryId: string;
        changeCb: (arg0: Application, arg1: any) => void;
        enabledCb: (arg0: Application) => boolean;
        /** @type {Application} */
        app: Application;
        element: HTMLElement;
        dialogs: any;
        /**
         * @param {Application} app
         * @param {any} value
         */
        apply(app: Application, value: any): void;
        /**
         * Binds all parameters
         * @param {Application} app
         * @param {HTMLElement} element
         * @param {any} dialogs
         */
        bind(app: Application, element: HTMLElement, dialogs: any): void;
        /**
         * Returns the HTML for this setting
         * @param {Application} app
         */
        getHtml(app: Application): string;
        /**
         * Returns whether this setting is enabled and available
         * @param {Application} app
         */
        getIsAvailable(app: Application): boolean;
        syncValueToElement(): void;
        /**
         * Attempts to modify the setting
         */
        modify(): void;
        /**
         * Shows the dialog that a restart is required
         */
        showRestartRequiredDialog(): void;
        /**
         * Validates the set value
         * @param {any} value
         * @returns {boolean}
         */
        validate(value: any): boolean;
    }
    export class EnumSetting extends BaseSetting {
        constructor(id: any, { options, valueGetter, textGetter, descGetter, category, restartRequired, iconPrefix, changeCb, magicValue, enabledCb, }: {
            options: any;
            valueGetter: any;
            textGetter: any;
            descGetter?: any;
            category: any;
            restartRequired?: boolean;
            iconPrefix?: any;
            changeCb?: any;
            magicValue?: any;
            enabledCb?: any;
        });
        options: any;
        valueGetter: any;
        textGetter: any;
        descGetter: any;
        restartRequired: boolean;
        iconPrefix: any;
        magicValue: any;
    }
    export class BoolSetting extends BaseSetting {
        constructor(id: any, category: any, changeCb?: any, enabledCb?: any);
    }
    export class RangeSetting extends BaseSetting {
        constructor(id: any, category: any, changeCb?: any, defaultValue?: number, minValue?: number, maxValue?: number, stepSize?: number, enabledCb?: any);
        defaultValue: number;
        minValue: number;
        maxValue: number;
        stepSize: number;
        /**
         * Sets the elements value to the given value
         * @param {number} value
         */
        setElementValue(value: number): void;
        updateLabels(): void;
        /**
         * @returns {HTMLInputElement}
         */
        getRangeInputElement(): HTMLInputElement;
    }
    import { Application } from "application";
}
declare module "profile/application_settings" {
    export function getApplicationSettingById(id: any): any;
    export type enumCategories = string;
    export namespace enumCategories {
        export const general: string;
        export const userInterface: string;
        export const performance: string;
        export const advanced: string;
    }
    export const uiScales: {
        id: string;
        size: number;
    }[];
    export const scrollWheelSensitivities: {
        id: string;
        scale: number;
    }[];
    export const movementSpeeds: {
        id: string;
        multiplier: number;
    }[];
    export const autosaveIntervals: {
        id: string;
        seconds: number;
    }[];
    /** @type {Array<BaseSetting>} */
    export const allApplicationSettings: Array<BaseSetting>;
    export class ApplicationSettings extends ReadWriteProxy {
        constructor(app: any);
        initialize(): Promise<void>;
        save(): Promise<void>;
        /**
         * @returns {SettingsStorage}
         */
        getAllSettings(): SettingsStorage;
        /**
         * @param {string} key
         */
        getSetting(key: string): any;
        getInterfaceScaleId(): string;
        getDesiredFps(): number;
        getInterfaceScaleValue(): number;
        getScrollWheelSensitivity(): number;
        getMovementSpeed(): number;
        getAutosaveIntervalSeconds(): number;
        getIsFullScreen(): any;
        getKeybindingOverrides(): {
            [x: string]: number;
        };
        getLanguage(): string;
        updateLanguage(id: any): Promise<void>;
        /**
         * @param {string} key
         * @param {string|boolean|number} value
         */
        updateSetting(key: string, value: string | boolean | number): Promise<void>;
        /**
         * Sets a new keybinding override
         * @param {string} keybindingId
         * @param {number} keyCode
         */
        updateKeybindingOverride(keybindingId: string, keyCode: number): Promise<void>;
        /**
         * Resets a given keybinding override
         * @param {string} id
         */
        resetKeybindingOverride(id: string): Promise<void>;
        /**
         * Resets all keybinding overrides
         */
        resetKeybindingOverrides(): Promise<void>;
    }
    import { BaseSetting } from "profile/setting_types";
    import { ReadWriteProxy } from "core/read_write_proxy";
    class SettingsStorage {
        uiScale: string;
        fullscreen: any;
        soundVolume: number;
        musicVolume: number;
        theme: string;
        refreshRate: string;
        scrollWheelSensitivity: string;
        movementSpeed: string;
        language: string;
        autosaveInterval: string;
        alwaysMultiplace: boolean;
        shapeTooltipAlwaysOn: boolean;
        offerHints: boolean;
        enableTunnelSmartplace: boolean;
        vignette: boolean;
        compactBuildingInfo: boolean;
        disableCutDeleteWarnings: boolean;
        rotationByBuilding: boolean;
        clearCursorOnDeleteWhilePlacing: boolean;
        displayChunkBorders: boolean;
        pickMinerOnPatch: boolean;
        enableMousePan: boolean;
        enableColorBlindHelper: boolean;
        lowQualityMapResources: boolean;
        disableTileGrid: boolean;
        lowQualityTextures: boolean;
        simplifiedBelts: boolean;
        zoomToCursor: boolean;
        mapResourcesScale: number;
        /**
         * @type {Object.<string, number>}
         */
        keybindingOverrides: {
            [x: string]: number;
        };
    }
    export {};
}
declare module "savegame/savegame_manager" {
    export type enumLocalSavegameStatus = string;
    export namespace enumLocalSavegameStatus {
        export const offline: string;
        export const synced: string;
    }
    export class SavegameManager extends ReadWriteProxy {
        constructor(app: any);
        /**
         * @returns {Array<SavegameMetadata>}
         */
        getSavegamesMetaData(): Array<SavegameMetadata>;
        /**
         *
         * @param {string} internalId
         * @returns {Savegame}
         */
        getSavegameById(internalId: string): Savegame;
        /**
         * Returns if this manager has any savegame of a 1.1.19 version, which
         * enables all levels
         */
        getHasAnyLegacySavegames(): boolean;
        /**
         * Deletes a savegame
         * @param {SavegameMetadata} game
         */
        deleteSavegame(game: SavegameMetadata): Promise<void>;
        /**
         * Returns a given games metadata by id
         * @param {string} id
         * @returns {SavegameMetadata}
         */
        getGameMetaDataByInternalId(id: string): SavegameMetadata;
        /**
         * Creates a new savegame
         * @returns {Savegame}
         */
        createNewSavegame(): Savegame;
        /**
         * Attempts to import a savegame
         * @param {object} data
         */
        importSavegame(data: object): any;
        /**
         * Hook after the savegames got changed
         */
        updateAfterSavegamesChanged(): Promise<any>;
        /**
         * Sorts all savegames by their creation time descending
         * @returns {Promise<any>}
         */
        sortSavegames(): Promise<any>;
        /**
         * Helper method to generate a new internal savegame id
         */
        generateInternalId(): any;
        initialize(): Promise<any>;
    }
    export type SavegamesData = {
        version: number;
        /**
         * @returns {SavegamesData}
         */
        savegames: {
            lastUpdate: number;
            version: number;
            internalId: string;
            level: number;
            name: string;
        }[];
    };
    export type SavegameMetadata = {
        lastUpdate: number;
        version: number;
        internalId: string;
        level: number;
        name: string;
    };
    import { ReadWriteProxy } from "core/read_write_proxy";
    import { Savegame } from "savegame/savegame";
}
declare module "core/textual_game_state" {
    /**
     * Baseclass for all game states which are structured similary: A header with back button + some
     * scrollable content.
     */
    export class TextualGameState extends GameState {
        constructor(key: string);
        /**
         * Should return the states HTML content.
         */
        getMainContentHTML(): string;
        /**
         * Should return the title of the game state. If null, no title and back button will
         * get created
         * @returns {string|null}
         */
        getStateHeaderTitle(): string | null;
        /**
         * Returns the default state to go back to
         */
        getDefaultPreviousState(): string;
        /**
         * Goes to a new state, telling him to go back to this state later
         * @param {string} stateId
         */
        moveToStateAddGoBack(stateId: string): void;
        /**
         * Removes all click detectors, except the one on the back button. Useful when regenerating
         * content.
         */
        clearClickDetectorsExceptHeader(): void;
        backToStateId: any;
        backToStatePayload: any;
        containerElement: Element;
        headerElement: Element;
        dialogs: HUDModalDialogs;
    }
    import { GameState } from "core/game_state";
    import { HUDModalDialogs } from "game/hud/parts/modal_dialogs";
}
declare module "states/about" {
    export class AboutState extends TextualGameState {
    }
    import { TextualGameState } from "core/textual_game_state";
}
declare module "changelog" {
    export const CHANGELOG: ({
        version: string;
        date: string;
        entries: string[];
        skin?: undefined;
    } | {
        version: string;
        date: string;
        skin: string;
        entries: string[];
    })[];
}
declare module "states/changelog" {
    export class ChangelogState extends TextualGameState {
    }
    import { TextualGameState } from "core/textual_game_state";
}
declare module "states/keybindings" {
    export class KeybindingsState extends TextualGameState {
        editKeybinding(id: any): void;
        updateKeybindings(): void;
        resetKeybinding(id: any): void;
        resetBindings(): void;
    }
    import { TextualGameState } from "core/textual_game_state";
}
declare module "states/main_menu" {
    /**
     * @typedef {import("../savegame/savegame_typedefs").SavegameMetadata} SavegameMetadata
     * @typedef {import("../profile/setting_types").EnumSetting} EnumSetting
     */
    export class MainMenuState extends GameState {
        /**
         * Asks the user to import a savegame
         */
        requestImportSavegame(): void;
        dialogs: HUDModalDialogs;
        videoElement: HTMLVideoElement;
        renderMainMenu(): void;
        onPuzzleModeButtonClicked(force?: boolean): void;
        onPuzzleWishlistButtonClicked(): void;
        onBackButtonClicked(): void;
        onSteamLinkClicked(): boolean;
        onExitAppButtonClicked(): void;
        onChangelogClicked(): void;
        onRedditClicked(): void;
        onLanguageChooseClicked(): void;
        get savedGames(): {
            lastUpdate: number;
            version: number;
            internalId: string;
            level: number;
            name: string;
        }[];
        renderSavegames(): void;
        /**
         * @param {SavegameMetadata} game
         */
        requestRenameSavegame(game: SavegameMetadata): void;
        /**
         * @param {SavegameMetadata} game
         */
        resumeGame(game: SavegameMetadata): void;
        /**
         * @param {SavegameMetadata} game
         */
        deleteGame(game: SavegameMetadata): void;
        /**
         * @param {SavegameMetadata} game
         */
        downloadGame(game: SavegameMetadata): void;
        /**
         * Shows a hint that the slot limit has been reached
         */
        showSavegameSlotLimit(): void;
        onSettingsButtonClicked(): void;
        onTranslationHelpLinkClicked(): void;
        onPlayButtonClicked(): void;
        onWegameRatingClicked(): void;
        onContinueButtonClicked(): void;
    }
    export type SavegameMetadata = {
        lastUpdate: number;
        version: number;
        internalId: string;
        level: number;
        name: string;
    };
    export type EnumSetting = import("profile/setting_types").EnumSetting;
    import { GameState } from "core/game_state";
    import { HUDModalDialogs } from "game/hud/parts/modal_dialogs";
}
declare module "states/mobile_warning" {
    export class MobileWarningState extends GameState {
    }
    import { GameState } from "core/game_state";
}
declare module "game/hints" {
    /**
     * Finds a new hint to show about the game which the user hasn't seen within this session
     */
    export function getRandomHint(): any;
}
declare module "states/preload" {
    export class PreloadState extends GameState {
        dialogs: HUDModalDialogs;
        /** @type {HTMLElement} */
        statusText: HTMLElement;
        /** @type {HTMLElement} */
        hintsText: HTMLElement;
        lastHintShown: number;
        nextHintDuration: number;
        startLoading(): void;
        update(): void;
        /**
         *
         * @param {string} text
         */
        setStatus(text: string): any;
        currentStatus: string;
        showFailMessage(text: any): void;
        showResetConfirm(): void;
        resetApp(): void;
    }
    import { GameState } from "core/game_state";
    import { HUDModalDialogs } from "game/hud/parts/modal_dialogs";
}
declare module "states/settings" {
    export class SettingsState extends TextualGameState {
        getCategoryButtonsHtml(): string;
        getSettingsHtml(): string;
        renderBuildText(): void;
        setActiveCategory(category: any): void;
        initSettings(): void;
        initCategoryButtons(): void;
        onAboutClicked(): void;
        onPrivacyClicked(): void;
        onKeybindingsClicked(): void;
    }
    import { TextualGameState } from "core/textual_game_state";
}
declare module "platform/game_analytics" {
    /**
     * @typedef {import("../application").Application} Application
     */
    export class GameAnalyticsInterface {
        constructor(app: any);
        /** @type {Application} */
        app: Application;
        /**
         * Initializes the analytics
         * @returns {Promise<void>}
         */
        initialize(): Promise<void>;
        /**
         * Handles a new game which was started
         */
        handleGameStarted(): void;
        /**
         * Handles a resumed game
         */
        handleGameResumed(): void;
        /**
         * Handles the given level completed
         * @param {number} level
         */
        handleLevelCompleted(level: number): void;
        /**
         * Handles the given upgrade completed
         * @param {string} id
         * @param {number} level
         */
        handleUpgradeUnlocked(id: string, level: number): void;
        /**
         * Activates a DLC
         * @param {string} dlc
         */
        activateDlc(dlc: string): any;
    }
    export type Application = import("application").Application;
}
declare module "platform/browser/game_analytics" {
    export class ShapezGameAnalytics extends GameAnalyticsInterface {
        constructor(app: any);
        get environment(): "dev" | "steam-sandbox" | "steam" | "prod" | "alpha-sandbox" | "alpha" | "beta-sandbox" | "beta";
        syncKey: any;
        /**
         * Sends a request to the api
         * @param {string} endpoint Endpoint without base url
         * @param {object} data payload
         * @returns {Promise<any>}
         */
        sendToApi(endpoint: string, data: object): Promise<any>;
        /**
         * Sends a game event to the analytics
         * @param {string} category
         * @param {string} value
         */
        sendGameEvent(category: string, value: string): void;
        sendTimePoints(): void;
        /**
         * Returns true if the shape is interesting
         * @param {GameRoot} root
         * @param {string} key
         */
        isInterestingShape(root: GameRoot, key: string): boolean;
        /**
         * Generates a game dump
         * @param {GameRoot} root
         */
        generateGameDump(root: GameRoot): {
            shapes: {};
            upgrades: {
                [x: string]: number;
            };
            belts: number;
            buildings: number;
        };
    }
    import { GameAnalyticsInterface } from "platform/game_analytics";
    import { GameRoot } from "game/root";
}
declare module "core/restriction_manager" {
    export class RestrictionManager extends ReadWriteProxy {
        /**
         * @param {Application} app
         */
        constructor(app: Application);
        initialize(): Promise<void>;
        /**
         * Checks if there are any savegames from the 1.1.19 version
         */
        onHasLegacySavegamesChanged(has119Savegames?: boolean): any;
        /**
         * Returns if the app is currently running as the limited version
         * @returns {boolean}
         */
        isLimitedVersion(): boolean;
        /**
         * Returns if the app markets the standalone version on steam
         * @returns {boolean}
         */
        getIsStandaloneMarketingActive(): boolean;
        /**
         * Returns if exporting the base as a screenshot is possible
         * @returns {boolean}
         */
        getIsExportingScreenshotsPossible(): boolean;
        /**
         * Returns the maximum number of supported waypoints
         * @returns {number}
         */
        getMaximumWaypoints(): number;
        /**
         * Returns if the user has unlimited savegames
         * @returns {boolean}
         */
        getHasUnlimitedSavegames(): boolean;
        /**
         * Returns if the app has all settings available
         * @returns {boolean}
         */
        getHasExtendedSettings(): boolean;
        /**
         * Returns if all upgrades are available
         * @returns {boolean}
         */
        getHasExtendedUpgrades(): boolean;
        /**
         * Returns if all levels & freeplay is available
         * @returns {boolean}
         */
        getHasExtendedLevelsAndFreeplay(): boolean;
    }
    import { ReadWriteProxy } from "core/read_write_proxy";
    import { Application } from "application";
}
declare module "states/puzzle_menu" {
    export class PuzzleMenuState extends TextualGameState {
        loading: boolean;
        activeCategory: string;
        /**
         * @type {Array<import("../savegame/savegame_typedefs").PuzzleMetadata>}
         */
        puzzles: Array<import("savegame/savegame_typedefs").PuzzleMetadata>;
        selectCategory(category: any): void;
        /**
         * Selects a root category
         * @param {string} rootCategory
         * @param {string=} category
         */
        selectRootCategory(rootCategory: string, category?: string | undefined): void;
        renderSearchForm(parent: any): void;
        startSearch(): void;
        /**
         *
         * @param {import("../savegame/savegame_typedefs").PuzzleMetadata[]} puzzles
         */
        renderPuzzles(puzzles: import("../savegame/savegame_typedefs").PuzzleMetadata[]): void;
        /**
         * @param {import("../savegame/savegame_typedefs").PuzzleMetadata} puzzle
         */
        tryDeletePuzzle(puzzle: import("../savegame/savegame_typedefs").PuzzleMetadata): void;
        /**
         *
         * @param {*} category
         * @returns {Promise<import("../savegame/savegame_typedefs").PuzzleMetadata[]>}
         */
        getPuzzlesForCategory(category: any): Promise<import("../savegame/savegame_typedefs").PuzzleMetadata[]>;
        /**
         *
         * @param {number} puzzleId
         * @param {Array<number>=} nextPuzzles
         */
        playPuzzle(puzzleId: number, nextPuzzles?: Array<number> | undefined): void;
        /**
         *
         * @param {import("../savegame/savegame_typedefs").PuzzleFullData} puzzle
         * @param {Array<number>=} nextPuzzles
         */
        startLoadedPuzzle(puzzle: import("../savegame/savegame_typedefs").PuzzleFullData, nextPuzzles?: Array<number> | undefined): void;
        loadPuzzle(): void;
        createNewPuzzle(force?: boolean): void;
    }
    import { TextualGameState } from "core/textual_game_state";
}
declare module "platform/api" {
    export class ClientAPI {
        /**
         *
         * @param {Application} app
         */
        constructor(app: Application);
        app: Application;
        /**
         * The current users session token
         * @type {string|null}
         */
        token: string | null;
        getEndpoint(): "http://localhost:15001" | "https://api-staging.shapez.io" | "https://api.shapez.io";
        isLoggedIn(): boolean;
        /**
         *
         * @param {string} endpoint
         * @param {object} options
         * @param {"GET"|"POST"=} options.method
         * @param {any=} options.body
         */
        _request(endpoint: string, options: {
            method?: ("GET" | "POST") | undefined;
            body?: any | undefined;
        }): any;
        tryLogin(): Promise<boolean>;
        /**
         * @returns {Promise<{token: string}>}
         */
        apiTryLogin(): Promise<{
            token: string;
        }>;
        /**
         * @param {"new"|"top-rated"|"mine"} category
         * @returns {Promise<import("../savegame/savegame_typedefs").PuzzleMetadata[]>}
         */
        apiListPuzzles(category: "new" | "top-rated" | "mine"): Promise<import("../savegame/savegame_typedefs").PuzzleMetadata[]>;
        /**
         * @param {{ searchTerm: string; difficulty: string; duration: string }} searchOptions
         * @returns {Promise<import("../savegame/savegame_typedefs").PuzzleMetadata[]>}
         */
        apiSearchPuzzles(searchOptions: {
            searchTerm: string;
            difficulty: string;
            duration: string;
        }): Promise<import("../savegame/savegame_typedefs").PuzzleMetadata[]>;
        /**
         * @param {number} puzzleId
         * @returns {Promise<import("../savegame/savegame_typedefs").PuzzleFullData>}
         */
        apiDownloadPuzzle(puzzleId: number): Promise<import("../savegame/savegame_typedefs").PuzzleFullData>;
        /**
         * @param {number} puzzleId
         * @returns {Promise<import("../savegame/savegame_typedefs").PuzzleFullData>}
         */
        apiDeletePuzzle(puzzleId: number): Promise<import("../savegame/savegame_typedefs").PuzzleFullData>;
        /**
         * @param {string} shortKey
         * @returns {Promise<import("../savegame/savegame_typedefs").PuzzleFullData>}
         */
        apiDownloadPuzzleByKey(shortKey: string): Promise<import("../savegame/savegame_typedefs").PuzzleFullData>;
        /**
         * @param {number} puzzleId
         * @returns {Promise<void>}
         */
        apiReportPuzzle(puzzleId: number, reason: any): Promise<void>;
        /**
         * @param {number} puzzleId
         * @param {object} payload
         * @param {number} payload.time
         * @param {boolean} payload.liked
         * @returns {Promise<{ success: true }>}
         */
        apiCompletePuzzle(puzzleId: number, payload: {
            time: number;
            liked: boolean;
        }): Promise<{
            success: true;
        }>;
        /**
         * @param {object} payload
         * @param {string} payload.title
         * @param {string} payload.shortKey
         * @param {import("../savegame/savegame_typedefs").PuzzleGameData} payload.data
         * @returns {Promise<{ success: true }>}
         */
        apiSubmitPuzzle(payload: {
            title: string;
            shortKey: string;
            data: import("../savegame/savegame_typedefs").PuzzleGameData;
        }): Promise<{
            success: true;
        }>;
    }
    import { Application } from "application";
}
declare module "states/login" {
    export class LoginState extends GameState {
        payload: {
            nextStateId: string;
        };
        dialogs: HUDModalDialogs;
        /** @type {HTMLElement} */
        hintsText: HTMLElement;
        lastHintShown: number;
        nextHintDuration: number;
        tryLogin(): void;
        finishLoading(): void;
        getDefaultPreviousState(): string;
        update(): void;
    }
    import { GameState } from "core/game_state";
    import { HUDModalDialogs } from "game/hud/parts/modal_dialogs";
}
declare module "states/wegame_splash" {
    export class WegameSplashState extends GameState {
    }
    import { GameState } from "core/game_state";
}
declare module "modloader/mod" {
    /**
     * @typedef {{
     * name: string,
     * description: string,
     * authors: Array<String>,
     * version: string,
     * }} ModInfo
     */
    /**
     * Creates a new Mod.
     * @class
     */
    export class Mod {
        /**
         * Creates a Mod
         * @param {string} id Id of mod
         * @param {ModInfo} info Information about the mod
         * @param {boolean} enabled Starts mod enabled, defauts to true
         */
        constructor(id: string, info: ModInfo, enabled?: boolean);
        id: string;
        info: {
            name: string;
            description: string;
            authors: Array<string>;
            version: string;
        };
        enabled: boolean;
        signals: {
            enable: Signal;
            disable: Signal;
        };
        modManager: import("modloader/mod_manager").ModManager;
        /**
         * Register new translations for language
         * @param {string} language
         * @param {object} translations
         */
        registerTranslation(language: string, translations: object): void;
        registerCss(css: any): void;
        /**
         * Registers a new icon
         * @param {string} id
         * @param {string} icon
         */
        registerIcon(id: string, icon: string): void;
        /**
         * Registers a new variant
         * @param {number} code
         * @param {typeof MetaBuilding} meta
         * @param {string} variant
         * @param {number} rotationVariant
         */
        registerBuildingVariant(code: number, meta: typeof MetaBuilding, variant?: string, rotationVariant?: number): void;
        /**
         * Registers a new state class, should be a GameState derived class
         * @param {typeof GameState} stateClass
         */
        registerState(stateClass: typeof GameState): void;
    }
    export type ModInfo = {
        name: string;
        description: string;
        authors: Array<string>;
        version: string;
    };
    import { Signal } from "core/signal";
    import { MetaBuilding } from "game/meta_building";
    import { GameState } from "core/game_state";
}
declare module "core/config.local.template" {
    var _default: {};
    export default _default;
}
declare module "game/component_registry" {
    export function initComponentRegistry(): void;
}
declare module "game/hud/parts/puzzle_back_to_menu" {
    export class HUDPuzzleBackToMenu extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        button: HTMLButtonElement;
        back(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "game/hud/parts/puzzle_dlc_logo" {
    export class HUDPuzzleDLCLogo extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        next(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "game/modes/puzzle" {
    export class PuzzleGameMode extends GameMode {
        /** @returns {object} */
        static getSchema(): object;
        /** @param {GameRoot} root */
        constructor(root: GameRoot);
        zoneWidth: any;
        zoneHeight: any;
        getSaveData(): any;
    }
    import { GameMode } from "game/game_mode";
    import { GameRoot } from "game/root";
}
declare module "game/hud/parts/puzzle_editor_controls" {
    export class HUDPuzzleEditorControls extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        titleElement: HTMLDivElement;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "savegame/puzzle_serializer" {
    export class PuzzleSerializer {
        /**
         * Serializes the game root into a dump
         * @param {GameRoot} root
         * @returns {import("./savegame_typedefs").PuzzleGameData}
         */
        generateDumpFromGameRoot(root: GameRoot): import("./savegame_typedefs").PuzzleGameData;
        /**
         * Tries to parse a signal code
         * @param {GameRoot} root
         * @param {string} code
         * @returns {BaseItem}
         */
        parseItemCode(root: GameRoot, code: string): BaseItem;
        /**
         * @param {GameRoot} root
         * @param {import("./savegame_typedefs").PuzzleGameData} puzzle
         */
        deserializePuzzle(root: GameRoot, puzzle: import("./savegame_typedefs").PuzzleGameData): string;
    }
    import { GameRoot } from "game/root";
    import { BaseItem } from "game/base_item";
}
declare module "game/hud/parts/puzzle_editor_review" {
    export class HUDPuzzleEditorReview extends BaseHUDPart {
        constructor(root: any);
        element: HTMLDivElement;
        button: HTMLButtonElement;
        startReview(): void;
        startSubmit(title?: string, shortKey?: string): void;
        doSubmitPuzzle(title: any, shortKey: any): void;
        validatePuzzle(): any;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "game/hud/parts/puzzle_editor_settings" {
    export class HUDPuzzleEditorSettings extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        zone: HTMLDivElement;
        clearItems(): void;
        resetPuzzle(): void;
        trim(): void;
        visible: boolean;
        anyBuildingOutsideZone(width: any, height: any): boolean;
        modifyZone(deltaW: any, deltaH: any): void;
        updateZoneValues(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "game/modes/puzzle_edit" {
    export class PuzzleEditGameMode extends PuzzleGameMode {
        static getSchema(): {};
        /** @param {GameRoot} root */
        constructor(root: GameRoot);
    }
    import { PuzzleGameMode } from "game/modes/puzzle";
    import { GameRoot } from "game/root";
}
declare module "game/hud/parts/puzzle_play_metadata" {
    export class HUDPuzzlePlayMetadata extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        titleElement: HTMLDivElement;
        puzzleNameElement: HTMLDivElement;
        element: HTMLDivElement;
        share(): void;
        report(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "game/hud/parts/puzzle_complete_notification" {
    export class HUDPuzzleCompleteNotification extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        visible: boolean;
        domAttach: DynamicDomAttach;
        userDidLikePuzzle: any;
        timeOfCompletion: number;
        inputReciever: InputReceiver;
        element: HTMLDivElement;
        elemTitle: HTMLDivElement;
        elemContents: HTMLDivElement;
        elemActions: HTMLDivElement;
        buttonLikeYes: HTMLButtonElement;
        continueBtn: HTMLButtonElement;
        menuBtn: HTMLButtonElement;
        nextPuzzleBtn: HTMLButtonElement;
        updateState(): void;
        show(): void;
        nextPuzzle(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
    import { DynamicDomAttach } from "game/hud/dynamic_dom_attach";
    import { InputReceiver } from "core/input_receiver";
}
declare module "game/hud/parts/puzzle_play_settings" {
    export class HUDPuzzlePlaySettings extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        clearItems(): void;
        resetPuzzle(): void;
        visible: boolean;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "game/hud/parts/HUDPuzzleNextPuzzle" {
    export class HUDPuzzleNextPuzzle extends BaseHUDPart {
        constructor(root: import("game/root").GameRoot);
        element: HTMLDivElement;
        button: HTMLButtonElement;
        nextPuzzle(): void;
    }
    import { BaseHUDPart } from "game/hud/base_hud_part";
}
declare module "game/modes/puzzle_play" {
    export class PuzzlePlayGameMode extends PuzzleGameMode {
        /**
         * @param {GameRoot} root
         * @param {object} payload
         * @param {import("../../savegame/savegame_typedefs").PuzzleFullData} payload.puzzle
         * @param {Array<number> | undefined} payload.nextPuzzles
         */
        constructor(root: GameRoot, { puzzle, nextPuzzles }: {
            puzzle: import("../../savegame/savegame_typedefs").PuzzleFullData;
            nextPuzzles: Array<number> | undefined;
        });
        puzzle: {
            meta: {
                id: number;
                shortKey: string;
                likes: number;
                downloads: number;
                completions: number;
                difficulty: number;
                averageTime: number;
                title: string;
                author: string;
                completed: boolean;
            };
            game: {
                version: number;
                bounds: {
                    w: number;
                    h: number;
                };
                buildings: ({
                    type: "emitter";
                    item: string;
                    pos: {
                        x: number;
                        y: number;
                        r: number;
                    };
                } | {
                    type: "goal";
                    item: string;
                    pos: {
                        x: number;
                        y: number;
                        r: number;
                    };
                } | {
                    type: "block";
                    pos: {
                        x: number;
                        y: number;
                        r: number;
                    };
                })[];
                excludedBuildings: string[];
            };
        };
        /**
         * @type {Array<number>}
         */
        nextPuzzles: Array<number>;
        loadPuzzle(): void;
        /**
         *
         * @param {boolean} liked
         * @param {number} time
         */
        trackCompleted(liked: boolean, time: number): Promise<void>;
        sharePuzzle(): void;
        reportPuzzle(): any;
    }
    import { PuzzleGameMode } from "game/modes/puzzle";
    import { GameRoot } from "game/root";
}
declare module "game/game_mode_registry" {
    export function initGameModeRegistry(): void;
}
declare module "game/game_speed_registry" {
    export function initGameSpeedRegistry(): void;
}
declare module "game/item_registry" {
    export function initItemRegistry(): void;
}
declare module "game/time/fast_forward_game_speed" {
    export class FastForwardGameSpeed extends BaseGameSpeed {
        constructor(root: import("game/root").GameRoot);
    }
    import { BaseGameSpeed } from "game/time/base_game_speed";
}
declare module "platform/ad_providers/adinplay" {
    export class AdinplayAdProvider extends AdProviderInterface {
        /**
         *
         * @param {Application} app
         */
        constructor(app: Application);
        /** @type {ClickDetector} */
        getOnSteamClickDetector: ClickDetector;
        /** @type {Element} */
        adContainerMainElement: Element;
        /**
         * The resolve function to finish the current video ad. Null if none is currently running
         * @type {Function}
         */
        videoAdResolveFunction: Function;
        /**
         * The current timer which will timeout the resolve
         */
        videoAdResolveTimer: number;
        /**
         * When we showed the last video ad
         */
        lastVideoAdShowTime: number;
    }
    import { AdProviderInterface } from "platform/ad_provider";
    import { ClickDetector } from "core/click_detector";
    import { Application } from "application";
}
declare module "platform/browser/no_game_analytics" {
    export class NoGameAnalytics extends GameAnalyticsInterface {
        constructor(app: any);
    }
    import { GameAnalyticsInterface } from "platform/game_analytics";
}
declare module "modloader/exports" {
    export const exports: {
        application: typeof import_0;
        changelog: typeof import_1;
        "core/animation_frame": typeof import_2;
        "core/async_compression": typeof import_4;
        "core/atlas_definitions": typeof import_5;
        "core/background_resources_loader": typeof import_6;
        "core/buffer_maintainer": typeof import_7;
        "core/buffer_utils": typeof import_8;
        "core/cachebust": typeof import_9;
        "core/click_detector": typeof import_10;
        "core/config": typeof import_11;
        "core/config.local": typeof import_12;
        "core/config.local.template": typeof import_13;
        "core/dpi_manager": typeof import_14;
        "core/draw_parameters": typeof import_15;
        "core/draw_utils": typeof import_16;
        "core/error_handler": typeof import_17;
        "core/explained_result": typeof import_18;
        "core/factory": typeof import_19;
        "core/game_state": typeof import_20;
        "core/global_registries": typeof import_21;
        "core/globals": typeof import_22;
        "core/input_distributor": typeof import_23;
        "core/input_receiver": typeof import_24;
        "core/loader": typeof import_25;
        "core/logging": typeof import_26;
        "core/lzstring": typeof import_27;
        "core/modal_dialog_elements": typeof import_28;
        "core/modal_dialog_forms": typeof import_29;
        "core/query_parameters": typeof import_31;
        "core/read_write_proxy": typeof import_32;
        "core/rectangle": typeof import_33;
        "core/request_channel": typeof import_34;
        "core/restriction_manager": typeof import_35;
        "core/rng": typeof import_36;
        "core/sensitive_utils.encrypt": typeof import_37;
        "core/signal": typeof import_38;
        "core/singleton_factory": typeof import_39;
        "core/sprites": typeof import_40;
        "core/stale_area_detector": typeof import_41;
        "core/state_manager": typeof import_42;
        "core/textual_game_state": typeof import_43;
        "core/tracked_state": typeof import_44;
        "core/utils": typeof import_45;
        "core/vector": typeof import_46;
        "game/achievement_proxy": typeof import_47;
        "game/automatic_save": typeof import_48;
        "game/base_item": typeof import_49;
        "game/belt_path": typeof import_50;
        "game/blueprint": typeof import_51;
        "game/building_codes": typeof import_52;
        "game/buildings/analyzer": typeof import_53;
        "game/buildings/balancer": typeof import_54;
        "game/buildings/belt": typeof import_55;
        "game/buildings/block": typeof import_56;
        "game/buildings/comparator": typeof import_57;
        "game/buildings/constant_producer": typeof import_58;
        "game/buildings/constant_signal": typeof import_59;
        "game/buildings/cutter": typeof import_60;
        "game/buildings/display": typeof import_61;
        "game/buildings/filter": typeof import_62;
        "game/buildings/goal_acceptor": typeof import_63;
        "game/buildings/hub": typeof import_64;
        "game/buildings/item_producer": typeof import_65;
        "game/buildings/lever": typeof import_66;
        "game/buildings/logic_gate": typeof import_67;
        "game/buildings/miner": typeof import_68;
        "game/buildings/mixer": typeof import_69;
        "game/buildings/painter": typeof import_70;
        "game/buildings/reader": typeof import_71;
        "game/buildings/rotater": typeof import_72;
        "game/buildings/stacker": typeof import_73;
        "game/buildings/storage": typeof import_74;
        "game/buildings/transistor": typeof import_75;
        "game/buildings/trash": typeof import_76;
        "game/buildings/underground_belt": typeof import_77;
        "game/buildings/virtual_processor": typeof import_78;
        "game/buildings/wire_tunnel": typeof import_79;
        "game/buildings/wire": typeof import_80;
        "game/camera": typeof import_81;
        "game/colors": typeof import_82;
        "game/component_registry": typeof import_83;
        "game/component": typeof import_84;
        "game/components/belt_reader": typeof import_85;
        "game/components/belt_underlays": typeof import_86;
        "game/components/belt": typeof import_87;
        "game/components/constant_signal": typeof import_88;
        "game/components/display": typeof import_89;
        "game/components/filter": typeof import_90;
        "game/components/goal_acceptor": typeof import_91;
        "game/components/hub": typeof import_92;
        "game/components/item_acceptor": typeof import_93;
        "game/components/item_ejector": typeof import_94;
        "game/components/item_processor": typeof import_95;
        "game/components/item_producer": typeof import_96;
        "game/components/lever": typeof import_97;
        "game/components/logic_gate": typeof import_98;
        "game/components/miner": typeof import_99;
        "game/components/static_map_entity": typeof import_100;
        "game/components/storage": typeof import_101;
        "game/components/underground_belt": typeof import_102;
        "game/components/wire_tunnel": typeof import_103;
        "game/components/wire": typeof import_104;
        "game/components/wired_pins": typeof import_105;
        "game/core": typeof import_106;
        "game/dynamic_tickrate": typeof import_107;
        "game/entity_components": typeof import_108;
        "game/entity_manager": typeof import_109;
        "game/entity": typeof import_110;
        "game/game_loading_overlay": typeof import_111;
        "game/game_mode_registry": typeof import_112;
        "game/game_mode": typeof import_113;
        "game/game_speed_registry": typeof import_114;
        "game/game_system_manager": typeof import_115;
        "game/game_system_with_filter": typeof import_116;
        "game/game_system": typeof import_117;
        "game/hints": typeof import_118;
        "game/hub_goals": typeof import_119;
        "game/hud/base_hud_part": typeof import_120;
        "game/hud/dynamic_dom_attach": typeof import_121;
        "game/hud/hud": typeof import_122;
        "game/hud/parts/base_toolbar": typeof import_123;
        "game/hud/parts/beta_overlay": typeof import_124;
        "game/hud/parts/blueprint_placer": typeof import_125;
        "game/hud/parts/building_placer_logic": typeof import_126;
        "game/hud/parts/building_placer": typeof import_127;
        "game/hud/parts/buildings_toolbar": typeof import_128;
        "game/hud/parts/cat_memes": typeof import_129;
        "game/hud/parts/color_blind_helper": typeof import_130;
        "game/hud/parts/constant_signal_edit": typeof import_131;
        "game/hud/parts/debug_changes": typeof import_132;
        "game/hud/parts/debug_info": typeof import_133;
        "game/hud/parts/entity_debugger": typeof import_134;
        "game/hud/parts/game_menu": typeof import_135;
        "game/hud/parts/HUDPuzzleNextPuzzle": typeof import_136;
        "game/hud/parts/interactive_tutorial": typeof import_137;
        "game/hud/parts/keybinding_overlay": typeof import_138;
        "game/hud/parts/layer_preview": typeof import_139;
        "game/hud/parts/lever_toggle": typeof import_140;
        "game/hud/parts/mass_selector": typeof import_141;
        "game/hud/parts/miner_highlight": typeof import_142;
        "game/hud/parts/modal_dialogs": typeof import_143;
        "game/hud/parts/notifications": typeof import_144;
        "game/hud/parts/pinned_shapes": typeof import_145;
        "game/hud/parts/puzzle_back_to_menu": typeof import_146;
        "game/hud/parts/puzzle_complete_notification": typeof import_147;
        "game/hud/parts/puzzle_dlc_logo": typeof import_148;
        "game/hud/parts/puzzle_editor_controls": typeof import_149;
        "game/hud/parts/puzzle_editor_review": typeof import_150;
        "game/hud/parts/puzzle_editor_settings": typeof import_151;
        "game/hud/parts/puzzle_play_metadata": typeof import_152;
        "game/hud/parts/puzzle_play_settings": typeof import_153;
        "game/hud/parts/sandbox_controller": typeof import_154;
        "game/hud/parts/screenshot_exporter": typeof import_155;
        "game/hud/parts/settings_menu": typeof import_156;
        "game/hud/parts/shape_tooltip": typeof import_157;
        "game/hud/parts/shape_viewer": typeof import_158;
        "game/hud/parts/shop": typeof import_159;
        "game/hud/parts/standalone_advantages": typeof import_160;
        "game/hud/parts/statistics_handle": typeof import_161;
        "game/hud/parts/statistics": typeof import_162;
        "game/hud/parts/tutorial_hints": typeof import_163;
        "game/hud/parts/tutorial_video_offer": typeof import_164;
        "game/hud/parts/unlock_notification": typeof import_165;
        "game/hud/parts/vignette_overlay": typeof import_166;
        "game/hud/parts/watermark": typeof import_167;
        "game/hud/parts/waypoints": typeof import_168;
        "game/hud/parts/wire_info": typeof import_169;
        "game/hud/parts/wires_overlay": typeof import_170;
        "game/hud/parts/wires_toolbar": typeof import_171;
        "game/hud/trailer_maker": typeof import_172;
        "game/hud/trailer_points": typeof import_173;
        "game/item_registry": typeof import_174;
        "game/item_resolver": typeof import_175;
        "game/items/boolean_item": typeof import_176;
        "game/items/color_item": typeof import_177;
        "game/items/shape_item": typeof import_178;
        "game/key_action_mapper": typeof import_179;
        "game/logic": typeof import_180;
        "game/map_chunk_aggregate": typeof import_181;
        "game/map_chunk_view": typeof import_182;
        "game/map_chunk": typeof import_183;
        "game/map_view": typeof import_184;
        "game/map": typeof import_185;
        "game/meta_building_registry": typeof import_186;
        "game/meta_building": typeof import_187;
        "game/modes/puzzle_edit": typeof import_188;
        "game/modes/puzzle_play": typeof import_189;
        "game/modes/puzzle": typeof import_190;
        "game/modes/regular": typeof import_191;
        "game/production_analytics": typeof import_192;
        "game/root": typeof import_193;
        "game/shape_definition_manager": typeof import_194;
        "game/shape_definition": typeof import_195;
        "game/sound_proxy": typeof import_196;
        "game/systems/belt_reader": typeof import_197;
        "game/systems/belt_underlays": typeof import_198;
        "game/systems/belt": typeof import_199;
        "game/systems/constant_producer": typeof import_200;
        "game/systems/constant_signal": typeof import_201;
        "game/systems/display": typeof import_202;
        "game/systems/filter": typeof import_203;
        "game/systems/goal_acceptor": typeof import_204;
        "game/systems/hub": typeof import_205;
        "game/systems/item_acceptor": typeof import_206;
        "game/systems/item_ejector": typeof import_207;
        "game/systems/item_processor_overlays": typeof import_208;
        "game/systems/item_processor": typeof import_209;
        "game/systems/item_producer": typeof import_210;
        "game/systems/lever": typeof import_211;
        "game/systems/logic_gate": typeof import_212;
        "game/systems/map_resources": typeof import_213;
        "game/systems/miner": typeof import_214;
        "game/systems/static_map_entity": typeof import_215;
        "game/systems/storage": typeof import_216;
        "game/systems/underground_belt": typeof import_217;
        "game/systems/wire": typeof import_218;
        "game/systems/wired_pins": typeof import_219;
        "game/systems/zone": typeof import_220;
        "game/theme": typeof import_221;
        "game/time/base_game_speed": typeof import_222;
        "game/time/fast_forward_game_speed": typeof import_223;
        "game/time/game_time": typeof import_224;
        "game/time/paused_game_speed": typeof import_225;
        "game/time/regular_game_speed": typeof import_226;
        "game/tutorial_goals_mappings": typeof import_227;
        "game/tutorial_goals": typeof import_228;
        languages: typeof import_229;
        "modloader/mod_manager": typeof import_232;
        "modloader/mod": typeof import_233;
        "platform/achievement_provider": typeof import_234;
        "platform/ad_provider": typeof import_235;
        "platform/ad_providers/adinplay": typeof import_236;
        "platform/ad_providers/gamedistribution": typeof import_237;
        "platform/ad_providers/no_ad_provider": typeof import_238;
        "platform/analytics": typeof import_239;
        "platform/api": typeof import_240;
        "platform/browser/game_analytics": typeof import_241;
        "platform/browser/google_analytics": typeof import_242;
        "platform/browser/no_achievement_provider": typeof import_243;
        "platform/browser/no_game_analytics": typeof import_244;
        "platform/browser/sound": typeof import_245;
        "platform/browser/storage_indexed_db": typeof import_246;
        "platform/browser/storage": typeof import_247;
        "platform/browser/wrapper": typeof import_248;
        "platform/electron/steam_achievement_provider": typeof import_249;
        "platform/electron/storage": typeof import_250;
        "platform/electron/wrapper": typeof import_251;
        "platform/game_analytics": typeof import_252;
        "platform/sound": typeof import_253;
        "platform/storage": typeof import_254;
        "platform/wrapper": typeof import_255;
        "profile/application_settings": typeof import_256;
        "profile/setting_types": typeof import_257;
        "savegame/puzzle_serializer": typeof import_258;
        "savegame/savegame_compressor": typeof import_259;
        "savegame/savegame_interface_registry": typeof import_260;
        "savegame/savegame_interface": typeof import_261;
        "savegame/savegame_manager": typeof import_262;
        "savegame/savegame_serializer": typeof import_263;
        "savegame/savegame_typedefs": typeof import_264;
        "savegame/savegame": typeof import_265;
        "savegame/schemas/1000": typeof import_266;
        "savegame/schemas/1001": typeof import_267;
        "savegame/schemas/1002": typeof import_268;
        "savegame/schemas/1003": typeof import_269;
        "savegame/schemas/1004": typeof import_270;
        "savegame/schemas/1005": typeof import_271;
        "savegame/schemas/1006": typeof import_272;
        "savegame/schemas/1007": typeof import_273;
        "savegame/schemas/1008": typeof import_274;
        "savegame/schemas/1009": typeof import_275;
        "savegame/schemas/1010": typeof import_276;
        "savegame/serialization_data_types": typeof import_277;
        "savegame/serialization": typeof import_278;
        "savegame/serializer_internal": typeof import_279;
        "states/about": typeof import_280;
        "states/changelog": typeof import_281;
        "states/ingame": typeof import_282;
        "states/keybindings": typeof import_283;
        "states/login": typeof import_284;
        "states/main_menu": typeof import_285;
        "states/mobile_warning": typeof import_286;
        "states/preload": typeof import_287;
        "states/puzzle_menu": typeof import_288;
        "states/settings": typeof import_289;
        "states/wegame_splash": typeof import_290;
        translations: typeof import_291;
    };
    import * as import_0 from "application";
    import * as import_1 from "changelog";
    import * as import_2 from "core/animation_frame";
    import * as import_4 from "core/async_compression";
    import * as import_5 from "core/atlas_definitions";
    import * as import_6 from "core/background_resources_loader";
    import * as import_7 from "core/buffer_maintainer";
    import * as import_8 from "core/buffer_utils";
    import * as import_9 from "core/cachebust";
    import * as import_10 from "core/click_detector";
    import * as import_11 from "core/config";
    import * as import_12 from "core/config.local";
    import * as import_13 from "core/config.local.template";
    import * as import_14 from "core/dpi_manager";
    import * as import_15 from "core/draw_parameters";
    import * as import_16 from "core/draw_utils";
    import * as import_17 from "core/error_handler";
    import * as import_18 from "core/explained_result";
    import * as import_19 from "core/factory";
    import * as import_20 from "core/game_state";
    import * as import_21 from "core/global_registries";
    import * as import_22 from "core/globals";
    import * as import_23 from "core/input_distributor";
    import * as import_24 from "core/input_receiver";
    import * as import_25 from "core/loader";
    import * as import_26 from "core/logging";
    import * as import_27 from "core/lzstring";
    import * as import_28 from "core/modal_dialog_elements";
    import * as import_29 from "core/modal_dialog_forms";
    import * as import_31 from "core/query_parameters";
    import * as import_32 from "core/read_write_proxy";
    import * as import_33 from "core/rectangle";
    import * as import_34 from "core/request_channel";
    import * as import_35 from "core/restriction_manager";
    import * as import_36 from "core/rng";
    import * as import_37 from "core/sensitive_utils.encrypt";
    import * as import_38 from "core/signal";
    import * as import_39 from "core/singleton_factory";
    import * as import_40 from "core/sprites";
    import * as import_41 from "core/stale_area_detector";
    import * as import_42 from "core/state_manager";
    import * as import_43 from "core/textual_game_state";
    import * as import_44 from "core/tracked_state";
    import * as import_45 from "core/utils";
    import * as import_46 from "core/vector";
    import * as import_47 from "game/achievement_proxy";
    import * as import_48 from "game/automatic_save";
    import * as import_49 from "game/base_item";
    import * as import_50 from "game/belt_path";
    import * as import_51 from "game/blueprint";
    import * as import_52 from "game/building_codes";
    import * as import_53 from "game/buildings/analyzer";
    import * as import_54 from "game/buildings/balancer";
    import * as import_55 from "game/buildings/belt";
    import * as import_56 from "game/buildings/block";
    import * as import_57 from "game/buildings/comparator";
    import * as import_58 from "game/buildings/constant_producer";
    import * as import_59 from "game/buildings/constant_signal";
    import * as import_60 from "game/buildings/cutter";
    import * as import_61 from "game/buildings/display";
    import * as import_62 from "game/buildings/filter";
    import * as import_63 from "game/buildings/goal_acceptor";
    import * as import_64 from "game/buildings/hub";
    import * as import_65 from "game/buildings/item_producer";
    import * as import_66 from "game/buildings/lever";
    import * as import_67 from "game/buildings/logic_gate";
    import * as import_68 from "game/buildings/miner";
    import * as import_69 from "game/buildings/mixer";
    import * as import_70 from "game/buildings/painter";
    import * as import_71 from "game/buildings/reader";
    import * as import_72 from "game/buildings/rotater";
    import * as import_73 from "game/buildings/stacker";
    import * as import_74 from "game/buildings/storage";
    import * as import_75 from "game/buildings/transistor";
    import * as import_76 from "game/buildings/trash";
    import * as import_77 from "game/buildings/underground_belt";
    import * as import_78 from "game/buildings/virtual_processor";
    import * as import_79 from "game/buildings/wire_tunnel";
    import * as import_80 from "game/buildings/wire";
    import * as import_81 from "game/camera";
    import * as import_82 from "game/colors";
    import * as import_83 from "game/component_registry";
    import * as import_84 from "game/component";
    import * as import_85 from "game/components/belt_reader";
    import * as import_86 from "game/components/belt_underlays";
    import * as import_87 from "game/components/belt";
    import * as import_88 from "game/components/constant_signal";
    import * as import_89 from "game/components/display";
    import * as import_90 from "game/components/filter";
    import * as import_91 from "game/components/goal_acceptor";
    import * as import_92 from "game/components/hub";
    import * as import_93 from "game/components/item_acceptor";
    import * as import_94 from "game/components/item_ejector";
    import * as import_95 from "game/components/item_processor";
    import * as import_96 from "game/components/item_producer";
    import * as import_97 from "game/components/lever";
    import * as import_98 from "game/components/logic_gate";
    import * as import_99 from "game/components/miner";
    import * as import_100 from "game/components/static_map_entity";
    import * as import_101 from "game/components/storage";
    import * as import_102 from "game/components/underground_belt";
    import * as import_103 from "game/components/wire_tunnel";
    import * as import_104 from "game/components/wire";
    import * as import_105 from "game/components/wired_pins";
    import * as import_106 from "game/core";
    import * as import_107 from "game/dynamic_tickrate";
    import * as import_108 from "game/entity_components";
    import * as import_109 from "game/entity_manager";
    import * as import_110 from "game/entity";
    import * as import_111 from "game/game_loading_overlay";
    import * as import_112 from "game/game_mode_registry";
    import * as import_113 from "game/game_mode";
    import * as import_114 from "game/game_speed_registry";
    import * as import_115 from "game/game_system_manager";
    import * as import_116 from "game/game_system_with_filter";
    import * as import_117 from "game/game_system";
    import * as import_118 from "game/hints";
    import * as import_119 from "game/hub_goals";
    import * as import_120 from "game/hud/base_hud_part";
    import * as import_121 from "game/hud/dynamic_dom_attach";
    import * as import_122 from "game/hud/hud";
    import * as import_123 from "game/hud/parts/base_toolbar";
    import * as import_124 from "game/hud/parts/beta_overlay";
    import * as import_125 from "game/hud/parts/blueprint_placer";
    import * as import_126 from "game/hud/parts/building_placer_logic";
    import * as import_127 from "game/hud/parts/building_placer";
    import * as import_128 from "game/hud/parts/buildings_toolbar";
    import * as import_129 from "game/hud/parts/cat_memes";
    import * as import_130 from "game/hud/parts/color_blind_helper";
    import * as import_131 from "game/hud/parts/constant_signal_edit";
    import * as import_132 from "game/hud/parts/debug_changes";
    import * as import_133 from "game/hud/parts/debug_info";
    import * as import_134 from "game/hud/parts/entity_debugger";
    import * as import_135 from "game/hud/parts/game_menu";
    import * as import_136 from "game/hud/parts/HUDPuzzleNextPuzzle";
    import * as import_137 from "game/hud/parts/interactive_tutorial";
    import * as import_138 from "game/hud/parts/keybinding_overlay";
    import * as import_139 from "game/hud/parts/layer_preview";
    import * as import_140 from "game/hud/parts/lever_toggle";
    import * as import_141 from "game/hud/parts/mass_selector";
    import * as import_142 from "game/hud/parts/miner_highlight";
    import * as import_143 from "game/hud/parts/modal_dialogs";
    import * as import_144 from "game/hud/parts/notifications";
    import * as import_145 from "game/hud/parts/pinned_shapes";
    import * as import_146 from "game/hud/parts/puzzle_back_to_menu";
    import * as import_147 from "game/hud/parts/puzzle_complete_notification";
    import * as import_148 from "game/hud/parts/puzzle_dlc_logo";
    import * as import_149 from "game/hud/parts/puzzle_editor_controls";
    import * as import_150 from "game/hud/parts/puzzle_editor_review";
    import * as import_151 from "game/hud/parts/puzzle_editor_settings";
    import * as import_152 from "game/hud/parts/puzzle_play_metadata";
    import * as import_153 from "game/hud/parts/puzzle_play_settings";
    import * as import_154 from "game/hud/parts/sandbox_controller";
    import * as import_155 from "game/hud/parts/screenshot_exporter";
    import * as import_156 from "game/hud/parts/settings_menu";
    import * as import_157 from "game/hud/parts/shape_tooltip";
    import * as import_158 from "game/hud/parts/shape_viewer";
    import * as import_159 from "game/hud/parts/shop";
    import * as import_160 from "game/hud/parts/standalone_advantages";
    import * as import_161 from "game/hud/parts/statistics_handle";
    import * as import_162 from "game/hud/parts/statistics";
    import * as import_163 from "game/hud/parts/tutorial_hints";
    import * as import_164 from "game/hud/parts/tutorial_video_offer";
    import * as import_165 from "game/hud/parts/unlock_notification";
    import * as import_166 from "game/hud/parts/vignette_overlay";
    import * as import_167 from "game/hud/parts/watermark";
    import * as import_168 from "game/hud/parts/waypoints";
    import * as import_169 from "game/hud/parts/wire_info";
    import * as import_170 from "game/hud/parts/wires_overlay";
    import * as import_171 from "game/hud/parts/wires_toolbar";
    import * as import_172 from "game/hud/trailer_maker";
    import * as import_173 from "game/hud/trailer_points";
    import * as import_174 from "game/item_registry";
    import * as import_175 from "game/item_resolver";
    import * as import_176 from "game/items/boolean_item";
    import * as import_177 from "game/items/color_item";
    import * as import_178 from "game/items/shape_item";
    import * as import_179 from "game/key_action_mapper";
    import * as import_180 from "game/logic";
    import * as import_181 from "game/map_chunk_aggregate";
    import * as import_182 from "game/map_chunk_view";
    import * as import_183 from "game/map_chunk";
    import * as import_184 from "game/map_view";
    import * as import_185 from "game/map";
    import * as import_186 from "game/meta_building_registry";
    import * as import_187 from "game/meta_building";
    import * as import_188 from "game/modes/puzzle_edit";
    import * as import_189 from "game/modes/puzzle_play";
    import * as import_190 from "game/modes/puzzle";
    import * as import_191 from "game/modes/regular";
    import * as import_192 from "game/production_analytics";
    import * as import_193 from "game/root";
    import * as import_194 from "game/shape_definition_manager";
    import * as import_195 from "game/shape_definition";
    import * as import_196 from "game/sound_proxy";
    import * as import_197 from "game/systems/belt_reader";
    import * as import_198 from "game/systems/belt_underlays";
    import * as import_199 from "game/systems/belt";
    import * as import_200 from "game/systems/constant_producer";
    import * as import_201 from "game/systems/constant_signal";
    import * as import_202 from "game/systems/display";
    import * as import_203 from "game/systems/filter";
    import * as import_204 from "game/systems/goal_acceptor";
    import * as import_205 from "game/systems/hub";
    import * as import_206 from "game/systems/item_acceptor";
    import * as import_207 from "game/systems/item_ejector";
    import * as import_208 from "game/systems/item_processor_overlays";
    import * as import_209 from "game/systems/item_processor";
    import * as import_210 from "game/systems/item_producer";
    import * as import_211 from "game/systems/lever";
    import * as import_212 from "game/systems/logic_gate";
    import * as import_213 from "game/systems/map_resources";
    import * as import_214 from "game/systems/miner";
    import * as import_215 from "game/systems/static_map_entity";
    import * as import_216 from "game/systems/storage";
    import * as import_217 from "game/systems/underground_belt";
    import * as import_218 from "game/systems/wire";
    import * as import_219 from "game/systems/wired_pins";
    import * as import_220 from "game/systems/zone";
    import * as import_221 from "game/theme";
    import * as import_222 from "game/time/base_game_speed";
    import * as import_223 from "game/time/fast_forward_game_speed";
    import * as import_224 from "game/time/game_time";
    import * as import_225 from "game/time/paused_game_speed";
    import * as import_226 from "game/time/regular_game_speed";
    import * as import_227 from "game/tutorial_goals_mappings";
    import * as import_228 from "game/tutorial_goals";
    import * as import_229 from "languages";
    import * as import_232 from "modloader/mod_manager";
    import * as import_233 from "modloader/mod";
    import * as import_234 from "platform/achievement_provider";
    import * as import_235 from "platform/ad_provider";
    import * as import_236 from "platform/ad_providers/adinplay";
    import * as import_237 from "platform/ad_providers/gamedistribution";
    import * as import_238 from "platform/ad_providers/no_ad_provider";
    import * as import_239 from "platform/analytics";
    import * as import_240 from "platform/api";
    import * as import_241 from "platform/browser/game_analytics";
    import * as import_242 from "platform/browser/google_analytics";
    import * as import_243 from "platform/browser/no_achievement_provider";
    import * as import_244 from "platform/browser/no_game_analytics";
    import * as import_245 from "platform/browser/sound";
    import * as import_246 from "platform/browser/storage_indexed_db";
    import * as import_247 from "platform/browser/storage";
    import * as import_248 from "platform/browser/wrapper";
    import * as import_249 from "platform/electron/steam_achievement_provider";
    import * as import_250 from "platform/electron/storage";
    import * as import_251 from "platform/electron/wrapper";
    import * as import_252 from "platform/game_analytics";
    import * as import_253 from "platform/sound";
    import * as import_254 from "platform/storage";
    import * as import_255 from "platform/wrapper";
    import * as import_256 from "profile/application_settings";
    import * as import_257 from "profile/setting_types";
    import * as import_258 from "savegame/puzzle_serializer";
    import * as import_259 from "savegame/savegame_compressor";
    import * as import_260 from "savegame/savegame_interface_registry";
    import * as import_261 from "savegame/savegame_interface";
    import * as import_262 from "savegame/savegame_manager";
    import * as import_263 from "savegame/savegame_serializer";
    import * as import_264 from "savegame/savegame_typedefs";
    import * as import_265 from "savegame/savegame";
    import * as import_266 from "savegame/schemas/1000";
    import * as import_267 from "savegame/schemas/1001";
    import * as import_268 from "savegame/schemas/1002";
    import * as import_269 from "savegame/schemas/1003";
    import * as import_270 from "savegame/schemas/1004";
    import * as import_271 from "savegame/schemas/1005";
    import * as import_272 from "savegame/schemas/1006";
    import * as import_273 from "savegame/schemas/1007";
    import * as import_274 from "savegame/schemas/1008";
    import * as import_275 from "savegame/schemas/1009";
    import * as import_276 from "savegame/schemas/1010";
    import * as import_277 from "savegame/serialization_data_types";
    import * as import_278 from "savegame/serialization";
    import * as import_279 from "savegame/serializer_internal";
    import * as import_280 from "states/about";
    import * as import_281 from "states/changelog";
    import * as import_282 from "states/ingame";
    import * as import_283 from "states/keybindings";
    import * as import_284 from "states/login";
    import * as import_285 from "states/main_menu";
    import * as import_286 from "states/mobile_warning";
    import * as import_287 from "states/preload";
    import * as import_288 from "states/puzzle_menu";
    import * as import_289 from "states/settings";
    import * as import_290 from "states/wegame_splash";
    import * as import_291 from "translations";
}
declare module "modloader/mod_manager" {
    export class ModManager {
        /**
         * @param {Application} app
         */
        constructor(app: Application);
        app: import("application").Application;
        /**
         * @type {Array<Mod>}
         */
        mods: Array<Mod>;
        /**
         * @type {Array<{
         *  language: string,
         *  data: object
         * }>}
         */
        translations: {
            language: string;
            data: object;
        }[];
        /**
         * @param {Mod} mod
         */
        registerMod(mod: Mod): ModManager;
        /**
         * Loads mod js from url
         * @param {string} url http url of mod
         */
        loadMod(url: string): any;
        nextModResolver: any;
        nextModRejector: any;
        /**
         * Has mod loaded
         * @param {string} id Mod id
         * @returns {boolean}
         */
        hasMod(id: string): boolean;
        /**
         * Get mod by id
         * @param {string} id Mod id
         * @returns {Mod}
         */
        getMod(id: string): Mod;
        /**
         * Enables a mod
         * @param {string} id Mod id
         * @returns {boolean}
         */
        enableMod(id: string): boolean;
        /**
         * Disables a mod
         * @param {string} id Mod id
         * @returns {boolean}
         */
        disableMod(id: string): boolean;
        /**
         * Enables all mods
         */
        enableMods(): void;
        /**
         * Disables all mods
         */
        disableMods(): void;
    }
    export type Application = import("application").Application;
    import { Mod } from "modloader/mod";
}
declare module "application" {
    export class Application {
        unloaded: boolean;
        settings: ApplicationSettings;
        ticker: AnimationFrame;
        stateMgr: StateManager;
        savegameMgr: SavegameManager;
        inputMgr: InputDistributor;
        backgroundResourceLoader: BackgroundResourcesLoader;
        clientApi: ClientAPI;
        modManager: ModManager;
        restrictionMgr: RestrictionManager;
        /** @type {StorageInterface} */
        storage: StorageInterface;
        /** @type {SoundInterface} */
        sound: SoundInterface;
        /** @type {PlatformWrapperInterface} */
        platformWrapper: PlatformWrapperInterface;
        /** @type {AchievementProviderInterface} */
        achievementProvider: AchievementProviderInterface;
        /** @type {AdProviderInterface} */
        adProvider: AdProviderInterface;
        /** @type {AnalyticsInterface} */
        analytics: AnalyticsInterface;
        /** @type {GameAnalyticsInterface} */
        gameAnalytics: GameAnalyticsInterface;
        focused: boolean;
        pageVisible: any;
        applicationPaused: boolean;
        /** @type {TypedTrackedState<boolean>} */
        trackedIsRenderable: any;
        screenWidth: any;
        screenHeight: number;
        lastResizeCheck: number;
        /** @type {Vector|null} */
        mousePosition: Vector | null;
        /**
         * Initializes all platform instances
         */
        initPlatformDependentInstances(): void;
        /**
         * Registers all game states
         */
        registerStates(): void;
        /**
         * Registers all event listeners
         */
        registerEventListeners(): void;
        /**
         * Checks the focus after a touch
         * @param {TouchEvent} event
         */
        updateFocusAfterUserInteraction(event: TouchEvent): void;
        /**
         * Handles a page visibility change event
         * @param {Event} event
         */
        handleVisibilityChange(event: Event): void;
        /**
         * Handles a mouse move event
         * @param {MouseEvent} event
         */
        handleMousemove(event: MouseEvent): void;
        /**
         * Internal on focus handler
         */
        onFocus(): void;
        /**
         * Internal blur handler
         */
        onBlur(): void;
        /**
         * Returns if the app is currently visible
         */
        isRenderable(): any;
        onAppRenderableStateChanged(renderable: any): void;
        /**
         * Internal unload handler
         */
        onUnload(event: any): void;
        /**
         * Internal before-unload handler
         */
        onBeforeUnload(event: any): void;
        /**
         * Boots the application
         */
        boot(): void;
        /**
         * Deinitializes the application
         */
        deinitialize(): Promise<void>;
        /**
         * Background frame update callback
         * @param {number} dt
         */
        onBackgroundFrame(dt: number): void;
        /**
         * Frame update callback
         * @param {number} dt
         */
        onFrameEmitted(dt: number): void;
        /**
         * Checks if the app resized. Only does this once in a while
         * @param {boolean} forceUpdate Forced update of the dimensions
         */
        checkResize(forceUpdate?: boolean): void;
        /**
         * Returns the effective ui sclae
         */
        getEffectiveUiScale(): number;
        /**
         * Callback after ui scale has changed
         */
        updateAfterUiScaleChanged(): void;
    }
    export type AchievementProviderInterface = import("platform/achievement_provider").AchievementProviderInterface;
    export type GameAnalyticsInterface = import("platform/game_analytics").GameAnalyticsInterface;
    export type SoundInterface = import("platform/sound").SoundInterface;
    export type StorageInterface = import("platform/storage").StorageInterface;
    import { ApplicationSettings } from "profile/application_settings";
    import { AnimationFrame } from "core/animation_frame";
    import { StateManager } from "core/state_manager";
    import { SavegameManager } from "savegame/savegame_manager";
    import { InputDistributor } from "core/input_distributor";
    import { BackgroundResourcesLoader } from "core/background_resources_loader";
    import { ClientAPI } from "platform/api";
    import { ModManager } from "modloader/mod_manager";
    import { RestrictionManager } from "core/restriction_manager";
    import { PlatformWrapperInterface } from "platform/wrapper";
    import { AdProviderInterface } from "platform/ad_provider";
    import { AnalyticsInterface } from "platform/analytics";
    import { Vector } from "core/vector";
}
