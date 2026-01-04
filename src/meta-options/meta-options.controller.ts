import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';

@Controller('api/meta-options')
export class MetaOptionsController {
    constructor(
        private readonly metaOptionService: MetaOptionsService
    ){}

    @Post()
    public create(@Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto){
        return this.metaOptionService.create(createPostMetaOptionsDto);
    }
}
