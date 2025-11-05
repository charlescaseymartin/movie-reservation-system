import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Genre } from '../../modules/genres/entities/genre.entity';

export class Genres1762337893403 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await factoryManager.get(Genre).saveMany(30);
  }
}
