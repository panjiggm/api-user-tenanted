import { env } from './config/env';
import { buildServer } from './utils/server';

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

  for (const signal of signals) {
    process.on(signal, () => {
      gracefulShutdown({
        app,
      });
    });
  }
}

main();
