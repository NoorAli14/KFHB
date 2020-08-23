import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { X_ACCESS_TOKEN } from '@common/constants';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigurationService,
  ) {}

  async login(user) {
    const payload = { id: user.id };
    return {
      id: user.id,
      accessToken: this.jwtService.sign(payload),
    };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  getToken(userId): string {
    const payload = { id: userId, type: 'user' };
    return this.jwtService.sign(payload);
  }
  getCookieWithJwtToken(token: string): string {
    return `${X_ACCESS_TOKEN}=${token}; secure=false; HttpOnly; Path=/; Max-Age=${this.configService.JWT.EXPIRY}`;
  }

  getCookieForLogOut() {
    return `${X_ACCESS_TOKEN}=; secure=false; HttpOnly; Path=/; Max-Age=0`;
  }
}
