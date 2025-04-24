import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerService } from './url-shortener.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UrlShortener } from './entities/url-shortener.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

describe('UrlShortenerService', () => {
  let service: UrlShortenerService;
  let repository: Repository<UrlShortener>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlShortenerService,
        {
          provide: getRepositoryToken(UrlShortener),
          useClass: Repository, // You can mock the repository methods here if needed
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<UrlShortenerService>(UrlShortenerService);
    repository = module.get<Repository<UrlShortener>>(
      getRepositoryToken(UrlShortener),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
