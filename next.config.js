const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const withPlugins = require("next-compose-plugins");
const withSize = require('next-size');
const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const cssLoaderGetLocalIdent = require("css-loader/lib/getLocalIdent.js");
const ContextReplacementPlugin = require("webpack").ContextReplacementPlugin;
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
});

const isProd = process.env.NODE_ENV === "production";
module.exports = withPlugins([withSize, withSass, withCss, withBundleAnalyzer], {
    onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 25 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 2,
    },
    assetPrefix: isProd ? "" : "",
    distDir: "build",
    sassLoaderOptions: {
        javascriptEnabled: true
    },
    postcssLoaderOptions: {
        autoprefixer: true
    },
    cssModules: true,
    cssLoaderOptions: {
        camelCase: true,
        localIdentName: "[local]_[hash:base64:5]",
        getLocalIdent: (context, localIdentName, localName, options) => {
            let hz = context.resourcePath.replace(context.rootContext, "");
            if (/node_modules/.test(hz)) {
                return localName;
            } else {
                return cssLoaderGetLocalIdent(
                    context,
                    localIdentName,
                    localName,
                    options
                );
            }
        }
    },
    webpack: (config, {buildId, dev, isServer, defaultLoaders}) => {
        // antd icon文件太大，将icon抽出来按需加载(icons.js引入需要的icon)
        config.resolve.alias["@ant-design/icons/lib/dist$"] = path.join(__dirname, "/constants/icons.js");
        // moment语言包太大，排除不需要语言包，中文在项目中单独引入
        config.plugins.push(
            new ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/)
        );
        if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/;
            const origExternals = [...config.externals];
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback();
                    if (typeof origExternals[0] === "function") {
                        origExternals[0](context, request, callback);
                    } else {
                        callback();
                    }
                },
                ...( typeof origExternals[0] === "function" ? [] : origExternals )
            ];

            config.module.rules.unshift({
                test: antStyles,
                use: "null-loader"
            });
        }
        if (isProd) {
            config.plugins.push(
                new CleanWebpackPlugin(
                    ["build/server/static/", "build/static/"], // 匹配删除的文件
                    {
                        root: __dirname, // 根目录
                        verbose: true, // 开启在控制台输出信息
                        dry: false // 启用删除文件
                    }
                )
            );
            config.optimization.minimizer.push(
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    terserOptions: {
                        warnings: false,
                        compress: {
                            drop_console: true
                        },
                        mangle: true, // Note `mangle.properties` is `false` by default.
                        module: false,
                        output: {
                            comments: false
                        }
                    }
                })
            )
        }
        return config;
    }
});