import { Controller, Get, UseGuards, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Użytkownicy')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Pobierz dane zalogowanego użytkownika' })
  async getProfile(@CurrentUser() user: any) {
    const fullUser = await this.usersService.findByEmail(user.email);
    
    if (!fullUser) {
      throw new NotFoundException('Konto użytkownika nie istnieje.');
    }

    const { password, ...result } = fullUser;
    return result;
  }
}