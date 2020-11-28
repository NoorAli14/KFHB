import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import * as Redis from 'ioredis';

@Injectable()
export class RedisClientService {
  private _client: Redis.Redis;

  constructor(private readonly redisService: RedisService) {
    this._client = this.redisService.getClient();
  }

  async getClient(): Promise<Redis.Redis> {
    const client = this.redisService.getClient();
    return client;
  }

  async setValue(
    key: string,
    value: string,
    expiryMode?: string | any[],
    time?: number | string,
  ): Promise<boolean> {
    const result = await this._client.set(key, value, expiryMode, time);
    return result == 'OK';
  }

  async getValue(key: string): Promise<string> {
    const result = await this._client.get(key);
    return result;
  }

  async delValue(key: string): Promise<any> {
    return await this._client.del(key);
  }
}
