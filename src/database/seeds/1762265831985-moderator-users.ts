import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { hash } from 'bcrypt';
import { User } from '../../modules/users/entities/user.entity';
import { UserRoles } from '../../common/enums/user-roles.enum';

export class ModeratorUsers1762265831985 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const password = await hash('mod@user01', 10);
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(6, { password, role: UserRoles.Moderator });
  }
}
