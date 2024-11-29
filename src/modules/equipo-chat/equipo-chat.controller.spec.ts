import { Test, TestingModule } from '@nestjs/testing';
import { EquipoChatController } from './equipo-chat.controller';

describe('EquipoChatController', () => {
  let controller: EquipoChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipoChatController],
    }).compile();

    controller = module.get<EquipoChatController>(EquipoChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
