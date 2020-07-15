import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './models/user.model';

@Resolver()
export class UserResolver {
    @Query(() => [User])
     users() {
      return [new User(),new User()] 
    }

    @Query(returns => User)
    async user(@Args('id', { type: () => Number }) id: number) {
      return new User();
    }
}
