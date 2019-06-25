const path = require('path')

module.exports = () => {
    return {
        entry: { index: './Client/src/index.tsx' },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        output: {
            path: path.join(__dirname, './Server/dist'),
            filename: '[name].js',
        },
        optimization: {
            minimize: false,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: 'Client/tsconfig.json',
                    },
                },
            ],
        },
        devtool: 'source-map',
    }
}
