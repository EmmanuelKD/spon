import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateCreatorDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  display_name: string;

  @ApiProperty({ required: false, example: 'Professional content creator specializing in tech reviews' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ required: false, example: 'NG' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ required: false, example: 'Lagos' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'Technology' })
  @IsString()
  @IsNotEmpty()
  primary_niche: string;

  @ApiProperty({ required: false, example: ['Gaming', 'Reviews'] })
  @IsArray()
  @IsOptional()
  secondary_niches?: string[];

  @ApiProperty({ required: false, example: ['en', 'yo'] })
  @IsArray()
  @IsOptional()
  languages?: string[];

  @ApiProperty({ required: false, example: 3 })
  @IsNumber()
  @IsOptional()
  experience_years?: number;
}
