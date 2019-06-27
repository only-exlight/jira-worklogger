import { createServer, Socket } from 'net';
import { writeSeparator } from '../functions/exec';

export class TcpServer {
    public server = createServer();

    public startServer(port: number, host: string) {
        this.server.listen(port, host, this.startServerCb);
    }

    private startServerCb() {
        process.stdout.write('Listen GIT hooks...\n');
        writeSeparator();
    }

}