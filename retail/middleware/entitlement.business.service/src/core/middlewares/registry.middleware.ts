import { Request, Response, NextFunction } from 'express';
import { X_CHANNEL_KEY } from '@common/constants';
import { SERVICES } from '@volumes/registry.service';
import { UnauthorizedChannelException } from '@common/exceptions';

const isAuthorizedChannel = (url: string, channelName: string): boolean => {
  const service = SERVICES[url];
  return service?.channels?.includes(channelName);
};

export const RegistryMiddleware = (): any => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const channelId: string = (req.headers?.[X_CHANNEL_KEY] as string) || (req.query?.[X_CHANNEL_KEY] as string) || null;
    const urlPrefix: string = req.path
      ?.split('/')
      ?.slice(1, 5)
      ?.join('/');

    if (urlPrefix === 'graphql' || isAuthorizedChannel(urlPrefix, channelId)) {
      return next();
    }
    next(new UnauthorizedChannelException(channelId));
  };
};
