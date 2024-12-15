import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import 'dotenv/config'

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  console.log('Starting migration...');
  console.log('Connecting to database...');
  
  try {
    const sql = postgres(process.env.DATABASE_URL, { max: 1 });
    const db = drizzle(sql);

    console.log('Connected to database');
    console.log('Running migrations...');
    
    const start = Date.now();
    await migrate(db, { migrationsFolder: './drizzle' });
    const end = Date.now();

    console.log(`✅ Migrations completed in ${end - start}ms`);
    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigrate(); 
