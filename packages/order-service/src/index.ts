import { applicationLogger } from '@lb/infra';
import { runStock } from './000-stock-starter';

export * from './stock-application';

export const main = async () => {
  const stock = await runStock();
  return { stock };
};

main()
  .catch(error => {
    applicationLogger.error('Cannot start the application | Error: %s', error);
    process.exit(1);
  });

if (require.main !== module) {
  applicationLogger.log('error', 'Invalid application module to start application!');
  process.exit(1);
}
