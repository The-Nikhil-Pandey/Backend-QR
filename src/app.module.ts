import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesModule } from './profiles/profiles.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { FeesModule } from './fees/fees.module';

@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANTS_SECRET,
      // signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forRoot(
      process.env.MONGO_DB_URI,
      {
        dbName: process.env.MONGO_DB_DATABASE_NAME,
      },
    ),
    UsersModule,
    ProfilesModule,
    FeesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule { }
