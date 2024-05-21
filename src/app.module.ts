import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nik2002:1234554321@college.sccn3uq.mongodb.net/',
      {
        dbName: 'BSS',
      },
    ),
    UsersModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
