// TODO: fix this strange error eslint

const path = require("path");
const browserSync = require("browser-sync").create({});
const gulp = require("gulp");
const log = require("fancy-log");

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

// Utils
// Cleans up everything
gulp.task("utils.cleanBuildFolder", () => {
    return gulp.src(buildFolder, { read: false, allowEmpty: true }).pipe($.clean({ force: true }));
});

gulp.task("utils.cleanShapezBuildFolder", () => {
    return gulp.src(shapezBuildFolder, { read: false, allowEmpty: true }).pipe($.clean({ force: true }));
});

gulp.task("utils.cleanup", gulp.series("utils.cleanBuildFolder", "utils.cleanShapezBuildFolder"));

// TODO: download latest mod build of shapez.io

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
gulp.task("js.watch", cb => {
    gulp.src("../src/js/main.js")
        .pipe(
            $.webpackStream(
                requireUncached("./webpack.config.js")({
                    watch: true,
                })
            )
        )
        .pipe(gulp.dest(buildFolder));

    return cb();
});

gulp.task("js", cb => {
    gulp.src("../src/js/main.js")
        .pipe($.webpackStream(requireUncached("./webpack.production.config.js")()))
        .pipe(gulp.dest(buildFolder));
    return cb();
});

// Css
// TODO: generate css from scss and inject into mod

// Builds
gulp.task(
    "main.build",
    // TODO: add builds
    gulp.series("utils.cleanBuildFolder", "js")
);
gulp.task(
    "main.build.watch",
    // TODO: add builds
    gulp.series("utils.cleanBuildFolder", "js.watch")
);

function getGlobs(folder) {
    const extensions = ["html", "js", "png", "gif", "jpg", "svg", "mp3", "ico", "woff2", "json"];
    return extensions.map(ext =>
        path.relative(__dirname, path.join(folder, "**", "*." + ext)).replace(/\\/g, "/")
    );
}

// Watch
gulp.task("main.watch.buildFolder", function () {
    // Watch the buildfolder and srcfolder and reload when anything changed
    const src = [...getGlobs(buildFolder), ...getGlobs(srcFolder)];
    return gulp.watch(src, gulp.series("main.serve.shapez.reload"));
});

gulp.task("main.watch.shapezBuildFolder", function () {
    // Watch the shapezBuildFolder and reload when anything changed
    const src = getGlobs(shapezBuildFolder);

    return gulp.watch(src, gulp.series("main.serve.shapez.reload"));
});

gulp.task("main.watch.folders", gulp.parallel("main.watch.buildFolder", "main.watch.shapezBuildFolder"));
gulp.task("main.watch", gulp.series("main.serve", "main.build.watch", "main.watch.folders"));

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
