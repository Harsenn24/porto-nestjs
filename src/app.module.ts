import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MONGO_URL, MONGO_DB, SECRET } from './global.constant';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ClinicModule } from './clinic/clinic.module';
import { DoctorModule } from './doctor/doctor.module';
import { TreatmentModule } from './treatment/treatment.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL, {
      dbName: MONGO_DB,
      connectTimeoutMS: 10000,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    JwtModule.register({
      global: true,
      secret: SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    AuthModule,
    ClinicModule,
    DoctorModule,
    TreatmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
