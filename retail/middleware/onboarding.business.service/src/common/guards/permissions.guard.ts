import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.getArgs()[0];

    const routePermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!routePermissions && request?.userType === 'customer') return true;
    if (!routePermissions) return false;

    const permissions: string[] = request?.permissions;
    const hasPermission = () =>
      routePermissions.some(routePermission =>
        permissions.includes(routePermission),
      );

    return hasPermission();
  }
}
