import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { hash } from 'bcrypt';
import { User } from '../../modules/users/entities/user.entity';
import { UserRoles } from '../../common/enums/user-roles.enum';

export class Users1762265974241 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const password = await hash('user@user01', 10);
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(60, { password, role: UserRoles.User });
  }
}
