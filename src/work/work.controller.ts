import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateWorkDTO, UpdateWorkDTO } from './work.dto';
import { ListAllEntities, deleteIds } from 'src/common/dto';
import { WorkService } from './work.service';
import { CustomResponse } from 'src/common/http.response';
import { Work } from './work.entity';
import { Like } from 'typeorm';

/**
 * work API
 */
@Controller('api/v1/works')
export class WorkController {
  constructor(private workService: WorkService) {}

  @Get()
  async getWorks(
    @Query(new ValidationPipe({ transform: true })) query: ListAllEntities,
  ): Promise<CustomResponse> {
    const option = {
      sortBy: query.sortBy,
      orderBy: query.orderBy,
      skip: Number((query.current - 1) * query.pageSize),
      take: Number(query.pageSize),
      where: {
        name: Like(`%${query.like || ''}%`),
      },
    };

    if (!query.sortBy || !query.orderBy) {
      option.sortBy = 'createdAt';
      option.orderBy = 'DESC';
    }

    const [works, total] = await this.workService.findAll(option);

    return {
      data: {
        list: works,
        count: total,
      },
      code: '200',
      message: '',
    };
  }

  @Post()
  async createWork(@Body() body: CreateWorkDTO): Promise<CustomResponse> {
    await this.workService.create(body as Work);

    return {
      data: {},
      code: '200',
      message: '',
    };
  }

  @Post('/delete-operations')
  async deleteWorks(@Body() { ids }: deleteIds): Promise<CustomResponse> {
    return this.workService.delete(ids);
  }

  @Get('/:id')
  async GetWork(@Param('id') id: number): Promise<CustomResponse> {
    id = Number(id);
    if (!id) {
      return {
        data: {},
        code: '201',
        message: '参数错误',
      };
    }

    const work = await this.workService.findOne({
      where: { id },
    });

    return {
      data: work,
      code: '200',
      message: '',
    };
  }

  @Put('/:id')
  async updateWork(
    @Param('id') id: number,
    @Body() body: UpdateWorkDTO,
  ): Promise<CustomResponse> {
    await this.workService.update(id, body);

    return {
      data: {},
      code: '200',
      message: '',
    };
  }
}
