import { StorageManager } from "../storage";

export class LocalStorage extends StorageManager{
    private client: Storage
    constructor() {
        super();
        this.client = localStorage;
    }

    /**
     * A function that returns the value of a key
     * @param key The key value to return
     * @param jsonParsing If the output returned will be json parsed (Not required) by default set to true...
     */
    get(key: string, jsonParsing?: boolean): string | {[key: string]: any} {
        let value: string | any = this.client.getItem(key);
        if(jsonParsing === undefined) jsonParsing = true;
        if((jsonParsing === true) && (value.includes("{") && value.includes("}"))) {
            value = JSON.parse(value);
        }
        return value;
    }

    /**
     * A function that set's the value of a key
     * @param key The key to set his value
     * @param value The value to set to the key
     */
    set(key: string, value: any) {
        return this.client.setItem(key, value);
    }

    /**
     * A function that removes a key
     * @param key The key to remove
     */
    remove(key: string) {
        return this.client.removeItem(key);
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