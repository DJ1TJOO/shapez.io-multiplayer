import types from "flatted";
import "../core/assert";
import { AtlasDefinition, atlasFiles } from "../core/atlas_definitions";
import { BackgroundResourcesLoader } from "../core/background_resources_loader";
import {
    clearBufferBacklog,
    disableImageSmoothing,
    enableImageSmoothing,
    freeCanvas,
    getBufferStats,
    getBufferVramUsageBytes,
    makeOffscreenBuffer,
    registerCanvas,
} from "../core/buffer_utils";
import { cachebust } from "../core/cachebust";
import { ClickDetector, clickDetectorGlobals, MAX_MOVE_DISTANCE_PX } from "../core/click_detector";
import {
    A_B_TESTING_LINK_TYPE,
    globalConfig,
    IS_DEBUG,
    IS_MAC,
    IS_MOBILE,
    SUPPORT_TOUCH,
    THIRDPARTY_URLS,
} from "../core/config";
import {
    getDeviceDPI,
    prepareHighDPIContext,
    resizeCanvas,
    resizeCanvasAndClear,
    resizeHighDPICanvas,
    smoothenDpi,
} from "../core/dpi_manager";
import { DrawParameters } from "../core/draw_parameters";
import { drawRotatedSprite, drawSpriteClipped, initDrawUtils } from "../core/draw_utils";
import "../core/error_handler";
import { APPLICATION_ERROR_OCCURED } from "../core/error_handler";
import { ExplainedResult } from "../core/explained_result";
import { Factory } from "../core/factory";
import { GameState } from "../core/game_state";
import { GLOBAL_APP, setGlobalApp } from "../core/globals";
import {
    gBuildingsByCategory,
    gComponentRegistry,
    gGameModeRegistry,
    gGameSpeedRegistry,
    gItemRegistry,
    gMetaBuildingRegistry,
    initBuildingsByCategory,
} from "../core/global_registries";
import { InputDistributor } from "../core/input_distributor";
import { InputReceiver } from "../core/input_receiver";
import { Loader } from "../core/loader";
import {
    createLogger,
    globalDebug,
    globalError,
    globalLog,
    globalWarn,
    logSection,
    serializeError,
    stringifyObjectContainingErrors,
} from "../core/logging";
import {
    compressU8,
    compressU8WHeader,
    compressX64,
    decompressU8WHeader,
    decompressX64,
} from "../core/lzstring";
import { Dialog, DialogLoading, DialogOptionChooser, DialogWithForm } from "../core/modal_dialog_elements";
import {
    FormElement,
    FormElementCheckbox,
    FormElementInput,
    FormElementItemChooser,
} from "../core/modal_dialog_forms";
import "../core/polyfills";
import { queryParamOptions } from "../core/query_parameters";
import { ReadWriteProxy } from "../core/read_write_proxy";
import { Rectangle } from "../core/rectangle";
import { PROMISE_ABORTED, RequestChannel } from "../core/request_channel";
import { RestrictionManager } from "../core/restriction_manager";
import { RandomNumberGenerator } from "../core/rng";
import { computeCrc, CRC_PREFIX, getNameOfProvider, sha1 } from "../core/sensitive_utils.encrypt";
import { Signal, STOP_PROPAGATION } from "../core/signal";
import { SingletonFactory } from "../core/singleton_factory";
import {
    AtlasSprite,
    BaseSprite,
    FULL_CLIP_RECT,
    ORIGINAL_SPRITE_SCALE,
    RegularSprite,
    SpriteAtlasLink,
} from "../core/sprites";
import { StaleAreaDetector } from "../core/stale_area_detector";
import { StateManager } from "../core/state_manager";
import { TextualGameState } from "../core/textual_game_state";
import { TrackedState } from "../core/tracked_state";
import {
    accessNestedPropertyReverse,
    arrayDelete,
    arrayDeleteValue,
    clamp,
    epsilonCompare,
    fastArrayDelete,
    fastArrayDeleteValue,
    fastArrayDeleteValueIfContained,
    fillInLinkIntoTranslation,
    findNiceIntegerValue,
    findNiceValue,
    formatBigNumber,
    formatBigNumberFull,
    formatItemsPerSecond,
    formatSeconds,
    formatSecondsToTimeAgo,
    generateFileDownload,
    generateMatrixRotations,
    getIPCRenderer,
    getPlatformName,
    getRomanNumber,
    isAndroid,
    isIos,
    isSupportedBrowser,
    lerp,
    make2DUndefinedArray,
    makeButton,
    makeButtonElement,
    makeDiv,
    newEmptyMap,
    randomChoice,
    randomInt,
    removeAllChildren,
    rotateDirectionalObject,
    rotateFlatMatrix3x3,
    round1Digit,
    round1DigitLocalized,
    round2Digits,
    round3Digits,
    round4Digits,
    safeModulo,
    smoothPulse,
    startFileChoose,
    waitNextFrame,
} from "../core/utils";
import {
    arrayAllDirections,
    enumAngleToDirection,
    enumDirection,
    enumDirectionToAngle,
    enumDirectionToVector,
    enumInvertedDirections,
    mixVector,
    Vector,
} from "../core/vector";
import { AutomaticSave, enumSavePriority } from "../game/automatic_save";
import { BaseItem } from "../game/base_item";
import { BeltPath } from "../game/belt_path";
import { Blueprint } from "../game/blueprint";
import {
    gBuildingVariants,
    getBuildingDataFromCode,
    getCodeFromBuildingData,
    registerBuildingVariant,
} from "../game/building_codes";
import {
    Camera,
    enumMouseButton,
    USER_INTERACT_MOVE,
    USER_INTERACT_TOUCHEND,
    USER_INTERACT_ZOOM,
} from "../game/camera";
import {
    enumColorMixingResults,
    enumColors,
    enumColorsToHexCode,
    enumColorToShortcode,
} from "../game/colors";
import { Component } from "../game/component";
import { BeltComponent } from "../game/components/belt";
import { BeltReaderComponent } from "../game/components/belt_reader";
import { BeltUnderlaysComponent, enumClippedBeltUnderlayType } from "../game/components/belt_underlays";
import { ConstantSignalComponent } from "../game/components/constant_signal";
import { DisplayComponent } from "../game/components/display";
import { FilterComponent } from "../game/components/filter";
import { HubComponent } from "../game/components/hub";
import { ItemAcceptorComponent } from "../game/components/item_acceptor";
import { ItemEjectorComponent } from "../game/components/item_ejector";
import {
    enumItemProcessorRequirements,
    enumItemProcessorTypes,
    ItemProcessorComponent,
} from "../game/components/item_processor";
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
import { GameCore } from "../game/core";
import { DynamicTickrate } from "../game/dynamic_tickrate";
import { Entity } from "../game/entity";
import { EntityManager } from "../game/entity_manager";
import { GameLoadingOverlay } from "../game/game_loading_overlay";
import { GameMode } from "../game/game_mode";
import { GameSystem } from "../game/game_system";
import { GameSystemManager } from "../game/game_system_manager";
import { GameSystemWithFilter } from "../game/game_system_with_filter";
import { getRandomHint } from "../game/hints";
import { HubGoals } from "../game/hub_goals";
import { BaseHUDPart } from "../game/hud/base_hud_part";
import { GameHUD } from "../game/hud/hud";
import { HUDBaseToolbar } from "../game/hud/parts/base_toolbar";
import { HUDBetaOverlay } from "../game/hud/parts/beta_overlay";
import { HUDBlueprintPlacer } from "../game/hud/parts/blueprint_placer";
import { HUDBuildingPlacer } from "../game/hud/parts/building_placer";
import { HUDBuildingPlacerLogic } from "../game/hud/parts/building_placer_logic";
import { HUDCatMemes } from "../game/hud/parts/cat_memes";
import { HUDColorBlindHelper } from "../game/hud/parts/color_blind_helper";
import { HUDConstantSignalEdit } from "../game/hud/parts/constant_signal_edit";
import { HUDChangesDebugger } from "../game/hud/parts/debug_changes";
import { HUDDebugInfo } from "../game/hud/parts/debug_info";
import { HUDEntityDebugger } from "../game/hud/parts/entity_debugger";
import { HUDGameMenu } from "../game/hud/parts/game_menu";
import { HUDInteractiveTutorial } from "../game/hud/parts/interactive_tutorial";
import { HUDKeybindingOverlay } from "../game/hud/parts/keybinding_overlay";
import { HUDLayerPreview } from "../game/hud/parts/layer_preview";
import { HUDLeverToggle } from "../game/hud/parts/lever_toggle";
import { HUDMassSelector } from "../game/hud/parts/mass_selector";
import { HUDMinerHighlight } from "../game/hud/parts/miner_highlight";
import { HUDModalDialogs } from "../game/hud/parts/modal_dialogs";
import { enumNotificationType, HUDNotifications } from "../game/hud/parts/notifications";
import { HUDPinnedShapes } from "../game/hud/parts/pinned_shapes";
import { HUDSandboxController } from "../game/hud/parts/sandbox_controller";
import { HUDScreenshotExporter } from "../game/hud/parts/screenshot_exporter";
import { HUDSettingsMenu } from "../game/hud/parts/settings_menu";
import { HUDShapeViewer } from "../game/hud/parts/shape_viewer";
import { HUDShop } from "../game/hud/parts/shop";
import { HUDStandaloneAdvantages } from "../game/hud/parts/standalone_advantages";
import { HUDStatistics } from "../game/hud/parts/statistics";
import { enumDisplayMode, HUDShapeStatisticsHandle } from "../game/hud/parts/statistics_handle";
import { HUDPartTutorialHints } from "../game/hud/parts/tutorial_hints";
import { HUDTutorialVideoOffer } from "../game/hud/parts/tutorial_video_offer";
import { HUDUnlockNotification } from "../game/hud/parts/unlock_notification";
import { HUDVignetteOverlay } from "../game/hud/parts/vignette_overlay";
import { HUDWatermark } from "../game/hud/parts/watermark";
import { HUDWaypoints } from "../game/hud/parts/waypoints";
import { HUDWiresOverlay } from "../game/hud/parts/wires_overlay";
import { HUDWireInfo } from "../game/hud/parts/wire_info";
import { BooleanItem, BOOL_FALSE_SINGLETON, BOOL_TRUE_SINGLETON } from "../game/items/boolean_item";
import { ColorItem } from "../game/items/color_item";
import { ShapeItem } from "../game/items/shape_item";
import { itemResolverSingleton, typeItemSingleton } from "../game/item_resolver";
import { KeyActionMapper, Keybinding } from "../game/key_action_mapper";
import { GameLogic } from "../game/logic";
import { BaseMap } from "../game/map";
import { MapChunkView } from "../game/map_chunk_view";
import { MapView } from "../game/map_view";
import { defaultBuildingVariant, MetaBuilding } from "../game/meta_building";
import { RegularGameMode } from "../game/modes/regular";
import { enumAnalyticsDataSource, ProductionAnalytics } from "../game/production_analytics";
import { GameRoot } from "../game/root";
import {
    createSimpleShape,
    enumShortcodeToSubShape,
    enumSubShape,
    enumSubShapeToShortcode,
    ShapeDefinition,
} from "../game/shape_definition";
import { ShapeDefinitionManager } from "../game/shape_definition_manager";
import { SoundProxy } from "../game/sound_proxy";
import { BeltSystem } from "../game/systems/belt";
import { BeltReaderSystem } from "../game/systems/belt_reader";
import { BeltUnderlaysSystem } from "../game/systems/belt_underlays";
import { ConstantSignalSystem } from "../game/systems/constant_signal";
import { DisplaySystem } from "../game/systems/display";
import { FilterSystem } from "../game/systems/filter";
import { HubSystem } from "../game/systems/hub";
import { ItemAcceptorSystem } from "../game/systems/item_acceptor";
import { ItemEjectorSystem } from "../game/systems/item_ejector";
import { ItemProcessorSystem } from "../game/systems/item_processor";
import { ItemProcessorOverlaysSystem } from "../game/systems/item_processor_overlays";
import { ItemProducerSystem } from "../game/systems/item_producer";
import { LeverSystem } from "../game/systems/lever";
import { LogicGateSystem } from "../game/systems/logic_gate";
import { MinerSystem } from "../game/systems/miner";
import { StaticMapEntitySystem } from "../game/systems/static_map_entity";
import { StorageSystem } from "../game/systems/storage";
import { UndergroundBeltSystem } from "../game/systems/underground_belt";
import { WireSystem } from "../game/systems/wire";
import { WiredPinsSystem } from "../game/systems/wired_pins";
import { applyGameTheme, THEME } from "../game/theme";
import { BaseGameSpeed } from "../game/time/base_game_speed";
import { FastForwardGameSpeed } from "../game/time/fast_forward_game_speed";
import { PausedGameSpeed } from "../game/time/paused_game_speed";
import { RegularGameSpeed } from "../game/time/regular_game_speed";
import { enumHubGoalRewards } from "../game/tutorial_goals";
import { enumHubGoalRewardsToContentUnlocked } from "../game/tutorial_goals_mappings";
import { AdProviderInterface } from "../platform/ad_provider";
import { AdinplayAdProvider } from "../platform/ad_providers/adinplay";
import { GamedistributionAdProvider } from "../platform/ad_providers/gamedistribution";
import { NoAdProvider } from "../platform/ad_providers/no_ad_provider";
import { AnalyticsInterface } from "../platform/analytics";
import { ShapezGameAnalytics } from "../platform/browser/game_analytics";
import { GoogleAnalyticsImpl } from "../platform/browser/google_analytics";
import { NoGameAnalytics } from "../platform/browser/no_game_analytics";
import { SoundImplBrowser } from "../platform/browser/sound";
import { StorageImplBrowser } from "../platform/browser/storage";
import { StorageImplBrowserIndexedDB } from "../platform/browser/storage_indexed_db";
import { PlatformWrapperImplBrowser } from "../platform/browser/wrapper";
import { StorageImplElectron } from "../platform/electron/storage";
import { PlatformWrapperImplElectron } from "../platform/electron/wrapper";
import { GameAnalyticsInterface } from "../platform/game_analytics";
import {
    MUSIC,
    MusicInstanceInterface,
    SoundInstanceInterface,
    SoundInterface,
    SOUNDS,
} from "../platform/sound";
import { StorageInterface } from "../platform/storage";
import { PlatformWrapperInterface } from "../platform/wrapper";
import {
    allApplicationSettings,
    ApplicationSettings,
    autosaveIntervals,
    enumCategories,
    getApplicationSettingById,
    movementSpeeds,
    scrollWheelSensitivities,
    uiScales,
} from "../profile/application_settings";
import { BaseSetting, BoolSetting, EnumSetting, RangeSetting } from "../profile/setting_types";
import { Savegame } from "../savegame/savegame";
import { compressObject, decompressObject } from "../savegame/savegame_compressor";
import { BaseSavegameInterface } from "../savegame/savegame_interface";
import { getSavegameInterface, savegameInterfaces } from "../savegame/savegame_interface_registry";
import { enumLocalSavegameStatus, SavegameManager } from "../savegame/savegame_manager";
import { SavegameSerializer } from "../savegame/savegame_serializer";
import { SavegameInterface_V1000 } from "../savegame/schemas/1000";
import { SavegameInterface_V1001 } from "../savegame/schemas/1001";
import { SavegameInterface_V1002 } from "../savegame/schemas/1002";
import { SavegameInterface_V1003 } from "../savegame/schemas/1003";
import { SavegameInterface_V1004 } from "../savegame/schemas/1004";
import { SavegameInterface_V1005 } from "../savegame/schemas/1005";
import { SavegameInterface_V1006 } from "../savegame/schemas/1006";
import { SavegameInterface_V1007 } from "../savegame/schemas/1007";
import { SavegameInterface_V1008 } from "../savegame/schemas/1008";
import { SavegameInterface_V1009 } from "../savegame/schemas/1009";
import { SavegameInterface_V1010 } from "../savegame/schemas/1010";
import {
    BasicSerializableObject,
    deserializeSchema,
    extendSchema,
    serializeSchema,
    verifySchema,
} from "../savegame/serialization";
import {
    BaseDataType,
    schemaToJsonSchema,
    TypeArray,
    TypeBoolean,
    TypeClass,
    TypeClassData,
    TypeClassFromMetaclass,
    TypeClassId,
    TypeEntity,
    TypeEntityWeakref,
    TypeEnum,
    TypeFixedClass,
    TypeInteger,
    TypeKeyValueMap,
    TypeMetaClass,
    TypeNullable,
    TypeNumber,
    TypePair,
    TypePositiveInteger,
    TypePositiveNumber,
    TypeString,
    TypeStructuredObject,
    TypeTileVector,
    TypeVector,
} from "../savegame/serialization_data_types";
import { SerializerInternal } from "../savegame/serializer_internal";
import { AboutState } from "../states/about";
import { ChangelogState } from "../states/changelog";
import { InGameState } from "../states/ingame";
import { KeybindingsState } from "../states/keybindings";
import { MainMenuState } from "../states/main_menu";
import { MobileWarningState } from "../states/mobile_warning";
import { PreloadState } from "../states/preload";
import { SettingsState } from "../states/settings";
import { Mod } from "./mod";

export const exports = {
    //Core
    AtlasDefinition,
    BackgroundResourcesLoader,
    ClickDetector,
    DrawParameters,
    ExplainedResult,
    Factory,
    InputDistributor,
    InputReceiver,
    Dialog,
    DialogOptionChooser,
    DialogLoading,
    DialogWithForm,
    FormElement,
    FormElementInput,
    FormElementCheckbox,
    FormElementItemChooser,
    ReadWriteProxy,
    Rectangle,
    RequestChannel,
    RestrictionManager,
    RandomNumberGenerator,
    Signal,
    SingletonFactory,
    BaseSprite,
    SpriteAtlasLink,
    AtlasSprite,
    RegularSprite,
    StaleAreaDetector,
    StateManager,
    TextualGameState,
    TrackedState,
    Vector,
    GameState,
    enableImageSmoothing,
    disableImageSmoothing,
    getBufferVramUsageBytes,
    getBufferStats,
    clearBufferBacklog,
    makeOffscreenBuffer,
    registerCanvas,
    freeCanvas,
    getDeviceDPI,
    smoothenDpi,
    prepareHighDPIContext,
    resizeHighDPICanvas,
    resizeCanvas,
    resizeCanvasAndClear,
    initDrawUtils,
    drawRotatedSprite,
    drawSpriteClipped,
    initBuildingsByCategory,
    setGlobalApp,
    createLogger,
    serializeError,
    stringifyObjectContainingErrors,
    globalDebug,
    globalLog,
    globalWarn,
    globalError,
    logSection,
    compressU8,
    compressU8WHeader,
    decompressU8WHeader,
    compressX64,
    decompressX64,
    sha1,
    getNameOfProvider,
    computeCrc,
    isAndroid,
    isIos,
    getPlatformName,
    getIPCRenderer,
    make2DUndefinedArray,
    newEmptyMap,
    randomInt,
    accessNestedPropertyReverse,
    randomChoice,
    fastArrayDelete,
    fastArrayDeleteValue,
    fastArrayDeleteValueIfContained,
    arrayDelete,
    arrayDeleteValue,
    epsilonCompare,
    lerp,
    findNiceValue,
    findNiceIntegerValue,
    formatBigNumber,
    formatBigNumberFull,
    waitNextFrame,
    round1Digit,
    round2Digits,
    round3Digits,
    round4Digits,
    clamp,
    makeDiv,
    makeButtonElement,
    makeButton,
    removeAllChildren,
    isSupportedBrowser,
    formatSecondsToTimeAgo,
    formatSeconds,
    round1DigitLocalized,
    formatItemsPerSecond,
    rotateFlatMatrix3x3,
    generateMatrixRotations,
    rotateDirectionalObject,
    safeModulo,
    smoothPulse,
    fillInLinkIntoTranslation,
    generateFileDownload,
    startFileChoose,
    getRomanNumber,
    mixVector,
    queryParamOptions,
    PROMISE_ABORTED,
    CRC_PREFIX,
    ORIGINAL_SPRITE_SCALE,
    FULL_CLIP_RECT,
    enumDirection,
    enumInvertedDirections,
    enumDirectionToAngle,
    enumAngleToDirection,
    arrayAllDirections,
    enumDirectionToVector,
    atlasFiles,
    MAX_MOVE_DISTANCE_PX,
    clickDetectorGlobals,
    IS_DEBUG,
    SUPPORT_TOUCH,
    IS_MAC,
    THIRDPARTY_URLS,
    A_B_TESTING_LINK_TYPE,
    globalConfig,
    IS_MOBILE,
    APPLICATION_ERROR_OCCURED,
    gMetaBuildingRegistry,
    gBuildingsByCategory,
    gComponentRegistry,
    gGameModeRegistry,
    gGameSpeedRegistry,
    gItemRegistry,
    GLOBAL_APP,
    Loader,
    G_TRACKING_ENDPOINT: G_TRACKING_ENDPOINT,
    G_IS_STANDALONE: G_IS_STANDALONE,
    G_IS_RELEASE: G_IS_RELEASE,
    G_IS_MOBILE_APP: G_IS_MOBILE_APP,
    G_IS_DEV: G_IS_DEV,
    G_IS_BROWSER: G_IS_BROWSER,
    G_HAVE_ASSERT: G_HAVE_ASSERT,
    G_BUILD_VERSION: G_BUILD_VERSION,
    G_BUILD_TIME: G_BUILD_TIME,
    G_BUILD_COMMIT_HASH: G_BUILD_COMMIT_HASH,
    G_APP_ENVIRONMENT: G_APP_ENVIRONMENT,
    G_ALL_UI_IMAGES: G_ALL_UI_IMAGES,

    //Platform
    AdinplayAdProvider,
    GamedistributionAdProvider,
    NoAdProvider,
    AdProviderInterface,
    ShapezGameAnalytics,
    GoogleAnalyticsImpl,
    NoGameAnalytics,
    SoundImplBrowser,
    StorageImplBrowserIndexedDB,
    StorageImplBrowser,
    PlatformWrapperImplBrowser,
    StorageImplElectron,
    PlatformWrapperImplElectron,
    AnalyticsInterface,
    GameAnalyticsInterface,
    SoundInstanceInterface,
    MusicInstanceInterface,
    SoundInterface,
    StorageInterface,
    PlatformWrapperInterface,
    MUSIC,

    //Profiles
    ApplicationSettings,
    allApplicationSettings,
    getApplicationSettingById,
    uiScales,
    scrollWheelSensitivities,
    movementSpeeds,
    autosaveIntervals,

    //Savegame
    BaseSavegameInterface,
    SavegameInterface_V1000,
    SavegameInterface_V1001,
    SavegameInterface_V1002,
    SavegameInterface_V1003,
    SavegameInterface_V1004,
    SavegameInterface_V1005,
    SavegameInterface_V1006,
    SavegameInterface_V1007,
    SavegameInterface_V1008,
    SavegameInterface_V1009,
    SavegameInterface_V1010,
    SerializerInternal,
    SavegameManager,
    SavegameSerializer,
    Savegame,
    BaseDataType,
    TypeInteger,
    TypeBoolean,
    TypePositiveInteger,
    TypeString,
    TypeVector,
    TypeTileVector,
    TypeNumber,
    TypePositiveNumber,
    TypeEnum,
    TypeEntity,
    TypeEntityWeakref,
    TypeClass,
    TypeClassData,
    TypeClassFromMetaclass,
    TypeMetaClass,
    TypeArray,
    TypeFixedClass,
    TypeKeyValueMap,
    TypeClassId,
    TypePair,
    TypeNullable,
    TypeStructuredObject,
    BasicSerializableObject,
    getSavegameInterface,
    compressObject,
    decompressObject,
    schemaToJsonSchema,
    serializeSchema,
    deserializeSchema,
    verifySchema,
    extendSchema,
    savegameInterfaces,

    //Game
    AutomaticSave,
    BeltPath,
    Blueprint,
    Camera,
    GameCore,
    DynamicTickrate,
    EntityManager,
    Entity,
    GameLoadingOverlay,
    GameSystemManager,
    Keybinding,
    KeyActionMapper,
    GameLogic,
    MapChunkView,
    MapView,
    BaseMap,
    ProductionAnalytics,
    GameRoot,
    ShapeDefinitionManager,
    ShapeDefinition,
    SoundProxy,
    itemResolverSingleton,
    createSimpleShape,
    applyGameTheme,
    getRandomHint,
    registerBuildingVariant,
    getBuildingDataFromCode,
    getCodeFromBuildingData,
    typeItemSingleton,
    gBuildingVariants,
    USER_INTERACT_MOVE,
    USER_INTERACT_ZOOM,
    USER_INTERACT_TOUCHEND,
    enumShortcodeToSubShape,
    enumSubShapeToShortcode,
    enumSubShape,
    THEME,

    MetaBuilding,
    Component,
    BaseItem,
    BaseGameSpeed,
    GameSystemWithFilter,
    GameSystem,
    GameMode,
    HUDBaseToolbar,
    BaseHUDPart,
    GameHUD,

    //HUD
    HUDSettingsMenu,
    HUDBetaOverlay,
    HUDBlueprintPlacer,
    HUDBuildingPlacer,
    HUDBuildingPlacerLogic,
    HUDCatMemes,
    HUDChangesDebugger,
    HUDColorBlindHelper,
    HUDConstantSignalEdit,
    HUDDebugInfo,
    HUDEntityDebugger,
    HUDGameMenu,
    HUDInteractiveTutorial,
    HUDKeybindingOverlay,
    HUDLayerPreview,
    HUDLeverToggle,
    HUDMassSelector,
    HUDMinerHighlight,
    HUDModalDialogs,
    HUDNotifications,
    HUDPartTutorialHints,
    HUDPinnedShapes,
    HUDSandboxController,
    HUDScreenshotExporter,
    HUDShapeStatisticsHandle,
    HUDShapeViewer,
    HUDShop,
    HUDStandaloneAdvantages,
    HUDStatistics,
    HUDTutorialVideoOffer,
    HUDUnlockNotification,
    HUDVignetteOverlay,
    HUDWatermark,
    HUDWaypoints,
    HUDWireInfo,
    HUDWiresOverlay,

    //Settings
    EnumSetting,
    BoolSetting,
    RangeSetting,
    BaseSetting,

    //Functions,
    cachebust,

    //Variables
    defaultBuildingVariant,
    types,
    STOP_PROPAGATION,
    SOUNDS,
    BOOL_TRUE_SINGLETON,
    BOOL_FALSE_SINGLETON,

    //Gamemodes
    RegularGameMode,

    //Gamespeed
    PausedGameSpeed,
    FastForwardGameSpeed,
    RegularGameSpeed,

    //Items
    ShapeItem,
    BooleanItem,
    ColorItem,

    //States
    InGameState,
    SettingsState,
    AboutState,
    MainMenuState,
    ChangelogState,
    KeybindingsState,
    PreloadState,
    MobileWarningState,

    //Hub goals
    HubGoals,

    //Systems
    ItemAcceptorSystem,
    BeltSystem,
    UndergroundBeltSystem,
    MinerSystem,
    StorageSystem,
    ItemProcessorSystem,
    FilterSystem,
    ItemProducerSystem,
    ItemEjectorSystem,
    HubSystem,
    StaticMapEntitySystem,
    WiredPinsSystem,
    BeltUnderlaysSystem,
    ConstantSignalSystem,
    LeverSystem,
    WireSystem,
    LogicGateSystem,
    BeltReaderSystem,
    DisplaySystem,
    ItemProcessorOverlaysSystem,

    //Components
    BeltReaderComponent,
    BeltUnderlaysComponent,
    BeltComponent,
    ConstantSignalComponent,
    DisplayComponent,
    FilterComponent,
    HubComponent,
    ItemAcceptorComponent,
    ItemEjectorComponent,
    ItemProcessorComponent,
    ItemProducerComponent,
    LeverComponent,
    LogicGateComponent,
    MinerComponent,
    StaticMapEntityComponent,
    StorageComponent,
    UndergroundBeltComponent,
    WireTunnelComponent,
    WireComponent,
    WiredPinsComponent,

    //Enums
    enumHubGoalRewards,
    enumAnalyticsDataSource,
    enumCategories,
    enumClippedBeltUnderlayType,
    enumColorMixingResults,
    enumColors,
    enumColorsToHexCode,
    enumColorToShortcode,
    enumDisplayMode,
    enumHubGoalRewardsToContentUnlocked,
    enumItemProcessorRequirements,
    enumItemProcessorTypes,
    enumLocalSavegameStatus,
    enumMouseButton,
    enumNotificationType,
    enumSavePriority,

    // Modloader
    Mod,
};
