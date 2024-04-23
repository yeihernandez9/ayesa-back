import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserEntity } from '../user/user.entity';
import { RoleEntity } from '../role/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory() {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            //expiresIn: 3600,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    JwtStrategy,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
