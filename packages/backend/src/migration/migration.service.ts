import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMigrationDto } from './dto/create-migration.dto';
import { UpdateMigrationDto } from './dto/update-migration.dto';
import { Migration, MigrationDocument } from './schemas/migration.schema';

@Injectable()
export class MigrationService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(Migration.name)
    private readonly migrationModel: Model<MigrationDocument>,
  ) {}

  async create(
    createMigrationDto: CreateMigrationDto,
    username: string,
  ): Promise<MigrationDocument> {
    const migrationData = {
      ...createMigrationDto,
      location: {
        type: 'Point',
        coordinates: [createMigrationDto.lng, createMigrationDto.lat],
      },
      user: username,
    };
    const migration = new this.migrationModel(migrationData);
    return migration.save();
  }

  async findAll(): Promise<MigrationDocument[]> {
    return this.migrationModel.find().exec();
  }

  async findOne(id: string) {
    return this.migrationModel.findById(id);
  }

  async update(
    id: string,
    updateMigrationDto: UpdateMigrationDto,
  ): Promise<MigrationDocument> {
    return this.migrationModel.findByIdAndUpdate(id, updateMigrationDto);
  }

  async remove(id: string) {
    return this.migrationModel.findByIdAndRemove(id);
  }

  async findMigrations(req: any) {
    try {
      const { state, lat, lng, distance, myMigrations } = req.query;
      const stateRegex = new RegExp(state, 'i');
      const maxDistance = distance ? parseInt(distance) * 1000 : 10000; // Convertir km a metros

      const query: any = { state: stateRegex };

      if (lat && lng) {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);

        query.location = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: maxDistance,
          },
        };
      }

      if (myMigrations === 'true') {
        query.user = req.user.username;
      }
      const response = await this.migrationModel.find(query);

      return response;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
