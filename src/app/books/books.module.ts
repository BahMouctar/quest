import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { Books } from './entities/books.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Books])],
  providers: [BooksResolver, BooksService],
  exports:[BooksService]
})
export class BooksModule {}
