# storage-manager-ts
A storage manager that supports storage managing in localStorage and Redis

## Initialize your storage manager:
```
import { StorageManager } from 'wide-storage-manager';
const storage: StorageManager = new StorageManager('local');
```

## Get a key:
```
const keyAsString = storage.get('myKey', false);

//by default the response is in json form
const keyAsJson = storage.get('myKey');

//or you could give it a true value
const keyAsJson2 = storage.get('myKey', true);
```

## Set a key:
The value type is any and that means you have the flexibily to set any value you want!
```
//Set a string as value
storage.set('myKey', 'myValue');

//Set a number as value
storage.set('myKey', 5);

//Set a json as value
storage.set('myKey', { 'arg1': 'value1' });
```

## Remove a key:
```
//Removing the key from the storage
storage.remove('myKey');
```

## Filter unique pattern key names:
```
storage.set('myKey1', '1');
storage.set('myKey2', '2');
storage.set('myKey3', '3');
//use * to mention a start of the key
//Getting all of the key names starting with 'myKey'
const keys: string[] = storage.filterKeys('*myKey');
```

## Getting the values of keys:
```
storage.set('myKey1', '1');
storage.set('myKey2', '2');
storage.set('myKey3', '3');
//use * to mention a start of the key
//Getting all of the key names starting with 'myKey'
const keys: string[] = storage.filterKeys('*myKey');
//Getting all of their values
const values: any[] = storage.getValuesByKeys(keys);
```

## comparing keys by regex:
```
storage.set('myKey1', '1');
storage.set('myBoy', 'yay');
//use * to mention a start of the key
//Getting all of the key names starting with 'my'
const keys: string[] = storage.filterKeys('*my');
const regex: string = '*myKey';
//printing all of the comparisons of the keys to the second regex 
for(let i = 0; i < keys.length; i++) {
    //checking which keys starting with 'my' also start with 'myKey'
    const comparison: boolean = storage.compareKeys(regex, keys[i]);
    console.log(`key ${keys[i]} comparison for regex ${regex} is ${comparison}`);
}

```
results:
1. key myKey1 comparison for regex *myKey is true
2. key myBoy1 comparison for regex *myKey is false

![Unit testing](https://github.com/danitseitlin/storage-manager-ts/workflows/Unit%20testing/badge.svg)
