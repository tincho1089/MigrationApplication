import { Controller, Post, Body, Logger, Put, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocationAuthDto } from './dto/location-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger();
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() userObject: RegisterAuthDto) {
    try {
      return this.authService.register(userObject);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Post('login')
  async loginUser(@Body() userObject: LoginAuthDto) {
    try {
      const response = await this.authService.login(userObject);
      return response;
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Put(':id/update')
  update(@Param('id') id: string, @Body() updateLocationDto: LocationAuthDto) {
    try {
      return this.authService.update(id, updateLocationDto);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
