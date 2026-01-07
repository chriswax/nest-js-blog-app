import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

@Injectable()
export class CreatePostProvider {
    constructor(
        private readonly usersService: UsersService,

        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,

        @InjectRepository(MetaOption)
        private readonly metaOptionsRepository: Repository<MetaOption>,

        private readonly tagsService: TagsService,
    ){}


    public async create(createPostDto: CreatePostDto, user: ActiveUserData){
        let author : User | undefined;
        let tags : Tag[] | undefined
        try {
             author = await this.usersService.findOneById(user.sub);
             tags = await this.tagsService.findMultipleTags(createPostDto.tags ?? []);
        } catch (error) {
            throw new ConflictException(error);
        }
        
        // const tags = createPostDto.tags?.length
        //             ? await this.tagsService.findMultipleTags(createPostDto.tags)
        //             : [];

        if (!author) {
            throw new NotFoundException('Author not found');
        }

        if(createPostDto.tags?.length !== tags.length ){
            throw new BadRequestException('Please check your tagIds')
        }

        const post = this.postsRepository.create({
            ...createPostDto,
            author:author,
            tags:tags
        });

        try {
            return await this.postsRepository.save(post);
        } catch (error) {
            throw new ConflictException(error, {
                description: 'Ensure post slug is unique and not a duplicate'
            });
        }
        
    }
}
