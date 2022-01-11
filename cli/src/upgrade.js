import arg from "arg";
import inquirer from "inquirer";
import { upgradeShapez } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            "--shapez": String,
            "--shapez-repo": String,
            "-s": "--shapez",
            "-r": "--shapez-repo",
            "--yes": Boolean,
            "-y": "--yes",
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        skipPrompts: args["--yes"] || false,
        shapez: args["--shapez"] || false,
        shapezRepo: args["--shapez-repo"] || false,
    };
}

async function promptForMissingOptions(options) {
    const defaultShapez = "latest";
    const defaultShapezRepo = "https://github.com/DJ1TJOO/shapez.io/tree/modloader-try-again";

    if (options.skipPrompts) {
        return {
            shapezRepo: options.shapezRepo || defaultShapezRepo,
            shapez: options.shapez || defaultShapez,
        };
    }

    const questions = [];
    if (!options.shapez) {
        questions.push({
            type: "confirm",
            name: "latestShapez",
            message: "Download latest shapez.io build?",
            default: true,
        });

        questions.push({
            name: "shapez",
            message: "Please input the shapez commit hash you want to use:",
            default: defaultShapez,
            when: answers => !answers.latestShapez,
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        shapezRepo: options.shapezRepo || defaultShapezRepo,
        shapez: options.shapez || answers.shapez || defaultShapez,
    };
}

export async function upgrade(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);

    await upgradeShapez(options);
}
