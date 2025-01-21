const path = require("path")

const webViewConfig = {

    mode: "none",

    entry: {
        app: "./src/webview/index.tsx",
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },

    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                    }
                ]
            }
        ]
    },

    devtool: 'source-map',

    externals: {
        hbuilderx: 'commonjs hbuilderx',
    },
}

const extensionConfig = {
    ...webViewConfig,
    target: "node",
    entry: {
        extension: "./src/extension.ts"
    },
}



module.exports = [webViewConfig, extensionConfig]