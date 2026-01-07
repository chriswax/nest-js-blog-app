import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('api/posts')
@ApiTags('Posts')
export class PostsController {

    constructor(
        private readonly postsService:PostsService
    ){}

    @ApiResponse({
        status:201,
        description: 'You get 201 response if your post is created successfully',
    })
    @Post()
    public createPost(
        @Body() createPostDto: CreatePostDto, 
        @ActiveUser() user: ActiveUserData,
    ){
        return this.postsService.create(createPostDto, user);
    }

    // @Get()
    // public getPosts(){
    //     return this.postsService.findAll();
    // }

    @Get('/:userId')
    public getPost(@Param('userId') userId: string, @Query() postQuery: GetPostsDto){
        //return this.postsService.findAll(userId)
        // console.log(postQuery);
        //  console.log(userId);
         return this.postsService.findAll(postQuery, userId)
    }

    @Patch()
    public update(@Body() patchPostDto: PatchPostDto){
        return this.postsService.update(patchPostDto);
    }

    @Delete()
    public deletePost(@Query('id', ParseIntPipe) id: number){
        return this.postsService.delete(id);
    }
}
