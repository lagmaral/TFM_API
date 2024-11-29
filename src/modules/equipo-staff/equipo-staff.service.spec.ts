import { Test, TestingModule } from '@nestjs/testing';
import { EquipoStaffService } from './equipo-staff.service';

describe('EquipoStaffService', () => {
  let service: EquipoStaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipoStaffService],
    }).compile();

    service = module.get<EquipoStaffService>(EquipoStaffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
