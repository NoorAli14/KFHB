import { Injectable } from '@nestjs/common';
import { CommentRepository } from '@core/repository/comment.repository';

@Injectable()
export class CommentsService {
  constructor(private commentDB: CommentRepository) {}
  async findByPostIds(postIDs: any): Promise<any> {
    const comments =  await this.commentDB.findByPostIds(postIDs);
    const commentLookups = {};
    comments.forEach(comment => {
      if (!commentLookups[comment.post_id]) {
        commentLookups[comment.post_id] = [];
      }
      commentLookups[comment.post_id].push(comment);
    });
    return postIDs.map(postID => commentLookups[postID]);
  }

  async list(keys: string[]): Promise<any> {
    return this.commentDB.list(keys);
  }
  async findById(id: string, keys?: string[]): Promise<any> {
    return this.commentDB.findOne({ id: id }, keys);
  }
  async findByPostId(id: string, keys?: string[]): Promise<any> {
    return this.commentDB.findBy({ post_id: id }, keys);
  }
  async update(
    id: string,
    userObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const [user] = await this.commentDB.update({ id: id }, userObj, keys);
    return user;
  }
  async create(newUser: Record<string, any>, keys?: string[]): Promise<any> {
    const [user] = await this.commentDB.create(newUser, keys);
    return user;
  }
  async delete(id: string): Promise<any> {
    return await this.commentDB.delete({ id: id });
  }
}
