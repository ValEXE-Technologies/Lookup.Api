import * as https from 'https';
import * as fs from 'fs';
import { ApiServices } from './services/apiServices';

export class HttpServer {
    public getServer(): https.Server {
        return https.createServer(
            this.getServerOptions(),
            new ApiServices().getListener());
    }

    private getServerOptions(): https.ServerOptions {
        return {
            key: fs.readFileSync('./cert/key.pem'),
            cert: fs.readFileSync('./cert/cert.pem')
        };
    }
}
