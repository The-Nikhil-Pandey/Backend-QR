import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FacultyDocument = HydratedDocument<Faculty>;
@Schema()
export class Faculty {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  subject: string[];
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
