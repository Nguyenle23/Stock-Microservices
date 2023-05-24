import { configs } from './000-stock-starter';
import {StockApplication} from './stock-application';

/**
 * Export the OpenAPI spec from the application
 */
async function exportOpenApiSpec(): Promise<void> {
  const outFile = process.argv[2] ?? '';
  const app = new StockApplication(configs);
  await app.boot();
  await app.exportOpenApiSpec(outFile);
}

exportOpenApiSpec().catch(err => {
  console.error('Fail to export OpenAPI spec from the application.', err);
  process.exit(1);
});
