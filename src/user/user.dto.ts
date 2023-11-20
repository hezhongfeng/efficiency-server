import { IsDefined, Length, IsBoolean } from 'class-validator';

class CreateUserDTO {
  @IsDefined({
    message: '缺少 firstName 字段',
  })
  @Length(1, 10, {
    message: 'firstName 长度在 1-10 个字符',
  })
  firstName: string;

  @IsDefined({
    message: '缺少 lastName 字段',
  })
  @Length(1, 10, {
    message: 'lastName 长度在 1-10 个字符',
  })
  lastName: string;

  @IsDefined({
    message: '缺少 isActive 字段',
  })
  @IsBoolean({
    message: 'isActive 必须为布尔值',
  })
  isActive: boolean;
}

class UpdateUserDTO {
  @IsDefined({
    message: '缺少 firstName 字段',
  })
  @Length(1, 10, {
    message: 'firstName 长度在 1-10 个字符',
  })
  firstName: string;

  @IsDefined({
    message: '缺少 lastName 字段',
  })
  @Length(1, 10, {
    message: 'lastName 长度在 1-10 个字符',
  })
  lastName: string;

  @IsDefined({
    message: '缺少 isActive 字段',
  })
  @IsBoolean({
    message: 'isActive 必须为布尔值',
  })
  isActive: boolean;
}

export { CreateUserDTO, UpdateUserDTO };
