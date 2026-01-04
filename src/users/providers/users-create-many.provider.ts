import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
    constructor(
         //inject data source for Transaction
        private readonly dataSource: DataSource,
    ){ }

    //implementing create more with Transaction
    public async createMany(createManyUsersDto: CreateManyUsersDto){
        let newUsers: User[] = [];

        
        const queryRunner = this.dataSource.createQueryRunner();
       
        try{
            await queryRunner.connect();
            await queryRunner.startTransaction();
        }catch(error){
            throw new RequestTimeoutException('Could not connect to the database');
        }

        try{
            for (let user of createManyUsersDto.users){
                let newUser = queryRunner.manager.create(User, user);
                let result = await queryRunner.manager.save(newUser);
                newUsers.push(result)
            }
            await queryRunner.commitTransaction();
        }catch(error){
            await queryRunner.rollbackTransaction();
            throw new ConflictException('Could not complete the transaction', {
                description: String(error),
            });
        } finally{
            await queryRunner.release();
        }
        return newUsers;
    }
}
