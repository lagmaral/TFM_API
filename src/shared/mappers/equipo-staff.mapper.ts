import { EquipoStaffEntity } from '../entities/equipo-staff.entity';
import { EquipoStaffDTO } from '../dtos/equipo-staff.dto';
import { CargoEntity } from '../entities/cargo.entity';
import { StaffEntity } from '../entities/staff.entity';
import { EquipoEntity } from '../entities/equipo.entity';
import { CargoMapper } from './cargo.mapper';
import { StaffMapper } from './staff.mapper';
import { EquipoMapper } from './equipo.mapper';

export class EquipoStaffMapper {
  static toEntity(equipoStaffDTO: EquipoStaffDTO): EquipoStaffEntity {
    const equipoStaff = new EquipoStaffEntity();
    //equipoStaff.id = equipoStaffDTO.id;
    equipoStaff.cargo = new CargoEntity();
    equipoStaff.cargo.id = equipoStaffDTO.idcargo;
    equipoStaff.staff = new StaffEntity();
    equipoStaff.staff.id = equipoStaffDTO.idstaff;
    equipoStaff.equipo = new EquipoEntity();
    equipoStaff.equipo.id = equipoStaffDTO.idequipo;
    
    return equipoStaff;
  }

  static toDTO(equipoStaff: EquipoStaffEntity): EquipoStaffDTO {
    const equipoStaffDTO = new EquipoStaffDTO();
    equipoStaffDTO.id = equipoStaff.id;
    equipoStaffDTO.idcargo = equipoStaff.cargo ? equipoStaff.cargo.id : null; // Si temporada es null o undefined, asignar null
    equipoStaffDTO.cargo = equipoStaff.cargo ? CargoMapper.toDTO(equipoStaff.cargo) : null;
    equipoStaffDTO.idstaff = equipoStaff.staff ? equipoStaff.staff.id : null; // Si temporada es null o undefined, asignar null       
    equipoStaffDTO.staff = equipoStaff.staff ? StaffMapper.toDTO(equipoStaff.staff) : null;
    equipoStaffDTO.idequipo = equipoStaff.equipo ? equipoStaff.equipo.id : null; // Si temporada es null o undefined, asignar null
    equipoStaffDTO.equipo = equipoStaff.equipo ? EquipoMapper.toDTO(equipoStaff.equipo) : null;
    return equipoStaffDTO;
  }
}