import { Injectable } from '@nestjs/common';
import { AuthGuard as JwtAuthenticationGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends JwtAuthenticationGuard('jwt') {}
