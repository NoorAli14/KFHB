import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { graphqlFields } from '@common/utilities';
import { FOREIGN_KEYS } from '@common/constants';

export const Fields = createParamDecorator(
  async (model: any, context: ExecutionContext & { [key: string]: any }) => {
    const ctx: any = GqlExecutionContext.create(context);
    const keys = graphqlFields(ctx.getInfo());
    return addForeignKeys(model.name, keys);
  },
);

function addForeignKeys(modelName: string, keys: string[]) {
  if (FOREIGN_KEYS[modelName] && FOREIGN_KEYS[modelName].length > 0)
    FOREIGN_KEYS[modelName].forEach(element => {
      keys.push(element);
    });
  return keys;
}
