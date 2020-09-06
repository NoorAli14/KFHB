import {
  Controller,
  UseGuards,
  Post,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthGuard, Header, IHEADER } from '@common/index';
import { SessionsService } from './sessions.service';
import { Evaluation } from './session.entity';

@ApiTags('Evaluation')
@Controller('evaluations')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class EvaluationsController {
  constructor(private readonly sessionService: SessionsService) {}

  @Post()
  @ApiOperation({
    summary: 'Perform Evaluation',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows evaluation information.',
  })
  @ApiCreatedResponse({
    type: Evaluation,
    description: 'Evaluation has been successfully performed.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async evaluation(@Header() header: IHEADER): Promise<Evaluation> {
    return this.sessionService.evaluation(header);
  }
}
