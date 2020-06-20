# storage-manager-ts
A storage manager that supports storage managing in local-storage and redis

## Local Storage
### Initialize your storage manager:
```
import { LocalStorage } from 'storage-manager-ts';
const storage = new LocalStorage();
```

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

![Unit testing](https://github.com/danitseitlin/storage-manager-ts/workflows/Unit%20testing/badge.svg)