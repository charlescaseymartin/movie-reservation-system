import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PostgresOrmConfig } from './database/postgres.orm';
import { JwtGuard } from './common/guards/jwt.guard';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { UserRolesGuard } from './common/guards/user-roles.guard';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MoviesModule } from './modules/movies/movies.module';
import { GenresModule } from './modules/genres/genres.module';
import { CastMembersModule } from './modules/cast-members/cast-members.module';
import { DirectorsModule } from './modules/directors/directors.module';
import { WritersModule } from './modules/writers/writers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(PostgresOrmConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'),
      exclude: ['/api/{*test}'],
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
    GenresModule,
    CastMembersModule,
    DirectorsModule,
    WritersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: UserRolesGuard,
    },
  ],
})
export class AppModule {}
