import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { CreateMigrationDto } from './dto/create-migration.dto';
import { UpdateMigrationDto } from './dto/update-migration.dto';
import { MigrationService } from './migration.service';

@ApiBearerAuth()
@ApiTags('migration')
@Controller('migration')
@UseGuards(JwtAuthGuard)
export class MigrationController {
  private readonly logger = new Logger();

  constructor(private readonly migrationService: MigrationService) {}

  @Post('/create')
  create(@Body() createMigrationDto: CreateMigrationDto, @Request() req: any) {
    try {
      return this.migrationService.create(
        createMigrationDto,
        req.user.username,
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Get('all')
  async findById(@Request() req: any) {
    try {
      const migrations = await this.migrationService.findMigrations(req);
      return migrations;
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.migrationService.findOne(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Put(':id/update')
  update(
    @Param('id') id: string,
    @Body() updateMigrationDto: UpdateMigrationDto,
  ) {
    try {
      return this.migrationService.update(id, updateMigrationDto);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
