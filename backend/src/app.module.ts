import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeaModule } from './idea/idea.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(), IdeaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
