import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import profileConfig from './config/profile.config';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';

@Module({
  controllers: [UsersController],
  providers:[
    UsersService, 
    UsersCreateManyProvider, 
    CreateUserProvider, 
    FindOneUserByEmailProvider,
    //add guard in entire module
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,  //better apply in app module to avoid confusion
    // }
  ],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]), 
    ConfigModule.forFeature(profileConfig), 
    forwardRef(()=> AuthModule), //use forward ref cos circular dependency
    // ConfigModule.forFeature(jwtConfig),  //for token guard moved to app module
    // JwtModule.registerAsync(jwtConfig.asProvider()),
  ]   
})
export class UsersModule {}
