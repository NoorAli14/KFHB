import { Body, Controller, Post, Get, HttpService } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { map } from 'rxjs/operators';
import { RegisterDTO, LoginDTO } from './auth.dto';
import { toGraphql } from '@common/utilities';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private http: HttpService) {}
  @Post('register')
  @ApiOperation({
    description: 'Disable Company',
    operationId: 'disable',
    summary: 'Disable Company',
  })
  @ApiBody({ description: 'company', required: true })
  @ApiResponse({ status: 400, description: 'Missing info: compId' })
  @ApiResponse({ status: 200, description: 'disable OK' })
  @ApiCreatedResponse({
    description: 'Customer has been successfully registered.',
  })
  @ApiUnprocessableEntityResponse()
  async register(@Body('customer') input: RegisterDTO): Promise<any> {
    const params = {
      query: `mutation{
          addCustomer(input: ${toGraphql(
            input,
          )}) {id first_name last_name email}
        }`,
    };

    return this.http
      .post('/graphql', params)
      .pipe(map(response => response.data?.data?.addCustomer));
  }
  @Post('login')
  @ApiOkResponse({
    description: 'Customer has been successfully login.',
  })
  @ApiUnprocessableEntityResponse()
  async login(@Body('customer') input: LoginDTO): Promise<any> {}

  @Get('me')
  @ApiOkResponse()
  async me(): Promise<any> {}
}
