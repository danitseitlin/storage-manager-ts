import { expect } from 'chai';
import { StorageManager } from '../src/storage';
import { RedisStorage } from '../src/storage-managers/redis-storage';
const storage = new RedisStorage({
    host: '127.0.0.1',
    port: 6379
})
const client = storage.client;
describe('Testing databases', async function() {
    this.timeout(1000 * 60 * 60);
    it('Set key', async () => {
        client.set('redis', 'key');
        const value: any = await client.get('redis');
        expect(value).eql('key', 'The value of the key');
    });
    it('Get key', async () => {
        
    });
});