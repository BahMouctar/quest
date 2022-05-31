import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsResolver } from './subjects.resolver';
import { SubjectsService } from './subjects.service';
import { Subjects } from './entities/subjects.entity';
import { SubjectsController } from './subjects.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Subjects])],
  providers: [SubjectsResolver, SubjectsService],
  controllers: [SubjectsController],
  exports:[SubjectsService]
})
export class SubjectsModule {}
