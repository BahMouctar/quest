import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestSubjectsResolver } from './questSubjects.resolver';
import { QuestSubjectsService } from './questSubjects.service';
import { QuestSubjects } from './entities/questSubjects.entity';

@Module({
  imports:[TypeOrmModule.forFeature([QuestSubjects])],
  providers: [QuestSubjectsResolver, QuestSubjectsService],
  exports:[QuestSubjectsService]
})
export class QuestSubjectsModule {}
