import path from 'path';
import { OrderServiceApplication } from './application';

const serverProps = {
  port: +(process.env.APP_ENV_SERVER_PORT ?? 3000),
  host: process.env.APP_ENV_SERVER_HOST,
  basePath: process.env.APP_ENV_SERVER_BASE_PATH,
};

export const beConfigs = {
  rest: {
    ...serverProps,
    gracePeriodForClose: 5000,
    openApiSpec: {
      endpointMapping: {
        '/openapi.json': { version: '3.0.0', format: 'json' },
        '/openapi.yaml': { version: '3.0.0', format: 'yaml' },
      },
    },
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      maxAge: 86400,
      credentials: true,
    },
    requestBodyParser: {
      json: { limit: '10mb' },
    },
  },
};

// Run the application
export const runstockingMicro = async () => {
  const app = new OrderServiceApplication(beConfigs);
  // applicationContext.bind(BindingKeys.APPLICATION_INSTANCE).to(app);

  console.log(' Getting ready to start up %s Application...Order');
  await app.boot();
  await app.start();

  const logFolder = path
    .resolve(__dirname, process.env.APP_ENV_LOGGER_FOLDER_PATH ?? '')
    .toString();
  const { url } = app.restServer;
  console.log(' %s Server is now running... StockingService');
  console.log(' Server URL: %s', url);
  console.log(' Log folder: %s', logFolder);
  return app;
};
