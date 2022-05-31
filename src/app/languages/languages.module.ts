import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguagesResolver } from './languages.resolver';
import { LanguagesService } from './languages.service';
import { Languages } from './entities/languages.entity';
import { LanguagesController } from './languages.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Languages])],
  providers: [LanguagesResolver, LanguagesService],
  controllers: [LanguagesController],
  exports:[LanguagesService]
})
export class LanguagesModule {}
