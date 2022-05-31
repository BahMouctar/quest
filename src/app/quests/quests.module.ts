import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestsResolver } from './quests.resolver';
import { QuestsService } from './quests.service';
import { Quests } from './entities/quests.entity';
import { QuestsController } from './quests.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Quests])],
  providers: [QuestsResolver, QuestsService],
  controllers : [QuestsController],
  exports:[QuestsService]
})
export class QuestsModule {}
