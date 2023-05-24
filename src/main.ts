import { env } from './config/env';
import { db } from './db';
import { buildServer } from './utils/server';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

async function gracefulShutdown({
  app,
}: {
  app: Awaited<ReturnType<typeof buildServer>>;
}) {
  await app.close();
}

async function main() {
  const app = await buildServer();
  const signals = ['SIGINT', 'SIGTERM'];

  await app.listen({
    port: env.PORT,
    host: env.HOST,
  });

  await migrate(db, {
    migrationsFolder: './migrations',
  });

  for (const signal of signals) {
    process.on(signal, () => {
      gracefulShutdown({
        app,
      });
    });
  }
}

main();
