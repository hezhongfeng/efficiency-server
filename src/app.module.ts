import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Work } from './work/work.entity';
import { User } from './user/user.entity';

// 读取 .env 文件
const envConfig = config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ssl: Boolean(envConfig.parsed.DB_SSL || process.env.DB_SSL),
      type: 'postgres',
      host: envConfig.parsed.DB_HOST || process.env.DB_HOST,
      port: Number(envConfig.parsed.DB_PORT || process.env.DB_PORT),
      username: envConfig.parsed.DB_USER || process.env.DB_USER,
      password: envConfig.parsed.DB_PASSWORD || process.env.DB_PASSWORD,
      database: envConfig.parsed.DB_DB || process.env.DB_DB,
      entities: [User,Work],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
