import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MigrationService } from 'src/migration/migration.service';
import { Migration } from 'src/migration/entities/migration.entity';
import { MigrationSchema } from 'src/migration/schemas/migration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Migration.name,
        schema: MigrationSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [MigrationService],
})
export class EventModule {}
