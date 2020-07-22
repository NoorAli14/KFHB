import { Resolver } from '@nestjs/graphql';
import { TemplateGQL } from './template.model';

@Resolver(TemplateGQL)
export class TemplatesResolver {}
