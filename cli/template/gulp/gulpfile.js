const exec = require("child_process").exec;
const path = require("path");
const browserSync = require("browser-sync").create({});
const gulp = require("gulp");
const fs = require("fs");
const log = require("fancy-log");
const argv = require("yargs").argv;

function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

// TODO:css, atlas and images

// Load other plugins dynamically
const $ = require("gulp-load-plugins")({
    scope: ["devDependencies"],
    pattern: "*",
});

const baseDir = path.join(__dirname, "..");
const srcFolder = path.join(baseDir, "src");
const buildFolder = path.join(baseDir, "build");
const shapezBuildFolder = path.join(baseDir, "shapez");

// Folders
if (!fs.existsSync(buildFolder)) {
    fs.mkdirSync(buildFolder);
}

// Utils
// Cleans up everything
gulp.task("utils.cleanBuildFolder", () => {
    return gulp.src(buildFolder, { read: false, allowEmpty: true }).pipe($.clean({ force: true }));
});

gulp.task("utils.cleanShapezBuildFolder", () => {
    return gulp.src(shapezBuildFolder, { read: false, allowEmpty: true }).pipe($.clean({ force: true }));
});

gulp.task("utils.cleanup", gulp.series("utils.cleanBuildFolder", "utils.cleanShapezBuildFolder"));

// Serve
gulp.task("main.serve.shapez", function (cb) {
    browserSync.init({
        server: shapezBuildFolder,
        port: 3005,
        ghostMode: {
            clicks: false,
            scroll: false,
            location: false,
            forms: false,
        },
        logLevel: "info",
        logPrefix: "BS",
        online: false,
        xip: false,
        notify: false,
        reloadDebounce: 100,
        reloadOnRestart: true,
        watchEvents: ["add", "change"],
    });

    return cb();
});

gulp.task("main.serve.shapez.reload", function (cb) {
    browserSync.reload();
    return cb();
});

gulp.task("main.serve.mod", function (cb) {
    gulp.src(buildFolder).pipe(
        $.webserver({
            livereload: {
                enable: true,
            },
            middleware: [
                (req, res, next) => {
                    res.setHeader("Access-Control-Allow-Origin", "*"); // eg.
                    next();
                },
            ],
            directoryListing: false,
            open: false,
            port: 3010,
        })
    );

    return cb();
});

gulp.task("main.serve", gulp.series("main.serve.shapez", "main.serve.mod"));

// Js
gulp.task("js.dev", cb => {
    gulp.src("../src/js/main.js")
        .pipe(
            $.webpackStream(
                requireUncached("./webpack.config.js")({
                    watch: true,
                    injectCss: argv["no-css"] === undefined,
                })
            )
        )
        .pipe(gulp.dest(buildFolder));

    return cb();
});

gulp.task("js", cb => {
    gulp.src("../src/js/main.js")
        .pipe(
            $.webpackStream(
                requireUncached("./webpack.production.config.js")({
                    injectCss: argv["no-css"] === undefined,
                })
            )
        )
        .pipe(gulp.dest(buildFolder));
    return cb();
});

// Css
function postcssAssetsPlugin() {
    return $.postcssAssets({
        loadPaths: [path.join(srcFolder, "res")],
        basePath: buildFolder,
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
        .pipe(gulp.dest(buildFolder));
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
        .pipe(gulp.dest(buildFolder));
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

// Builds
gulp.task(
    "main.build",
    // TODO: add builds
    gulp.series("utils.cleanBuildFolder", "css.main.prod", "js")
);
gulp.task(
    "main.build.dev",
    // TODO: add builds
    gulp.series("utils.cleanBuildFolder", "css.main.dev", "js.dev")
);

// Watch
function getGlobs(folder, customExtenstions = null) {
    const extensions = ["html", "js", "png", "gif", "jpg", "svg", "mp3", "ico", "woff2", "json", "scss"];
    return extensions.map(ext =>
        path.relative(__dirname, path.join(folder, "**", "*." + customExtenstions || ext)).replace(/\\/g, "/")
    );
}

gulp.task("main.watch.scss", function () {
    // Watch the  srcfolder and reload when anything changed
    const src = getGlobs(srcFolder, ["scss"]);
    return gulp.watch(
        src,
        gulp.series(
            "css.dev",
            function rebuild(cb) {
                exec("touch " + path.relative(__dirname, path.join(srcFolder, "js", "main.js")));
                cb();
            },
            "main.serve.shapez.reload"
        )
    );
});

gulp.task("main.watch.shapezBuildFolder", function () {
    // Watch the shapezBuildFolder and reload when anything changed
    const src = getGlobs(shapezBuildFolder);

    return gulp.watch(src, gulp.series("main.build.dev", "main.serve.shapez.reload"));
});

gulp.task("main.watch.folders", gulp.parallel("main.watch.scss", "main.watch.shapezBuildFolder"));

gulp.task("main.watch", gulp.series("main.build.dev", "main.serve", "main.watch.folders"));
gulp.task("main.watch.mod", gulp.series("main.build.dev", "main.serve.mod", "main.watch.scss"));

// function (cb) {
// TODO: add builds for watch
// Watch .scss files, those trigger a css rebuild
// gulp.watch(["../src/**/*.scss"], gulp.series("css.dev"));
// Watch resource files and copy them on change
// gulp.watch(imgres.rawImageResourcesGlobs, gulp.series("imgres.buildAtlas"));
// gulp.watch(imgres.nonImageResourcesGlobs, gulp.series("imgres.copyNonImageResources"));
// gulp.watch(imgres.imageResourcesGlobs, gulp.series("imgres.copyImageResources"));
// Watch .atlas files and recompile the atlas on change
// gulp.watch("../res_built/atlas/*.atlas", gulp.series("imgres.atlasToJson"));
// gulp.watch("../res_built/atlas/*.json", gulp.series("imgres.atlas"));
// }
gulp.task("default", gulp.series("main.watch"));
