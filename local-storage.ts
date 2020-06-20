export class LocalStorage {
    storage: Storage | LocalStorageMocker
    
    /**
     * Initializing the local storage
     */
    constructor() {
        this.storage = (typeof window !== 'undefined') ? window.localStorage: new LocalStorageMocker();
    }

    /**
     * Returning the value of a key
     * @param key The key
     */
    get(key: string): any {
        return this.storage.getItem(key);
    }

    /**
     * Setting the value of a key
     * @param key The key
     * @param value The value
     */
    set(key: string, value: any): void {
        this.storage.setItem(key, value);
    }

    /**
     * Deleting a key
     * @param key The key
     */
    delete(key: string): void {
        this.storage.removeItem(key);
    }

    /**
     * Returning all the keys
     */
    getKeys(): {[key: string]: any} {
        const keys = (typeof window === 'undefined') ? this.storage.storage: this.storage;
        return keys;
    }

    /**
     * Building a JSON of the key + value
     * @param keys The list of keys
     */
    convertKeyListToJSON(keys: string[]): {[key: string]: any} {
        const json: {[key: string]: any} = {};
        for(const key of keys) json[key] = this.get(key);
        return json;
    }
}

class LocalStorageMocker {
    storage: {[key: string]: any};
    constructor() {
        this.storage = {};
    }

    /**
     * Setting a key
     * @param key The key name
     * @param value The key value
     */
    setItem(key: string, value: any): void {
        this.storage[key] = value || '';
    }

    /**
     * Returning a key
     * @param key The key name
     */
    getItem(key: string): any {
        return key in this.storage ? this.storage[key] : null;
    }

    /**
     * Removing a key
     * @param key The key name
     */
    removeItem(key: string): void {
        delete this.storage[key];
    }

    /**
     * Returning a count of the keys
     */
    length(): number {
        return Object.entries(this.storage).length;
    }
}