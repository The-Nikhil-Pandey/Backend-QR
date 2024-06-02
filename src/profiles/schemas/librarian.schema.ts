import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LibrarianDocument = HydratedDocument<Librarian>;
@Schema()
export class Librarian {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const LibrarianSchema = SchemaFactory.createForClass(Librarian);
