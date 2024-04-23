import { UserEntity } from "src/modules/user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Role {}
@Entity('roles')
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @ManyToMany(
    type => UserEntity,
    users => users.roles,
  )
  @JoinColumn()
  users: UserEntity[];

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}