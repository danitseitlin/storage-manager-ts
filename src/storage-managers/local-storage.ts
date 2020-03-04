// // let Storage = window;
 const Storage = window.Storage;
// export class LocalStorage extends Storage {
//     // private client: Storage
//     constructor() {
//         super();
//         // this.client = localStorage;
//     }

//     // /**
//     //  * A function that returns the value of a key
//     //  * @param key The key value to return
//     //  * @param jsonParsing If the output returned will be json parsed (Not required) by default set to true...
//     //  */
//     // get(key: string, jsonParsing?: boolean): string | {[key: string]: any} {
//     //     let value: string | any = this.client.getItem(key);
//     //     if(jsonParsing === undefined) jsonParsing = true;
//     //     if((jsonParsing === true) && (value.includes("{") && value.includes("}"))) {
//     //         value = JSON.parse(value);
//     //     }
//     //     return value;
//     // }

//     // /**
//     //  * A function that set's the value of a key
//     //  * @param key The key to set his value
//     //  * @param value The value to set to the key
//     //  */
//     // set(key: string, value: any) {
//     //     return this.client.setItem(key, value);
//     // }

//     // /**
//     //  * A function that removes a key
//     //  * @param key The key to remove
//     //  */
//     // remove(key: string) {
//     //     return this.client.removeItem(key);
//     // }
    
//     /**
//      * Getting a JSON containing a key infront of their value
//      * @param keys The given keys to return their values
//      * @returns JSON with keys and their values
//      */
//     async getKeys(keys: string[]): Promise<{[key: string]: any}> {
//         const values: {[key: string]: any} = {};
//         for(const key of keys) 
//             values[key] = await this.client.get(key);
//         return values;
//     }
// }

/** This Web Storage API interface provides access to a particular domain's session or local storage. It allows, for example, the addition, modification, or deletion of stored data items. */
interface LocalStorage {
    /**
     * Returns the number of key/value pairs currently present in the list associated with the object.
     */
    readonly length: number;
    /**
     * Empties the list associated with the object of all key/value pairs, if there are any.
     */
    clear(): void;
    /**
     * Returns the current value associated with the given key, or null if the given key does not exist in the list associated with the object.
     */
    getItem(key: string): string | null;
    /**
     * Returns the name of the nth key in the list, or null if n is greater than or equal to the number of key/value pairs in the object.
     */
    key(index: number): string | null;
    /**
     * Removes the key/value pair with the given key from the list associated with the object, if a key/value pair with the given key exists.
     */
    removeItem(key: string): void;
    /**
     * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
     * 
     * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
     */
    setItem(key: string, value: string): void;
    [name: string]: any;
}

export declare var LocalStorage: {
    prototype: LocalStorage;
    new(): LocalStorage;
};