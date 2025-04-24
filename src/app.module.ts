import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlShortener } from './url-shortener/entities/url-shortener.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'editor',
      password: 'editor-mysql-non-root-pass',
      database: 'url-service',
      entities: [UrlShortener],
      synchronize: true, // Turn off in production
    }),
    TypeOrmModule.forFeature([UrlShortenerModule]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
