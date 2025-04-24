// src/url-shortener/dto/url-shortener.dto.ts
import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsUrl
} from 'class-validator';

export class UrlShortenerDto {
  @ApiProperty({
    description: 'Unique identifier for the shortened URL',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The original URL to be shortened',
    example: 'https://www.example.com/user/id/departament',
  })
  @IsUrl()
  originalUrl: string;

  @ApiProperty({
    description: 'The generated short URL that users will receive',
    example: 'https://www.example.com/code12',
  })
  @IsUrl()
  generatedUrl: string;

  @ApiProperty({
    description: 'The short code used in the URL path',
    example: 'code12',
  })
  @IsNotEmpty()
  code: string;
}
