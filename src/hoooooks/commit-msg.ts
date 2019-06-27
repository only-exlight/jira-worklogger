import { Socket } from 'net';
import { PORT, HOST, APP_NAME } from '../const/app-consts';
import { E_PROTOKOL_EVENT, IProtokol } from '../const/protocol';
import { readFileSync } from 'fs';

process.stdout.write(`${APP_NAME} COMMIT-MSG \n`);

const CLIENT = new Socket();
const COMMIT_MSG_FILE = process.argv[2];
const COMMIT_MSG = readFileSync(`./${COMMIT_MSG_FILE}`).toString();

CLIENT.connect(PORT, HOST, () => console.warn(`Try connect to ${APP_NAME}...\n`));
CLIENT.on('error', () => {
    process.stdout.write(`Please start ${APP_NAME} for logging work logs! \n`);
    process.exit(0);
})

const MSG: IProtokol = {
    event: E_PROTOKOL_EVENT.commit_msg,
    info: COMMIT_MSG
};

CLIENT.write(JSON.stringify(MSG), (err) => {
    if (err) {
        console.warn(err);
    }
    process.stdout.write(`Success!\n`);
    CLIENT.destroy();
});
