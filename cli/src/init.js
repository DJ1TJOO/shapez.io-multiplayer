import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            "--git": Boolean,
            "--install": Boolean,
            "--shapez": String,
            "--shapez-repo": String,
            "--yes": Boolean,
            "-g": "--git",
            "-i": "--install",
            "-s": "--shapez",
            "-r": "--shapez-repo",
            "-y": "--yes",
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        skipPrompts: args["--yes"] || false,
        git: args["--git"] || false,
        shapez: args["--shapez"] || false,
        shapezRepo: args["--shapez-repo"] || false,
        runInstall: args["--install"] || false,
    };
}

async function promptForMissingOptions(options) {
    const defaultName = "shapezio-mod";
    const defaultModId = "mod";
    const defaultDescription = "";
    const defaultAuthor = "";
    const defaultVesion = "1.0.0";
    const defaultPackageManager = "yarn";
    const defaultShapez = "latest";
    const defaultShapezRepo = "https://github.com/DJ1TJOO/shapez.io/tree/modloader-try-again";

    if (options.skipPrompts) {
        return {
            ...options,
            shapezRepo: options.shapezRepo || defaultShapezRepo,
            shapez: options.shapez || defaultShapez,
            name: defaultName,
            modId: defaultModId,
            description: defaultDescription,
            author: defaultAuthor,
            version: defaultVesion,
            packageManager: defaultPackageManager,
        };
    }

    const questions = [];
    questions.push({
        name: "name",
        message: "Name:",
        default: defaultName,
    });

    questions.push({
        name: "modId",
        message: "Mod id:",
        default: defaultModId,
    });

    questions.push({
        name: "description",
        message: "Description:",
        default: defaultDescription,
    });

    questions.push({
        name: "author",
        message: "Author:",
        default: defaultAuthor,
    });

    questions.push({
        name: "version",
        message: "Version:",
        default: defaultVesion,
    });

    questions.push({
        type: "list",
        name: "packageManager",
        message: "Choose which package manager you want to use:",
        choices: ["yarn", "npm"],
        default: defaultPackageManager,
    });

    if (!options.git) {
        questions.push({
            type: "confirm",
            name: "git",
            message: "Initialize a git repository?",
            default: true,
        });
    }

    if (!options.install) {
        questions.push({
            type: "confirm",
            name: "runInstall",
            message: "Install all modules?",
            default: true,
        });
    }

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
        ...options,
        shapezRepo: options.shapezRepo || defaultShapezRepo,
        shapez: options.shapez || answers.shapez || defaultShapez,
        runInstall: options.runInstall || answers.runInstall,
        git: options.git || answers.git,
        name: options.name || answers.name,
        modId: options.modId || answers.modId,
        description: options.description || answers.description,
        author: options.author || answers.author,
        version: options.version || answers.version,
        packageManager: options.packageManager || answers.packageManager,
    };
}

export async function init(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await createProject(options);
}
