import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';
import { UserRole } from '../types';

export class RegisterAuthDto extends LoginAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty({ enum: UserRole })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty()
  @IsNotEmpty()
  lat: string;
  
  @ApiProperty()
  @IsNotEmpty()
  lng: string;
  
}
