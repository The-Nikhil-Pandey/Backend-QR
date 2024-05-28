import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentsDocument = HydratedDocument<Students>;
@Schema()
export class Students {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  course: string;

  @Prop({ required: true })
  branch: string;

  @Prop({ required: true })
  rollNo: string;

  @Prop({ required: true })
  regNo: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: true })
  dob: string;
}
export const StudentsSchema = SchemaFactory.createForClass(Students);
