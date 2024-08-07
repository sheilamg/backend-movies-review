import { Injectable } from '@nestjs/common';
import { CreateCommentsUserDto } from './dto/create-comments_user.dto';
import { UpdateCommentsUserDto } from './dto/update-comments_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsUser } from './entities/comments_user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsUsersService {
  constructor(
    @InjectRepository(CommentsUser)
    private commentRepository: Repository<CommentsUser>
  ){}

  async publicComment(createComment: CreateCommentsUserDto) {
    const new_comment: CreateCommentsUserDto = this.commentRepository.create(createComment)
    console.log(new_comment);
    return await this.commentRepository.save(new_comment)
  }

  async findAll() {
    return await this.commentRepository.find({relations: { user: true }})
  }

  findOne(id: number) {
    return `This action returns a #${id} commentsUser`;
  }

  update(id: number, updateCommentsUserDto: UpdateCommentsUserDto) {
    return `This action updates a #${id} commentsUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentsUser`;
  }
}
