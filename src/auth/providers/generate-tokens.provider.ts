import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class GenerateTokensProvider {
    constructor(
        private readonly jwtService: JwtService,  //inject jwt service

        @Inject(jwtConfig.KEY)   //inject jwtConfig
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ){}


    public async signToken<T>(userId: number, expiresIn: number, payload?:T){
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
              audience: this.jwtConfiguration.audience,
              issuer: this.jwtConfiguration.issuer,
              secret: this.jwtConfiguration.secret,
              expiresIn: expiresIn,
            },
        );
    }

    public async generateTokens(user: User){
        const [accessToken, refreshToken] = await Promise.all([
            //Generate Access token
            this.signToken<Partial<ActiveUserData>>(
                user.id, 
                this.jwtConfiguration.accessTokenTtl, 
                {
                    email: user.email,
                }
            ),
            
            //Generate RefreshToken
            this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
        ]);

        return {
            accessToken,
            refreshToken,
        };       
    }
}
