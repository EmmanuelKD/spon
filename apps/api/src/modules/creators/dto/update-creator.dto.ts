import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsNumber, IsBoolean } from 'class-validator';

export class UpdateCreatorDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  display_name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  avatar_url?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  banner_url?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  primary_niche?: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  secondary_niches?: string[];

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  languages?: string[];

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  experience_years?: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  available_for_work?: boolean;
}
