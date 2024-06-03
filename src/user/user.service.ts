import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly redisService: RedisService) {}

  async createUser(name: string): Promise<User> {
    const id = Date.now();
    const user: User = { id, name };
    await this.redisService.set(`user:${id}`, user);
    return user;
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.redisService.get(`user:${userId}`);
    return user;
  }
}
