import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';
import { Authors } from './entities/authors.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Authors])],
  providers: [AuthorsResolver, AuthorsService],
  exports:[AuthorsService]
})
export class AuthorsModule {}
