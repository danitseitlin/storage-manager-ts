export class storageMocker {
    storage: {[key: string]: any};
    constructor() {
        this.storage = {};
    }

    setItem(key: string, value: any) {
        this.storage[key] = value || '';
    }

    getItem(key: string): any {
        return key in this.storage ? this.storage[key] : null;
    }
    removeItem(key: string): void {
        delete this.storage[key];
    }
    get length(): number {
        return Object.entries(this.storage).length;
    }
}

