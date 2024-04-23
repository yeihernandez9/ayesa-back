import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { RoleRepository } from '../role/role.repository';
import { Status } from 'src/shared/entity-status.num';
import { UserEntity } from './user.entity';
import { UserDetailsEntity } from './user.details.entity';
import { RoleEntity } from '../role/role.entity';
import { Repository, getConnection } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
){}

async get(id: string): Promise<any> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user = await this._userRepository.findOne({
      where: { id, status: Status.ACTIVE },
    });

    if (!user) {
      throw new NotFoundException();
    }
    delete user.password
    const message = 'success'

    return {statusCode: 200, message, data: user};
  }

  async getAll(): Promise<any> {
    const users: UserEntity[] = await this._userRepository.find({
      where: { status: Status.ACTIVE },
    });

    const message = 'success'

    return {statusCode: 200, message, data: users};
  }

  async create(user: UserEntity): Promise<UserEntity>{
    const details = new UserDetailsEntity()
    user.details = details;

    const repo = await getConnection().getRepository(RoleEntity);
    const defaultRole = await repo.findOne({ where: {name: 'USER'}});
    user.roles = [defaultRole];
    const saveUser = await this._userRepository.save(user);
    return saveUser;
}

async update (id: string, user: UserEntity): Promise<void>{
    await this._userRepository.update(id, user);
    
}

async dalete(id: string): Promise<any>{
    const userExist = await this._userRepository.findOne({
        where: { id, status: Status.ACTIVE},
    });

    if (!userExist) {
        throw new NotFoundException();
    }

    delete userExist.password

    await this._userRepository.update(id, {status: Status.INACTIVE});
    const message = 'success delete'

    return {statusCode: 200, message, data: userExist};

}

async setRolToUser(userId: string, roleId: string){
  const userExist = await this._userRepository.findOne( {
    where: { id: userId, status: Status.ACTIVE},
  });

  if (!userExist) {
      throw new NotFoundException('User does not exists');
  }

  const roleExist = await this._roleRepository.findOne( {
    where: { id: roleId, status: Status.ACTIVE},
  });

  if(!roleExist){
    throw new NotFoundException('Role does not exists');
  }

  userExist.roles.push(roleExist);
  await this._userRepository.save(userExist);

  return true;

}
}
