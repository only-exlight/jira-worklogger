import { APP_NAME, VERSION } from '../const/app-consts';
import { existsSync, appendFileSync, writeFileSync, chmodSync } from 'fs';

process.stdout.write(`Use ${APP_NAME} ${VERSION} for this repository... \n`);

let hp = __dirname.split('/');
hp.length--;
let hoooooksPath = hp.join('/');

const commitMsgPath = './.git/hooks/commit-msg'
const commitMsg = `\nnode ${hoooooksPath}/hoooooks/commit-msg.js $1`;

const postCheckoutPath = './.git/hooks/post-checkout';
const postCheckout = `\nnode ${hoooooksPath}/hoooooks/post-checkout.ts`;

if (existsSync('./.git')) {
    if (existsSync('./.git/hooks')) {
        appendFileSync(commitMsgPath, commitMsg);
        appendFileSync(postCheckoutPath, postCheckout);
    } else {
        writeFileSync(commitMsgPath, commitMsg);
        writeFileSync(postCheckoutPath, postCheckout);
    }
    chmodSync(commitMsgPath, 0b111111111);
    chmodSync(postCheckoutPath, 0b111111111);
} else {
    process.stdout.write('GIT repository not found!');
}
