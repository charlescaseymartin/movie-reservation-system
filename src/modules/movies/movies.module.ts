import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { CastMember } from '../cast-members/entities/cast-member.entity';
import { Director } from '../directors/entities/director.entity';
import { Genre } from '../genres/entities/genre.entity';
import { Writer } from '../writers/entities/writer.entity';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { CastMembersService } from '../cast-members/cast-members.service';
import { DirectorsService } from '../directors/directors.service';
import { GenresService } from '../genres/genres.service';
import { WritersService } from '../writers/writers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, CastMember, Director, Genre, Writer]),
  ],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    CastMembersService,
    DirectorsService,
    GenresService,
    WritersService,
  ],
  exports: [MoviesService],
})
export class MoviesModule {}
