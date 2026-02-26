import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createLinkDto: any) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profil nie istnieje.');

    const linksCount = await this.prisma.link.count({
      where: { profileId: profile.id }
    });

    return this.prisma.link.create({
      data: {
        title: createLinkDto.title,
        url: createLinkDto.url,
        type: createLinkDto.type || 'LINK', // <-- DODANE: Zapisujemy typ (domyślnie LINK)
        content: createLinkDto.content,     // <-- DODANE: Zapisujemy treść tekstu
        isActive: createLinkDto.isActive ?? true,
        order: linksCount,
        profileId: profile.id,
      },
    });
  }

  async update(userId: string, linkId: string, updateData: any) {
    const link = await this.prisma.link.findFirst({
      where: { id: linkId, profile: { userId } },
    });
    if (!link) throw new NotFoundException('Link nie istnieje lub brak dostępu.');

    return this.prisma.link.update({
      where: { id: linkId },
      data: updateData,
    });
  }

  async remove(userId: string, linkId: string) {
    const link = await this.prisma.link.findFirst({
      where: { id: linkId, profile: { userId } },
    });
    if (!link) throw new NotFoundException('Link nie istnieje lub brak dostępu.');

    return this.prisma.link.delete({
      where: { id: linkId },
    });
  }

  async trackClick(id: string) {
    return this.prisma.link.update({
      where: { id },
      data: { clicks: { increment: 1 } },
    });
  }

  // NOWA FUNKCJA DO ZMIANY KOLEJNOŚCI
  async reorder(userId: string, updates: { id: string; order: number }[]) {
    const transactions = updates.map((update) =>
      this.prisma.link.updateMany({
        where: { id: update.id, profile: { userId } },
        data: { order: update.order },
      })
    );
    await this.prisma.$transaction(transactions);
    return { success: true };
  }
}