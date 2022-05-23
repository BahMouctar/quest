import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {TypeOrmModule} from "@nestjs/typeorm"
import { TypeOrmService } from './config';
import {ConfigModule} from "@nestjs/config"
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { InputsModule } from './app/inputs/inputs.module';
import { LanguagesModule } from './app/languages/languages.module';
import { QuestsModule } from './app/quests/quests.module';
import { QuestSubjectLanguagesModule } from './app/questSubjectLanguages/questSubjectLanguages.module';
import { QuestSubjectsModule } from './app/questSubjects/questSubjects.module';
import { SubjectsModule } from './app/subjects/subjects.module';
import { TypesModule } from './app/types/types.module';
import { VersionsModule } from './app/versions/versions.module';
import { SettingsModule } from './settings/settings.module';



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
    InputsModule,
    LanguagesModule,
    QuestsModule,
    QuestSubjectsModule,
    QuestSubjectLanguagesModule,
    SubjectsModule,
    TypesModule,
    VersionsModule,
    SettingsModule
  ],
  providers: [],
  controllers: [],
})

export class AppModule {}
