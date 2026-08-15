import postgres from 'postgres';

const connectionString = process.env.NEON_DB_URL;

if (!connectionString) {
  console.warn('Warning: NEON_DB_URL environment variable is missing.');
}

// Next.js hot-reloading connection reuse in development
let sql;

if (process.env.NODE_ENV === 'production') {
  sql = postgres(connectionString || '', { ssl: 'require' });
} else {
  if (!global.postgresSqlClient) {
    global.postgresSqlClient = postgres(connectionString || '', { ssl: 'require' });
  }
  sql = global.postgresSqlClient;
}

export { sql };
