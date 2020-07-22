import { Controller, Post, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Account')
@Controller('accounts')
export class AccountsController {
  
  @Post('/')
  @ApiOkResponse()
  @ApiUnprocessableEntityResponse()
  async create(): Promise<any> {}

  @Get('/view')
  @ApiOkResponse()
  @ApiUnprocessableEntityResponse()
  async view(): Promise<any> {}
}
