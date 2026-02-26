import { IsString, IsNotEmpty, IsUrl, MaxLength, IsOptional, IsBoolean, IsIn, IsInt, IsDateString  } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLinkDto {
  @ApiProperty({ example: 'Moje Portfolio', description: 'Tytuł wyświetlany na profilu lub treść nagłówka' })
  @IsString()
  @IsNotEmpty({ message: 'Tytuł nie może być pusty.' })
  @MaxLength(100, { message: 'Tytuł może mieć maksymalnie 100 znaków.' })
  title: string;

  @ApiPropertyOptional({ example: 'LINK', description: 'Typ elementu: LINK, HEADER lub TEXT' })
  @IsOptional()
  @IsString()
  @IsIn(['LINK', 'HEADER', 'TEXT'], { message: 'Niedozwolony typ bloku.' })
  type?: string;

  @ApiPropertyOptional({ example: 'https://github.com/oskar', description: 'Poprawny adres URL (tylko dla bloku typu LINK)' })
  @IsOptional() // <-- Kluczowe! URL jest teraz opcjonalny
  @IsUrl({ require_protocol: true }, { message: 'Nieprawidłowy format URL (wymagany np. https://).' })
  url?: string;

  @ApiPropertyOptional({ example: 'Cześć, jestem twórcą...', description: 'Treść dla bloku tekstowego' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ example: true, description: 'Czy element ma być widoczny?' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsInt()
  maxClicks?: number;
}