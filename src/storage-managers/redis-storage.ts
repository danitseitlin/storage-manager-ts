import { Tedis } from 'tedis';
import { compareKeys } from '../storage';
export class RedisStorage extends Tedis { 
    constructor(data: Options) {
        super(data);
    }
    
    /**
     * Getting a JSON containing a key infront of their value
     * @param keys The given keys to return their values
     * @returns JSON with keys and their values
     */
    async getKeys(): Promise<{[key: string]: any}> {
        const values: {[key: string]: any} = {};
        const keys = await this.keys('*');
        for(const key of keys) 
            values[key] = await this.get(key);
        return values;
    }

    async filterKeys(regex: string): Promise<string[]> {
        const allKeys = await this.getKeys();
        let keys: string[] = [];
        for(const key in allKeys) {
            if(compareKeys(regex, key)) {
                keys.push(key);
            }
        }
        return keys;
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
    password?: string,
    timeout?: number
    tls?: {
      key: Buffer
      cert: Buffer
    };
}