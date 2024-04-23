import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserEntity } from '../user/user.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../role/role.type.enum';
import { Repository } from 'typeorm';
import { RoleEntity } from '../role/role.entity';
import { UserDetailsEntity } from '../user/user.details.entity';
import { Status } from 'src/shared/entity-status.num';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _authRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
    private readonly _jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<any> {
    const { username, email, password, name, lastname} = signupDto;

    const user = new UserEntity();
    user.username = username;
    user.email = email;
    const userExists = await this._authRepository.findOne({
      where: [{ username }, { email }],
    });

    if (userExists) {
      throw new ConflictException('Username or email already exists.');
    }

    const defaultRole: RoleEntity = await this._roleRepository.findOne({
      where: { name: RoleType.USER },
    });

    user.roles = [defaultRole];

    const details = new UserDetailsEntity();
    
    details.name = name
    details.lastname = lastname
    details.avatar =  '';
    details.status = Status.ACTIVE
    user.details = details;

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();

    delete user.password;
    delete user.createdate;
    delete user.updateddate;

    const message = 'success';

    return { statusCode: 200, message, data: user };
  }

  async signin(signinDto: SigninDto): Promise<any> {
      const { email, password } = signinDto;

      const user: UserEntity = await this._authRepository.findOne({
          where: { email },
      });

      if (!user) {
          throw new NotFoundException('User does not exist');
      }

      const isMatch = await compare(password, user.password);

      if (!isMatch) {
          throw new UnauthorizedException('Invalid credential');
      }

      delete user.password;
      delete user.createdate;
      delete user.updateddate;

      const message = 'success';

      const payload: IJwtPayload = {
          id: user.id,
          email: user.email,
          username: user.username,
          roles: user.roles.map(r => r.name as RoleType),
      };

      const token = await this._jwtService.sign(payload);

      return { statusCode: 200  ,message, data:user, token };
  }
}