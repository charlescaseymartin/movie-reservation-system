import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AccessToken } from '../../common/types/auth';
import { Public } from '../../common/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req): AccessToken | BadRequestException {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(
    @Body() createUser: CreateUserDto,
  ): Promise<AccessToken | BadRequestException> {
    return await this.authService.signup(createUser);
  }
}
