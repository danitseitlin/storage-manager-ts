import { expect } from 'chai';
import { RedisStorage } from '../src/storage-managers/redis-storage';
describe('Testing databases', async function() {
    this.timeout(5 * 60 * 60);
    const storage = new RedisStorage({
        host: '127.0.0.1',
        port: 6379
    });
    it('Get/Set keys', async () => {
        await storage.client.set('example', 'value');
        const value: any = await storage.client.get('example');
        expect(value).to.eql('value', 'Value of the key');
    });
    it('getKeys function', async () => {
        await storage.client.set('example1', 'value1');
        await storage.client.set('example2', 'value2');
        await storage.client.set('example3', 'value3');
        const object = await storage.getKeys(['example1', 'example2']);
        const expectedObject = {
            'example1': 'value1',
            'example2': 'value2'
        };
        expect(expectedObject).to.eql(object, 'Equality of expected and actual objects');
    });
});