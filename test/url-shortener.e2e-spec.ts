import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UrlShortenerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/url-shortener (POST) should create a short URL', async () => {
    const createUrlShortenerDto = {
      originalUrl: 'https://www.example.com/some/very/long/path',
    };
  
    // Mock the response you expect to get after a successful creation
    const expectedResponse = {
      id: expect.any(String),
      originalUrl: createUrlShortenerDto.originalUrl,
      generatedUrl: expect.stringContaining('http://localhost'), 
      code: expect.any(String),
    };
  
    const response = await request(app.getHttpServer())
      .post('/url-shortener')
      .send(createUrlShortenerDto)
      .expect(201);
  
    expect(response.body).toEqual(expect.objectContaining(expectedResponse));
  });

  it('/url-shortener/:code (GET) should return the original URL', async () => {
    const createUrlShortenerDto = {
      originalUrl: 'https://www.example.com/some/very/long/path',
    };
  
    // Step 1: Create a short URL
    const createResponse = await request(app.getHttpServer())
      .post('/url-shortener')
      .send(createUrlShortenerDto)
      .expect(201);
  
    const { code, originalUrl } = createResponse.body;
  
    // Step 2: Retrieve the URL using the code
    const findResponse = await request(app.getHttpServer())
      .get(`/url-shortener/${code}`)
      .expect(200);
  
    // Expected response body structure
    const expectedFindResponse = {
      originalUrl: originalUrl,
      generatedUrl: expect.stringContaining('http://localhost'), // Match the generated URL format
    };
  
    // Check if response matches the expected structure
    expect(findResponse.body).toEqual(expect.objectContaining(expectedFindResponse));
  });
  

  it('/url-shortener/:code (GET) should return 404 if URL not found', async () => {
    const nonExistentCode = 'nonexistentcode';
  
    // Send a GET request with a code that does not exist
    const response = await request(app.getHttpServer())
      .get(`/url-shortener/${nonExistentCode}`)
      .expect(404);
  
    // Ensure response has the appropriate status code and message
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expect.objectContaining({ message: 'Short URL not found' }));
  });
  
});
