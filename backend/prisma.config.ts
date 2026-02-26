import { defineConfig } from '@prisma/config';
import { config } from 'dotenv';

// Bezwzględnie ładujemy .env zanim Prisma ruszy
config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});