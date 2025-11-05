import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Director } from '../../modules/directors/entities/director.entity';

export class Directors1762337859540 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await factoryManager.get(Director).saveMany(30);
  }
}
