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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, dateOfBirth, email, username, password } =
      this.getValidateUserFromDto(createUserDto);
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.dateOfBirth = dateOfBirth;
    user.email = email;
    user.username = username;
    user.password = password;
    return await this.userRepository.save(user);
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

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const updatedUser = this.getValidateUserFromDto(updateUserDto);
    await this.userRepository.update({ id }, updatedUser);
    return await this.getById(id);
  }

  removeUser(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  getValidateUserFromDto(dto: CreateUserDto | UpdateUserDto) {
    const {
      firstName = '',
      lastName = '',
      username = '',
      email = '',
      dateOfBirth = Date.now(),
      password = '',
    } = dto;

    return {
      firstName,
      lastName,
      username,
      email,
      dateOfBirth: new Date(dateOfBirth),
      password,
    };
  }
}
