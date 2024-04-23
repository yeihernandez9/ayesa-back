import { Repository, EntityRepository, getConnection } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { UserEntity } from '../user/user.entity';
import { SignupDto } from './dto/signup.dto';
import { RoleEntity } from '../role/role.entity';
import { RoleType } from '../role/role.type.enum';
import { UserDetailsEntity } from '../user/user.details.entity';


export class AuthRepository extends Repository<UserEntity> {
    async signup(signupDto: SignupDto): Promise<any> {
        const { username, email, password, lastname, name } = signupDto;
        const user = new UserEntity();
        user.username = username;
        user.email = email;

        const roleRepository = getConnection().getRepository(RoleEntity);
        const defaultRole = await roleRepository.findOne({ where: { name: RoleType.USER } });

        user.roles = [defaultRole];

        const userDetails = new UserDetailsEntity();
        userDetails.lastname = lastname;
        userDetails.name = name;
        user.details = userDetails;

        const salt = await genSalt(10);
        user.password = await hash(password, salt);

        await user.save();

        delete user.password;
        delete user.createdate;
        delete user.updateddate;

        const message = 'success';

        return { statusCode: 200, message, data: user };
    }
}
