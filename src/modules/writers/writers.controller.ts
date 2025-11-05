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
import { WritersService } from './writers.service';
import { CreateWriterDto } from './dto/create-writer.dto';
import { UpdateWriterDto } from './dto/update-writer.dto';

@Controller('writers')
@UseGuards(UserRolesGuard)
export class WritersController {
  constructor(private readonly writersService: WritersService) {}

  @Post()
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  create(@Body() createWriterDto: CreateWriterDto) {
    return this.writersService.create(createWriterDto);
  }

  @Get()
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  async findAll() {
    return await this.writersService.findAll();
  }

  @Get(':id')
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  findOne(@Param('id') id: string) {
    return this.writersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  async update(
    @Param('id') id: string,
    @Body() updateWriterDto: UpdateWriterDto,
  ) {
    return await this.writersService.update(id, updateWriterDto);
  }

  @Delete(':id')
  @Roles(UserRoles.Admin, UserRoles.Moderator)
  remove(@Param('id') id: string) {
    return this.writersService.remove(id);
  }
}
