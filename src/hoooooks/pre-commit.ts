import { Socket } from 'net';
import { PORT, HOST, APP_NAME } from '../const/app-consts';
import { E_PROTOKOL_EVENT, IProtokol } from '../const/protocol';

process.stdout.write(`${APP_NAME} PRE-COMMIT \n`);

const CLIENT = new Socket();

CLIENT.connect(PORT, HOST, () => console.warn(`Try connect to ${APP_NAME}...\n`));
CLIENT.on('error', () => {
    process.stdout.write(`Please start ${APP_NAME} for logging work logs! \n`);
    process.exit(0);
})

const MSG: IProtokol = {
    event: E_PROTOKOL_EVENT.pre_commit,
    info: null
};

CLIENT.write(JSON.stringify(MSG), (err) => {
    if (err) {
        console.warn(err);
    }
    process.stdout.write(`Success!\n`);
    CLIENT.destroy();
});
