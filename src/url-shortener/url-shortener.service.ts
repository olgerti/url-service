import { Injectable } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';

@Injectable()
export class UrlShortenerService {
  create(createUrlShortenerDto: CreateUrlShortenerDto) {
    return 'This action adds a new urlShortener';
  }

  findOne(id: number) {
    return `This action returns a #${id} urlShortener`;
  }
}
