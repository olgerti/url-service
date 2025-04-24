import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { UrlShortener } from './entities/url-shortener.entity';

@Controller('url-shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  async create(@Body() createUrlShortenerDto: CreateUrlShortenerDto) {
    return UrlShortener.toDto(
      await this.urlShortenerService.create(createUrlShortenerDto),
    );
  }

  @Get(':code')
  @ApiNotFoundResponse()
  async findOne(@Param('code') code: string) {
    return UrlShortener.toDto(
      await this.urlShortenerService.findOriginalUrl(code),
    );
  }
}
