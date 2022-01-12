import arg from "arg";
import inquirer from "inquirer";
import { upgradeProject } from "./main";

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
    const defaultInstallShapez = true;

    if (options.skipPrompts) {
        return {
            shapezRepo: options.shapezRepo || defaultShapezRepo,
            shapez: options.shapez || defaultShapez,
            installShapez: options.shapez ? true : defaultInstallShapez,
        };
    }

    const questions = [];
    if (!options.shapez) {
        questions.push({
            type: "confirm",
            name: "installShapez",
            message: "Download shapez.io build?",
            default: defaultInstallShapez,
        });

        questions.push({
            name: "shapez",
            message: "Please input the shapez commit hash you want to use:",
            default: defaultShapez,
            when: answers => answers.installShapez,
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        shapezRepo: options.shapezRepo || defaultShapezRepo,
        shapez: options.shapez || answers.shapez,
        installShapez: options.shapez ? true : answers.installShapez,
    };
}

export async function upgrade(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);

    await upgradeProject(options);
}
