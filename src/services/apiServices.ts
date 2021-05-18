import * as express from 'express';
import { Application } from 'express';
import { RequestListener } from 'http';
import { DomainServices } from 'valexe.lookup.services/src';
import { ResponseModel } from './models';

export class ApiServices {
    private domainServices = new DomainServices();
    
    public getListener(): RequestListener {
        let app: Application = express();

        this.config(app);
        this.attachApis(app);

        return app;
    }

    private config(app: Application) {
        app.use(express.json());
    }

    private attachApis(app: Application) {
        this.attachGetStatusApi(app);

        // Domain Related APIs
        this.attachGetDomainIsAvailable(app);
    }

    private attachGetStatusApi(app: Application) {
        app.get('/api/status', (_, res) => {
            let responseModel: ResponseModel<string> = {
                status: 'Successful',
                message: 'Lookup API is up and running',
                data: null
            };
        
            res.json(responseModel);
        });
    }

    private attachGetDomainIsAvailable(app: Application) {
        app.get('/api/domain/isAvailable/:domainNameWithTLD', async (req, res) => {
            let domainNameWithTLD = req.params.domainNameWithTLD;
            let apiResponseModel = await this.domainServices.isDomainAvailable(domainNameWithTLD)
                ? {
                    status: 'Successful',
                    message: null,
                    data: `${domainNameWithTLD} is available`
                }
                : {
                    status: 'Failed',
                    message: null,
                    data: `${domainNameWithTLD} is not available`
                };
        
            res.setHeader('content-type', 'application/json');
            res.json(apiResponseModel);
        });
    }
};
