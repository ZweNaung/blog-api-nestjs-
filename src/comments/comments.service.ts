import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { UpdateCommentDto } from './dto/UpdateCommentDto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    return this.prismaService.comment.create({
      data: createCommentDto,
    });
  }
  async findAll() {
    return this.prismaService.comment.findMany({
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
            name: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
  }
  //Find by ID
  async findOne(id: string) {
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
            name: true,
          },
        },

        post: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }
  //Update
  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id: id,
      },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return this.prismaService.comment.update({
      where: {
        id: id,
      },
      data: {
        content: updateCommentDto.content,
      },
    });
  }
  //Delete
  async remove(id: string) {
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id: id,
      },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return this.prismaService.comment.delete({
      where: {
        id: id,
      },
    });
  }
}
