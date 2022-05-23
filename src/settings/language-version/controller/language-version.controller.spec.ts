import { Test, TestingModule } from '@nestjs/testing';
import { LanguageVersionController } from './language-version.controller';

describe('LanguageVersionController', () => {
  let controller: LanguageVersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LanguageVersionController],
    }).compile();

    controller = module.get<LanguageVersionController>(LanguageVersionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
