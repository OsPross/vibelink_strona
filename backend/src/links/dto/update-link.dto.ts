import { PartialType, ApiPropertyOptional } from '@nestjs/swagger'; // Zmieniono na @nestjs/swagger
import { CreateLinkDto } from './create-link.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateLinkDto extends PartialType(CreateLinkDto) {
  @ApiPropertyOptional({ example: 1, description: 'Kolejność wyświetlania linku' })
  @IsOptional()
  @IsNumber({}, { message: 'Kolejność musi być liczbą.' })
  order?: number;
}