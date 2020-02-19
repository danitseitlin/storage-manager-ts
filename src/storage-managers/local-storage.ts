export class LocalStorage {
    private client: Storage
    constructor() {
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
    getClient() {
        return this.client;
    }
}