import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { MariaDB } from './maria.db';
import { PostgreDB } from './postgre.db';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport/strategies/jwt.strategy';
import { jwtConstants } from './passport/constants';



import { Alumno, AlumnoSchema } from './models/modelo';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { EventsGateway } from './gateways/events.gateway';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/jsehdb', {
    //   connectionName: 'jseh',
    // }),
    // MongooseModule.forFeature([{ name: Alumno.name, schema: AlumnoSchema }], 'jseh'),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MulterModule.register({
      dest: './uploads',
    })
  ],
  controllers: [AppController],
  providers: [
    AuthService,
    UsersService,
    AppService,
    MariaDB,
    PostgreDB,    
    JwtStrategy,
    
    EventsGateway
  ],
})
export class AppModule {}
