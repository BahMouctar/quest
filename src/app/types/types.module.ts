import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesResolver } from './types.resolver';
import { TypesService } from './types.service';
import { Types } from './entities/types.entity';
import { TypesController } from './types.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Types])],
  providers: [TypesResolver, TypesService],
  controllers: [TypesController],
  exports:[TypesService]
})
export class TypesModule {}
