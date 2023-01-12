import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
class RedisService {
  private _instance: Redis;

  constructor() {
    try {
      if (!this._instance) {
        console.log('host', process.env.REDIS_HOST);
        this._instance = new Redis({
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          role: 'master',
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async get(key: string): Promise<string | null> {
    const value = await this._instance.get(key);
    return JSON.parse(value);
  }

  async set(key: string, value: string): Promise<void> {
    await this._instance.set(key, JSON.stringify(value));
  }

  async invalidate(key: string): Promise<void> {
    await this._instance.del(key);
  }
}

export { RedisService };
