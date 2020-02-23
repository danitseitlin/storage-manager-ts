import { expect } from 'chai';
import { RedisStorage } from '../src/storage-managers/redis-storage';
const storage = new RedisStorage({
    host: '127.0.0.1',
    port: 6379
})
const client = storage.client;
describe('Testing databases', async function() {
    this.timeout(1000 * 60 * 60);
    it('Get/Set keys', async () => {
        client.set('example', 'value');
        const value: any = await client.get('example');
        expect(value).to.eql('value', 'Value of the key');
    });
    it('getKeys function', async () => {
        client.set('example1', 'value1');
        client.set('example2', 'value2');
        client.set('example3', 'value3');
        const object = storage.getKeys(['example1', 'example2']);
        const expectedObject = {
            'example1': 'value1',
            'example2': 'value2'
        }
        expect(expectedObject).to.eql(object, 'Equality of expected and actual objects');
    });
});