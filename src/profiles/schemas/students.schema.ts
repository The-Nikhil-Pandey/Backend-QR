import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentsDocument = HydratedDocument<Students>;
@Schema()
export class Students {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  course: string;

  @Prop({ type: String, required: true })
  branch: string;

  @Prop({ type: String, required: true })
  rollNo: string;

  @Prop({ type: String, required: true })
  regNo: string;

  @Prop({ type: String, required: true })
  contact: string;

  @Prop({ type: String, required: true })
  dob: string;

  @Prop({ type: String })
  img: string;

  @Prop({ type: Object, required: true })
  personalInfo: Object;
}
export const StudentsSchema = SchemaFactory.createForClass(Students);
