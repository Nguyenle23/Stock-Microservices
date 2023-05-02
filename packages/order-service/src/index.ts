import { runstockingMicro } from './stock-starter';

export const main = async () => {
  const stockService = await runstockingMicro();
  return { stockService };
};

main()
  .then(() => {
    console.log(
      '[main] Application server is now initialized! Triggering STARTED event...!',
    );
  })
  .catch(error => {
    console.error('Cannot start the application | Error: %s', error);
    process.exit(1);
  });

if (require.main !== module) {
  console.log('error', 'Invalid application module to start application!');
  process.exit(1);
}
