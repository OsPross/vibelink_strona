import { Controller, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LinksService } from './links.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Links')
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Dodaj nowy link' })
  async createLink(@CurrentUser() user: any, @Body() createLinkDto: any) {
    return this.linksService.create(user.userId, createLinkDto);
  }

  // ENDPOINT REORDER - Zabezpieczony przed kolizją z :id
  @Patch('reorder')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Masowa zmiana kolejności linków' })
  async reorderLinks(
    @CurrentUser() user: any,
    @Body() body: { updates: { id: string; order: number }[] }
  ) {
    return this.linksService.reorder(user.userId, body.updates);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Edytuj link' })
  async updateLink(
    @CurrentUser() user: any, 
    @Param('id') id: string, 
    @Body() updateData: any
  ) {
    return this.linksService.update(user.userId, id, updateData);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Usuń link' })
  async removeLink(
    @CurrentUser() user: any, 
    @Param('id') id: string
  ) {
    return this.linksService.remove(user.userId, id);
  }

  @Post(':id/click')
  async trackClick(@Param('id') id: string) {
    return this.linksService.trackClick(id);
  }
}