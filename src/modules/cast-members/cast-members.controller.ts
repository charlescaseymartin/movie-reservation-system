import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserRolesGuard } from '../../common/guards/user-roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRoles } from '../../common/enums/user-roles.enum';
import { CastMembersService } from './cast-members.service';
import { CreateCastMemberDto } from './dto/create-cast-member.dto';
import { UpdateCastMemberDto } from './dto/update-cast-member.dto';

@Controller('cast-members')
@UseGuards(UserRolesGuard)
export class CastMembersController {
  constructor(private readonly castMembersService: CastMembersService) {}

  @Post()
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  create(@Body() createCastMemberDto: CreateCastMemberDto) {
    return this.castMembersService.create(createCastMemberDto);
  }

  @Get()
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  async findAll() {
    return await this.castMembersService.findAll();
  }

  @Get(':id')
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  findOne(@Param('id') id: string) {
    return this.castMembersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  async update(
    @Param('id') id: string,
    @Body() updateCastMemberDto: UpdateCastMemberDto,
  ) {
    return await this.castMembersService.update(id, updateCastMemberDto);
  }

  @Delete(':id')
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  remove(@Param('id') id: string) {
    return this.castMembersService.remove(id);
  }
}
