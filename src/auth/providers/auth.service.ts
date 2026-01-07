import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider';

@Injectable()
export class AuthService {
   
    constructor(
        @Inject(forwardRef(()=> UsersService))   //to user circular dependency, repeat in UserService
        private readonly usersService:UsersService,

        private readonly signInProvider: SignInProvider,

        private readonly refreshTokensProvider: RefreshTokensProvider,
    ){}

    public async signIn(signInDto: SigninDto){
        return await this.signInProvider.signIn(signInDto);
    }

    public async refreshTokens(refreshTokenDto: RefreshTokenDto){
        return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
    }

    public isAuth(){
        return true;
    }
}
