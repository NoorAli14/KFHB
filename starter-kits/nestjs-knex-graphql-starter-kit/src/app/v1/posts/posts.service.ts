import { Injectable } from '@nestjs/common';
import { PostRepository } from '@core/repository/';

@Injectable()
export class PostsService {
  constructor(private postDB: PostRepository) {}

  async findByUserIds(userIds: any): Promise<any> {
    const posts = await this.postDB.findByUserIds(userIds);
    const postLookups = {};
    posts.forEach(post => {
      if (!postLookups[post.user_id]) {
        postLookups[post.user_id] = [];
      }
      postLookups[post.user_id].push(post);
    });
    return userIds.map(userId => postLookups[userId]);
  }
  async list(keys: string[]): Promise<any> {
    return this.postDB.list(keys);
  }
  async findById(id: string, keys?: string[]): Promise<any> {
    return this.postDB.findOne({ id: id }, keys);
  }

  async findByUserId(id: string, keys?: string[]): Promise<any> {
    return this.postDB.findBy({ user_id: id }, keys);
  }
  async update(
    id: string,
    userObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const [user] = await this.postDB.update({ id: id }, userObj, keys);
    return user;
  }
  async create(newUser: Record<string, any>, keys?: string[]): Promise<any> {
    const [user] = await this.postDB.create(newUser, keys);
    return user;
  }
  async delete(id: string): Promise<any> {
    return await this.postDB.delete({ id: id });
  }
}
