import { IsString, IsOptional, MaxLength, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Twórca cyfrowy...' })
  @IsOptional()
  @IsString()
  @MaxLength(160)
  bio?: string;

  @ApiPropertyOptional({ example: 'dark' })
  @IsOptional()
  @IsString()
  theme?: string;

  @ApiPropertyOptional({ example: 'https://imgur.com/mojezdjecie.png' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsObject()
  socials?: Record<string, string>;

  @IsOptional()
  @IsString()
  youtubeChannelUrl?: string;

  @IsOptional()
  @IsString()
  steamUrl?: string;

  @IsOptional()
  @IsString()
  csRepUrl?: string;
  
  @IsOptional()
  @IsString()
  twitchChannel?: string;
}