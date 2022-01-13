/**
 * @typedef {{
 *  "uiStyle": string,
 *  "map": {
 *      "background": string,
 *      "grid": string,
 *      "gridLineWidth": number,
 *      "selectionOverlay": string,
 *      "selectionOutline": string,
 *      "selectionBackground": string,
 *      "chunkBorders": string,
 *      "directionLock": {
 *          "regular": {
 *               "color": string,
 *               "background": string
 *          },
 *          "wires": {
 *               "color": string,
 *               "background": string
 *          }
 *      },
 *      "colorBlindPickerTile": string,
 *      "resources": {
 *          "shape": string,
 *          "red": string,
 *          "green": string,
 *          "blue": string
 *      },
 *      "chunkOverview": {
 *          "empty": string,
 *          "filled": string,
 *          "beltColor": string
 *      },
 *      "wires": {
 *          "overlayColor": string,
 *          "previewColor": string,
 *          "highlightColor": string
 *      },
 *      "connectedMiners": {
 *          "overlay": string,
 *          "textColor": string,
 *          "textColorCapped": string,
 *          "background": string
 *      },
 *      "zone": {
 *          "borderSolid": string,
 *          "outerColor": string
 *      }
 *   },
 *  "items": {
 *      "outline": string,
 *      "outlineWidth": number,
 *      "circleBackground": string
 *   },
 *  "shapeTooltip": {
 *      "background": string,
 *      "outline": string
 *   }
 * }} Theme
 */

/**
 * @type {Object.<string, Theme>}
 */
export const THEMES = {
    dark: require("./themes/dark.json"),
    light: require("./themes/light.json"),
};

export let THEME = THEMES.light;

export function applyGameTheme(id) {
    THEME = THEMES[id];
}
