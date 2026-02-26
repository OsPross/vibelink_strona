import { IsString, IsOptional, MaxLength, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiPropertyOptional({ example: 'Programista 15k, miłośnik kawy.', description: 'Bio użytkownika (max 160 znaków)' })
  @IsOptional()
  @IsString()
  @MaxLength(160, { message: 'Bio może mieć maksymalnie 160 znaków.' })
  bio?: string;

  @ApiPropertyOptional({ example: 'dark', enum: ['dark', 'light', 'neon', 'minimal'], description: 'Motyw profilu' })
  @IsOptional()
  @IsString()
  @IsIn(['dark', 'light', 'neon', 'minimal'], { message: 'Wybrano niedozwolony motyw.' })
  theme?: string;
}