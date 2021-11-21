import { globalConfig } from "../../../core/config";
import { Loader } from "../../../core/loader";
import { clamp, makeDiv } from "../../../core/utils";
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
    draw(parameters) {
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
        const firstBelt = path.entityPath[0];
        const firstBeltStaticComp = firstBelt.components.StaticMapEntity;
        const firstBeltScreenTile = firstBeltStaticComp.origin.toWorldSpaceCenterOfTile();

        const lastBelt = path.entityPath[path.entityPath.length - 1];
        const lastBeltStaticComp = lastBelt.components.StaticMapEntity;
        const lastBeltScreenTile = lastBeltStaticComp.origin.toWorldSpaceCenterOfTile();

        parameters.context.fillStyle = THEME.map.directionLock[this.root.currentLayer].color;
        parameters.context.strokeStyle = THEME.map.directionLock[this.root.currentLayer].color;
        parameters.context.lineWidth = 10;

        parameters.context.beginCircle(firstBeltScreenTile.x, firstBeltScreenTile.y, 8);
        parameters.context.fill();

        parameters.context.beginPath();
        parameters.context.moveTo(firstBeltScreenTile.x, firstBeltScreenTile.y);

        let currentScreentTile = firstBeltScreenTile;
        for (let i = 0; i < path.entityPath.length; ++i) {
            const belt = path.entityPath[i];
            const staticComp = belt.components.StaticMapEntity;
            const screenTile = staticComp.origin.toWorldSpaceCenterOfTile();

            const nextBelt = path.entityPath[i + 1];
            // End of path
            if (!nextBelt) {
                break;
            }

            const nextStaticComp = nextBelt.components.StaticMapEntity;
            const nextScreenTile = nextStaticComp.origin.toWorldSpaceCenterOfTile();

            // Still same line
            if (nextScreenTile.x === currentScreentTile.x || nextScreenTile.y === currentScreentTile.y) {
                continue;
            }

            parameters.context.lineTo(screenTile.x, screenTile.y);
            currentScreentTile = screenTile;
        }

        parameters.context.lineTo(lastBeltScreenTile.x, lastBeltScreenTile.y);

        parameters.context.globalAlpha = 0.5;
        parameters.context.stroke();
        parameters.context.globalAlpha = 1;

        parameters.context.beginCircle(lastBeltScreenTile.x, lastBeltScreenTile.y, 5);
        parameters.context.fill();

        // Draw arrow
        const arrowSprite = this.root.hud.parts.buildingPlacer.lockIndicatorSprites["regular"];
        for (let i = 0; i < path.entityPath.length - 1; ++i) {
            const belt = path.entityPath[i];
            const staticComp = belt.components.StaticMapEntity;
            const worldPos = staticComp.origin.toWorldSpaceCenterOfTile();

            const nextBelt = path.entityPath[i + 1];
            const nextStaticComp = nextBelt.components.StaticMapEntity;
            const angle = Math.radians(nextStaticComp.rotation);

            parameters.context.translate(worldPos.x, worldPos.y);
            parameters.context.rotate(angle);
            parameters.context.drawImage(
                arrowSprite,
                -6,
                -globalConfig.halfTileSize -
                    clamp((this.root.time.realtimeNow() * 1.5) % 1.0, 0, 1) * 1 * globalConfig.tileSize +
                    globalConfig.halfTileSize -
                    6,
                12,
                12
            );
            parameters.context.rotate(-angle);
            parameters.context.translate(-worldPos.x, -worldPos.y);
        }
    }
}
