import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateUserProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        @Inject(forwardRef(() => HashingProvider))  //is circlar injection
        private readonly hashingProvider:HashingProvider,
    ){}

    public async CreateUser(createUserDto: CreateUserDto){
        let existingUser : User | null; 

        try{
            existingUser = await this.usersRepository.findOne({
            where: {email: createUserDto.email}
        });

        } catch(error){
            throw new RequestTimeoutException('Unable to process your rquest at the moment please try later',
                {
                    description: 'Error connecting to the database'
                },
            );
        }

        
        if(existingUser){
            throw new BadRequestException('The user already exists, please your email');
        }

        let newUser = this.usersRepository.create({
            ...createUserDto,
            password: await this.hashingProvider.hashPassword(createUserDto.password),
        });

        try{
            newUser = await this.usersRepository.save(newUser);
        } catch(error){
           throw new RequestTimeoutException(
            'Unable to process your request at the moment, please try later',
            {
                description: 'Error connecting to the database'
            },
           ); 
        }
        
        return newUser; 
    }
}
