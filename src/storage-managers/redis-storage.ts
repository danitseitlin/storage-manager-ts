import { Tedis } from 'tedis';
import { StorageManager } from '../storage';
export class RedisStorage extends StorageManager { 
    public client: Tedis;
    constructor(data: Options) {
        super()
        this.client = new Tedis(data);
    }
    
    /**
     * Getting a JSON containing a key infront of their value
     * @param keys The given keys to return their values
     * @returns JSON with keys and their values
     */
    async getKeys(keys: string[]): Promise<{[key: string]: any}> {
        const values: {[key: string]: any} = {};
        for(const key of keys) 
            values[key] = await this.client.get(key);
        return values;
    }
}

/**
 * The parameters needed to create a redis client
 * @param host The redis host
 * @param port The redis port
 * @param password The redis password
 */
export interface Options {
    host: string,
    port: number,
    password?: string
}