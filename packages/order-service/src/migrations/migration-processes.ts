import { ApplicationKeys } from '@/common';
import { MigrationProcess, createViewPolicy } from '@lb/infra';

const seedPaths = [''];

export const getMigrateProcesses = async () => {
  const rs: Array<MigrationProcess> = [];

  rs.push(createViewPolicy({ datasourceKey: `datasources.${ApplicationKeys.DS_POSTGRES}` }));

  for (const seedPath of seedPaths) {
    const process = (await import(`./${seedPath}`))?.default;

    if (!process) {
      continue;
    }

    rs.push(process);
  }

  return rs;
};
