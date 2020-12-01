import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';
import { AppService } from './app.service';

@ApiTags('Application')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configurationService: ConfigurationService,
  ) {}

  @Get('/info')
  @ApiOperation({
    summary: 'Information about application',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows application information.',
  })
  @ApiOkResponse()
  getInfo(): Record<string, any> {
    return this.appService.getInfo(this.configurationService);
  }
}
