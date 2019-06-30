echo 'Delete old build...';
rm -rf package;
echo 'Ok!';
#
echo 'Build files...';
webpack --config webpack.config.js;
echo 'Ok!';
#
echo 'Copy: manifest, license, readme...';
cp src/final-package.json package;
mv package/final-package.json package/package.json;
cp LICENSE package;
cp README.md package;
echo 'Ok!';
#
echo 'Add run signature to files...';
cd package;
echo "#!/usr/bin/env node\n$(cat jwl)" > jwl;
echo "#!/usr/bin/env node\n$(cat use-jwl)" > use-jwl;
cd ..;
echo 'Ok!';
#
echo 'Public package...';
npm publish package;
echo 'Ok!';
