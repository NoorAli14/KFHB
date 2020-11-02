import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { X_CHANNEL_KEY } from '@common/constants';
import { SERVICES } from '@root/volumes/registry.service';

const isAuthorizedChannel = (url: string, channelName: string): boolean => {
  const service = SERVICES[url];
  return service?.channels?.includes(channelName);
}

export const RegistryMiddleware = (): any => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const channelId: string = req.headers[X_CHANNEL_KEY] as string || req.query[X_CHANNEL_KEY] as string || null;
    console.log(`RegistryMiddleware:: Initialize registry middleware [${channelId}]`);
    const urlPrefix: string = req.path?.split("/")?.slice(1, 5)?.join("/");
    if (urlPrefix === 'graphql' || isAuthorizedChannel(urlPrefix, channelId)) {
      return next();
    }
    next(new UnauthorizedException('Unauthorized Channel'));
  };
};