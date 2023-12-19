import { IsDefined, Length } from 'class-validator';

class CreateWorkDTO {
  @IsDefined({
    message: '缺少 name 字段',
  })
  @Length(1, 10, {
    message: 'name 长度在 1-10 个字符',
  })
  name: string;

  @IsDefined({
    message: '缺少 desc 字段',
  })
  @Length(0, 10, {
    message: 'desc 长度在 0-50 个字符',
  })
  desc: string;
}

class UpdateWorkDTO {
  @IsDefined({
    message: '缺少 name 字段',
  })
  @Length(1, 10, {
    message: 'name 长度在 1-10 个字符',
  })
  name: string;

  @IsDefined({
    message: '缺少 desc 字段',
  })
  @Length(0, 10, {
    message: 'desc 长度在 0-50 个字符',
  })
  desc: string;
}

export { CreateWorkDTO, UpdateWorkDTO };
