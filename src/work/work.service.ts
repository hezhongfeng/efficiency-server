import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Work } from './work.entity';
import { UpdateWorkDTO } from './work.dto';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private readonly workRepository: Repository<Work>,
  ) {}

  async findAll(option: FindManyOptions): Promise<[Work[], number]> {
    return await this.workRepository.findAndCount(option);
  }

  findOne(option: FindOneOptions): Promise<Work> {
    return this.workRepository.findOne(option);
  }

  async create(Work: Work) {
    return await this.workRepository.save(Work);
  }

  async update(id: number, updateWork: UpdateWorkDTO) {
    const work = await this.workRepository.findOne({
      where: {
        id,
      },
    });
    work.name = updateWork.name;
    work.desc = updateWork.desc;

    return await this.workRepository.save(work);
  }

  async delete(ids: number[]) {
    for (const id of ids) {
      await this.workRepository.delete(id);
    }
    return {
      data: {},
      code: '200',
      message: '',
    };
  }
}
