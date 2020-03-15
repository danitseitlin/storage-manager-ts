import { expect } from 'chai';
import { RedisStorage } from '../src/storage-managers/redis-storage';
let storage: RedisStorage;
describe('Testing databases', async function() {
    this.timeout(5 * 60 * 60);
    beforeEach(async function(){
        storage = new RedisStorage({
            host: '127.0.0.1',
            port: 6379
        });
    });
    afterEach(async function(){
        storage.close();
    });
    
    it('Sanity', async () => {
        await storage.set('example', 'value');
        const value: any = await storage.get('example');
        expect(value).to.eql('value', 'Value of the key');
    });

    it('getKeys function', async () => {
        const keys = await storage.getKeys();
        expect(Object.keys(keys).length).to.eql(1, 'Keys count');
    });

    it('filterKeys function', async () => {
        let keys = await storage.filterKeys('*ex');
        expect(Object.keys(keys).length).to.eql(1, 'Keys count');
        keys = await storage.filterKeys('*xxxx');
        expect(Object.keys(keys).length).to.eql(0, 'Keys count');
    });
});