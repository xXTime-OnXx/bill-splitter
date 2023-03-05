import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from '../user/user.entity';

@Entity('group')
export class GroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[];
}
