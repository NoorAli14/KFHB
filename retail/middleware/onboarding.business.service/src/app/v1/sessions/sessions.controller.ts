import { Controller, UseGuards, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthGuard, Header, IHEADER } from '@common/index';
import { SessionsService } from './sessions.service';
import { Session } from './session.entity';

@ApiTags('Session')
@Controller('sessions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class SessionsController {
  constructor(private readonly sessionService: SessionsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new session',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows session information.',
  })
  @ApiCreatedResponse({
    type: Session,
    description: 'A new Session has been successfully created.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async create(@Header() header: IHEADER): Promise<Session> {
    return this.sessionService.create(header);
  }
}
