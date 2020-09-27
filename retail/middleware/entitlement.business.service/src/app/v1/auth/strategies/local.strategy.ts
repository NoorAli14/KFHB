import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../../users/users.service';
import { IHEADER, formattedHeader } from '@common/index';
import { setContext } from '@core/context';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(LocalStrategy.name);

  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, email: string, password: string): Promise<any> {
    this.logger.log(`User login request with email [${email}]`);
    const header: IHEADER = formattedHeader(request);
    setContext('HttpHeaders', header);
    const user = await this.userService.login(email, password);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
    setContext('currentUser', user);
    return user;
  }
}
