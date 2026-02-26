import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service'; // Wciągamy Prismę
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService, // Dodano wstrzykiwanie bazy
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Użytkownik o takim adresie email już istnieje');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    // TWORZENIE UŻYTKOWNIKA I PROFILU JEDNOCZEŚNIE
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        username: registerDto.username,
        password: hashedPassword,
        profile: {
          create: {
            bio: 'Witaj na moim profilu Vibelink!',
            theme: 'dark',
            // avatarUrl jest opcjonalne, więc go tu nie ma
          }
        }
      }
    });

    const payload = { sub: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
      username: user.username,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    
    if (!user) {
      throw new UnauthorizedException('Błędny email lub hasło');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Błędny email lub hasło');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
      username: user.username
    };
  }
}