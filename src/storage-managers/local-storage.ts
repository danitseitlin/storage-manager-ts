import { storageMocker} from '../mockers';

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
        for(const key in keys) {
            finalKeys[key] = this.get(key);
        }
        return finalKeys;
    }

    /**
     * A function that filters keys by regular expression
     * @param regex The regular expression to filter with, could be just a text, use * to mention starts with
     */
    filterKeys(regex: string): string[] {
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
    compareKeys(regex: string, key: string): boolean {
        let comparison: boolean = false;
        //If key starts with * we will make sure the key starts with the given regex value
        if(regex[0] === "*") comparison = key.startsWith(regex.substr(1));
        //Otherwise, normal comparison
        else comparison = key.includes(regex);
        return comparison;
    }
}