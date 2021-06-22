import { makeOffscreenBuffer } from "../../../core/buffer_utils";
import { globalConfig } from "../../../core/config";
import { getDeviceDPI } from "../../../core/dpi_manager";
import { DrawParameters } from "../../../core/draw_parameters";
import { InputReceiver } from "../../../core/input_receiver";
import { ORIGINAL_SPRITE_SCALE } from "../../../core/sprites";
import { makeDiv } from "../../../core/utils";
import { Vector } from "../../../core/vector";
import { T } from "../../../translations";
import { Blueprint } from "../../blueprint";
import { getBuildingDataFromCode } from "../../building_codes";
import { KeyActionMapper, KEYMAPPINGS } from "../../key_action_mapper";
import { BaseHUDPart } from "../base_hud_part";
import { DynamicDomAttach } from "../dynamic_dom_attach";

export class HUDBlueprintLibrary extends BaseHUDPart {
    createElements(parent) {
        this.background = makeDiv(parent, "ingame_HUD_BlueprintLibrary", ["ingameDialog"]);

        // DIALOG Inner / Wrapper
        this.dialogInner = makeDiv(this.background, null, ["dialogInner"]);
        this.title = makeDiv(this.dialogInner, null, ["title"], T.ingame.blueprintLibrary.title);
        this.closeButton = makeDiv(this.title, null, ["closeButton"]);
        this.trackClicks(this.closeButton, this.close);
        this.contentDiv = makeDiv(this.dialogInner, null, ["content"]);

        const [canvas, context] = makeOffscreenBuffer(100, 100, {
            smooth: false,
            label: "blueprint-library",
            reusable: true,
        });
        this.context = context;
        this.contentDiv.append(canvas);
    }

    initialize() {
        this.domAttach = new DynamicDomAttach(this.root, this.background, {
            attachClass: "visible",
        });

        this.inputReciever = new InputReceiver("blueprint_library");
        this.keyActionMapper = new KeyActionMapper(this.root, this.inputReciever);

        this.keyActionMapper.getBinding(KEYMAPPINGS.general.back).add(this.close, this);
        this.keyActionMapper.getBinding(KEYMAPPINGS.ingame.menuClose).add(this.close, this);
        this.keyActionMapper.getBinding(KEYMAPPINGS.ingame.menuOpenBlueprintLibrary).add(this.close, this);

        this.close();
    }

    cleanup() {}

    show() {
        this.visible = true;
        this.root.app.inputMgr.makeSureAttachedAndOnTop(this.inputReciever);
    }

    close() {
        this.visible = false;
        this.root.app.inputMgr.makeSureDetached(this.inputReciever);
        this.update();
    }

    update() {
        this.domAttach.update(this.visible);
        if (this.visible) {
            if (this.root.hud.parts.blueprintPlacer.currentBlueprint) {
                const blueprint = /** @type {Blueprint} */ (this.root.hud.parts.blueprintPlacer.currentBlueprint.get());
                if (blueprint) {
                    // Construct params required for drawing
                    const params = new DrawParameters({
                        context: this.context,
                        visibleRect: this.root.camera.getVisibleRect(),
                        desiredAtlasScale: "0.5",
                        zoomLevel: 3.5,
                        root: this.root,
                    });
                    params.context.clearRect(0, 0, 100, 100);
                    params.context.globalAlpha = 0.8;

                    const origin = { xMin: 0, yMin: 0, xMax: 0, yMax: 0 };
                    // First, create a copy
                    for (let i = 0; i < blueprint.entities.length; ++i) {
                        const pos = blueprint.entities[
                            i
                        ].components.StaticMapEntity.getTileSpaceBounds().getCenter();
                        if (pos.x < origin.xMin) origin.xMin = pos.x;
                        if (pos.y < origin.yMin) origin.yMin = pos.y;
                        if (pos.x > origin.xMax) origin.xMax = pos.x;
                        if (pos.y > origin.yMax) origin.yMax = pos.y;
                    }

                    const blueprintOrigin = new Vector(
                        (origin.xMax - origin.xMin) / 2,
                        (origin.yMax - origin.yMin) / 2
                    ).floor();
                    for (let i = 0; i < blueprint.entities.length; ++i) {
                        const entity = blueprint.entities[i];
                        const staticComp = entity.components.StaticMapEntity;
                        const pos = staticComp.origin;
                        const sprite = staticComp.getBlueprintSprite();
                        if (sprite) {
                            staticComp.drawSpriteOnBoundsClipped(
                                params,
                                sprite,
                                0,
                                pos.add(new Vector(blueprintOrigin.x, blueprintOrigin.y))
                            );
                        }
                    }
                    params.context.globalAlpha = 1;
                }
            }
        }
    }

    isBlockingOverlay() {
        return false;
    }
}
