import { BadRequestException, Body, Injectable, NotFoundException, RequestTimeoutException } from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { Repository } from "typeorm";
import { Post } from "../post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { TagsService } from "src/tags/providers/tags.service";
import { PatchPostDto } from "../dtos/patch-post.dto";
import { Tag } from "src/tags/tag.entity";
import { GetPostsDto } from "../dtos/get-posts.dto";
import { take } from "rxjs";
import { PaginationProvider } from "src/common/pagination/providers/pagination.provider";
import { Paginated } from "src/common/pagination/interfaces/paginated.interface";

@Injectable()
export class PostsService{
    constructor(
        private readonly usersService: UsersService,

        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,

        @InjectRepository(MetaOption)
        private readonly metaOptionsRepository: Repository<MetaOption>,

        private readonly tagsService: TagsService,

        private readonly paginationProvider: PaginationProvider
    ){}


    public async create(createPostDto: CreatePostDto){
        let author = await this.usersService.findOneById(createPostDto.authorId);
        let tags = await this.tagsService.findMultipleTags(createPostDto.tags ?? []);

        // const tags = createPostDto.tags?.length
        //             ? await this.tagsService.findMultipleTags(createPostDto.tags)
        //             : [];

        if (!author) {
            throw new NotFoundException('Author not found');
        }

        const post = this.postsRepository.create({
            ...createPostDto,
            author:author,
            tags:tags
        });

        return await this.postsRepository.save(post);
    }

    public async update(patchPostDto: PatchPostDto){
        //let tags = this.tagsService.findMultipleTags(patchPostDto.tags ?? []);
        let tags : Tag[] =[];
        let post : Post | null;

        try{
           if (patchPostDto.tags?.length) {
                tags = await this.tagsService.findMultipleTags(patchPostDto.tags);

                if (tags.length !== patchPostDto.tags.length) {
                    throw new BadRequestException(
                        'Please check your tag Ids and ensure they are correct',
                    );
                }
            }
        } catch(error){
           if (error instanceof BadRequestException) {
                throw error;
            }
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later',
            );
        }


        // if (!tags || tags.length !== patchPostDto.tags?.length){
        //     throw new BadRequestException('Please check your tag Ids and ensure they are correct');
        // }


        try{
           post = await this.postsRepository.findOneBy({
                id: patchPostDto.id,
            });  
        } catch(error){
                throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later',
            );
        }


        if(!post){
            throw new BadRequestException('The post ID does not exist');
        }

        post.title  = patchPostDto.title ?? post.title;
        post.content = patchPostDto.content ?? post.content;
        post.status = patchPostDto.status ?? post.status;
        post.postType = patchPostDto.postType ?? post.postType;
        post.slug = patchPostDto.slug ?? post.slug;
        post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
        post.publishOn = patchPostDto.publishOn ?? post.publishOn;
        post.tags = tags

        try{
            await this.postsRepository.save(post);
        }catch(error){
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later',
            );
        }

        return post;




        // let post = await this.postsRepository.findOneBy({
        //     id: patchPostDto.id,
        // });

        // if (!post) {
        //     throw new NotFoundException('Post not found');
        // }
        
        // post.title  = patchPostDto.title ?? post.title;
        // post.content = patchPostDto.content ?? post.content;
        // post.status = patchPostDto.status ?? post.status;
        // post.postType = patchPostDto.postType ?? post.postType;
        // post.slug = patchPostDto.slug ?? post.slug;
        // post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
        // post.publishOn = patchPostDto.publishOn ?? post.publishOn;

        // const tags = patchPostDto.tags?.length
        //                 ? await this.tagsService.findMultipleTags(patchPostDto.tags)
        //                 : post.tags;

        // post.tags = tags

        // return await this.postsRepository.save(post);
    }

    public async findAll(postQuery: GetPostsDto, userId: string): Promise<Paginated<Post>>{     
        // const posts = await this.postsRepository.find({ 
        //     skip: (postQuery.page - 1) * postQuery.limit,
        //     take: postQuery.limit,
        // });

        let posts = await this.paginationProvider.paginateQuery({
            limit: postQuery.limit,
            page: postQuery.page,
        },
        this.postsRepository
        );
        
        return posts;
    }

    // public async findAll(){     
    //     // const posts = this.postsRepository.find({ 
    //     //     relations:{
    //     //         metaOptions:true,
    //     //         author:true
    //     //     }
    //     // });
    //     const posts = await this.postsRepository.find(); //using this and set eager true in metaOption entity
    //     return posts;
    // }

    public async delete(id: number){
        //let post = await this.postsRepository.findOneBy({id});
        // await this.postsRepository.delete(id);

        // if (post?.metaOptions?.id) {
        //     await this.metaOptionsRepository.delete(post.metaOptions.id);
        // }
        // let inversePost: MetaOption[] = [];
        // if (post?.metaOptions?.id) {
        //      inversePost = await this.metaOptionsRepository.find({
        //         where: { id: post?.metaOptions.id},
        //         relations:{
        //             post: true,
        //         }
        //     })
        // }

        await this.postsRepository.delete(id)
        return { deleted: true, id}
    }
}
