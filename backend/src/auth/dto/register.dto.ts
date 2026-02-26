import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'oskar@vibelink.com', description: 'Adres email użytkownika' })
  @IsEmail({}, { message: 'Nieprawidłowy format adresu email.' })
  email: string;

  @ApiProperty({ example: 'oskar_dev', description: 'Unikalna nazwa użytkownika (3-30 znaków)' })
  @IsString()
  @MinLength(3, { message: 'Nazwa użytkownika musi mieć minimum 3 znaki.' })
  @MaxLength(30, { message: 'Nazwa użytkownika może mieć maksymalnie 30 znaków.' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Nazwa użytkownika może zawierać tylko litery, cyfry i podkreślenia.' })
  username: string;

  @ApiProperty({ example: 'PancerneHaslo123!', description: 'Hasło (minimum 8 znaków)' })
  @IsString()
  @MinLength(8, { message: 'Hasło musi mieć minimum 8 znaków.' })
  password: string;
}