import { CuotaEntity } from '../entities/cuota.entity';
import { CuotaDTO } from '../dtos/cuota.dto';

export class CuotaMapper {
  static toEntity(cuotaDTO: CuotaDTO): CuotaEntity {
    const cuota = new CuotaEntity();
    //cuota.id = cuotaDTO.id;
    cuota.descripcion = cuotaDTO.descripcion;
    return cuota;
  }

  static toDTO(cuota: CuotaEntity): CuotaDTO {
    const cuotaDTO = new CuotaDTO();
    cuotaDTO.id = cuota.id;
    cuotaDTO.descripcion = cuota.descripcion;
    return cuotaDTO;
  }
}