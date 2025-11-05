import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '../../../common/enums/user-roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  firstName: string;

  @Column({ type: 'varchar', length: 150 })
  lastName: string;

  @Column({ type: 'varchar', length: 150 })
  username: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.User })
  role: UserRoles;
}
