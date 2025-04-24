import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UrlShortenerDto } from '../dto/url-shortener.dto';

export class UrlShortener {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalUrl: string;

  @Column()
  generatedUrl: string;

  @Column({ unique: true })
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * Converts the entity to a DTO
   * @param entity - The UrlShortener entity instance
   * @returns - The corresponding UrlShortenerDto
   */
  static toDto(entity: UrlShortener): UrlShortenerDto {
    return plainToInstance(UrlShortenerDto, entity);
  }
}
