import { Controller, Get, Patch, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMyProfile(@Request() req) {
    return this.profilesService.getMyProfile(req.user.userId || req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me')
  updateProfile(@Request() req, @Body() body: any) {
    return this.profilesService.updateProfile(req.user.userId || req.user.sub, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('spotify')
  async connectSpotify(@Request() req, @Body('code') code: string) {
    const userId = req.user.userId || req.user.sub;
    await this.profilesService.connectSpotify(userId, code);
    return { success: true, message: 'Spotify podłączone poprawnie!' };
  }

  @Get(':username')
  getProfileByUsername(@Param('username') username: string) {
    return this.profilesService.findByUsername(username);
  }
}