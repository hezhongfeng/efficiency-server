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
import { CreateUserDTO, UpdateUserDTO, ActiveUserDTO } from './user.dto';
import { ListAllEntities, deleteIds } from '../common/dto';
import { UserService } from './user.service';
import { CustomResponse } from '../common/http.response';
import { User } from './user.entity';
import { Like } from 'typeorm';

/**
 * 用户管理 API
 */
@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(
    @Query(new ValidationPipe({ transform: true })) query: ListAllEntities,
  ): Promise<CustomResponse> {
    const option = {
      skip: Number((query.current - 1) * query.pageSize),
      take: Number(query.pageSize),
      where: {
        firstName: Like(`%${query.like || ''}%`),
        isActive: {
          '0': null,
          '1': true,
          '2': false,
        }[(query as any).isActive],
      },
    };

    if ((query as any).isActive === '0') {
      delete option.where.isActive;
    }

    const [users, total] = await this.userService.findAll(option);

    return {
      data: {
        list: users,
        count: total,
      },
      code: '200',
      message: '',
    };
  }

  @Post()
  async createUser(@Body() body: CreateUserDTO): Promise<CustomResponse> {
    await this.userService.create(body as unknown as User);

    return {
      data: {},
      code: '200',
      message: '',
    };
  }

  @Post('/delete-operations')
  async deleteUsers(@Body() { ids }: deleteIds): Promise<CustomResponse> {
    return this.userService.delete(ids);
  }

  @Get('/:id')
  async GetUser(@Param('id') id: number): Promise<CustomResponse> {
    id = Number(id);
    if (!id) {
      return {
        data: {},
        code: '201',
        message: '参数错误',
      };
    }

    const user = await this.userService.findOne({
      where: { id },
    });

    return {
      data: user,
      code: '200',
      message: '',
    };
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() body: UpdateUserDTO,
  ): Promise<CustomResponse> {
    await this.userService.update(id, body);

    return {
      data: {},
      code: '200',
      message: '',
    };
  }

  @Post('/:id/active')
  async active(@Param('id') id: number, @Body() body: ActiveUserDTO) {
    await this.userService.active(id, body.isActive);

    return {
      data: {},
      code: '200',
      message: '',
    };
  }
}
