import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortenerService } from './url-shortener.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UrlShortener } from './entities/url-shortener.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

describe('UrlShortenerController', () => {
  let controller: UrlShortenerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlShortenerController],
      providers: [
        UrlShortenerService,
        {
          provide: getRepositoryToken(UrlShortener),
          useClass: Repository,
        },
        ConfigService,
      ],
    }).compile();

    controller = module.get<UrlShortenerController>(UrlShortenerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
