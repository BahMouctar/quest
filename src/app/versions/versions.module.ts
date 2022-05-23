import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VersionsResolver } from './versions.resolver';
import { VersionsService } from './versions.service';
import { Versions } from './entities/versions.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Versions])],
  providers: [VersionsResolver, VersionsService],
  exports:[VersionsService]
})
export class VersionsModule {}
