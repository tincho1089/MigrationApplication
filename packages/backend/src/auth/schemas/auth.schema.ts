import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from '../types';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop({ type: String, enum: UserRole })
  role: UserRole;

  @Prop()
  lat: string;

  @Prop()
  lng: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
