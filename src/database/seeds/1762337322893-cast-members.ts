import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { CastMember } from '../../modules/cast-members/entities/cast-member.entity';

export class CastMembers1762337322893 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await factoryManager.get(CastMember).saveMany(30);
  }
}
