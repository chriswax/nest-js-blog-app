import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SigninDto } from './dtos/signin.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enums';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None)  //using decorator to make enpoint public
    public async signin(@Body() signInDto: SigninDto){
        return await this.authService.signIn(signInDto);
    }

    @Post('refresh-tokens')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None)  //using decorator to make enpoint public
    public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto){
        return await this.authService.refreshTokens(refreshTokenDto);
    }
}
