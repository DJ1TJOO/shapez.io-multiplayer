const path = require("path");

function gulptasksCSS($, gulp, folders) {
    function postcssAssetsPlugin() {
        return $.postcssAssets({
            loadPaths: [path.join(folders.src, "res")],
            basePath: folders.build,
            baseUrl: ".",
        });
    }

    // Postcss configuration
    function postcssPlugins(prod) {
        const plugins = [postcssAssetsPlugin()];
        if (prod) {
            plugins.unshift(
                $.postcssPresetEnv({
                    browsers: ["> 0.1%"],
                })
            );

            plugins.push(
                $.cssMqpacker({
                    sort: true,
                }),
                $.cssnano({
                    preset: [
                        "advanced",
                        {
                            cssDeclarationSorter: false,
                            discardUnused: true,
                            mergeIdents: false,
                            reduceIdents: true,
                            zindex: true,
                        },
                    ],
                }),
                $.postcssRoundSubpixels()
            );
        }
        return plugins;
    }

    function cssResourcesTask(isProd) {
        return gulp
            .src("../src/css/main.scss", { cwd: __dirname })
            .pipe($.plumber())
            .pipe($.dartSass.sync().on("error", $.dartSass.logError))
            .pipe(
                $.postcss([
                    $.postcssCriticalSplit({
                        blockTag: "@load-async",
                    }),
                ])
            )
            .pipe($.rename("async-resources.css"))
            .pipe($.postcss(postcssPlugins(isProd)))
            .pipe(gulp.dest(folders.build));
    }

    // Performs linting on css
    gulp.task("css.lint", () => {
        return gulp
            .src(["../src/css/**/*.scss"])
            .pipe($.sassLint({ configFile: ".sasslint.yml" }))
            .pipe($.sassLint.format())
            .pipe($.sassLint.failOnError());
    });

    // Builds the css resources
    gulp.task("css.resources.dev", () => {
        return cssResourcesTask(false);
    });

    // Builds the css resources in prod (=minified)
    gulp.task("css.resources.prod", () => {
        return cssResourcesTask(true);
    });

    function cssMainTask(isProd) {
        return gulp
            .src("../src/css/main.scss", { cwd: __dirname })
            .pipe($.plumber())
            .pipe($.dartSass.sync().on("error", $.dartSass.logError))
            .pipe(
                $.postcss([
                    $.postcssCriticalSplit({
                        blockTag: "@load-async",
                        output: "rest",
                    }),
                ])
            )
            .pipe($.postcss(postcssPlugins(isProd)))
            .pipe(gulp.dest(folders.build));
    }

    // Builds the css main
    gulp.task("css.main.dev", () => {
        return cssMainTask(false);
    });

    // Builds the css main in prod (=minified)
    gulp.task("css.main.prod", () => {
        return cssMainTask(true);
    });

    gulp.task("css.dev", gulp.parallel("css.main.dev", "css.resources.dev"));
    gulp.task("css.prod", gulp.parallel("css.main.prod", "css.resources.prod"));
}

module.exports = {
    gulptasksCSS,
};
