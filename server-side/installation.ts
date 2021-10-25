
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/

import { Client, Request } from '@pepperi-addons/debug-server'
import { PapiClient } from '@pepperi-addons/papi-sdk'
import AssetsService from './assets.service';
import { AssetsScheme } from './metadata'

export async function install(client: Client, request: Request): Promise<any> {
    const papiClient = new AssetsService(client).papiClient;
    let retVal = await createADALSchemes(papiClient);
    return retVal;
}

export async function uninstall(client: Client, request: Request): Promise<any> {
    // Purge adal table?
    return {success:true,resultObject:{}}
}

export async function upgrade(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

export async function downgrade(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

async function createADALSchemes(papiClient: PapiClient) {
    try {
        await papiClient.addons.data.schemes.post(AssetsScheme);
        return {
            success: true,
            errorMessage: ""
        }
    }
    catch (err) {
        if (err instanceof Error)
        return {
            success: false,
            errorMessage: ('message' in err) ? err.message : 'Unknown Error Occured',
        }
    }
}