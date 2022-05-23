import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestsResolver } from './quests.resolver';
import { QuestsService } from './quests.service';
import { Quests } from './entities/quests.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Quests])],
  providers: [QuestsResolver, QuestsService],
  exports:[QuestsService]
})
export class QuestsModule {}
