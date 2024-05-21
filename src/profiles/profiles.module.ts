import { Module } from '@nestjs/common';
import { FacultyService, ProfilesService } from './profiles.service';
import { FacultyController, ProfilesController } from './profiles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Students, StudentsSchema } from './schemas/students.schema';
import { Faculty, FacultySchema } from './schemas/faculty.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Students.name, schema: StudentsSchema },
      { name: Faculty.name, schema: FacultySchema },
    ]),
  ],
  controllers: [ProfilesController, FacultyController],
  providers: [ProfilesService, FacultyService],
})
export class ProfilesModule {}
