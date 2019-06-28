import { PORT, HOST, APP_NAME } from '../const/app-consts';
import { E_PROTOKOL_EVENT, IProtokol } from '../const/protocol';
import axios from 'axios';

process.stdout.write(`${APP_NAME} PRE-COMMIT \n`);

const MSG: IProtokol = {
    event: E_PROTOKOL_EVENT.pre_commit,
    info: null
};

axios.put(`http://127.0.0.1:${PORT}/event`, MSG)
    .then(() => process.stdout.write(`Success!\n`))
    .catch(() => process.stdout.write(`Please start ${APP_NAME} for logging work logs! \n`));