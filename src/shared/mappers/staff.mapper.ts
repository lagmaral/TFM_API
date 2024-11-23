import { StaffEntity } from '../entities/staff.entity';
import { StaffDTO } from '../dtos/staff.dto';

export class StaffMapper {
  static toEntity(staffDTO: StaffDTO): StaffEntity {
    const staff = new StaffEntity();
    //staff.id = staffDTO.id;
    staff.telefono = staffDTO.telefono;
    staff.internalkey = staffDTO.internalkey;
    staff.foto = staffDTO.foto;
    staff.admin = staffDTO.admin;
    staff.fechanacimiento = staffDTO.fechanacimiento;
    return staff;
  }

  static toDTO(staff: StaffEntity): StaffDTO {
    const staffDTO = new StaffDTO();
    staffDTO.id = staff.id;
    staffDTO.telefono = staff.telefono;
    staffDTO.internalkey = staff.internalkey;
    staffDTO.foto = staff.foto;
    staffDTO.admin = staff.admin;
    staffDTO.fechanacimiento = staff.fechanacimiento;
    return staffDTO;
  }
}