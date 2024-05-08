import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserType } from '../users.enum';

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

  @Prop({ required: true, enum: UserType })
  type: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
