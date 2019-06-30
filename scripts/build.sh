rm -rf package
webpack --config webpack.config.js
cp src/final-package.json package
mv package/final-package.json package/package.json
cp LICENSE package
cp README.md package
npm publish package
