module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        'pre-commit': './src/hoooooks/pre-commit.ts',
        'commit-msg': './src/hoooooks/commit-msg.ts',
        'post-checkout': './src/hoooooks/post-checkout.ts',
        'jal': './src/index.ts',
        'use-jal': './src/utils/use-jal.ts'
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