module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        'pre-commit': './src/hoooooks/pre-commit.ts',
        'commit-msg': './src/hoooooks/commit-msg.ts',
        'post-checkout': './src/hoooooks/post-checkout.ts'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        path: `${__dirname}/build`,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};