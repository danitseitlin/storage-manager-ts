export var window: {[key: string]: any}  = {localStorage: null};
export function localStorageMocker() {
  let storage: {[key: string]: any} = {};
  return {
    setItem: function(key: string, value: any) {
      storage[key] = value || '';
    },
    getItem: function(key: string) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function(key: string) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    }
  };
}