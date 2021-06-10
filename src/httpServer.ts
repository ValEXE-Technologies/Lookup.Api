import https from 'https';
import fs from 'fs';
import { ApiServices } from './services/apiServices';

export class HttpServer {
    
    public async getServer(
        headLess: boolean = true
    ): Promise<https.Server> {
        let apiServices: ApiServices = new ApiServices();
        await apiServices.init(headLess);

        return https.createServer(
            this.getServerOptions(),
            apiServices.getListener());
    }

    private getServerOptions(): https.ServerOptions {
        return {
            key: fs.readFileSync('./cert/key.pem'),
            cert: fs.readFileSync('./cert/cert.pem')
        };
    }
}
