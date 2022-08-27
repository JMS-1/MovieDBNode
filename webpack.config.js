const path = require('path')

const copyStatic = require('copy-webpack-plugin')

const publicFolder = path.join(__dirname, 'Client/public')

const extractCss = require('mini-css-extract-plugin')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')

module.exports = (env) => ({
    devtool: 'source-map',

    entry: { index: path.join(__dirname, './Client/src/index.tsx') },

    mode: env.production ? 'production' : 'development',

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: require.resolve('ts-loader'),
                        options: {
                            getCustomTransformers: () => ({
                                before: [!env.production && ReactRefreshTypeScript()].filter(Boolean),
                            }),
                        },
                    },
                ],
            },
            {
                test: /\.s?css$/,
                use: [
                    { loader: extractCss.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: { auto: true, localIdentName: '[local]-[hash:base64:5]' },
                            sourceMap: false,
                            url: false,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.svg$/,
                use: [{ loader: 'svg-inline-loader', options: {} }],
            },
        ],
    },

    output: { filename: '[name].js', path: path.join(__dirname, 'Client/build') },

    performance: { maxAssetSize: 4000000, maxEntrypointSize: 4000000 },

    plugins: [
        new copyStatic({ patterns: [{ from: publicFolder }] }),
        new extractCss({ filename: 'index.css', ignoreOrder: true }),
        !env.production && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),

    resolve: { extensions: ['.ts', '.tsx', '.scss', '.js', '.css', '.svg'] },
})
