import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlShortener } from './entities/url-shortener.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlShortenerService {
  private readonly baseUrl: string;
  private readonly codeLength: number;
  constructor(
    @InjectRepository(UrlShortener)
    private readonly urlRepository: Repository<UrlShortener>,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('BASE_URL') ?? 'http://localhost:3000';
    this.codeLength = Number(this.configService.get<number>('CODE_LENGTH'));
  }

  async create(
    createUrlShortenerDto: CreateUrlShortenerDto,
  ): Promise<UrlShortener> {
    const code = this.generateCode(this.codeLength);

    const urlShortener: Partial<UrlShortener> = {
      ...createUrlShortenerDto,
      generatedUrl: `${this.baseUrl}/${code}`,
      code,
    };

    return await this.urlRepository.save(urlShortener);
  }

  async findOriginalUrl(code: string): Promise<UrlShortener> {
    const urlShortener = await this.urlRepository.findOne({ where: { code } });

    if (!urlShortener) {
      throw new NotFoundException('Short URL not found');
    }

    return urlShortener;
  }

  private generateCode(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
