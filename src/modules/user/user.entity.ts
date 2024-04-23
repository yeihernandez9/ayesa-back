import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserDetailsEntity } from "./user.details.entity";
import { RoleEntity } from "src/modules/role/role.entity";

@Entity('users')
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    username: string;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @OneToOne(type => UserDetailsEntity, {
        cascade: true,
        nullable: false,
        eager: true, //cuando se hace una consulta a la tabla usuario traiga la columna detalles
    })
    @JoinColumn({ name: 'datail_id' })
    details: UserDetailsEntity;

    @ManyToMany(
        type => RoleEntity,
        role => role.users,
        {eager: true}
      )
      @JoinTable({name: 'user_roles'})
      roles: RoleEntity[];

    @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
    status: string;

    @CreateDateColumn({ name: 'createdate' })
    createdate: Date;

    @UpdateDateColumn({ name: 'updateddate' })
    updateddate: Date;
}
