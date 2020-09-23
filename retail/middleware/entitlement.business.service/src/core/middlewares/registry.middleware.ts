import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { X_CHANNEL_KEY } from '@common/constants';
import { SERVICES } from '@volume/registry'

const isAuthorizedChannel = (url, channelName) => {
  const service = SERVICES[url];
  return service?.channels?.includes(channelName);
}

export const RegistryMiddleware = (): any => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const channelId = req.headers[X_CHANNEL_KEY];
    const urlPrefix = req.originalUrl.split("/").slice(1, 5).join("/");
    console.log("urlPrefix", urlPrefix)
    if(isAuthorizedChannel(urlPrefix, channelId)) {
      return next();
    }
    next(new UnauthorizedException('Unauthorized Channel'));
  };
};