import { Injectable } from '@nestjs/common';
import { RedisService } from './infra/redis/redis';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  constructor(private readonly _redisService: RedisService) {}

  async getLink(params: { key: string }): Promise<string> {
    const { key } = params;
    const value = await this._redisService.get(key);
    return value;
  }

  async shortenLink(params: { url: string }): Promise<string> {
    const { url } = params;
    const uniqueHash = randomUUID().slice(0, 6);
    await this._redisService.set(uniqueHash, url);
    const shortenedLink = 'http://shortener.dev/' + uniqueHash;
    return shortenedLink;
  }
}
