import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { UserEntity } from './user.entity';
import { Roles } from '../role/decorators/role.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly _userService: UserService,
){
}

@Get(':id')
//@Roles('SUPER_ADMIN','ADMIN')
@ApiBearerAuth('defaultBearerAuth')
@UseGuards(AuthGuard('jwt'), RoleGuard)
async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    const user = await this._userService.get(id);
    return user;
}

@Get()
//@Roles('SUPER_ADMIN','ADMIN')
@ApiBearerAuth('defaultBearerAuth')
@UseGuards(AuthGuard('jwt'), RoleGuard)
async getUsers(): Promise<UserEntity[]> {
    const users = await this._userService.getAll();
    return users;
}

@Post('create')
//@Roles('SUPER_ADMIN','ADMIN')
@ApiBearerAuth('defaultBearerAuth')
@UseGuards(AuthGuard('jwt'), RoleGuard)
async createUser(@Body() user: UserEntity): Promise<UserEntity> {
    const createUser = await this._userService.create(user);
    return createUser;
}

@Patch(':id')
//@Roles('SUPER_ADMIN','ADMIN')
@ApiBearerAuth('defaultBearerAuth')
@UseGuards(AuthGuard('jwt'), RoleGuard)
async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: UserEntity) {
    const updateUser = await this._userService.update(id, user);
    return updateUser;
}

@Delete(':id')
//@Roles('SUPER_ADMIN','ADMIN')
@ApiBearerAuth('defaultBearerAuth')
@UseGuards(AuthGuard('jwt'), RoleGuard)
async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const deleteUser = await this._userService.dalete(id);
    return deleteUser;
}

@Post('/setRole/:userId/:roleId')
//@Roles('SUPER_ADMIN','ADMIN')
@ApiBearerAuth('defaultBearerAuth')
@UseGuards(AuthGuard('jwt'), RoleGuard)
async setRoleToUser(@Param('userId', ParseUUIDPipe) userId: string, @Param('roleId', ParseUUIDPipe) roleId: string){
    return this._userService.setRolToUser(userId, roleId);
}
}
