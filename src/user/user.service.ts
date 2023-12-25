import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(option: FindManyOptions): Promise<[User[], number]> {
    option.order = {
      createdAt: 'DESC',
    };
    return await this.userRepository.findAndCount(option);
  }

  findOne(option: FindOneOptions): Promise<User> {
    return this.userRepository.findOne(option);
  }

  async create(user: User) {
    return await this.userRepository.save(user);
  }

  async update(id: number, updateUser: UpdateUserDTO) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    user.firstName = updateUser.firstName;
    user.lastName = updateUser.lastName;
    user.isActive = updateUser.isActive;

    return await this.userRepository.save(user);
  }

  async active(id: number, isActive: boolean) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    user.isActive = isActive;
    await this.userRepository.save(user);
  }

  async delete(ids: number[]) {
    for (const id of ids) {
      await this.userRepository.delete(id);
    }
    return {
      data: {},
      code: '200',
      message: '',
    };
  }
}
