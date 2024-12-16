import { StaffEntity } from '../entities/staff.entity';
import { StaffDTO } from '../dtos/staff.dto';
import { ConfigurableService } from '../services/env.service';

export class StaffMapper {
  static toEntity(staffDTO: StaffDTO): StaffEntity {
    const staff = new StaffEntity();
    staff.id = staffDTO.id;
    staff.telefono = staffDTO.telefono;
    if (staffDTO.internalkey) {
      staff.internalkey = staffDTO.internalkey
          .toUpperCase()
          .replaceAll(ConfigurableService.getURLStaffPath(), '');
    } else {
      staff.internalkey  = ''; // O puedes asignar un valor por defecto si lo prefieres
    }
    staff.admin = staffDTO.admin;
    staff.fechanacimiento = staffDTO.fechanacimiento;
    staff.nombre = staffDTO.nombre.toUpperCase();
    staff.apellido1 = staffDTO.apellido1.toUpperCase();
    staff.apellido2 = staffDTO.apellido2.toUpperCase();
    return staff;
  }

  static toDTO(staff: StaffEntity): StaffDTO {
    const staffDTO = new StaffDTO();
    staffDTO.id = staff.id;
    staffDTO.telefono = staff.telefono;
    staffDTO.internalkey = staff.internalkey;
    staffDTO.internalkey = ConfigurableService.getURLStaffPath()+staff.internalkey;
    staffDTO.admin = staff.admin;
    staffDTO.fechanacimiento = staff.fechanacimiento;
    staffDTO.nombre = staff.nombre;
    staffDTO.apellido1 = staff.apellido1;
    staffDTO.apellido2 = staff.apellido2;
    return staffDTO;
  }
}