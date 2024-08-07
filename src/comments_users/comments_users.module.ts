import { Module } from '@nestjs/common';
import { CommentsUsersService } from './comments_users.service';
import { CommentsUsersController } from './comments_users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsUser } from './entities/comments_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsUser])],
  controllers: [CommentsUsersController],
  providers: [CommentsUsersService],
})
export class CommentsUsersModule {}
