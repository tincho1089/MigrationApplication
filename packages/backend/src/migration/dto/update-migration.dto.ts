import { PartialType } from '@nestjs/mapped-types';
import { CreateMigrationDto } from './create-migration.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateMigrationDto extends PartialType(CreateMigrationDto) {
  @ApiProperty()
  @IsNotEmpty()
  state: string;
}
