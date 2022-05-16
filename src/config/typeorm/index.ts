import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import * as fs from "fs";
import { join } from "path";




export class TypeOrmService implements TypeOrmOptionsFactory{


  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {

    return {
      type: <any>process.env.TYPE,
      host: process.env.HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,


      entities: ["dist/**/**/*.entity{.ts,.js}", "dist/res/**/entities/*.entity{.ts,.js}"],

      synchronize: (process.env.APP_ENV === 'dev' || process.env.APP_ENV === 'staging') ? true : false,

      ssl: process.env.APP_ENV === 'dev' ? false : process.env.APP_ENV === "docker" ? false : {
        rejectUnauthorized: true,
        ca: fs.readFileSync("labs-ca-certificate.crt", 'utf8').toString(),
      },
      autoLoadEntities:true,
      keepConnectionAlive:true,
      migrationsTableName: 'migrations',
      migrations: ["dist/config/typeorm/migration/*.js", join(__dirname, "migration/*.ts")],
      migrationsRun: true,
      logging: ['warn', 'error'],
      logger: process.env.APP_ENV === 'prod' ? 'simple-console' : 'debug',
      cli: {
        migrationsDir: `${join(__dirname)}/migration`,
      }
    }
  }
}
