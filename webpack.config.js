module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        'pre-commit': './src/hoooooks/pre-commit.ts',
        'commit-msg': './src/hoooooks/commit-msg.ts',
        'post-checkout': './src/hoooooks/post-checkout.ts',
        'jwl': './src/index.ts',
        'use-jwl': './src/utils/use-jwl.ts'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        path: `${__dirname}/package`,
        filename: '[name]'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};