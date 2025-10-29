import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<Users> {
    const user: Users = new Users();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.gender = createUserDto.gender;
    return this.userRepository.save(user);
  }

  findAllUser(): Promise<Users[]> {
    return this.userRepository.find();
  }

  viewUser(id: number): Promise<Users | null> {
    return this.userRepository.findOneBy({ id });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user: Users = new Users();
    user.name = updateUserDto.name ? updateUserDto.name : '';
    user.age = updateUserDto.age ? updateUserDto.age : 0;
    user.email = updateUserDto.email ? updateUserDto.email : '';
    user.username = updateUserDto.username ? updateUserDto.username : '';
    user.password = updateUserDto.name ? updateUserDto.name : '';
    user.id = id;
    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
