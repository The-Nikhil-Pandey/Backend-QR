import { Module } from '@nestjs/common';
import {
  AccountantService,
  FacultyService,
  LibrarianService,
  ProfilesService,
} from './profiles.service';
import {
  AccountController,
  FacultyController,
  LibrarianController,
  ProfilesController,
} from './profiles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Students, StudentsSchema } from './schemas/students.schema';
import { Faculty, FacultySchema } from './schemas/faculty.schema';
import { Accountant, AccountantSchema } from './schemas/accountant.schema';
import { Librarian, LibrarianSchema } from './schemas/librarian.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Students.name, schema: StudentsSchema },
      { name: Faculty.name, schema: FacultySchema },
      { name: Accountant.name, schema: AccountantSchema },
      { name: Librarian.name, schema: LibrarianSchema },
    ]),
  ],
  controllers: [
    ProfilesController,
    FacultyController,
    AccountController,
    LibrarianController,
  ],
  providers: [
    ProfilesService,
    FacultyService,
    AccountantService,
    LibrarianService,
  ],
  exports: [ProfilesService],
})
export class ProfilesModule {}
