import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Work])],
  controllers: [WorkController],
  providers: [WorkService],
  exports: [WorkService, TypeOrmModule.forFeature([Work])],
})
export class WorkModule {}
