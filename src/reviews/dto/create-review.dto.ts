import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString, IsUUID, Length, Min, MinLength } from "class-validator"
import { CommentsUser } from "src/comments_users/entities/comments_user.entity"
import { Movie } from "src/movies/entities/movie.entity"
import { User } from "src/users/entities/user.entity"

export class CreateReviewDto {
    
    @ApiProperty()
    @IsString()
    //@Length(600)
    title: string

    @ApiProperty()
    @IsString()
    //@Length(600)
    description: string

    //estrellita en valor numerico
    @ApiProperty()
    @IsNumber()
    rate: number

    //movie
    @IsNumber()
    movie: Movie

    @IsUUID()
    user: User

    //@IsNumber()
    //comments_user?: CommentsUser
}
