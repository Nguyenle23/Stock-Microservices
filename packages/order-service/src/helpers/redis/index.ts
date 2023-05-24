import { EnvironmentKeys } from '@/common';
import { RedisHelper, applicationEnvironment } from '@lb/infra';

const ioRedisOptions = {
  name: 'STOCK_IO_REDIS',
  port: applicationEnvironment.get<number>(EnvironmentKeys.APP_ENV_REDIS_SOCKET_IO_PORT) ?? 6379,
  host: applicationEnvironment.get<string>(EnvironmentKeys.APP_ENV_REDIS_SOCKET_IO_HOST),
  password: applicationEnvironment.get<string>(EnvironmentKeys.APP_ENV_REDIS_SOCKET_IO_PASSWORD),
}

export const ioRedisClient = new RedisHelper(ioRedisOptions)

