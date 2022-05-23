import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
  .setTitle(configuration().swagger.title)
  .setDescription( configuration().swagger.description)
  .setVersion( configuration().swagger.version)
  .addBearerAuth({
    type: 'http', scheme: 'bearer', bearerFormat: 'jwt'
  }, 'jwt')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configuration().swagger.url, app, document);
  
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000
  await app.listen(port,()=> console.log(`😇 App is running on port ${port}`));
}
bootstrap();
