import { IntersectionType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";
import { paginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";

class GetPostsBaseDto{
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate?: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endDate?: Date;
}


export class GetPostsDto extends IntersectionType(
    GetPostsBaseDto, 
    paginationQueryDto,
){

}