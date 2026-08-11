import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "students",
  user: "minosoa",
  password: "minosoa01",
});
pool.on('error', (err) => {
  console.error('Erreur inattendue sur le pool de clients', err);
});

export default pool;