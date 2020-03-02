import { expect } from 'chai';
import { LocalStorage } from '../src/storage-managers/local-storage';
let storage: LocalStorage;
describe('Testing databases', async function() {
    this.timeout(5 * 60 * 60);
    storage = new LocalStorage();
    
    it('Sanity', async () => {
        await storage.set('example', 'value');
        const value: any = await storage.get('example');
        expect(value).to.eql('value', 'Value of the key');
    });

    // it('getKeys function', async () => {
    //     const keys = await storage.getKeys();
    //     expect(Object.keys(keys).length).to.eql(1, 'Keys count');
    // });

    // it('filterKeys function', async () => {
    //     let keys = await storage.filterKeys('*ex');
    //     expect(Object.keys(keys).length).to.eql(1, 'Keys count');
    //     keys = await storage.filterKeys('*xxxx');
    //     expect(Object.keys(keys).length).to.eql(0, 'Keys count');
    // });

    // it('getKeys function', async () => {
    //     await storage.set('example1', 'value1');
    //     await storage.set('example2', 'value2');
    //     await storage.set('example3', 'value3');
    //     const object = await storage.getKeys(['example1', 'example2']);
    //     const expectedObject = {
    //         'example1': 'value1',
    //         'example2': 'value2'
    //     };
    //     expect(expectedObject).to.eql(object, 'Equality of expected and actual objects');
    // });

    // it('compareKeys function', async () => {
    //     const keys = await storage.keys('*');
    //     const compare = storage.compareKeys('*ex', keys[0]);
    //     expect(compare).to.eql(true, 'Comparison');
    // });
});