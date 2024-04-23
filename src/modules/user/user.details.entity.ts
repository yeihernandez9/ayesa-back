import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user_details')
export class UserDetailsEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: true })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    lastname: string;

    @Column({ type: 'varchar', nullable: true })
    avatar: string;

    @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
    status: string;

    @CreateDateColumn({ name: 'createdate' })
    createdate: Date;

    @UpdateDateColumn({ name: 'updateddate' })
    updateddate: Date;
}