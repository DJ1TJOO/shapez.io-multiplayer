const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

const CircularDependencyPlugin = require("circular-dependency-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = ({ watch = false, injectCss = true }) => {
    return {
        mode: "development",
        devtool: "cheap-source-map",
        entry: {
            "mod.js": [path.resolve(__dirname, "../src/js/main.js")],
        },
        watch,
        context: path.resolve(__dirname, ".."),
        plugins: [
            new StringReplacePlugin(),
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
            }),

            new CircularDependencyPlugin({
                // exclude detection of files based on a RegExp
                exclude: /node_modules/,

                // add errors to webpack instead of warnings
                failOnError: true,

                // allow import cycles that include an asyncronous import,
                // e.g. via import(/* webpackMode: "weak" */ './file.js')
                allowAsyncCycles: false,

                // set the current working directory for displaying module paths
                cwd: path.join(__dirname, "..", "src", "js"),
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
                    test: /\.md$/,
                    use: [
                        {
                            loader: "html-loader",
                        },
                        "markdown-loader",
                    ],
                },
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
                            ],
                        }),
                    ],
                },
                {
                    test: /\.worker\.js$/,
                    use: {
                        loader: "worker-loader",
                        options: {
                            fallback: false,
                            inline: true,
                        },
                    },
                },
                {
                    test: /\.ya?ml$/,
                    type: "json", // Required by Webpack v4
                    use: "yaml-loader",
                },
            ],
        },
        output: {
            filename: "mod.js",
            path: path.resolve(__dirname, "..", "build"),
        },
    };
};