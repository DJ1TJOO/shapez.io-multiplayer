const fs = require("fs");
const path = require("path");
const glob = require("glob");

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
}

module.exports = {
    gulptasksMod,
};
