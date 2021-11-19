import { globalConfig } from "../../../core/config";
import { MapChunkView } from "../../map_chunk_view";
import { THEME } from "../../theme";
import { BaseHUDPart } from "../base_hud_part";
import { Loader } from "../../../core/loader";
import { BeltPath } from "../../belt_path";
import { getBuildingDataFromCode } from "../../building_codes";

export class HUDBeltInfo extends BaseHUDPart {
    initialize() {
        this.spriteEmpty = Loader.getSprite("sprites/wires/network_empty.png");
        this.spriteConflict = Loader.getSprite("sprites/wires/network_conflict.png");
    }

    /**
     *
     * @param {import("../../../core/draw_utils").DrawParameters} parameters
     */
    drawOverlays(parameters) {
        if (this.root.currentLayer !== "regular") {
            // Not in the regular layer
            return;
        }

        const mousePos = this.root.app.mousePosition;
        if (!mousePos) {
            // No mouse
            return;
        }

        const worldPos = this.root.camera.screenToWorld(mousePos);
        const tile = worldPos.toTileSpace();
        const entity = this.root.map.getLayerContentXY(tile.x, tile.y, "regular");

        if (!entity) {
            // No entity
            return;
        }

        if (!entity.components.Belt) {
            // Not a belt
            return;
        }

        const path = entity.components.Belt.assignedPath;
        if (path === null) {
            return;
        }

        if (path.entityPath.length === 0) {
            return;
        }

        this.drawHighlightedPath(parameters, path);

        // write the path length on mouse position
        const ctx = parameters.context;
        ctx.font = "24px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${path.entityPath.length}`, mousePos.x, mousePos.y - 10);
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
