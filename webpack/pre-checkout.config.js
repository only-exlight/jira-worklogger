let nodeExternals = require('webpack-node-externals');

module.exports = {
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    externals: {
        child_process: 'child_process',
        net: 'net'
    },
    output: {
        path: `${__dirname}/build`,
        filename: 'pre-checkout.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};