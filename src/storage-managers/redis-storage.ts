import { Tedis } from 'tedis';
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

    /**
     * Returning if the keys match with a regex, * will indicate that an a key starts with the regex after the *
     * @param regex The regex to filter the key with
     * @param key The key to filter with the regex
     */
    async filterKeys(regex: regexComparison): Promise<string[]> {
        const allKeys = await this.getKeys();
        let keys: string[] = [];
        for(const key in allKeys) {
            if(this.compareKeys(regex, key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    /**
     * Returning if the keys match with a regex, * will indicate that an a key starts with the regex after the *
     * @param regex The regex to filter the key with
     * @param key The key to filter with the regex
     */
    compareKeys(regex: regexComparison, key: string): boolean {
        /** Options
         * *:start:* - starts with this text
         * *:end:* - ends with this text
         */        
        let comparison = false;
        if(regex.start !== undefined && regex.end === undefined) comparison = key.startsWith(regex.start);
        else if(regex.end !== undefined && regex.start === undefined) comparison = key.endsWith(regex.end);
        else if(regex.start !== undefined && regex.end !== undefined) {
            if(key.startsWith(regex.start) && key.endsWith(regex.end)) comparison = true;
        }
        return comparison;
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

/**
 * The regex filtering options
 * @param start a regex for a string at the start
 * @param end a regex for a string at the end
 */
interface regexComparison {
    start?: string,
    end?: string
}