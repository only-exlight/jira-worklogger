rm -rf package
webpack --config webpack.config.js
cp LICENSE package
cp package.json package
cp README.md package
# npm publish package
