import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { RoleEntity } from './role.entity';
import { Status } from 'src/shared/entity-status.num';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly _roleRepository: Repository<RoleEntity>,
    ) { }

    async get(id: string): Promise<RoleEntity> {
        if (!id) {
            throw new BadRequestException('id must be sent');
        }

        const role = await this._roleRepository.findOne({
            where: { id, status: Status.ACTIVE },
        });

        if (!role) {
            throw new NotFoundException();
        }

        return role;
    }

    async getAll(): Promise<RoleEntity[]> {
        const roles: RoleEntity[] = await this._roleRepository.find({
            where: { status: Status.ACTIVE },
        });

        return roles;
    }

    async create(createRoleDto: CreateRoleDto): Promise<any> {
        const {name, description} = createRoleDto;

        const roleExists = await this._roleRepository.findOne({where: {name: name}});

        if(!roleExists){
            const saveRole = await this._roleRepository.save(createRoleDto);
            return saveRole
        }

        const updateRole = await this._roleRepository.update(roleExists.id, { status: Status.ACTIVE });
        return updateRole
    }

    async update(id: string, role: RoleEntity): Promise<void> {
        await this._roleRepository.update(id, role);
    }

    async dalete(id: string): Promise<void> {
        const roleExists = await this._roleRepository.findOne({
            where: { id, status: Status.ACTIVE },
        });

        if (!roleExists) {
            throw new NotFoundException();
        }

        await this._roleRepository.update(id, { status: Status.INACTIVE });
    }
}
