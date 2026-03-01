import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async getMyProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: { user: { select: { username: true } }, links: { orderBy: { order: 'asc' } } },
    });
    if (!profile) throw new NotFoundException('Profil nie istnieje');
    return profile;
  }

  async updateProfile(userId: string, data: any) {
    return this.prisma.profile.update({
      where: { userId },
      data,
    });
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        profile: {
          include: { 
            links: { orderBy: { order: 'asc' } }
          },
        },
      },
    });

    if (!user || !user.profile) throw new NotFoundException('Profil nie znaleziony');

    const now = new Date();

    return {
      username: user.username,
      bio: user.profile.bio,
      theme: user.profile.theme,
      avatarUrl: user.profile.avatarUrl,
      socials: user.profile.socials,
      youtubeChannelUrl: user.profile.youtubeChannelUrl,
      steamUrl: user.profile.steamUrl, 
      csRepUrl: user.profile.csRepUrl, // POWRÓT CS-REP
      twitchChannel: user.profile.twitchChannel,
      
      links: user.profile.links.filter(link => {
        if (link.isActive === false) return false;
        if (link.expiresAt && new Date(link.expiresAt) < now) return false;
        if (link.maxClicks !== null && link.clicks >= link.maxClicks) return false;
        return true;
      }),
    };
  }

  async connectSpotify(userId: string, code: string) {
    const clientId = process.env.SPOTIFY_CLIENT_ID || '';
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI || '';

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);

    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      },
      body: params,
    });

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error_description || 'Błąd łączenia ze Spotify');
    }

    return this.prisma.profile.update({
      where: { userId },
      data: {
        spotifyAccessToken: data.access_token,
        spotifyRefreshToken: data.refresh_token,
      },
    });
  }
}