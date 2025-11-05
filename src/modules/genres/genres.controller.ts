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
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
@UseGuards(UserRolesGuard)
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  async findAll() {
    return await this.genresService.findAll();
  }

  @Get(':id')
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  async update(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return await this.genresService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  remove(@Param('id') id: string) {
    return this.genresService.remove(id);
  }
}
