const path = require("path");

function gulptasksTranslations($, gulp, folders) {
    const translationsSourceDir = path.join(folders.src, "translations");
    const translationsJsonDir = path.join(folders.build, "translations");

    gulp.task("translations.convertToJson", () => {
        return gulp
            .src(path.join(translationsSourceDir, "*.yaml"))
            .pipe($.plumber())
            .pipe($.yaml({ space: 2, safe: true }))
            .pipe(gulp.dest(translationsJsonDir));
    });

    gulp.task("translations", gulp.series("translations.convertToJson"));
}

module.exports = {
    gulptasksTranslations,
};
