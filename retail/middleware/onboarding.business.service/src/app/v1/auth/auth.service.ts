import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  X_ACCESS_TOKEN,
  X_REFRESH_TOKEN,
  RedisClientService,
  ConfigurationService,
} from '@common/index';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisClientService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigurationService,
  ) {}

  async validateRefreshToken(jwt: string): Promise<boolean | any> {
    try {
      const payload = this.jwtService.verify(jwt, {
        secret: this.configService.JWT.REFRESH_SECRET,
      });
      const refreshToken: any = await this.redisService.getValue(payload.aud);
      return refreshToken === jwt ? payload : false;
    } catch (error) {
      return false;
    }
  }
  async getRefreshToken(userId: string): Promise<string> {
    const payload = { aud: userId, type: 'user' };
    const token: string = this.jwtService.sign(payload, {
      secret: this.configService.JWT.REFRESH_SECRET,
      expiresIn: `${this.configService.JWT.REFRESH_EXPIRY_SECONDS}s`,
    });
    await this.redisService.setValue(
      userId,
      token,
      'EX',
      this.configService.JWT.REFRESH_EXPIRY_SECONDS,
    );
    return token;
  }

  getToken(userId): string {
    const payload = { id: userId, type: 'user' };
    return this.jwtService.sign(payload, {
      secret: this.configService.JWT.SECRET,
      expiresIn: `${this.configService.JWT.EXPIRY_SECONDS}s`,
    });
  }

  getCookieWithJwtToken(token: string): string {
    return `${X_ACCESS_TOKEN}=${token}; HttpOnly; Path=/; Max-Age=${this.configService.JWT.EXPIRY_SECONDS}`;
  }

  async getCookieForLogOut(userId: string) {
    await this.redisService.delValue(userId);
    return `${X_ACCESS_TOKEN}=; HttpOnly; Path=/; Max-Age=0`;
  }

  setHeaders(res: any, refresh_token: string, userId: string): any {
    const token: string = this.getToken(userId);
    res.setHeader(X_REFRESH_TOKEN, refresh_token);
    res.setHeader(X_ACCESS_TOKEN, token);
    res.setHeader('Set-Cookie', this.getCookieWithJwtToken(token));
    return res;
  }
}
