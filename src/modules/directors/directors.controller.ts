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
import { DirectorsService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Controller('directors')
@UseGuards(UserRolesGuard)
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Post()
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorsService.create(createDirectorDto);
  }

  @Get()
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  async findAll() {
    return await this.directorsService.findAll();
  }

  @Get(':id')
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  findOne(@Param('id') id: string) {
    return this.directorsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  async update(
    @Param('id') id: string,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return await this.directorsService.update(id, updateDirectorDto);
  }

  @Delete(':id')
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  remove(@Param('id') id: string) {
    return this.directorsService.remove(id);
  }
}
