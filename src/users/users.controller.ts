import { Body, Controller, DefaultValuePipe, Get, Headers, Ip, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';

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
    public CreateUsers(@Body() createUserDto: CreateUserDto){
        //console.log(createUserDto);
        return this.usersService.CreateUser(createUserDto);
    }

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
