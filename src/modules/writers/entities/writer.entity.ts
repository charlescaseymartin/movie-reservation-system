import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Writer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;
}
