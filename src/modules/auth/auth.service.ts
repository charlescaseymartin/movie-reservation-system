import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hash } from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AccessToken } from '../../common/types/auth';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateCredentials(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid User Credentials.');
    }

    const isMatch = compareSync(password, user.password) as boolean;
    if (!isMatch) {
      throw new BadRequestException('Invalid User Credentials.');
    }

    return user;
  }

  login(user: User): AccessToken {
    const access_token = this.jwtService.sign({
      email: user.email,
      id: user.id,
    });
    return { access_token } as AccessToken;
  }

  async signup(user: CreateUserDto): Promise<AccessToken> {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) throw new BadRequestException('Email Already Used.');
    const hashedPassword = await hash(user.password, 10);
    const createdUser = await this.usersService.createUser({
      ...user,
      password: hashedPassword,
    });
    return this.login(createdUser);
  }
}
