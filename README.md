# storage-manager-ts 
&middot; [![GitHub license](https://img.shields.io/badge/license-BSD%203%20Clause-blue.svg)](https://github.com/danitseitlin/storage-manager-ts/blob/master/LICENSE) [![npm version](http://img.shields.io/npm/v/storage-manager-ts.svg?style=flat)](https://npmjs.org/package/storage-manager-ts "View this project on npm") ![CI](https://github.com/danitseitlin/storage-manager-ts/workflows/CI/badge.svg)
## About
A project that contains utilities for local storage & storage utilities

## Quick start
### Initialize your storage manager:
```
import { LocalStorage } from 'storage-manager-ts';
const storage = new LocalStorage();
```
## Functions list
|:---------- |:--------------------------------------------------------------------------------------------------------- |
| filterKeys | Returning if the keys match with a regex, * will indicate that an a key starts with the regex after the * |
### Get a key:
```
const keyAsString = storage.get('myKey', false);
//by default the response is in json form
const keyAsJson = storage.get('myKey');
//or you could give it a true value
const keyAsJson2 = storage.get('myKey', true);
```

### Set a key:
The value type is any and that means you have the flexibily to set any value you want!
```
//Set a key with string as value
storage.set('myKey', 'myValue');
//Set a key with number as value
storage.set('myKey', 5);
//Set a key with JSON as value
storage.set('myKey', { 'arg1': 'value1' });
```

### Remove a key:
```
//Removing the key from the storage
storage.delete('myKey');
```

### Filtering keys by regex:
```
storage.set('myKey1', '1');
storage.set('myKey2', '2');
storage.set('myKey3', '3');
//use * to mention a start of the key
//Getting all of the key names starting with 'myKey'
const keys: string[] = storage.filterKeys({start: 'myKey'});
```

### Getting key values by list:
```
storage.set('myKey1', '1');
storage.set('myKey2', '2');
storage.set('myKey3', '3');
//Getting all of the key names starting with 'myKey'
const keys: string[] = storage.filterKeys({start: 'myKey'});
//Getting all of their values
const values: any[] = storage.getKeysByList(keys);
```

### Comparing keys by regex:
```
storage.set('myKey1', '1');
storage.set('myBoy', 'yay');
//Getting all of the key names starting with 'my'
const keys: string[] = storage.filterKeys({ start: 'my'});
const regex: string = '*myKey';
//printing all of the comparisons of the keys to the second regex 
for(let i = 0; i < keys.length; i++) {
    //checking which keys starting with 'my' also start with 'myKey'
    const comparison: boolean = storage.compareKeys({start: 'myKey'}, keys[i]);
    console.log(`key ${keys[i]} comparison for regex {start: 'myKey'} is ${comparison}`);
}
```

