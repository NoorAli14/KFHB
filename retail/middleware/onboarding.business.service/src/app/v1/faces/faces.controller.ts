import { Body, Controller, Post, HttpService } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { map } from 'rxjs/operators';

@ApiTags('Face')
@Controller('faces')
export class FacesController {
  constructor() {}
  @Post('/selfie')
  @ApiCreatedResponse({
    description: 'Customer has been successfully registered.',
  })
  @ApiUnprocessableEntityResponse()
  async selfie(): Promise<any> { }
  
  @Post('/liveness')
  @ApiCreatedResponse({
    description: 'Customer has been successfully registered.',
  })
  @ApiUnprocessableEntityResponse()
  async liveness(): Promise<any> {}
}
