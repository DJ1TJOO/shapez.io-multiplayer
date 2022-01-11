import arg from "arg";
import { upgradeShapez } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            "--shapez": String,
            "--shapez-repo": String,
            "-s": "--shapez",
            "-sr": "--shapez-repo",
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        shapez: args["--shapez"] || false,
        shapezRepo: args["--shapez-repo"] || false,
    };
}

export async function upgrade(args) {
    let options = parseArgumentsIntoOptions(args);

    const defaultShapez = "latest";
    const defaultShapezRepo = "https://github.com/DJ1TJOO/shapez.io/tree/modloader-try-again";

    options = {
        ...options,
        shapezRepo: options.shapezRepo || defaultShapezRepo,
        shapez: options.shapez || answers.shapez || defaultShapez,
    };

    await upgradeShapez(options);
}
