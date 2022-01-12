import * as import_0 from "../application";
import * as import_1 from "../changelog";
import * as import_2 from "../core/animation_frame";
import * as import_4 from "../core/async_compression";
import * as import_5 from "../core/atlas_definitions";
import * as import_6 from "../core/background_resources_loader";
import * as import_7 from "../core/buffer_maintainer";
import * as import_8 from "../core/buffer_utils";
import * as import_9 from "../core/cachebust";
import * as import_10 from "../core/click_detector";
import * as import_11 from "../core/config";
import * as import_12 from "../core/config.local";
import * as import_13 from "../core/config.local.template";
import * as import_14 from "../core/dpi_manager";
import * as import_15 from "../core/draw_parameters";
import * as import_16 from "../core/draw_utils";
import * as import_17 from "../core/error_handler";
import * as import_18 from "../core/explained_result";
import * as import_19 from "../core/factory";
import * as import_20 from "../core/game_state";
import * as import_21 from "../core/global_registries";
import * as import_22 from "../core/globals";
import * as import_23 from "../core/input_distributor";
import * as import_24 from "../core/input_receiver";
import * as import_25 from "../core/loader";
import * as import_26 from "../core/logging";
import * as import_27 from "../core/lzstring";
import * as import_28 from "../core/modal_dialog_elements";
import * as import_29 from "../core/modal_dialog_forms";
import * as import_31 from "../core/query_parameters";
import * as import_32 from "../core/read_write_proxy";
import * as import_33 from "../core/rectangle";
import * as import_34 from "../core/request_channel";
import * as import_35 from "../core/restriction_manager";
import * as import_36 from "../core/rng";
import * as import_37 from "../core/sensitive_utils.encrypt";
import * as import_38 from "../core/signal";
import * as import_39 from "../core/singleton_factory";
import * as import_40 from "../core/sprites";
import * as import_41 from "../core/stale_area_detector";
import * as import_42 from "../core/state_manager";
import * as import_43 from "../core/textual_game_state";
import * as import_44 from "../core/tracked_state";
import * as import_45 from "../core/utils";
import * as import_46 from "../core/vector";
import * as import_47 from "../game/achievement_proxy";
import * as import_48 from "../game/automatic_save";
import * as import_49 from "../game/base_item";
import * as import_50 from "../game/belt_path";
import * as import_51 from "../game/blueprint";
import * as import_52 from "../game/building_codes";
import * as import_53 from "../game/buildings/analyzer";
import * as import_54 from "../game/buildings/balancer";
import * as import_55 from "../game/buildings/belt";
import * as import_56 from "../game/buildings/block";
import * as import_57 from "../game/buildings/comparator";
import * as import_58 from "../game/buildings/constant_producer";
import * as import_59 from "../game/buildings/constant_signal";
import * as import_60 from "../game/buildings/cutter";
import * as import_61 from "../game/buildings/display";
import * as import_62 from "../game/buildings/filter";
import * as import_63 from "../game/buildings/goal_acceptor";
import * as import_64 from "../game/buildings/hub";
import * as import_65 from "../game/buildings/item_producer";
import * as import_66 from "../game/buildings/lever";
import * as import_67 from "../game/buildings/logic_gate";
import * as import_68 from "../game/buildings/miner";
import * as import_69 from "../game/buildings/mixer";
import * as import_70 from "../game/buildings/painter";
import * as import_71 from "../game/buildings/reader";
import * as import_72 from "../game/buildings/rotater";
import * as import_73 from "../game/buildings/stacker";
import * as import_74 from "../game/buildings/storage";
import * as import_75 from "../game/buildings/transistor";
import * as import_76 from "../game/buildings/trash";
import * as import_77 from "../game/buildings/underground_belt";
import * as import_78 from "../game/buildings/virtual_processor";
import * as import_79 from "../game/buildings/wire_tunnel";
import * as import_80 from "../game/buildings/wire";
import * as import_81 from "../game/camera";
import * as import_82 from "../game/colors";
import * as import_83 from "../game/component_registry";
import * as import_84 from "../game/component";
import * as import_85 from "../game/components/belt_reader";
import * as import_86 from "../game/components/belt_underlays";
import * as import_87 from "../game/components/belt";
import * as import_88 from "../game/components/constant_signal";
import * as import_89 from "../game/components/display";
import * as import_90 from "../game/components/filter";
import * as import_91 from "../game/components/goal_acceptor";
import * as import_92 from "../game/components/hub";
import * as import_93 from "../game/components/item_acceptor";
import * as import_94 from "../game/components/item_ejector";
import * as import_95 from "../game/components/item_processor";
import * as import_96 from "../game/components/item_producer";
import * as import_97 from "../game/components/lever";
import * as import_98 from "../game/components/logic_gate";
import * as import_99 from "../game/components/miner";
import * as import_100 from "../game/components/static_map_entity";
import * as import_101 from "../game/components/storage";
import * as import_102 from "../game/components/underground_belt";
import * as import_103 from "../game/components/wire_tunnel";
import * as import_104 from "../game/components/wire";
import * as import_105 from "../game/components/wired_pins";
import * as import_106 from "../game/core";
import * as import_107 from "../game/dynamic_tickrate";
import * as import_108 from "../game/entity_components";
import * as import_109 from "../game/entity_manager";
import * as import_110 from "../game/entity";
import * as import_111 from "../game/game_loading_overlay";
import * as import_112 from "../game/game_mode_registry";
import * as import_113 from "../game/game_mode";
import * as import_114 from "../game/game_speed_registry";
import * as import_115 from "../game/game_system_manager";
import * as import_116 from "../game/game_system_with_filter";
import * as import_117 from "../game/game_system";
import * as import_118 from "../game/hints";
import * as import_119 from "../game/hub_goals";
import * as import_120 from "../game/hud/base_hud_part";
import * as import_121 from "../game/hud/dynamic_dom_attach";
import * as import_122 from "../game/hud/hud";
import * as import_123 from "../game/hud/parts/base_toolbar";
import * as import_124 from "../game/hud/parts/beta_overlay";
import * as import_125 from "../game/hud/parts/blueprint_placer";
import * as import_126 from "../game/hud/parts/building_placer_logic";
import * as import_127 from "../game/hud/parts/building_placer";
import * as import_128 from "../game/hud/parts/buildings_toolbar";
import * as import_129 from "../game/hud/parts/cat_memes";
import * as import_130 from "../game/hud/parts/color_blind_helper";
import * as import_131 from "../game/hud/parts/constant_signal_edit";
import * as import_132 from "../game/hud/parts/debug_changes";
import * as import_133 from "../game/hud/parts/debug_info";
import * as import_134 from "../game/hud/parts/entity_debugger";
import * as import_135 from "../game/hud/parts/game_menu";
import * as import_136 from "../game/hud/parts/HUDPuzzleNextPuzzle";
import * as import_137 from "../game/hud/parts/interactive_tutorial";
import * as import_138 from "../game/hud/parts/keybinding_overlay";
import * as import_139 from "../game/hud/parts/layer_preview";
import * as import_140 from "../game/hud/parts/lever_toggle";
import * as import_141 from "../game/hud/parts/mass_selector";
import * as import_142 from "../game/hud/parts/miner_highlight";
import * as import_143 from "../game/hud/parts/modal_dialogs";
import * as import_144 from "../game/hud/parts/notifications";
import * as import_145 from "../game/hud/parts/pinned_shapes";
import * as import_146 from "../game/hud/parts/puzzle_back_to_menu";
import * as import_147 from "../game/hud/parts/puzzle_complete_notification";
import * as import_148 from "../game/hud/parts/puzzle_dlc_logo";
import * as import_149 from "../game/hud/parts/puzzle_editor_controls";
import * as import_150 from "../game/hud/parts/puzzle_editor_review";
import * as import_151 from "../game/hud/parts/puzzle_editor_settings";
import * as import_152 from "../game/hud/parts/puzzle_play_metadata";
import * as import_153 from "../game/hud/parts/puzzle_play_settings";
import * as import_154 from "../game/hud/parts/sandbox_controller";
import * as import_155 from "../game/hud/parts/screenshot_exporter";
import * as import_156 from "../game/hud/parts/settings_menu";
import * as import_157 from "../game/hud/parts/shape_tooltip";
import * as import_158 from "../game/hud/parts/shape_viewer";
import * as import_159 from "../game/hud/parts/shop";
import * as import_160 from "../game/hud/parts/standalone_advantages";
import * as import_161 from "../game/hud/parts/statistics_handle";
import * as import_162 from "../game/hud/parts/statistics";
import * as import_163 from "../game/hud/parts/tutorial_hints";
import * as import_164 from "../game/hud/parts/tutorial_video_offer";
import * as import_165 from "../game/hud/parts/unlock_notification";
import * as import_166 from "../game/hud/parts/vignette_overlay";
import * as import_167 from "../game/hud/parts/watermark";
import * as import_168 from "../game/hud/parts/waypoints";
import * as import_169 from "../game/hud/parts/wire_info";
import * as import_170 from "../game/hud/parts/wires_overlay";
import * as import_171 from "../game/hud/parts/wires_toolbar";
import * as import_172 from "../game/hud/trailer_maker";
import * as import_173 from "../game/hud/trailer_points";
import * as import_174 from "../game/item_registry";
import * as import_175 from "../game/item_resolver";
import * as import_176 from "../game/items/boolean_item";
import * as import_177 from "../game/items/color_item";
import * as import_178 from "../game/items/shape_item";
import * as import_179 from "../game/key_action_mapper";
import * as import_180 from "../game/logic";
import * as import_181 from "../game/map_chunk_aggregate";
import * as import_182 from "../game/map_chunk_view";
import * as import_183 from "../game/map_chunk";
import * as import_184 from "../game/map_view";
import * as import_185 from "../game/map";
import * as import_186 from "../game/meta_building_registry";
import * as import_187 from "../game/meta_building";
import * as import_188 from "../game/modes/puzzle_edit";
import * as import_189 from "../game/modes/puzzle_play";
import * as import_190 from "../game/modes/puzzle";
import * as import_191 from "../game/modes/regular";
import * as import_192 from "../game/production_analytics";
import * as import_193 from "../game/root";
import * as import_194 from "../game/shape_definition_manager";
import * as import_195 from "../game/shape_definition";
import * as import_196 from "../game/sound_proxy";
import * as import_197 from "../game/systems/belt_reader";
import * as import_198 from "../game/systems/belt_underlays";
import * as import_199 from "../game/systems/belt";
import * as import_200 from "../game/systems/constant_producer";
import * as import_201 from "../game/systems/constant_signal";
import * as import_202 from "../game/systems/display";
import * as import_203 from "../game/systems/filter";
import * as import_204 from "../game/systems/goal_acceptor";
import * as import_205 from "../game/systems/hub";
import * as import_206 from "../game/systems/item_acceptor";
import * as import_207 from "../game/systems/item_ejector";
import * as import_208 from "../game/systems/item_processor_overlays";
import * as import_209 from "../game/systems/item_processor";
import * as import_210 from "../game/systems/item_producer";
import * as import_211 from "../game/systems/lever";
import * as import_212 from "../game/systems/logic_gate";
import * as import_213 from "../game/systems/map_resources";
import * as import_214 from "../game/systems/miner";
import * as import_215 from "../game/systems/static_map_entity";
import * as import_216 from "../game/systems/storage";
import * as import_217 from "../game/systems/underground_belt";
import * as import_218 from "../game/systems/wire";
import * as import_219 from "../game/systems/wired_pins";
import * as import_220 from "../game/systems/zone";
import * as import_221 from "../game/theme";
import * as import_222 from "../game/time/base_game_speed";
import * as import_223 from "../game/time/fast_forward_game_speed";
import * as import_224 from "../game/time/game_time";
import * as import_225 from "../game/time/paused_game_speed";
import * as import_226 from "../game/time/regular_game_speed";
import * as import_227 from "../game/tutorial_goals_mappings";
import * as import_228 from "../game/tutorial_goals";
import * as import_229 from "../languages";
import * as import_233 from "./mod";
import * as import_234 from "../platform/achievement_provider";
import * as import_235 from "../platform/ad_provider";
import * as import_236 from "../platform/ad_providers/adinplay";
import * as import_237 from "../platform/ad_providers/gamedistribution";
import * as import_238 from "../platform/ad_providers/no_ad_provider";
import * as import_239 from "../platform/analytics";
import * as import_240 from "../platform/api";
import * as import_241 from "../platform/browser/game_analytics";
import * as import_242 from "../platform/browser/google_analytics";
import * as import_243 from "../platform/browser/no_achievement_provider";
import * as import_244 from "../platform/browser/no_game_analytics";
import * as import_245 from "../platform/browser/sound";
import * as import_246 from "../platform/browser/storage_indexed_db";
import * as import_247 from "../platform/browser/storage";
import * as import_248 from "../platform/browser/wrapper";
import * as import_249 from "../platform/electron/steam_achievement_provider";
import * as import_250 from "../platform/electron/storage";
import * as import_251 from "../platform/electron/wrapper";
import * as import_252 from "../platform/game_analytics";
import * as import_253 from "../platform/sound";
import * as import_254 from "../platform/storage";
import * as import_255 from "../platform/wrapper";
import * as import_256 from "../profile/application_settings";
import * as import_257 from "../profile/setting_types";
import * as import_258 from "../savegame/puzzle_serializer";
import * as import_259 from "../savegame/savegame_compressor";
import * as import_260 from "../savegame/savegame_interface_registry";
import * as import_261 from "../savegame/savegame_interface";
import * as import_262 from "../savegame/savegame_manager";
import * as import_263 from "../savegame/savegame_serializer";
import * as import_264 from "../savegame/savegame_typedefs";
import * as import_265 from "../savegame/savegame";
import * as import_266 from "../savegame/schemas/1000";
import * as import_267 from "../savegame/schemas/1001";
import * as import_268 from "../savegame/schemas/1002";
import * as import_269 from "../savegame/schemas/1003";
import * as import_270 from "../savegame/schemas/1004";
import * as import_271 from "../savegame/schemas/1005";
import * as import_272 from "../savegame/schemas/1006";
import * as import_273 from "../savegame/schemas/1007";
import * as import_274 from "../savegame/schemas/1008";
import * as import_275 from "../savegame/schemas/1009";
import * as import_276 from "../savegame/schemas/1010";
import * as import_277 from "../savegame/serialization_data_types";
import * as import_278 from "../savegame/serialization";
import * as import_279 from "../savegame/serializer_internal";
import * as import_280 from "../states/about";
import * as import_281 from "../states/changelog";
import * as import_282 from "../states/ingame";
import * as import_283 from "../states/keybindings";
import * as import_284 from "../states/login";
import * as import_285 from "../states/main_menu";
import * as import_286 from "../states/mobile_warning";
import * as import_287 from "../states/preload";
import * as import_288 from "../states/puzzle_menu";
import * as import_289 from "../states/settings";
import * as import_290 from "../states/wegame_splash";
import * as import_291 from "../translations";

export const exports = {
    "application": import_0,
    "changelog": import_1,
    "core/animation_frame": import_2,
    "core/async_compression": import_4,
    "core/atlas_definitions": import_5,
    "core/background_resources_loader": import_6,
    "core/buffer_maintainer": import_7,
    "core/buffer_utils": import_8,
    "core/cachebust": import_9,
    "core/click_detector": import_10,
    "core/config": import_11,
    "core/config.local": import_12,
    "core/config.local.template": import_13,
    "core/dpi_manager": import_14,
    "core/draw_parameters": import_15,
    "core/draw_utils": import_16,
    "core/error_handler": import_17,
    "core/explained_result": import_18,
    "core/factory": import_19,
    "core/game_state": import_20,
    "core/global_registries": import_21,
    "core/globals": import_22,
    "core/input_distributor": import_23,
    "core/input_receiver": import_24,
    "core/loader": import_25,
    "core/logging": import_26,
    "core/lzstring": import_27,
    "core/modal_dialog_elements": import_28,
    "core/modal_dialog_forms": import_29,
    "core/query_parameters": import_31,
    "core/read_write_proxy": import_32,
    "core/rectangle": import_33,
    "core/request_channel": import_34,
    "core/restriction_manager": import_35,
    "core/rng": import_36,
    "core/sensitive_utils.encrypt": import_37,
    "core/signal": import_38,
    "core/singleton_factory": import_39,
    "core/sprites": import_40,
    "core/stale_area_detector": import_41,
    "core/state_manager": import_42,
    "core/textual_game_state": import_43,
    "core/tracked_state": import_44,
    "core/utils": import_45,
    "core/vector": import_46,
    "game/achievement_proxy": import_47,
    "game/automatic_save": import_48,
    "game/base_item": import_49,
    "game/belt_path": import_50,
    "game/blueprint": import_51,
    "game/building_codes": import_52,
    "game/buildings/analyzer": import_53,
    "game/buildings/balancer": import_54,
    "game/buildings/belt": import_55,
    "game/buildings/block": import_56,
    "game/buildings/comparator": import_57,
    "game/buildings/constant_producer": import_58,
    "game/buildings/constant_signal": import_59,
    "game/buildings/cutter": import_60,
    "game/buildings/display": import_61,
    "game/buildings/filter": import_62,
    "game/buildings/goal_acceptor": import_63,
    "game/buildings/hub": import_64,
    "game/buildings/item_producer": import_65,
    "game/buildings/lever": import_66,
    "game/buildings/logic_gate": import_67,
    "game/buildings/miner": import_68,
    "game/buildings/mixer": import_69,
    "game/buildings/painter": import_70,
    "game/buildings/reader": import_71,
    "game/buildings/rotater": import_72,
    "game/buildings/stacker": import_73,
    "game/buildings/storage": import_74,
    "game/buildings/transistor": import_75,
    "game/buildings/trash": import_76,
    "game/buildings/underground_belt": import_77,
    "game/buildings/virtual_processor": import_78,
    "game/buildings/wire_tunnel": import_79,
    "game/buildings/wire": import_80,
    "game/camera": import_81,
    "game/colors": import_82,
    "game/component_registry": import_83,
    "game/component": import_84,
    "game/components/belt_reader": import_85,
    "game/components/belt_underlays": import_86,
    "game/components/belt": import_87,
    "game/components/constant_signal": import_88,
    "game/components/display": import_89,
    "game/components/filter": import_90,
    "game/components/goal_acceptor": import_91,
    "game/components/hub": import_92,
    "game/components/item_acceptor": import_93,
    "game/components/item_ejector": import_94,
    "game/components/item_processor": import_95,
    "game/components/item_producer": import_96,
    "game/components/lever": import_97,
    "game/components/logic_gate": import_98,
    "game/components/miner": import_99,
    "game/components/static_map_entity": import_100,
    "game/components/storage": import_101,
    "game/components/underground_belt": import_102,
    "game/components/wire_tunnel": import_103,
    "game/components/wire": import_104,
    "game/components/wired_pins": import_105,
    "game/core": import_106,
    "game/dynamic_tickrate": import_107,
    "game/entity_components": import_108,
    "game/entity_manager": import_109,
    "game/entity": import_110,
    "game/game_loading_overlay": import_111,
    "game/game_mode_registry": import_112,
    "game/game_mode": import_113,
    "game/game_speed_registry": import_114,
    "game/game_system_manager": import_115,
    "game/game_system_with_filter": import_116,
    "game/game_system": import_117,
    "game/hints": import_118,
    "game/hub_goals": import_119,
    "game/hud/base_hud_part": import_120,
    "game/hud/dynamic_dom_attach": import_121,
    "game/hud/hud": import_122,
    "game/hud/parts/base_toolbar": import_123,
    "game/hud/parts/beta_overlay": import_124,
    "game/hud/parts/blueprint_placer": import_125,
    "game/hud/parts/building_placer_logic": import_126,
    "game/hud/parts/building_placer": import_127,
    "game/hud/parts/buildings_toolbar": import_128,
    "game/hud/parts/cat_memes": import_129,
    "game/hud/parts/color_blind_helper": import_130,
    "game/hud/parts/constant_signal_edit": import_131,
    "game/hud/parts/debug_changes": import_132,
    "game/hud/parts/debug_info": import_133,
    "game/hud/parts/entity_debugger": import_134,
    "game/hud/parts/game_menu": import_135,
    "game/hud/parts/HUDPuzzleNextPuzzle": import_136,
    "game/hud/parts/interactive_tutorial": import_137,
    "game/hud/parts/keybinding_overlay": import_138,
    "game/hud/parts/layer_preview": import_139,
    "game/hud/parts/lever_toggle": import_140,
    "game/hud/parts/mass_selector": import_141,
    "game/hud/parts/miner_highlight": import_142,
    "game/hud/parts/modal_dialogs": import_143,
    "game/hud/parts/notifications": import_144,
    "game/hud/parts/pinned_shapes": import_145,
    "game/hud/parts/puzzle_back_to_menu": import_146,
    "game/hud/parts/puzzle_complete_notification": import_147,
    "game/hud/parts/puzzle_dlc_logo": import_148,
    "game/hud/parts/puzzle_editor_controls": import_149,
    "game/hud/parts/puzzle_editor_review": import_150,
    "game/hud/parts/puzzle_editor_settings": import_151,
    "game/hud/parts/puzzle_play_metadata": import_152,
    "game/hud/parts/puzzle_play_settings": import_153,
    "game/hud/parts/sandbox_controller": import_154,
    "game/hud/parts/screenshot_exporter": import_155,
    "game/hud/parts/settings_menu": import_156,
    "game/hud/parts/shape_tooltip": import_157,
    "game/hud/parts/shape_viewer": import_158,
    "game/hud/parts/shop": import_159,
    "game/hud/parts/standalone_advantages": import_160,
    "game/hud/parts/statistics_handle": import_161,
    "game/hud/parts/statistics": import_162,
    "game/hud/parts/tutorial_hints": import_163,
    "game/hud/parts/tutorial_video_offer": import_164,
    "game/hud/parts/unlock_notification": import_165,
    "game/hud/parts/vignette_overlay": import_166,
    "game/hud/parts/watermark": import_167,
    "game/hud/parts/waypoints": import_168,
    "game/hud/parts/wire_info": import_169,
    "game/hud/parts/wires_overlay": import_170,
    "game/hud/parts/wires_toolbar": import_171,
    "game/hud/trailer_maker": import_172,
    "game/hud/trailer_points": import_173,
    "game/item_registry": import_174,
    "game/item_resolver": import_175,
    "game/items/boolean_item": import_176,
    "game/items/color_item": import_177,
    "game/items/shape_item": import_178,
    "game/key_action_mapper": import_179,
    "game/logic": import_180,
    "game/map_chunk_aggregate": import_181,
    "game/map_chunk_view": import_182,
    "game/map_chunk": import_183,
    "game/map_view": import_184,
    "game/map": import_185,
    "game/meta_building_registry": import_186,
    "game/meta_building": import_187,
    "game/modes/puzzle_edit": import_188,
    "game/modes/puzzle_play": import_189,
    "game/modes/puzzle": import_190,
    "game/modes/regular": import_191,
    "game/production_analytics": import_192,
    "game/root": import_193,
    "game/shape_definition_manager": import_194,
    "game/shape_definition": import_195,
    "game/sound_proxy": import_196,
    "game/systems/belt_reader": import_197,
    "game/systems/belt_underlays": import_198,
    "game/systems/belt": import_199,
    "game/systems/constant_producer": import_200,
    "game/systems/constant_signal": import_201,
    "game/systems/display": import_202,
    "game/systems/filter": import_203,
    "game/systems/goal_acceptor": import_204,
    "game/systems/hub": import_205,
    "game/systems/item_acceptor": import_206,
    "game/systems/item_ejector": import_207,
    "game/systems/item_processor_overlays": import_208,
    "game/systems/item_processor": import_209,
    "game/systems/item_producer": import_210,
    "game/systems/lever": import_211,
    "game/systems/logic_gate": import_212,
    "game/systems/map_resources": import_213,
    "game/systems/miner": import_214,
    "game/systems/static_map_entity": import_215,
    "game/systems/storage": import_216,
    "game/systems/underground_belt": import_217,
    "game/systems/wire": import_218,
    "game/systems/wired_pins": import_219,
    "game/systems/zone": import_220,
    "game/theme": import_221,
    "game/time/base_game_speed": import_222,
    "game/time/fast_forward_game_speed": import_223,
    "game/time/game_time": import_224,
    "game/time/paused_game_speed": import_225,
    "game/time/regular_game_speed": import_226,
    "game/tutorial_goals_mappings": import_227,
    "game/tutorial_goals": import_228,
    "languages": import_229,
    "modloader/mod": import_233,
    "platform/achievement_provider": import_234,
    "platform/ad_provider": import_235,
    "platform/ad_providers/adinplay": import_236,
    "platform/ad_providers/gamedistribution": import_237,
    "platform/ad_providers/no_ad_provider": import_238,
    "platform/analytics": import_239,
    "platform/api": import_240,
    "platform/browser/game_analytics": import_241,
    "platform/browser/google_analytics": import_242,
    "platform/browser/no_achievement_provider": import_243,
    "platform/browser/no_game_analytics": import_244,
    "platform/browser/sound": import_245,
    "platform/browser/storage_indexed_db": import_246,
    "platform/browser/storage": import_247,
    "platform/browser/wrapper": import_248,
    "platform/electron/steam_achievement_provider": import_249,
    "platform/electron/storage": import_250,
    "platform/electron/wrapper": import_251,
    "platform/game_analytics": import_252,
    "platform/sound": import_253,
    "platform/storage": import_254,
    "platform/wrapper": import_255,
    "profile/application_settings": import_256,
    "profile/setting_types": import_257,
    "savegame/puzzle_serializer": import_258,
    "savegame/savegame_compressor": import_259,
    "savegame/savegame_interface_registry": import_260,
    "savegame/savegame_interface": import_261,
    "savegame/savegame_manager": import_262,
    "savegame/savegame_serializer": import_263,
    "savegame/savegame_typedefs": import_264,
    "savegame/savegame": import_265,
    "savegame/schemas/1000": import_266,
    "savegame/schemas/1001": import_267,
    "savegame/schemas/1002": import_268,
    "savegame/schemas/1003": import_269,
    "savegame/schemas/1004": import_270,
    "savegame/schemas/1005": import_271,
    "savegame/schemas/1006": import_272,
    "savegame/schemas/1007": import_273,
    "savegame/schemas/1008": import_274,
    "savegame/schemas/1009": import_275,
    "savegame/schemas/1010": import_276,
    "savegame/serialization_data_types": import_277,
    "savegame/serialization": import_278,
    "savegame/serializer_internal": import_279,
    "states/about": import_280,
    "states/changelog": import_281,
    "states/ingame": import_282,
    "states/keybindings": import_283,
    "states/login": import_284,
    "states/main_menu": import_285,
    "states/mobile_warning": import_286,
    "states/preload": import_287,
    "states/puzzle_menu": import_288,
    "states/settings": import_289,
    "states/wegame_splash": import_290,
    "translations": import_291,
};

export function setExports() {
    Object.defineProperty(window, "shapez", {
        value: exports,
        writable: false,
        configurable: false,
    });
}
