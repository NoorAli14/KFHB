import { Injectable } from '@nestjs/common';
import { PostRepository } from '@rubix/core/repository/';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(private postDB: PostRepository) {}

  async list(columns: string[]): Promise<Post[]> {
    return this.postDB.findAll(columns);
  }
  async findById(id: string, columns?: string[]): Promise<Post> {
    return this.postDB.findOne({ id }, columns);
  }

  async findByUserId(id: string, columns?: string[]): Promise<Post> {
    return this.postDB.findBy({ user_id: id }, columns);
  }
  async update(
    id: string,
    postOBJ: {[key: string]: any},
    columns?: string[],
  ): Promise<Post> {
    const [user] = await this.postDB.update({ id }, postOBJ, columns);
    return user;
  }
  async create(postOBJ: {[key: string]: any}, columns?: string[]): Promise<Post> {
    const [user] = await this.postDB.create(postOBJ, columns);
    return user;
  }
  async delete(id: string): Promise<any> {
    return await this.postDB.delete({ id });
  }
}
