import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/users.schema';
import {
  AccountantService,
  FacultyService,
  LibrarianService,
  ProfilesService,
} from 'src/profiles/profiles.service';
import { Students, StudentsSchema } from 'src/profiles/schemas/students.schema';
import { Faculty, FacultySchema } from 'src/profiles/schemas/faculty.schema';
import {
  Accountant,
  AccountantSchema,
} from 'src/profiles/schemas/accountant.schema';
import {
  Librarian,
  LibrarianSchema,
} from 'src/profiles/schemas/librarian.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: Students.name, schema: StudentsSchema },
      { name: Faculty.name, schema: FacultySchema },
      { name: Accountant.name, schema: AccountantSchema },
      { name: Librarian.name, schema: LibrarianSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ProfilesService,
    FacultyService,
    AccountantService,
    LibrarianService,
  ],
})
export class UsersModule {}
