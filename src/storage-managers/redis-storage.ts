import { Tedis } from 'tedis';

export class RedisStorage { 
    private client: Tedis;

    constructor(private host: string, private port: number, private password: string) {
        this.client = new Tedis({
            host: this.host,
            port: this.port,
            password: this.password
        });
    }

    /**
     * Returning the client
     * @returns The redis client
     */
    getClient(): Tedis {
        return this.client;
    }
}