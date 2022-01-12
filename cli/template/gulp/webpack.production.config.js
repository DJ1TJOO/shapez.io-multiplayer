const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

const TerserPlugin = require("terser-webpack-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const UnusedFilesPlugin = require("unused-files-webpack-plugin").UnusedFilesWebpackPlugin;

module.exports = ({ injectCss = true, injectAtlas = true, injectTranslations = true }) => {
    const minifyNames = false;

    return {
        mode: "production",
        entry: {
            "mod.js": [path.resolve(__dirname, "..", "src", "js", "main.js")],
        },
        output: {
            filename: "mod.js",
            path: path.resolve(__dirname, "..", "build"),
        },
        context: path.resolve(__dirname, ".."),
        stats: {
            // Examine all modules
            maxModules: Infinity,
            // Display bailout reasons
            optimizationBailout: true,
        },
        // devtool: "source-map",
        devtool: false,
        optimization: {
            minimize: true,
            // namedModules: true,

            noEmitOnErrors: true,
            removeAvailableModules: true,
            removeEmptyChunks: true,
            mergeDuplicateChunks: true,
            flagIncludedChunks: true,
            occurrenceOrder: true,
            providedExports: true,
            usedExports: true,
            concatenateModules: true,
            sideEffects: true,

            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    sourceMap: false,
                    cache: false,
                    terserOptions: {
                        ecma: 6,
                        parse: {},
                        module: true,
                        toplevel: true,
                        keep_classnames: !minifyNames,
                        keep_fnames: !minifyNames,
                        keep_fargs: !minifyNames,
                        safari10: true,
                        compress: {
                            arguments: false, // breaks
                            drop_console: false,
                            keep_fargs: !minifyNames,
                            keep_infinity: true,
                            passes: 2,
                            module: true,
                            pure_funcs: [
                                "Math.radians",
                                "Math.degrees",
                                "Math.round",
                                "Math.ceil",
                                "Math.floor",
                                "Math.sqrt",
                                "Math.hypot",
                                "Math.abs",
                                "Math.max",
                                "Math.min",
                                "Math.sin",
                                "Math.cos",
                                "Math.tan",
                                "Math.sign",
                                "Math.pow",
                                "Math.atan2",
                            ],
                            toplevel: true,
                            unsafe_math: true,
                            unsafe_arrows: false,
                            warnings: true,
                        },
                        mangle: {
                            eval: true,
                            keep_classnames: !minifyNames,
                            keep_fnames: !minifyNames,
                            module: true,
                            toplevel: true,
                            safari10: true,
                        },
                        output: {
                            comments: false,
                            ascii_only: true,
                            beautify: false,
                            braces: false,
                            ecma: 6,
                            preamble: "/* shapez.io mod build */",
                        },
                    },
                }),
            ],
        },
        performance: {
            maxEntrypointSize: 5120000,
            maxAssetSize: 5120000,
        },
        plugins: [
            new webpack.DefinePlugin({
                CSS_MAIN: webpack.DefinePlugin.runtimeValue(function () {
                    let css = "";
                    try {
                        css = fs.readFileSync(path.resolve(__dirname, "../build/main.css"), {
                            encoding: "utf-8",
                        });
                    } catch (error) {}
                    return "`" + css + "`";
                }),
                CSS_RESOURCES: webpack.DefinePlugin.runtimeValue(function () {
                    let css = "";
                    try {
                        css = fs.readFileSync(path.resolve(__dirname, "../build/async-resources.css"), {
                            encoding: "utf-8",
                        });
                    } catch (error) {}
                    return "`" + css + "`";
                }),
                ATLASES: webpack.DefinePlugin.runtimeValue(function () {
                    const atlases = new Map();
                    const atlasJsons = new Map();
                    const atlasFiles = fs.readdirSync("../build/atlases");
                    for (let i = 0; i < atlasFiles.length; i++) {
                        const filename = atlasFiles[i];
                        const ext = path.extname(filename);
                        const name = path.basename(filename, ext).split("_")[1];
                        const readPath = path.join("../build/atlases", filename);

                        if (ext === ".png") {
                            atlases.set(
                                name,
                                "data:image/png;base64," +
                                    Buffer.from(fs.readFileSync(readPath)).toString("base64")
                            );
                        } else if (ext === ".json") {
                            const json = JSON.parse(fs.readFileSync(readPath, "utf8"));
                            json.sourceData = json.frames;
                            delete json.frames;
                            atlasJsons.set(name, JSON.stringify(json));
                        }
                    }

                    return {
                        hq: {
                            src: "`" + atlases.get("hq") + "`",
                            atlasData: atlasJsons.get("hq"),
                        },
                        mq: {
                            src: "`" + atlases.get("mq") + "`",
                            atlasData: atlasJsons.get("mq"),
                        },
                        lq: {
                            src: "`" + atlases.get("lq") + "`",
                            atlasData: atlasJsons.get("lq"),
                        },
                    };
                }),
                TRANSLATIONS: webpack.DefinePlugin.runtimeValue(function () {
                    const translations = {};
                    const translationFiles = fs.readdirSync("../build/translations");
                    for (let i = 0; i < translationFiles.length; i++) {
                        const filename = translationFiles[i];
                        const ext = path.extname(filename);
                        const name = path.basename(filename, ext);
                        const readPath = path.join("../build/translations", filename);

                        if (ext === ".json") {
                            translations[name] = fs.readFileSync(readPath, "utf8");
                        }
                    }

                    return translations;
                }),
            }),
            new UnusedFilesPlugin({
                failOnUnused: false,
                cwd: path.join(__dirname, "..", "src", "js"),
                patterns: ["../src/js/**/*.js"],
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.json$/,
                    enforce: "pre",
                    use: ["./gulp/loader.compressjson"],
                    type: "javascript/auto",
                },
                { test: /\.(png|jpe?g|svg)$/, loader: "ignore-loader" },
                {
                    test: /\.js$/,
                    enforce: "pre",
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "webpack-strip-block",
                            options: {
                                start: "typehints:start",
                                end: "typehints:end",
                            },
                        },
                        {
                            loader: "webpack-strip-block",
                            options: {
                                start: "dev:start",
                                end: "dev:end",
                            },
                        },
                        {
                            loader: "webpack-strip-block",
                            options: {
                                start: "wires:start",
                                end: "wires:end",
                            },
                        },
                    ],
                },
                {
                    test: /\.js$/,
                    use: [
                        // "thread-loader",
                        {
                            loader: "babel-loader?cacheDirectory",
                            options: {
                                configFile: require.resolve("./babel-es6.config.js"),
                            },
                        },
                        "uglify-template-string-loader", // Finally found this plugin
                        StringReplacePlugin.replace({
                            replacements: [
                                { pattern: /globalConfig\.tileSize/g, replacement: () => "32" },
                                { pattern: /globalConfig\.halfTileSize/g, replacement: () => "16" },
                                {
                                    pattern: /globalConfig\.beltSpeedItemsPerSecond/g,
                                    replacement: () => "2.0",
                                },
                                { pattern: /globalConfig\.debug/g, replacement: () => "''" },
                            ],
                        }),
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        StringReplacePlugin.replace({
                            replacements: [
                                {
                                    pattern:
                                        /import[ \n]*{([a-zA-Z0-9_$, \n]*)*}[ \n]*from[ \n]*[`|"|'](shapez\/[^]*?)[`|"|'];/gms,
                                    replacement: (match, variables, path) => {
                                        return `const {${variables}} = shapez["${path.replace(
                                            "shapez/",
                                            ""
                                        )}"];`;
                                    },
                                },
                                {
                                    pattern:
                                        /(const|var|let|[a-zA-Z0-9\.]*?)?[ \n]*([a-zA-Z0-9]*?)[ \n]*=[ \n]*(new )?[ \n]*([a-zA-Z0-9\.]*)?Mod\(([^]*?)\);/gms,
                                    replacement: (match, type, variableName) => {
                                        const css = `${variableName}.registerCss(CSS_MAIN);\n${variableName}.registerCss(CSS_RESOURCES);`;

                                        return injectCss ? `${match}\n${css}` : `${match}`;
                                    },
                                },
                                {
                                    pattern:
                                        /(const|var|let|[a-zA-Z0-9\.]*?)?[ \n]*([a-zA-Z0-9]*?)[ \n]*=[ \n]*(new )?[ \n]*([a-zA-Z0-9\.]*)?Mod\(([^]*?)\);/gms,
                                    replacement: (match, type, variableName) => {
                                        const atlases = `const atlases = ATLASES;\n${variableName}.registerAtlas(atlases.hq.src, atlases.hq.atlasData);\n${variableName}.registerAtlas(atlases.mq.src, atlases.mq.atlasData);\n${variableName}.registerAtlas(atlases.lq.src, atlases.lq.atlasData);`;

                                        return injectAtlas ? `${match}\n${atlases}` : `${match}`;
                                    },
                                },
                                {
                                    pattern:
                                        /(const|var|let|[a-zA-Z0-9\.]*?)?[ \n]*([a-zA-Z0-9]*?)[ \n]*=[ \n]*(new )?[ \n]*([a-zA-Z0-9\.]*)?Mod\(([^]*?)\);/gms,
                                    replacement: (match, type, variableName) => {
                                        const translations = `const translations = TRANSLATIONS;\nfor (const translationId in translations) {\nconst translation = translations[translationId];\n${variableName}.registerTranslation(translationId, translation, translation.name ? { name: translation.name, code: translationId, region: translation.region || "" } : null);\n}`;

                                        return injectTranslations ? `${match}\n${translations}` : `${match}`;
                                    },
                                },
                            ],
                        }),
                    ],
                },
                {
                    test: /\.worker\.js$/,
                    use: [
                        {
                            loader: "worker-loader",
                            options: {
                                fallback: false,
                                inline: true,
                            },
                        },
                        {
                            loader: "babel-loader?cacheDirectory",
                            options: {
                                configFile: require.resolve("./babel-es6.config.js"),
                            },
                        },
                    ],
                },
                {
                    test: /\.md$/,
                    use: ["html-loader", "markdown-loader"],
                },
                {
                    test: /\.ya?ml$/,
                    type: "json", // Required by Webpack v4
                    use: "yaml-loader",
                },
            ],
        },
    };
};
