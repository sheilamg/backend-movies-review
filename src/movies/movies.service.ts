import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { MoviesGenre } from 'src/movies_genres/entities/movies_genre.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(MoviesGenre)
    private moviesGenreRepository: Repository<MoviesGenre>
  ){}

  async createMovieWithGenres(movieData : CreateMovieDto, genreIds: number[]) {
    const movie = this.movieRepository.create(movieData)
    await this.movieRepository.save(movie)
    
    for(const genreId of genreIds){
      const genre = await this.genreRepository.findOneBy({ id: genreId })
      if(genre){
       const movieGenre = {movie: movie, genre: genre} 
       const movieGenreCreate = this.moviesGenreRepository.create(movieGenre) 
       await this.moviesGenreRepository.save(movieGenreCreate)
      }
    }

    return movie
  }

  async findMoviesWithGenres() {
    return this.movieRepository.find({
      relations: ['moviesGenre','moviesGenre.genre', 'review'] 
    })
  }
  //another way to see the relations, careful with the use of eager
  //{moviesGenre: {genre: true}}
  

  async findAll() {
    return this.movieRepository.find()
  }

  async findOne(input_id: number) {
    return await this.movieRepository.findOne({where: {id : input_id}, relations:{ moviesGenre: {genre: true}, review: { user: true, comments_user: true }}})
  }

  async update(input_id: number, updateMovieDto: UpdateMovieDto) {
    return await this.movieRepository.update({id: input_id}, updateMovieDto)
  }

  async remove(input_id: number) {
    const to_delete = await this.movieRepository.findOne({where: {id: input_id}})
    return await this.movieRepository.softRemove(to_delete)
  }
}
