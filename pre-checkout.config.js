module.exports = {
    target: 'node',
    entry: './src/hoooooks/checkout.ts',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        path: `${__dirname}/build`,
        filename: 'pre-checkout.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};