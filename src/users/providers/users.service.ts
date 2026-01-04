import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { DataSource, Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";

import profileConfig from "../config/profile.config";
import type { ConfigType } from "@nestjs/config";
import { UsersCreateManyProvider } from "./users-create-many.provider";
import { CreateManyUsersDto } from "../dtos/create-many-users.dto";
import { CreateUserProvider } from "./create-user.provider";
import { FindOneUserByEmailProvider } from "./find-one-user-by-email.provider";

@Injectable()
export class UsersService{
    constructor(
        @Inject(forwardRef(()=> AuthService))  //inject for circular dependency
        private readonly authService: AuthService,

        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @Inject(profileConfig.KEY)
        private readonly profileConfiguration: ConfigType<typeof profileConfig>,

        private readonly usersCreateManyProvider: UsersCreateManyProvider,
       
        private readonly createUserProvider: CreateUserProvider,

        private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
    ){}

    public async CreateUser(createUserDto: CreateUserDto){
       return this.createUserProvider.CreateUser(createUserDto);
    }

    public findAll(
        getUsersParamDto: GetUsersParamDto,
        limit: number,
        page: number
    ){
        throw new HttpException({
            status:HttpStatus.MOVED_PERMANENTLY,
            error: 'The API endpoint does not exist',
            fileName: 'Users.service.ts',
            lineNumber: 88
        },
        HttpStatus.MOVED_PERMANENTLY,
        {
            cause: new Error(),
            description: 'Occurred because API was permanently moved'
        },
    )
        // const isAuth = this.authService.isAuth();
        // console.log(isAuth);
        // console.log(this.profileConfiguration);
        // console.log(this.profileConfiguration.apiKey);
        // return [
        //     {
        //     firstName: "John",
        //     email: "john@gmail.com"
        //     },
        //     {
        //         firstName: "tom",
        //         email: "tom@gmail.com"
        //     }
        // ]
    }

    public async findOneById(id: number){
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new BadRequestException('User with the given ID does not exist');
        }

        return user;

        //above is cleaner since NestJs throws good DB error msg
    //     let user: User | null;

    //     try{
    //         user = await this.usersRepository.findOneBy({ id });
    //     } catch(error){
    //         throw new RequestTimeoutException(
    //             'Unable to process your request at the moment please try later',
    //             {
    //                 description: 'Error connecting to the database',
    //             }
    //         )
    //     }

    //     if(!user){
    //         throw new BadRequestException('The user id does not exist')
    //     }
       
    //    return user;
    }

    //implementing create more with Transaction
    public async createMany(createManyUsersDto: CreateManyUsersDto){
        return this.usersCreateManyProvider.createMany(createManyUsersDto);
    }

    public async findeOneByEmail(email: string){
        return await this.findOneUserByEmailProvider.findOneByEmail(email)
    }

}