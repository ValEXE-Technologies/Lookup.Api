import { CONFIG } from './config';
import { HttpServer } from './httpServer';

new HttpServer()
    .getServer(false)
    .listen(
        CONFIG.portNumber,
        () => {
            console.log(`Lookup APi listening at https://localhost:${CONFIG.portNumber}`);
        }
    );
