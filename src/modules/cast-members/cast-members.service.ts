import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CastMember } from './entities/cast-member.entity';
import { CreateCastMemberDto } from './dto/create-cast-member.dto';
import { UpdateCastMemberDto } from './dto/update-cast-member.dto';

@Injectable()
export class CastMembersService {
  constructor(
    @InjectRepository(CastMember)
    private readonly castMemberRepository: Repository<CastMember>,
  ) {}

  create(createCastMemberDto: CreateCastMemberDto) {
    const { name } = createCastMemberDto;
    const newCast = new CastMember();
    newCast.name = name;
    return this.castMemberRepository.save(newCast);
  }

  async findAll() {
    return await this.castMemberRepository.find();
  }

  findOne(id: string) {
    const cast = this.castMemberRepository.findOneBy({ id });
    if (!cast) return null;
    return cast;
  }

  findMany(ids: string[]) {
    const casts = this.castMemberRepository.findBy({ id: In(ids) });
    if (!casts) return [];
    return casts;
  }

  async update(id: string, updateCastMemberDto: UpdateCastMemberDto) {
    await this.castMemberRepository.update({ id }, updateCastMemberDto);
    return await this.findOne(id);
  }

  remove(id: string) {
    return this.castMemberRepository.delete(id);
  }
}
