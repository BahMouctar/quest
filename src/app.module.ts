import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {TypeOrmModule} from "@nestjs/typeorm"
import { TypeOrmService } from './config';
import {ConfigModule} from "@nestjs/config"
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorsModule } from './app/authors/authors.module';
import { BooksModule } from './app/books/books.module';



require('dotenv').config()

if (process.env.APP_ENV === undefined) {
  process.env.APP_ENV = "dev"
}




@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      path:"api/v1/query",
      autoSchemaFile:true ,
      sortSchema: true,
      playground:  (process.env.APP_ENV === "dev" || process.env.APP_ENV === "staging") ? true : false,
      debug: false,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRootAsync({
      useClass:TypeOrmService
    }),
    ConfigModule.forRoot({
      envFilePath: `env/.${process.env.APP_ENV}.env`,
      isGlobal: true,
    }),
    AuthorsModule,
    BooksModule

  ],
  providers: [],
  controllers: [],
})

export class AppModule {}
