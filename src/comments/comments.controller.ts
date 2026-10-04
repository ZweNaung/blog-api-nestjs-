import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/UpdateCommentDto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
