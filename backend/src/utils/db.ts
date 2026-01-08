import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,

  port: Number(process.env.DB_PORT) || 5432,
});

export default pool;
export async function queryWithClient(fn) {
  const client = await pool.connect();
  try {
    return await fn(client);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
}
export async function withTransaction(fn) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await fn(client);
    await client.query('COMMIT');
  } catch (e) {
    console.log(e);
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
}
