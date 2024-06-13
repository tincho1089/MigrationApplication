import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LocationAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  lat: string;
  
  @ApiProperty()
  @IsNotEmpty()
  lng: string;
  
}
