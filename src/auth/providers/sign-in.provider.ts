import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignInProvider {
    constructor(
        @Inject(forwardRef(()=> UsersService))
        private readonly usersService: UsersService,

        private readonly hashingProvider: HashingProvider,

        private readonly jwtService: JwtService,  //inject jwt service

        @Inject(jwtConfig.KEY)   //inject jwtConfig
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ){}

    public async signIn(signinDto:SigninDto){
        //simplify recommended approach
        // const user = await this.usersService.findOneByEmail(signinDto.email);
        // const isValid = await this.hashingProvider.comparePassword(
        //     signinDto.password,
        //     user.password,
        // );
        // if (!isValid) {
        //     throw new UnauthorizedException('Incorrect password');
        // }
        // return true;


        let user = await this.usersService.findeOneByEmail(signinDto.email);

        let isEqual : Boolean = false;

        try {
            isEqual = await this.hashingProvider.comparePassword(
                signinDto.password, 
                user.password
            );
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Could not compare passwords'
            });
        }

        if(!isEqual){
            throw new UnauthorizedException('Incorrect Password');
        }

        
        const accessToken = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email,
            },
            {
              audience: this.jwtConfiguration.audience,
              issuer: this.jwtConfiguration.issuer,
              secret: this.jwtConfiguration.secret,
              expiresIn: this.jwtConfiguration.accessTokenTtl,
            },
        );
        
        return {
            accessToken,
        };
    }
}
