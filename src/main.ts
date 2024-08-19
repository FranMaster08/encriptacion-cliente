import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API para la gestión de autenticación y claves')
    .setVersion('1.0')
    .addBearerAuth() // Añade el esquema de autenticación Bearer si vas a usar JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Habilita CORS si es necesario
  app.enableCors();

  // Levanta la aplicación en el puerto 3000
  await app.listen(3001);
}

bootstrap();
