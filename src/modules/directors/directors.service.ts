import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Director } from './entities/director.entity';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}

  create(createDirectorDto: CreateDirectorDto) {
    const { name } = createDirectorDto;
    const newDirector = new Director();
    newDirector.name = name;
    return this.directorRepository.save(newDirector);
  }

  async findAll() {
    return await this.directorRepository.find();
  }

  findOne(id: string) {
    const director = this.directorRepository.findOneBy({ id });
    if (!director) return null;
    return director;
  }

  findMany(ids: string[]) {
    const directors = this.directorRepository.findBy({ id: In(ids) });
    if (!directors) return [];
    return directors;
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto) {
    await this.directorRepository.update({ id }, updateDirectorDto);
    return await this.findOne(id);
  }

  remove(id: string) {
    return this.directorRepository.delete(id);
  }
}
