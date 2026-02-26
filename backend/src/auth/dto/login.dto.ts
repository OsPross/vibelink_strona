import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'oskar@vibelink.com', description: 'Adres email użytkownika' })
  @IsEmail({}, { message: 'Nieprawidłowy format adresu email.' })
  email: string;

  @ApiProperty({ example: 'PancerneHaslo123!', description: 'Hasło do konta' })
  @IsString()
  @MinLength(8, { message: 'Hasło musi mieć minimum 8 znaków.' })
  password: string;
}