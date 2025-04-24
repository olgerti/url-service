import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CreateUrlShortenerDto {
  @ApiProperty({
    description: 'The original URL to be shortened',
    example: 'https://www.example.com/user/id/departament',
  })
  @IsUrl()
  originalUrl: string;
}
