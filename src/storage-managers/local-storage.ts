import { storageMocker} from './local-storage-mocker';

export class LocalStorage {
    storage: Storage | any
    
    /**
     * Initializing the local storage
     */
    constructor() {
        if(typeof window !== 'undefined') {
            this.storage = window.localStorage;
        }
        else this.storage = new storageMocker();
        
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
     * Returning the count of keys
     */
    length(): number {
        if(typeof window === 'undefined') return this.storage.length();
        else return this.storage.length;
    }

    /**
     * Returning all the keys
     */
    getKeys(): {[key: string]: any} {
        if(typeof window === 'undefined') return this.storage.storage;
        else return this.storage;
    }

    /**
     * Getting the keys and values of given keys
     * @param keys The list of keys
     */
    getKeysByList(keys: string[]): {[key: string]: any} {
        let finalKeys: {[key: string]: any} = {};
        for(const key of keys) {
            finalKeys[key] = this.get(key);
        }
        return finalKeys;
    }

    /**
     * A function that filters keys by regular expression
     * @param regex The regular expression to filter with, could be just a text, use * to mention starts with
     */
    filterKeys(regex: regexComparison): string[] {
        let keys: string[] = [];
        for(const key in this.getKeys()) {
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
 * The regex filtering options
 * @param start a regex for a string at the start
 * @param end a regex for a string at the end
 */
interface regexComparison {
    start?: string,
    end?: string
}