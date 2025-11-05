import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Genre } from '../../genres/entities/genre.entity';
import { Director } from '../../directors/entities/director.entity';
import { Writer } from '../../writers/entities/writer.entity';
import { CastMember } from '../../cast-members/entities/cast-member.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  title?: string;

  @Column({ type: 'varchar', length: 250 })
  description?: string;

  @Column({ type: 'varchar', length: 250 })
  poster?: string;

  @Column({ type: 'varchar', length: 250 })
  price?: string;

  @Column({ type: 'date' })
  releaseDate?: Date;

  @Column({ type: 'varchar', length: 10 })
  certification?: string;

  @Column({ type: 'int' })
  watchTimeSeconds?: number;

  @Column({ type: 'float' })
  rating?: number;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres?: Genre[];

  @ManyToMany(() => Director)
  @JoinTable()
  directors?: Director[];

  @ManyToMany(() => Writer)
  @JoinTable()
  writers?: Writer[];

  @ManyToMany(() => CastMember)
  @JoinTable()
  topCasts?: CastMember[];

  @Column({ default: false })
  isPublished: boolean;
}
