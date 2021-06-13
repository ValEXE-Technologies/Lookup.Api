import express, { RequestHandler } from 'express';
import cors from 'cors';
import { Application } from 'express';
import { RequestListener } from 'http';

import {
    DomainPrice,
    DomainServices,
    Registrar,
    Currency,
    SUPPORTED_CURRENCIES
} from '@valexe-technologies/lookup.services';
import { ResponseViewModel } from './models';

export class ApiServices {
    private readonly domainServices: DomainServices = null;

    constructor() {
        this.domainServices = new DomainServices();
    }

    public async init(
        headLess: boolean = true
    ) {
        await this.domainServices.init(headLess);
    }
    
    public getListener(): RequestListener {
        let app: Application = express();

        this.config(app);
        this.attachApis(app);

        return app;
    }

    private config(app: Application) {
        app.use(express.urlencoded({ extended: true }) as RequestHandler);
        app.use(express.json() as RequestHandler);
        app.use(cors());
        app.use(express.static('wwwroot') as RequestHandler);
    }

    private attachApis(app: Application) {
        this.attachGetStatusApi(app);

        // Domain Related APIs
        this.attachGetCurrencies(app);
        this.attachGetRegistrars(app);
        this.attachGetDomainIsAvailable(app);
        this.attachGetDomainPrice(app);
    }

    private attachGetStatusApi(app: Application) {
        app.get('/api/status', (_, res) => {
            let responseModel: ResponseViewModel<string> = {
                status: 'Successful',
                message: 'Lookup RESTApi is up and running',
                data: null
            };
            
            res.json(responseModel);
        });
    }

    private attachGetCurrencies(app: Application) {
        app.get('/api/referencedata/currencies', async (_, res) => {
            let apiResponse: ResponseViewModel<Currency[]> = {
                    status: 'Successful',
                    message: null,
                    data: SUPPORTED_CURRENCIES
                };
        
            res.setHeader('content-type', 'application/json');
            res.json(apiResponse);
        });
    }

    private attachGetRegistrars(app: Application) {
        app.get('/api/domain/:currency/registrars', async (req, res) => {
            let currency = req.params.currency;
            let registrars = await this.domainServices.domainRegistrarsByCurrency(currency);
            let apiResponse: ResponseViewModel<Registrar[]> = {
                    status: 'Successful',
                    message: null,
                    data: registrars
                };
        
            res.setHeader('content-type', 'application/json');
            res.json(apiResponse);
        });
    }

    private attachGetDomainIsAvailable(app: Application) {
        app.get('/api/domain/isAvailable/:domainNameWithTLD', async (req, res) => {
            let domainNameWithTLD = req.params.domainNameWithTLD;
            let isDomainAvailable = await this.domainServices.isDomainAvailable(domainNameWithTLD);
            let apiResponse: ResponseViewModel<boolean> = {
                    status: 'Successful',
                    message: isDomainAvailable ? `${domainNameWithTLD} is available` : `${domainNameWithTLD} is not available`,
                    data: isDomainAvailable
                };
        
            res.setHeader('content-type', 'application/json');
            res.json(apiResponse);
        });
    }

    private attachGetDomainPrice(app: Application) {
        app.get('/api/domain/:currency/:registrar/:domainNameWithTLD/price', async (req, res) => {
            let currency = req.params.currency;
            let registrar = req.params.registrar;
            let domainNameWithTLD = req.params.domainNameWithTLD;
            let domainPrice = await this.domainServices.domainPrice(registrar, domainNameWithTLD, currency);
            let apiResponse: ResponseViewModel<DomainPrice> = {
                status: (domainPrice == null) ? 'Failed' : 'Successful',
                message: null,
                data: domainPrice
            };
        
            res.setHeader('content-type', 'application/json');
            res.json(apiResponse);
        });
    }
};
