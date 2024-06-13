import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Migration } from '../entities/migration.entity';

export class CreateMigrationDto extends Migration {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  species: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lat: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lng: string;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;
}
