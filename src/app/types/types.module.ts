import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesResolver } from './types.resolver';
import { TypesService } from './types.service';
import { Types } from './entities/types.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Types])],
  providers: [TypesResolver, TypesService],
  exports:[TypesService]
})
export class TypesModule {}
