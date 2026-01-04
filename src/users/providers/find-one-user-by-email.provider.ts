import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ){}

    public async findOneByEmail(email: string){

        //clean and recommende nest takes care of connection errors
        // const user = await this.usersRepository.findOneBy({ email });
        // if (!user) {
        //     throw new UnauthorizedException('User does not exist');
        // }
        // return user;

        let user: User | null;

        try {
           user = await this.usersRepository.findOneBy({email: email});
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Could not fetch the user',
            });
        }

        if(!user){
            throw new UnauthorizedException('User does not exist');
        }

        return user;     
    }
}
