import { Test, TestingModule } from '@nestjs/testing';
import { EquipoChatService } from './equipo-chat.service';

describe('EquipoChatService', () => {
  let service: EquipoChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipoChatService],
    }).compile();

    service = module.get<EquipoChatService>(EquipoChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
