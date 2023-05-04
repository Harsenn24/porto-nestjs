import { Test, TestingModule } from '@nestjs/testing';
import { ClinicResolver } from './clinic.resolver';

describe('ClinicResolver', () => {
  let resolver: ClinicResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicResolver],
    }).compile();

    resolver = module.get<ClinicResolver>(ClinicResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
