import { Test, TestingModule } from '@nestjs/testing';
import { TemporadaService } from './temporada.service';

describe('TemporadaService', () => {
  let service: TemporadaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemporadaService],
    }).compile();

    service = module.get<TemporadaService>(TemporadaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
