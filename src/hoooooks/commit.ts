import { Socket } from 'net';
import { PORT, HOST } from '../const/net';
import { E_PROTOKOL_MSG } from '../const/protocol';

const CLIENT = new Socket();

CLIENT.connect(PORT, HOST, () => console.warn('Connect to work wacher'));

CLIENT.write(E_PROTOKOL_MSG.commit_task, (err) => {
    if (err) {
        console.warn(err);
    }
    CLIENT.destroy();
});
