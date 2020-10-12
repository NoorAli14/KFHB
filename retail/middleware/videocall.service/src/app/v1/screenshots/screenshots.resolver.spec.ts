import { Test, TestingModule } from '@nestjs/testing';
import { ScreenshotsResolver } from './screenshots.resolver';

describe('ScreenshotsResolver', () => {
  let resolver: ScreenshotsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreenshotsResolver],
    }).compile();

    resolver = module.get<ScreenshotsResolver>(ScreenshotsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
