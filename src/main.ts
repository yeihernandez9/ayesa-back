import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
  };
  app.enableCors(corsOptions);
  const options = new DocumentBuilder()
    .setTitle('AYESA BACKEND')
    .setDescription('Ayesa')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('document', app, document);
  await app.listen(AppModule.port);
}
bootstrap();
