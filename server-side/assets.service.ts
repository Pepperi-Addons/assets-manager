import { FileStorage, FindOptions, PapiClient } from '@pepperi-addons/papi-sdk'
import { Client, Request } from '@pepperi-addons/debug-server';
import config from '../addon.config.json';
import { AssetsScheme } from './metadata';
import { Validator } from './validator';
var mime = require('mime-types');

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

    async upsert(request: Request): Promise<any> {
        
        let body = request.body;

        // Validate received object by scheme
        const objValidated = Validator.validate(body);

        // Set key (Key must be identical to Name)
        body.Key = body.Name;

        // If mime was not supplied, infer it from name
        if (!body.Mime) {
            body.Mime = this.getMimeType(body);
        }
        
        // See: https://github.com/Pepperi-Addons/charts-manager/blob/Hadar-Branch/server-side/chart-service.ts
        // Upload file from URL or from URI
        const assetFile = await this.upsertAssetFile(body);

        // TODO: FileID and URL?
        body.FileStorageID = assetFile.InternalID;
        body.URL = assetFile.URL;

        return this.papiClient.addons.data.uuid(config.AddonUUID).table(AssetsScheme.Name).upsert(body);
    }

    private async upsertAssetFile(body) {

        try {
            // TODO: IsSync: false?
            const fileStorage: FileStorage = {
                FileName: body.Name,
                Title: body.Name,
                IsSync: false
            }
            
            // TODO: What is FileID???
            fileStorage.InternalID = body.FileID;
            
            if (body.Hidden) {
                fileStorage.Hidden = true;
            }
            else {
                if (this.isValidURL(body.URI)) {
                    fileStorage.URL = body.URI
                }
                else {
                    fileStorage.Content = body.URI;
                }
            }     
            return await this.papiClient.fileStorage.upsert(fileStorage)
        }
        catch (e) {
            throw new Error(`Failed to upsert file storage. Error: ${e}`);
        }
    }

    private isValidURL(s): boolean {
        let url: URL;
        try {
            url = new URL(s);
        } 
        catch (e) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

    private getMimeType(body): string {
        if (this.isValidURL(body.URI)) {
            // Get mime type from received url
            return mime.contentType(body.URI);
        }
        else {
            // Get mime type from base64 data
            return body.URI.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
        }
    }
}

export default AssetsService;