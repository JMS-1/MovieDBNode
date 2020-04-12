const path = require('path')

module.exports = () => {
    return {
        devtool: 'source-map',
        entry: { index: './Client/src/index.tsx' },
        module: {
            rules: [
                {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: 'Client/tsconfig.json',
                    },
                    test: /\.tsx?$/,
                },
            ],
        },
        optimization: {
            minimize: false,
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, './Server/dist'),
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
    }
}
