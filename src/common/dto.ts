/**
 * 自定义统一化列表查询字段
 */
import { Transform } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

class ListAllEntities {
  // 当前页码，从1开始
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'current 数据类型错误' })
  current: number = 1;

  // 每页显示条数
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'pageSize 数据类型错误' })
  pageSize: number = 20;

  // 关键字搜索
  readonly like?: string;

  // 开始日期
  readonly startDate?: string;

  // 结束日期
  readonly endDate?: string;

  // 排序条件
  readonly sortBy?: string;

  // 排序方式
  readonly orderBy?: string;
}
class deleteIds {
  @IsNumber({}, { each: true, message: '数据类型错误' })
  @IsDefined({ message: '缺少 ids 字段' })
  ids: number[];
}

export { ListAllEntities, deleteIds };
