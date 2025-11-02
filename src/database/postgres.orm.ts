import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev' });

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_USERNAME,
  POSTGRES_DB,
  POSTGRES_SYNC,
  POSTGRES_LOGGING,
} = process.env;

export const PostgresOrmConfig: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT || '4000'),
  password: POSTGRES_PASSWORD,
  username: POSTGRES_USERNAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  database: POSTGRES_DB,
  synchronize: POSTGRES_SYNC === 'true',
  logging: POSTGRES_LOGGING === 'true',
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  seeds: ['dist/database/seeds/*{.ts,.js}'],
  factories: ['dist/database/factories/**/*{.ts,.js}'],
  seedTracking: false,
  namingStrategy: new SnakeNamingStrategy(),
  cache: true,
};

const dataSource = new DataSource(PostgresOrmConfig);
export default dataSource;
dataSource.initialize();
