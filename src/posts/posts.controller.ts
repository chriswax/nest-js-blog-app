import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';

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
    public createPost(@Body() createPostDto: CreatePostDto){
        return this.postsService.create(createPostDto);
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
