import { expect } from 'chai';
import { LocalStorage } from '../src/storage-managers/local-storage';

const storage = new LocalStorage();
describe('Testing databases', async function() {
    this.timeout(5 * 60 * 60);
    
    it('Sanity', async () => {
        storage.set('example', 'value');
        const value: any = await storage.get('example');
        expect(value).to.eql('value', 'Value of the key');
    });

    it('getKeys function', async () => {
        const keys = await storage.getKeys();
        expect(Object.keys(keys).length).to.eql(1, 'Keys count');
    });

    it('filterKeys function', async () => {
        let keys = storage.filterKeys('*ex');
        expect(Object.keys(keys).length).to.eql(1, 'Keys count');
        keys = storage.filterKeys('*xxxx');
        expect(Object.keys(keys).length).to.eql(0, 'Keys count');
    });

    it('getKeysByList function', async () => {
        storage.set('example2', 'value');
        let keys = storage.getKeysByList(['example', 'example2']);
        expect(Object.keys(keys).length).to.eql(2, 'Keys count');
    });
});