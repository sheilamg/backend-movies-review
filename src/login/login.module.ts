import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule.register({
    global: true,
    secret: 'something',
    signOptions: {expiresIn: '1d'},
  })],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}

//imports use this previously:
TypeOrmModule.forFeature([User])