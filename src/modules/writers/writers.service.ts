import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Writer } from './entities/writer.entity';
import { CreateWriterDto } from './dto/create-writer.dto';
import { UpdateWriterDto } from './dto/update-writer.dto';

@Injectable()
export class WritersService {
  constructor(
    @InjectRepository(Writer)
    private readonly writerRepository: Repository<Writer>,
  ) {}

  create(createWriterDto: CreateWriterDto) {
    const { name } = createWriterDto;
    const newWriter = new Writer();
    newWriter.name = name;
    return this.writerRepository.save(newWriter);
  }

  async findAll() {
    return await this.writerRepository.find();
  }

  findOne(id: string) {
    const writer = this.writerRepository.findOneBy({ id });
    if (!writer) return null;
    return writer;
  }

  findMany(ids: string[]) {
    const writers = this.writerRepository.findBy({ id: In(ids) });
    if (!writers) return [];
    return writers;
  }

  async update(id: string, updateWriterDto: UpdateWriterDto) {
    await this.writerRepository.update({ id }, updateWriterDto);
    return await this.findOne(id);
  }

  remove(id: string) {
    return this.writerRepository.delete(id);
  }
}
