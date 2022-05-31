import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VersionsResolver } from './versions.resolver';
import { VersionsService } from './versions.service';
import { Versions } from './entities/versions.entity';
import { VersionsController } from './versions.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Versions])],
  providers: [VersionsResolver, VersionsService],
  controllers : [VersionsController],
  exports:[VersionsService]
})
export class VersionsModule {}
