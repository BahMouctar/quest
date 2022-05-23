import { Test, TestingModule } from '@nestjs/testing';
import { LanguageVersionService } from './language-version.service';

describe('LanguageVersionService', () => {
  let service: LanguageVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LanguageVersionService],
    }).compile();

    service = module.get<LanguageVersionService>(LanguageVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
