import { storageMocker} from '../../tests/mockers';

export class LocalStorage {
    storage: Storage | any
    constructor() {
        console.log(typeof window)
        if(typeof window !== 'undefined') {
            this.storage = window.localStorage;
        }
        else this.storage = new storageMocker();
        console.log(new storageMocker().constructor)
        
    }
    get(key: string): any {
        return this.storage.getItem(key);
    }
    set(key: string, value: any): void {
        this.storage.setItem(key, value);
    }
    delete(key: string): void {
        this.storage.removeItem(key);
    }
    length(): number {
        if(this.storage.constructor === '[Function: storageMocker]') return this.storage.length();
        return this.storage.length;
    }
    getKeys(): Promise<{[key: string]: any}> {
        if(this.storage.constructor === '[Function: storageMocker]') return this.storage.storage;
        else return this.storage;
    }
    /**
     * A function that filters keys by regular expression
     * @param regex The regular expression to filter with, could be just a text, use * to mention starts with
     */
    filterKeys(regex: string): string[] {
        let keys: string[] = [];
        console.log(this.getKeys())
        for(const key in this.getKeys()) {
            console.log(key);
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