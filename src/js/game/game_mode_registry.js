import { gGameModeRegistry } from "../core/global_registries";
import { PuzzleEditGameMode } from "./modes/puzzle_edit";
import { PuzzlePlayGameMode } from "./modes/puzzle_play";
import { RegularGameMode } from "./modes/regular";

export function addVanillaGameModesToAPI() {
    shapezAPI.ingame.gamemodes[RegularGameMode.getId()] = RegularGameMode;
    shapezAPI.ingame.gamemodes[PuzzleEditGameMode.getId()] = PuzzleEditGameMode;
    shapezAPI.ingame.gamemodes[PuzzlePlayGameMode.getId()] = PuzzlePlayGameMode;
}

export function initGameModeRegistry() {
    for (const gamemodeKey in shapezAPI.ingame.gamemodes) {
        if (!shapezAPI.ingame.gamemodes.hasOwnProperty(gamemodeKey)) continue;
        gGameModeRegistry.register(shapezAPI.ingame.gamemodes[gamemodeKey]);
    }
}
