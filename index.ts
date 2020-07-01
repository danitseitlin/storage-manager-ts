export { LocalStorage } from './local-storage';

/**
 * Returning if the keys match with a regex, * will indicate that an a key starts with the regex after the *
 * @param regex The regex to filter the key with
 * @param keys The keys to filter
 */
export function filterKeys(keys: string[], regex: regexComparison): string[] {
    const filteredKeys: string[] = [];
    for(const key of keys) {
        if(filterKey(regex, key)) {
            filteredKeys.push(key);
        }
    }
    return filteredKeys;
}
/**
 * Returning if a key match with a regex, * will indicate that an a key starts with the regex after the *
 * @param regex The regex to filter the key with
 * @param key The key to filter with the regex
 */
export function filterKey(regex: regexComparison, key: string): boolean {    
    let comparison = false;
    if(regex.startsWith !== undefined && regex.endsWith === undefined) comparison = key.startsWith(regex.startsWith);
    else if(regex.endsWith !== undefined && regex.startsWith === undefined) comparison = key.endsWith(regex.endsWith);
    else if(regex.startsWith !== undefined && regex.endsWith !== undefined) 
        comparison = key.startsWith(regex.startsWith) && key.endsWith(regex.endsWith);
    return comparison;
}

/**
 * The regex filtering options
 * @param startsWith a regex for a string at the start
 * @param endsWith a regex for a string at the end
 */
export interface regexComparison {
    startsWith?: string,
    endsWith?: string
}