import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;
@Schema()
export class Users {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
