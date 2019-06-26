console.warn(__dirname);
module.exports = {
    target: 'node',
    entry: './src/hoooooks/commit',
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