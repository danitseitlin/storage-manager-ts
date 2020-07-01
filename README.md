# Storage Manager &middot; [![GitHub license](https://img.shields.io/badge/license-BSD%203%20Clause-blue.svg)](https://github.com/danitseitlin/storage-manager-ts/blob/master/LICENSE) [![npm version](http://img.shields.io/npm/v/storage-manager-ts.svg?style=flat)](https://npmjs.org/package/storage-manager-ts "View this project on npm") ![CI](https://github.com/danitseitlin/storage-manager-ts/workflows/CI/badge.svg)
## About
A project that contains utilities for local storage & general storage purposes

## Quick start
### Initialize your local storage manager:
```
import { LocalStorage } from 'storage-manager-ts';
const storage = new LocalStorage();
const value = storage.get('key');
```

## Local storage functions list
| Function             | Description                                                                                               |
|:----------           |:--------------------------------------------------------------------------------------------------------- |
| get                  | Returning the value of a key                                                                              |
| set                  | Setting the value of a key                                                                                | 
| delete               | Deleting a key                                                                                            |
| getKeys              | Returning all the keys                                                                                    |
| convertKeyListToJSON | Building a JSON of the key + value                                                                        |

## Helper functions list
| Function   | Description                                                                                               |
|:---------- |:--------------------------------------------------------------------------------------------------------- |
| filterKeys | Returning if the keys match with a regex, * will indicate that an a key starts with the regex after the * |
| filterKey  | Returning if a key match with a regex, * will indicate that an a key starts with the regex after the *    |

