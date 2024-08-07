import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesGenre } from 'src/movies_genres/entities/movies_genre.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre, MoviesGenre, Review])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
