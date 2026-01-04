import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
   
    constructor(
        @Inject(forwardRef(()=> UsersService))   //to user circular dependency, repeat in UserService
        private readonly usersService:UsersService,

        private readonly signInProvider: SignInProvider,
    ){}

    public async signIn(signInDto: SigninDto){
        return await this.signInProvider.signIn(signInDto);
    }

    public isAuth(){
        return true;
    }
}
