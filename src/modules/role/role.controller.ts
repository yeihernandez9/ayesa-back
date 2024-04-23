import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from './decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from './guards/role.guard';
import { RoleEntity } from './role.entity';

@ApiTags('Role')
@Controller('role')
export class RoleController {

  constructor(
    private readonly _roleService: RoleService,
) {
}

@Get(':id')
//@Roles('SUPER_ADMIN','ADMIN')
@ApiBearerAuth('defaultBearerAuth')
@UseGuards(AuthGuard('jwt'), RoleGuard)
async getRole(@Param('id', ParseUUIDPipe) id: string): Promise<RoleEntity> {
    const role = await this._roleService.get(id);
    return role;
}

@Get()
//@Roles('SUPER_ADMIN','ADMIN')
@ApiBearerAuth('defaultBearerAuth')
@UseGuards(AuthGuard('jwt'), RoleGuard)
async getRoles(): Promise<RoleEntity[]> {
    const roles = await this._roleService.getAll();
    return roles;
}

@Post('create')
//@Roles('SUPER_ADMIN','ADMIN')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth('defaultBearerAuth')
async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const createRole = await this._roleService.create(createRoleDto);
    return createRole;
}

@Patch(':id')
//@Roles('SUPER_ADMIN','ADMIN')
@ApiBearerAuth('defaultBearerAuth')
@UseGuards(AuthGuard('jwt'), RoleGuard)
async updateRole(@Param('id', ParseUUIDPipe) id: string, @Body() role: RoleEntity) {
    const updateRole = await this._roleService.update(id, role);
    return true;
}

@Delete(':id')
//Roles('SUPER_ADMIN','ADMIN')
@ApiBearerAuth('defaultBearerAuth')
@UseGuards(AuthGuard('jwt'), RoleGuard)
async deleteRole(@Param('id', ParseUUIDPipe) id: string) {
    await this._roleService.dalete(id);
    return true;
}
}
