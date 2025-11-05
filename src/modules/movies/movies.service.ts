import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CastMembersService } from '../cast-members/cast-members.service';
import { DirectorsService } from '../directors/directors.service';
import { GenresService } from '../genres/genres.service';
import { WritersService } from '../writers/writers.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    private readonly castMemberService: CastMembersService,
    private readonly directorsService: DirectorsService,
    private readonly genresService: GenresService,
    private readonly writersService: WritersService,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const {
      title,
      description,
      poster,
      price,
      releaseDate,
      certification,
      watchTimeSeconds,
      rating,
      genres,
      directors,
      writers,
      topCasts,
      isPublished,
    } = await this.getValidateMovieFromDto(createMovieDto);

    const newMovie = new Movie();
    newMovie.title = title;
    newMovie.description = description;
    newMovie.poster = poster;
    newMovie.price = price;
    newMovie.releaseDate = new Date(releaseDate);
    newMovie.certification = certification;
    newMovie.watchTimeSeconds = watchTimeSeconds;
    newMovie.rating = rating;
    newMovie.genres = genres;
    newMovie.directors = directors;
    newMovie.writers = writers;
    newMovie.topCasts = topCasts;
    newMovie.isPublished = isPublished;

    return this.movieRepository.save(newMovie);
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const count = { take: limit, skip: offset };
    const [data, total] = await this.movieRepository.findAndCount(count);
    const nextPage = total > limit + offset ? limit + offset : null;
    return { data, total, limit, offset, nextPage };
  }

  findOne(id: string) {
    const movie = this.movieRepository.findOneBy({ id });
    if (!movie) return null;
    return movie;
  }

  async movieSearch() {}

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const updatedMovie = await this.getValidateMovieFromDto(updateMovieDto);
    await this.movieRepository.update({ id }, updatedMovie);
    return await this.findOne(id);
  }

  remove(id: string) {
    return this.movieRepository.delete(id);
  }

  async getValidateMovieFromDto(dto: CreateMovieDto | UpdateMovieDto) {
    const {
      title = '',
      description = '',
      poster = '',
      price = '',
      releaseDate = Date.now(),
      certification = 'PG',
      watchTimeSeconds = 0,
      rating = 0,
      genres = [],
      directors = [],
      writers = [],
      topCasts = [],
      isPublished = false,
    } = dto;

    const genreObjects = await this.genresService.findMany(genres);
    const directorObjects = await this.directorsService.findMany(directors);
    const writerObjects = await this.writersService.findMany(writers);
    const topCastObjects = await this.castMemberService.findMany(topCasts);

    return {
      title,
      description,
      poster,
      price,
      releaseDate: new Date(releaseDate),
      certification,
      watchTimeSeconds,
      rating,
      genres: genreObjects,
      directors: directorObjects,
      writers: writerObjects,
      topCasts: topCastObjects,
      isPublished,
    };
  }
}
