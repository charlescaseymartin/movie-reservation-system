import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  create(createGenreDto: CreateGenreDto) {
    const { name } = createGenreDto;
    const newGenre = new Genre();
    newGenre.name = name;
    return this.genreRepository.save(newGenre);
  }

  async findAll() {
    return await this.genreRepository.find();
  }

  findOne(id: string) {
    const genre = this.genreRepository.findOneBy({ id });
    if (!genre) return null;
    return genre;
  }

  findMany(ids: string[]) {
    const genres = this.genreRepository.findBy({ id: In(ids) });
    if (!genres) return [];
    return genres;
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    await this.genreRepository.update({ id }, updateGenreDto);
    return await this.findOne(id);
  }

  remove(id: string) {
    return this.genreRepository.delete(id);
  }
}
