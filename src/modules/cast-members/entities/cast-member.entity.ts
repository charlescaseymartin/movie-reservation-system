import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CastMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;
}
