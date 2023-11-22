import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { config } from 'dotenv';

// 读取 .env 文件
const envConfig = config();

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      ssl: Boolean(envConfig.parsed.DB_SSL),
      type: 'postgres',
      host: envConfig.parsed.DB_HOST,
      port: Number(envConfig.parsed.DB_PORT),
      username: envConfig.parsed.DB_USER,
      password: envConfig.parsed.DB_PASSWORD,
      database: envConfig.parsed.DB_DB,
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
