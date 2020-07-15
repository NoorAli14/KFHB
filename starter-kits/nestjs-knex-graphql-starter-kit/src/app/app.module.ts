import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from '@common/common.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    CommonModule,
    GraphQLModule.forRoot({
      debug: false,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
