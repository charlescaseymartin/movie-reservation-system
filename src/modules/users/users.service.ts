import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) return null;
    return user;
  }

  async findAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.userRepository.update({ id }, updateUserDto);
    return await this.getById(id);
  }

  removeUser(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
