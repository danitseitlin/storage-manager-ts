import { LocalStorage } from './local-storage';
import { RedisStorage } from './redis-storage';


export class StorageManager {
    private storageType: LocalStorage | RedisStorage;
    private client: any
    constructor(options: Options) {
        if(options.clientType === 'local') this.storageType = new LocalStorage();
        else if(options.clientType === 'redis') this.storageType = new RedisStorage(options.options.host, options.options.port, options.options.password);
        this.client = this.storageType.getClient();
    }
    /**
     * Returning an array of values of given keys
     * @param keys The given keys to return their values
     */
    async getValuesByKeys(keys: string[]): Promise<any[]> {
        let values: any[] = [];
        for(let i = 0; i < keys.length; i++) {
            const key: string = keys[i];
            const value = await this.client.getClient().get(key);
            values.push(value);
        }
        return values;
    }

    /**
     * A function that filters keys by regular expression
     * @param regex The regular expression to filter with, could be just a text, use * to mention starts with
     */
    filterKeys(regex: string, allKeys: string[]): string[] {
        let keys: string[] = [];
        for(let i = 0; i < allKeys.length; i++) {
            const key: string = allKeys[i];
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
    compareKeys(regex: string, key: string): boolean {
        let comparison: boolean = false;
        //If key starts with * we will make sure the key starts with the given regex value
        if(regex[0] === "*") comparison = key.startsWith(regex.substr(1));
        //Otherwise, normal comparison
        else comparison = key.includes(regex);
        return comparison;
    }
}


export interface Options {
    clientType: 'local' | 'redis',
    options: RedisOptions | null | undefined
}

export interface RedisOptions {
    host: string,
    port: number,
    password?: string
}

