import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorage {
    private storage: Storage;
    constructor() {
        this.storage = localStorage;
    }

    /**
     * A function that returns the value of a key
     * @param key The key value to return
     * @param jsonParsing If the output returned will be json parsed (Not required) by default set to true...
     */
    get(key: string, jsonParsing?: boolean): string | any {
        let value: string | any = this.storage.getItem(key);
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
        return this.storage.setItem(key, value);
    }

    /**
     * A function that removes a key
     * @param key The key to remove
     */
    remove(key: string) {
        return this.storage.removeItem(key);
    }
    
    /**
     * A function that filters keys by regular expression
     * @param regex The regular expression to filter with, could be just a text, use * to mention starts with
     */
    filterKeys(regex: string): string[] {
        let keys: string[] = [];
        const storageKeys = Object.keys(this.storage);
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
    getValuesByKeys(keys: string[]): any[] {
        let values: any[] = [];
        for(let i = 0; i < keys.length; i++) {
            const key: string = keys[i];
            const value: string = this.get(key);
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
}