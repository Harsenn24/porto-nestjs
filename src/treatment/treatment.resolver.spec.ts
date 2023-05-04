import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentResolver } from './treatment.resolver';

describe('TreatmentResolver', () => {
  let resolver: TreatmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreatmentResolver],
    }).compile();

    resolver = module.get<TreatmentResolver>(TreatmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
