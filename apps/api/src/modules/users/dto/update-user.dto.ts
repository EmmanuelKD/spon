import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false, example: '+234812345678' })
  @IsString()
  @IsOptional()
  phone?: string;
}
