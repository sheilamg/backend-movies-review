import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Genre } from "src/genres/entities/genre.entity";
import { Movie } from "src/movies/entities/movie.entity";

export class CreateMoviesGenreDto {
    @ApiProperty()
    @IsNumber()
    movie: Movie

    @ApiProperty()
    @IsNumber()
    genre: Genre
}