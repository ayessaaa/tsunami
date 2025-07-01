import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool();

export default pool;
