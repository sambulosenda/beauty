import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config';

const testConnection = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  try {
    console.log('Testing database connection...');
    const sql = postgres(process.env.DATABASE_URL);
    const db = drizzle(sql);
    
    // Try a simple query
    await sql`SELECT NOW()`;
    console.log('✅ Database connection successful!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

testConnection(); 
