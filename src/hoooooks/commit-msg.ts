import { PORT, HOST, APP_NAME } from '../const/app-consts';
import { E_PROTOKOL_EVENT, IProtokol } from '../const/protocol';
import { readFileSync } from 'fs';
import axios from 'axios';

process.stdout.write(`${APP_NAME} COMMIT-MSG \n`);

const COMMIT_MSG_FILE = process.argv[2];
const COMMIT_MSG = readFileSync(`./${COMMIT_MSG_FILE}`).toString().replace('\n', '');
process.stdout.write(`Your commit message: ${COMMIT_MSG}`);

const MSG: IProtokol = {
    event: E_PROTOKOL_EVENT.commit_msg,
    info: COMMIT_MSG
};

axios.put(`http://127.0.0.1:${PORT}/event`, MSG)
    .then(() => process.stdout.write(`Success!\n`))
    .catch(() => process.stdout.write(`Please start ${APP_NAME} for logging work logs! \n`));
