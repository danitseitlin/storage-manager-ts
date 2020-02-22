import { Tedis } from 'tedis';
import { StorageManager } from '../storage';
export class RedisStorage extends StorageManager{ 
    public client: Tedis;
    private host: string;
    private port: number;
    private password?: string;
    constructor(data: Options) {
        super()
        this.client = new Tedis(data);
    }

    

}

export interface Options {host: string, port: number, password?: string}