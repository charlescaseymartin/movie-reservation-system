import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Writer } from '../../modules/writers/entities/writer.entity';

export class Writers1762337911047 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await factoryManager.get(Writer).saveMany(30);
  }
}
