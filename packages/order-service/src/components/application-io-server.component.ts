import { App, RestPaths } from '@/common';
import { BaseApplication, BaseComponent, JWTTokenService, SocketIOComponent, SocketIOKeys } from '@lb/infra';
import { CoreBindings, inject, LifeCycleObserver } from '@loopback/core';
import { ioRedisClient } from '@/helpers';

export class ApplicationIOServerComponent extends BaseComponent implements LifeCycleObserver {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private application: BaseApplication,
  ) {
    super({ scope: ApplicationIOServerComponent.name });
  }

  start() {
    this.logger.info('[start] Initializing Application Socket IO Server');

    const jwtTokenService = this.application.getSync<JWTTokenService>('services.JWTTokenService');
    this.application.bind(SocketIOKeys.IDENTIFIER).to(`${App.APPLICATION_NAME}_SOCKET_IO_SERVER`);
    this.application.bind(SocketIOKeys.SERVER_OPTIONS).to({
      path: RestPaths.STREAM,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
      },
    });
    this.application.bind(SocketIOKeys.REDIS_CONNECTION).to(ioRedisClient.client);
    this.application.bind(SocketIOKeys.AUTHENTICATE_HANDLER).to(async (handshake: { headers: any }) => {
      if (handshake.headers.authorization) {
        const token = jwtTokenService.extractCredentials(handshake);
        const rs = jwtTokenService.verify(token);
        return rs?.userId !== undefined && rs.userId as number > 0;
      }
      return true;
    });
    
    this.application.bind(SocketIOKeys.CLIENT_CONNECTED_HANDLER).to((...rest: any[]) => {
      // console.log(rest);
    })
    this.application.component(SocketIOComponent);
  }
}
