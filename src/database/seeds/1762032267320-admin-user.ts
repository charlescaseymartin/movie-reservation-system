import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { hash } from 'bcrypt';
import { User } from '../../modules/users/entities/user.entity';
import { UserRoles } from '../../common/enums/user-roles.enum';

export class AdminUser1762032267320 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const userRepo = dataSource.getRepository(User);
        const testPassword = await hash('admin@user01', 10);
        const testAdminUser = new User();
        testAdminUser.name = 'Admin';
        testAdminUser.username = 'admin01';
        testAdminUser.email = 'admin-test-email';
        testAdminUser.age = 47;
        testAdminUser.password = testPassword;
        testAdminUser.role = UserRoles.Admin;
        await userRepo.save(testAdminUser);
    }
}
