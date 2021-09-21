import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PruebaModule } from './prueba/prueba.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PruebaModule,
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
