import { APP_NAME, VERSION } from '../const/app-consts';
import { existsSync, appendFileSync, writeFileSync } from 'fs';

process.stdout.write(`Use ${APP_NAME} ${VERSION} for this repository... \n`);

let hoooooksPath = __dirname.split('/');
hoooooksPath.length--;

const commitMsgPath = './.git/hooks/commit-msg'
const commitMsg = `node ${hoooooksPath}/hoooooks/commit-msg.js $1`;

const postCheckoutPath = './.git/hooks/post-checkout';
const postCheckout = `node ${hoooooksPath}/hoooooks/post-checkout.ts`;

if (existsSync('./.git')) {
    if (existsSync('./.git/hooks')) {
        appendFileSync(commitMsgPath, commitMsg);
        appendFileSync(postCheckoutPath, postCheckout);
    } else {
        writeFileSync(commitMsgPath, commitMsg);
        writeFileSync(postCheckoutPath, postCheckout);
    }
} else {
    process.stdout.write('GIT repository not found!');
}
