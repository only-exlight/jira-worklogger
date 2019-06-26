let nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        path: `${__dirname}/build`,
        filename: 'pre-commit.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};