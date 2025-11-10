import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'creator', enum: ['creator', 'brand', 'admin'] })
  @IsString()
  @IsNotEmpty()
  @IsIn(['creator', 'brand', 'admin'])
  role: 'creator' | 'brand' | 'admin';

  @ApiProperty({ required: false, example: '+234812345678' })
  @IsString()
  @IsOptional()
  phone?: string;
}
