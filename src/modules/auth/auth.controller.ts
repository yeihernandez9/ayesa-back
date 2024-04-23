import { Controller, Get, Post, Body, Patch, UsePipes, Param, Delete, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService,
    ){}

    @Post('/signup')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiBody({
       type: SignupDto,
       description: 'Json structure for user object',
    })
    @UsePipes(ValidationPipe)
    async signup(@Body() signupDto: SignupDto): Promise<String>{
        return this._authService.signup(signupDto);
    }

    @Post('/signin')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiBody({
       type: SigninDto,
       description: 'Json structure for user object',
    })
    @UsePipes(ValidationPipe)
    async signin(@Body() signinDto: SigninDto){
        return this._authService.signin(signinDto);
    }
}
