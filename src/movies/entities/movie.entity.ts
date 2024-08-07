import { Audit } from "src/audit/auditEntity";
import { MoviesGenre } from "src/movies_genres/entities/movies_genre.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie extends Audit{
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column('text')
    title: string

    @Column('text')
    description: string

    @Column('int')
    release_date: number

    @Column('text')
    image: string

    @OneToMany(() => MoviesGenre, (moviesGenre) => moviesGenre.movie)
    moviesGenre: MoviesGenre[]

    //review
    @OneToMany(() => Review, (review) => review.movie)
    review: Review;
    
    //imagen
}
