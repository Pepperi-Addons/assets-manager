import { Asset, FindOptions, PapiClient } from '@pepperi-addons/papi-sdk'
import { Client } from '@pepperi-addons/debug-server';
import config from '../addon.config.json';
import { AssetsScheme } from './metadata';

class AssetsService {

    papiClient: PapiClient

    constructor(private client: Client) {
        this.papiClient = new PapiClient({
            baseURL: client.BaseURL,
            token: client.OAuthAccessToken,
            addonUUID: client.AddonUUID,
            addonSecretKey: client.AddonSecretKey,
            actionUUID: client.ExecutionUUID
        });
    }

    async find(options: FindOptions = {}): Promise<any> {
        return this.papiClient.addons.data.uuid(config.AddonUUID).table(AssetsScheme.Name).find(options);
    }

    async upsert(obj: Asset): Promise<any> {
        return this.papiClient.addons.data.uuid(config.AddonUUID).table(AssetsScheme.Name).upsert(obj);
    }
}

export default AssetsService;