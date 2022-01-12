const fs = require("fs");
const path = require("path");
const glob = require("glob");
const exec = require("child_process").exec;

function getClosest(string, offset, regex) {
    let indices = [];

    let result;
    while ((result = regex.exec(string))) {
        indices.push(result);
    }

    return indices.reverse().find(x => x.index <= offset);
}

function gulptasksMod($, gulp, buildFolder, browserSync) {
    gulp.task("mod.exports", () => {
        const imports = [];
        const exports = [];

        const paths = glob.sync("../src/js/**/*.js");
        for (let i = 0; i < paths.length; i++) {
            const filePath = paths[i];

            const contents = fs.readFileSync(filePath, "utf8");

            // Only files with exports
            if (!contents.includes("export")) continue;

            // File paths
            const name = path.basename(filePath, ".js");
            if (name === "exports") continue;

            const exportPath = path
                .join(path.relative(path.join(__dirname, "..", "src", "js"), path.dirname(filePath)), name)
                .replace(/\\/g, "/");
            let importPath = path
                .join(
                    path.relative(
                        path.join(__dirname, "..", "src", "js", "modloader"),
                        path.dirname(filePath)
                    ),
                    name
                )
                .replace(/\\/g, "/");
            if (!importPath.startsWith("../")) importPath = "./" + importPath;

            imports.push(`import * as import_${i} from "${importPath}";`);
            exports.push(`"${exportPath}": import_${i},`);
        }

        fs.writeFileSync(
            "../src/js/modloader/exports.js",
            `${imports.join("\n")}

            export const exports = {
                ${exports.join("\n")}
            };

            Object.defineProperty(window, "shapez", {
                value: exports,
                writable: false,
                configurable: false,
            });
            `,
            {}
        );

        return gulp
            .src("../src/js/modloader/exports.js")
            .pipe(
                $.prettier({
                    editorconfig: true,
                })
            )
            .pipe(gulp.dest("../src/js/modloader/"));
    });

    gulp.task("mod.declarations", async cb => {
        exec(
            "yarn generateDefinitions",
            {
                cwd: "../",
            },
            (error, stdout, sterr) => {
                if (error) {
                    console.log(stdout);
                    console.log(sterr);
                    throw error;
                }

                const stream = gulp
                    .src("../types.d.ts")
                    .pipe($.replace(/declare module "modloader\/exports" {[^]*?}[^]*?}/gms, ""))
                    .pipe(
                        $.replace(
                            /declare module "([^]*?)"/gms,
                            (matched, moduleName) => `declare module "shapez/${moduleName}"`
                        )
                    )
                    .pipe(
                        $.replace(/import\("([^]*?)"\)/gms, (matched, moduleName, offset, string) => {
                            moduleName = moduleName.replace(".js", "");
                            if (moduleName.startsWith(".")) {
                                const closest = getClosest(string, offset, /declare module "([^]*?)"/gms);

                                const parent = path.dirname(
                                    closest["0"].replace('declare module "', "").replace('"', "")
                                );
                                const module = path.join(parent, moduleName).replace(/\\/g, "/");

                                return `import("${module}")`;
                            } else {
                                return `import("shapez/${moduleName}")`;
                            }
                        })
                    )
                    .pipe(
                        $.replace(
                            /import {([^]*?)} from "([^]*?)";/gms,
                            (matched, imports, moduleName) =>
                                `import {${imports}} from "shapez/${moduleName
                                    .replace(/\.\.\//gms, "")
                                    .replace(".js", "")}"`
                        )
                    )
                    .pipe($.replace(/var/gms, "let"))
                    .pipe($.replace(/declare (function|const|let)[^]*?;/gms, ""))
                    .pipe(
                        $.footer(`declare const CSS_MAIN: string;
                                  declare const CSS_RESOURCES: string;
                                  declare const ATLASES: {
                                        hq: {
                                            src: string;
                                            atlasData: import("shapez/core/loader").AtlasDefinition;
                                        };
                                        mq: {
                                            src: string;
                                            atlasData: import("shapez/core/loader").AtlasDefinition;
                                        };
                                        lq: {
                                            src: string;
                                            atlasData: import("shapez/core/loader").AtlasDefinition;
                                        };
                                    };`)
                    )
                    .pipe(
                        $.prettier({
                            editorconfig: true,
                        })
                    )
                    .pipe(gulp.dest("../build/"));
                stream.on("end", () => {
                    fs.unlinkSync("../types.d.ts");
                    cb();
                });
                stream.on("error", () => {
                    fs.unlinkSync("../types.d.ts");
                    cb();
                });
            }
        );
    });
}

module.exports = {
    gulptasksMod,
};
