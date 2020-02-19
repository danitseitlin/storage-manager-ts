import * as redis from 'ioredis';

export class RedisStorage { 
    private host: string;
    private port: number;
    private redisClient: redis.Redis;
    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
        this.redisClient = new redis(this.port, this.host);
    }

    /**
     * A function that returns a redis key value
     * @param key The key
     */
    async getKey(key: string): Promise<any> {
        return await this.redisClient.get(key);
    }

    /**
     * A function that sets a redis key with given value
     * @param key The key
     * @param value The value
     */
    async setKey(key: string, value: any): Promise<void> {
        await this.redisClient.set(key, value);
    }

    /**
     * A function that returns a redis hash
     * @param key The redis hash key
     */
    async getHash(key: string): Promise<{[key:string]: string | number}> {
        return await this.redisClient.hgetall(key);
    }

    /**
     * A function that sets a redis hash with a list of fields
     * @param key The redis hash key
     * @param fields The hash fields
     */
    async setHash(key: string, fields: Array<{field:string, value: string}>): Promise<void> {
        for(let i = 0; i < fields.length; i++) {
            await this.redisClient.hset(key, fields[i].field, fields[i].value);
        }
    }

    /**
     * A function that sets a hash field for a given hash key
     * @param key The redis hash key
     * @param field The hash field
     * @param value The value of the field
     */
    async setHashField(key: string, field: string, value: string): Promise<void> {
        await this.redisClient.hset(key, field, value);
    }
    
    /**
     * A function that filters keys by regular expression
     * @param regex The regular expression to filter with, could be just a text, use * to mention starts with
     */
    filterKeys(regex: string): string[] {
        let keys: string[] = [];
        const storageKeys = Object.keys(this.redisClient.keys('*'));
        for(let i = 0; i < storageKeys.length; i++) {
            const key: string = storageKeys[i];
            if(this.compareKeys(regex, key)) {
                keys.push(key);
            }
        }
        return keys;
    }
  
    /**
     * Returning an array of values of given keys
     * @param keys The given keys to return their values
     */
    async getValuesByKeys(keys: string[], keyType: 'key' | 'hash'): Promise<any[]> {
        let values: any[] = [];
        for(let i = 0; i < keys.length; i++) {
            const key: string = keys[i];
            let value: any;
            if(keyType === 'key')
                value = await this.getKey(key);
            else if(keyType === 'hash') 
                value = await this.getHash(key);
            values.push(value);
        }
        return values;
    }
  
    /**
     * Returning if the keys match with a regex, * will indicate that an a key starts with the regex after the *
     * @param regex The regex to filter the key with
     * @param key The key to filter with the regex
     */
    compareKeys(regex: string, key: string) {
        let comparison: boolean = false;
        //If key starts with * we will make sure the key starts with the given regex value
        if(regex[0] === "*") comparison = key.startsWith(regex.substr(1));
        //Otherwise, normal comparison
        else comparison = key.includes(regex);
        return comparison;
    }

    /**
     * A function that returns the used redis client
     */
    getClient() {
        return this.redisClient;
    }
}