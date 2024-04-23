import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SharedModule } from 'src/shared/shared.module';
import { RoleEntity } from './role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]),
      SharedModule
  ],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
