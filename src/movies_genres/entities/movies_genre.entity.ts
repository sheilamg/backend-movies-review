import { Genre } from "src/genres/entities/genre.entity"
import { Movie } from "src/movies/entities/movie.entity"
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('movie_genre')
export class MoviesGenre {
    @PrimaryGeneratedColumn('increment')
    id: number

    //careful with the use of eager
    @ManyToOne(() => Movie, movie => movie.moviesGenre, {onDelete: 'CASCADE'})
    movie: Movie

    @ManyToOne(() => Genre, genre => genre.movieGenres, {onDelete: 'CASCADE'})
    genre: Genre

}