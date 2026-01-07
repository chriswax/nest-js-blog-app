import { Body, ClassSerializerInterceptor, Controller, DefaultValuePipe, Get, Headers, Ip, Param, ParseIntPipe, Patch, Post, Query, SetMetadata, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enums';

@Controller('api/users')
@ApiTags('Users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService    
    ){}

    @Get('/:id')
    public getUsers(
        @Param() getUsersParamDto:GetUsersParamDto,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number

    ){
        //console.log(getUsersParamDto)
        return this.usersService.findAll(getUsersParamDto, limit,page);
    }

    @Post()
    @Auth(AuthType.None)  //No need for this since the whole route is protected by default
    @UseInterceptors(ClassSerializerInterceptor)  //activates exclude in entity
    public CreateUsers(@Body() createUserDto: CreateUserDto){
        //console.log(createUserDto);
        return this.usersService.CreateUser(createUserDto);
    }

    //@UseGuards(AccessTokenGuard)
    @Post('create-many')
    public CreateManyUsers(@Body() createManyUsersDto: CreateManyUsersDto){
        return this.usersService.createMany(createManyUsersDto);
    }

    @Patch()
    public PatchUser(@Body() patchUserDto: PatchUserDto){
        console.log(patchUserDto);
        return "You sent a patch request to users endpoints";
    }
}
