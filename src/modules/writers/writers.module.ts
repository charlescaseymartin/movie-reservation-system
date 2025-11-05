import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Writer } from './entities/writer.entity';
import { WritersService } from './writers.service';
import { WritersController } from './writers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Writer])],
  controllers: [WritersController],
  providers: [WritersService],
  exports: [WritersService],
})
export class WritersModule {}
