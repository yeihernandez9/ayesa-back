import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from "src/config/config.service";
import { IJwtPayload } from "../jwt-payload.interface";
import { UserEntity } from "src/modules/user/user.entity";
import { Repository } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly _configService: ConfigService,
        @InjectRepository(UserEntity)
        private readonly _authRepository: Repository<UserEntity>,
      ) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET,
        });
      }
    
      async validate(payload: IJwtPayload) {
        const { username } = payload;
        const user = await this._authRepository.findOne({
          where: { username, status: 'ACTIVE' },
        });
    
        if (!user) {
          throw new UnauthorizedException();
        }
    
        return payload;
      }
}