import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MigrationDocument = HydratedDocument<Migration>;

@Schema()
export class Migration {
  @Prop({ required: true })
  species: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  })
  location: {
    type: string;
    coordinates: [number, number]; // [lng, lat]
  };

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  state: string;
}

export const MigrationSchema = SchemaFactory.createForClass(Migration);
MigrationSchema.index({ location: '2dsphere' }); // Crear índice geoespacial
