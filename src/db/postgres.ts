import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const initDb = async (): Promise<void> => {
  const initSql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf-8');
  await pool.query(initSql);

  const { rows } = await pool.query('SELECT COUNT(*) FROM tasks');
  const count = parseInt(rows[0].count, 10);

  if (count === 0) {
    await pool.query(
      'INSERT INTO tasks (title, done) VALUES ($1, $2), ($3, $4), ($5, $6)',
      ['Buy milk', false, 'Finish assignment', false, 'Read chapter 3', true]
    );
  }
};

export default pool;
export { pool };