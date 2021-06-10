import { CONFIG } from './config';
import { HttpServer } from './httpServer';

new HttpServer()
    .getServer()
        .then((instance) => {
            instance.listen(
                CONFIG.portNumber,
                () => {
                    console.log(`Lookup RESTApi listening at https://localhost:${CONFIG.portNumber}`);
                }
            );
        })
        .catch((err) => {
            console.error(err)
        });
