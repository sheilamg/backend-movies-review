import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"
import { Genre } from "src/genres/entities/genre.entity"
import { MoviesGenre } from "src/movies_genres/entities/movies_genre.entity"

export class CreateMovieDto {
    @ApiProperty()
    @IsString()
    title: string

    @ApiProperty()
    genre: Genre

    @ApiProperty()
    @IsNumber()
    release_date: number

    @ApiProperty()
    @IsString()
    image: string

    @ApiProperty()
    moviesGenre: MoviesGenre[]
}