import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsUsersService } from './comments_users.service';
import { CreateCommentsUserDto } from './dto/create-comments_user.dto';
import { UpdateCommentsUserDto } from './dto/update-comments_user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUserGuard } from 'src/auth/auth.user.guard';

@UseGuards(AuthUserGuard)
@ApiTags('Comment-Users')
@ApiBearerAuth()
@Controller('comments-users')
export class CommentsUsersController {
  constructor(private readonly commentsUsersService: CommentsUsersService) {}

  @Post()
  publicComment(@Body() createComment: CreateCommentsUserDto) {
    return this.commentsUsersService.publicComment(createComment);
  }

  @Get()
  findAll() {
    return this.commentsUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentsUserDto: UpdateCommentsUserDto) {
    return this.commentsUsersService.update(+id, updateCommentsUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsUsersService.remove(+id);
  }
}
