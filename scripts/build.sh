echo 'Delete old build...';
rm -rf package;
echo 'Ok!';
#
echo 'Build files...';
mkdir package;
npm run compile;
cp -r dist/* package;
rm -rf dist;
echo 'Ok!';
#
echo 'Copy: manifest, license, readme...';
cp src/final-package.json package;
mv package/final-package.json package/package.json;
cp LICENSE package;
cp README.md package;
touch package/config.json
echo 'Ok!';
#
echo 'Add run signature to files...';
cd package;
echo "#!/usr/bin/env node\n$(cat index.js)" > index.js;
echo "#!/usr/bin/env node\n$(cat utils/use-jwl.js)" > utils/use-jwl.js;
echo "#!/usr/bin/env node\n$(cat utils/jwl-config.js)" > utils/jwl-config.js;
cd ..;
echo 'Ok!';
#
echo 'Public package...';
npm publish package;
echo 'Ok!';
