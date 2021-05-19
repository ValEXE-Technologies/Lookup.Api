import * as express from 'express';
import { Application } from 'express';
import { RequestListener } from 'http';
import * as cors from 'cors';

import { DomainServices } from 'lookup.services/src';
import { ResponseViewModel } from './models';

export class ApiServices {
    private readonly domainServices: DomainServices = null;

    constructor(
        headLess: boolean = true
    ) {
        this.domainServices = new DomainServices(headLess);
    }
    
    public getListener(): RequestListener {
        let app: Application = express();

        this.config(app);
        this.attachApis(app);

        return app;
    }

    private config(app: Application) {
        app.use(express.json());
        app.use(cors());
    }

    private attachApis(app: Application) {
        this.attachGetStatusApi(app);

        // Domain Related APIs
        this.attachGetDomainIsAvailable(app);
    }

    private attachGetStatusApi(app: Application) {
        app.get('/api/status', (_, res) => {
            let responseModel: ResponseViewModel<string> = {
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
            let isDomainAvailable = await this.domainServices.isDomainAvailable(domainNameWithTLD);
            let apiResponseModel: ResponseViewModel<boolean> = {
                    status: 'Successful',
                    message: isDomainAvailable ? `${domainNameWithTLD} is available` : `${domainNameWithTLD} is not available`,
                    data: isDomainAvailable
                };
        
            res.setHeader('content-type', 'application/json');
            res.json(apiResponseModel);
        });
    }
};
