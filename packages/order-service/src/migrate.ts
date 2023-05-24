import { StockApplication } from "@/stock-application";
import {
  applicationLogger,
  migration,
} from "@lb/infra";
import { getMigrateProcesses } from "@/migrations/migration-processes";

const models = [''];

export async function migrate(args: string[]) {
  const existingSchema = args.includes("--rebuild") ? "drop" : "alter";

  const app = new StockApplication();

  await app.boot();
  await app.migrateSchema({ existingSchema, models });

  //Migration by file
  const migrateProcesses = await getMigrateProcesses();
  migrateProcesses?.forEach((el) => {
    const { name } = el;
    applicationLogger.info("Migration processes: %o", name);
  });

  await migration(app, migrateProcesses);
}

migrate(process.argv)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Cannot migrate database schema", err);
    process.exit(1);
  });
