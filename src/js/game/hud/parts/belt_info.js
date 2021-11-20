import { globalConfig } from "../../../core/config";
import { Loader } from "../../../core/loader";
import { makeDiv } from "../../../core/utils";
import { BeltPath } from "../../belt_path";
import { KEYMAPPINGS } from "../../key_action_mapper";
import { THEME } from "../../theme";
import { BaseHUDPart } from "../base_hud_part";
import { DynamicDomAttach } from "../dynamic_dom_attach";

export class HUDBeltInfo extends BaseHUDPart {
    createElements(parent) {
        this.background = makeDiv(parent, "ingame_HUD_BeltInfo");

        this.container = makeDiv(this.background, null, ["container"]);

        this.iconContainer = makeDiv(this.container, null, ["building"]);

        this.icon = makeDiv(this.iconContainer, null, ["icon"]);
        this.icon.innerHTML = this.beltSprite ? this.beltSprite.getAsHTML(192, 192) : "";

        this.length = makeDiv(this.container, null, ["length"], "0");
    }

    initialize() {
        this.domAttach = new DynamicDomAttach(this.root, this.background, {
            attachClass: "visible",
        });

        this.beltSprite = Loader.getSprite("sprites/buildings/belt_top.png");
        this.beltSprite.renderToHTMLElement(this.icon, 192, 192);
    }

    update() {
        this.domAttach.update(this.visible);
    }

    /**
     *
     * @param {import("../../../core/draw_utils").DrawParameters} parameters
     */
    drawOverlays(parameters) {
        if (this.root.currentLayer !== "regular") {
            // Not in the regular layer
            this.visible = false;
            return;
        }

        if (!this.root.keyMapper.getBinding(KEYMAPPINGS.ingame.showBeltLength).pressed) {
            // Belt length key not pressed
            this.visible = false;
            return;
        }

        const mousePos = this.root.app.mousePosition;
        if (!mousePos) {
            // No mouse
            this.visible = false;
            return;
        }

        const worldPos = this.root.camera.screenToWorld(mousePos);
        const tile = worldPos.toTileSpace();
        const entity = this.root.map.getLayerContentXY(tile.x, tile.y, "regular");

        if (!entity) {
            // No entity
            this.visible = false;
            return;
        }

        if (!entity.components.Belt) {
            // Not a belt
            this.visible = false;
            return;
        }

        const path = entity.components.Belt.assignedPath;
        if (path === null) {
            this.visible = false;
            return;
        }

        if (path.entityPath.length === 0) {
            this.visible = false;
            return;
        }

        this.visible = true;

        this.drawHighlightedPath(parameters, path);

        this.length.innerHTML = path.entityPath.length.toString();
    }

    /**
     *
     *
     * @param {import("../../../core/draw_utils").DrawParameters} parameters
     * @param {BeltPath} path
     */
    drawHighlightedPath(parameters, path) {
        parameters.context.globalAlpha = 0.5;

        for (let i = 0; i < path.entityPath.length; ++i) {
            const belt = path.entityPath[i];
            const staticComp = belt.components.StaticMapEntity;
            const screenTile = this.root.camera.worldToScreen(staticComp.origin.toWorldSpace());

            const ctx = parameters.context;
            const tileSizePixels = globalConfig.tileSize * this.root.camera.zoomLevel;

            ctx.fillStyle = THEME.map.wires.highlightColor;
            ctx.fillRect(screenTile.x, screenTile.y, tileSizePixels, tileSizePixels);
        }

        parameters.context.globalAlpha = 1;
    }
}
