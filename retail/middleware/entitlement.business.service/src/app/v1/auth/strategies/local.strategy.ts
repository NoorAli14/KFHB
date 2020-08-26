import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log(JSON.stringify({ email, password }, null, 2));
    const user = await this.userService.login(email, password);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
    return user;
  }
}
