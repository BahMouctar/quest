import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestSubjectLanguagesResolver } from './questSubjectLanguages.resolver';
import { QuestSubjectLanguagesService } from './questSubjectLanguages.service';
import { QuestSubjectLanguages } from './entities/questSubjectLanguages.entity';
import { QuestSubjectLanguagesController } from './questSubjectLanguages.controller';

@Module({
  imports:[TypeOrmModule.forFeature([QuestSubjectLanguages])],
  providers: [QuestSubjectLanguagesResolver, QuestSubjectLanguagesService],
  controllers: [QuestSubjectLanguagesController],
  exports:[QuestSubjectLanguagesService]
})
export class QuestSubjectLanguagesModule {}
