import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, //does not allow field that is not in DTO to pass through
    forbidNonWhitelisted:true,   //Throws error when a field is used that doesnt exist in DTO
    transform:true,   //Transforms request to instance of DTO
    transformOptions:{
      enableImplicitConversion:true,
    }
  })
);

  //=====Swagger Configuration Starts ======/
  const config = new DocumentBuilder()
          .setTitle('Savings Management System - CITECHS')
          .setDescription('Use the base API URL as http://localhost:3000/api')
          .setTermsOfService('http://localhost:3000/terms-of-service')
          .setLicense('MIT License', 'http://localhost:3000/license')
          .addServer('http://localhost:3000/')
          .setVersion('1.0')
          .build();
  //Instantiate Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
 //=====Swagger Configuration Ends ======/

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
