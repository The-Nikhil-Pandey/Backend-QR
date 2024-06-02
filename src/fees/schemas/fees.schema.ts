import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Faculty } from 'src/profiles/schemas/faculty.schema';
import { Students } from 'src/profiles/schemas/students.schema';

export type UsersDocument = HydratedDocument<Fees>;
@Schema()
export class Fees {
  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true, type: Boolean })
  received: boolean;

  @Prop({ required: true, type: String })
  year: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Students" })
  student: Students

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Faculty" })
  createdBy: Faculty

}
export const FeesSchema = SchemaFactory.createForClass(Fees);
