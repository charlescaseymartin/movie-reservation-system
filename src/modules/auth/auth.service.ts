import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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
    const userWithEmail = await this.usersService.findByEmail(email);
    if (!userWithEmail) {
      throw new BadRequestException('Invalid User Credentials.');
    }

    const validPassword = bcrypt.compareSync(password,userWithEmail.password);
    if (!validPassword) {
      throw new BadRequestException('Invalid User Credentials.');
    }

    return userWithEmail;
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
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: User = { ...user, password: hashedPassword } as User;
    await this.usersService.createUser(newUser);
    return this.login(newUser);
  }
}
