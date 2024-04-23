import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { RoleRepository } from '../role/role.repository';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity]),

  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
