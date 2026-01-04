import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Max, Min } from "class-validator";

export class paginationQueryDto{
    // @IsOptional()
    // @IsPositive()
    // //@Type(() => Number) implict conversion is on on main
    // limit?: number = 10;

    // @IsOptional()
    // @IsPositive()
    // //@Type(() => Number)
    // page?: number = 1;


    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit: number = 10;


    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

}