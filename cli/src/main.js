import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import Listr from "listr";
import { projectInstall } from "pkg-install";
import { execSync } from "child_process";
import { Octokit } from "octokit";

const octokit = new Octokit();
const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false,
    });
}

async function updateTemplateFiles(options) {
    // Paths
    const targetDirectory = options.targetDirectory;
    const packagePath = path.join(targetDirectory, "package.json");
    const mainPath = path.join(targetDirectory, "src", "js", "main.js");

    // Read files
    let packageFile = fs.readFileSync(packagePath, {
        encoding: "utf-8",
    });
    let mainFile = fs.readFileSync(mainPath, {
        encoding: "utf-8",
    });

    // Update files
    packageFile = packageFile.replace(/mod_name/g, options.name);
    packageFile = packageFile.replace(/mod_version/g, options.version);
    packageFile = packageFile.replace(/mod_author/g, options.author);

    mainFile = mainFile.replace(/mod_name/g, options.name);
    mainFile = mainFile.replace(/mod_description/g, options.description);
    mainFile = mainFile.replace(/mod_version/g, options.version);
    mainFile = mainFile.replace(/mod_authors/g, `["${options.author}"]`);

    // Write files
    fs.writeFileSync(packagePath, packageFile);
    fs.writeFileSync(mainPath, mainFile);

    return;
}

async function downloadShapez(options, owner, repo, branch) {
    try {
        const lastCommit = await octokit.request(
            "GET https://api.github.com/repos/{owner}/{repo}/commits/{branch}",
            {
                owner,
                repo,
                branch,
            }
        );
        const commit = lastCommit.data.sha.substring(0, 7);

        const artifact = await octokit.request(
            "GET https://api.github.com/repos/{owner}/{repo}/actions/artifacts/{artifact_id}",
            {
                owner,
                repo,
                artifact_id: "shapezio-mod-build-" + commit,
            }
        );
        return;
    } catch (error) {
        return Promise.reject(new Error("Failed to download shapez.io build"));
    }
}

async function initGit(options) {
    try {
        execSync("git init", {
            cwd: options.targetDirectory,
        });
        return;
    } catch (error) {
        return Promise.reject(new Error("Failed to initialize git"));
    }
}

export async function createProject(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    };

    const templateDir = path.resolve(new URL(import.meta.url).pathname, "../template");
    options.templateDirectory = templateDir;

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error("%s Could not access template", chalk.red.bold("ERROR"));
        process.exit(1);
    }

    const tasks = new Listr([
        {
            title: "Copy project files",
            task: () => copyTemplateFiles(options),
        },
        {
            title: "Updating project files",
            task: () => updateTemplateFiles(options),
        },
        {
            title: "Downloading latest shapez.io build",
            task: () => downloadShapez(options),
        },
        {
            title: "Initialize git",
            task: () => initGit(options),
            enabled: () => options.git,
        },
        {
            title: "Install dependencies",
            task: () =>
                projectInstall({
                    prefer: options.packageManager,
                    cwd: options.targetDirectory,
                }),
            skip: () =>
                !options.runInstall ? "Pass --install to automatically install dependencies" : undefined,
        },
    ]);

    await tasks.run();
    console.log("%s Project ready", chalk.green.bold("DONE"));
    return true;
}
