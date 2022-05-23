import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsResolver } from './subjects.resolver';
import { SubjectsService } from './subjects.service';
import { Subjects } from './entities/subjects.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Subjects])],
  providers: [SubjectsResolver, SubjectsService],
  exports:[SubjectsService]
})
export class SubjectsModule {}
