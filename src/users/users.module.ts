import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/users.schema';
import { FacultyService, ProfilesService } from 'src/profiles/profiles.service';
import { Students, StudentsSchema } from 'src/profiles/schemas/students.schema';
import { Faculty, FacultySchema } from 'src/profiles/schemas/faculty.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: Students.name, schema: StudentsSchema },
      { name: Faculty.name, schema: FacultySchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, ProfilesService, FacultyService],
})
export class UsersModule {}
