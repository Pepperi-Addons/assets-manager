import { Client, Request } from '@pepperi-addons/debug-server'
import AssetsService from './assets.service';

export async function assets(client: Client, request: Request) {
    const service = new AssetsService(client);

    if (request.method == 'POST') {
        return service.upsert(request.body);
    }
    else if (request.method == 'GET') {
        return await service.find(request.query);
    }
};