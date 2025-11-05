import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CastMember } from './entities/cast-member.entity';
import { CastMembersService } from './cast-members.service';
import { CastMembersController } from './cast-members.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CastMember])],
  controllers: [CastMembersController],
  providers: [CastMembersService],
  exports: [CastMembersService],
})
export class CastMembersModule {}
