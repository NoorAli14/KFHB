import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Evaluation')
@Controller('evaluation')
export class EvaluationController {
  @Post('/')
  @ApiOkResponse()
  @ApiUnprocessableEntityResponse()
  async check(): Promise<any> {}
}
