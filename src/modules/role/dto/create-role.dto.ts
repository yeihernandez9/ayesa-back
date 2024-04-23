import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
}
