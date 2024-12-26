import { Injectable } from '@nestjs/common';
import { EquipoStaffDTO } from 'src/shared/dtos/equipo-staff.dto';
import { StaffDTO } from 'src/shared/dtos/staff.dto';
import { EquipoStaffRepository } from 'src/shared/repository/equipo-staff.repository';
import { LoggerService } from 'src/shared/services/logger.service';
@Injectable()
export class EquipoStaffService {
    constructor(
        private equipoStaffRepository: EquipoStaffRepository,
        private readonly logger: LoggerService,
      ) {
        logger.setContext('EquipoStaffService');
      }

      async deleteEquipoStaffByStaffId(id: number): Promise<boolean>  {
        return this.equipoStaffRepository.deleteEquipoStaffByStaffId(id);
      }

      async deleteEquipoStaffByTeamId(id: number): Promise<boolean>  {
        return this.equipoStaffRepository.deleteEquipoStaffByTeamId(id);
      }

     async findTeamsByStaffId(staffId: number): Promise<EquipoStaffDTO[]> {
       
       return  await this.equipoStaffRepository.findTeamsByStaffId(staffId);
     }
   
     async newStaffTeam(equipoStaffDTO: EquipoStaffDTO): Promise<EquipoStaffDTO> {
       return  await this.equipoStaffRepository.newStaffTeam(equipoStaffDTO.idstaff, equipoStaffDTO.idequipo,equipoStaffDTO.idcargo);
     }
   
     async deleteStaffTeam(staffId: number, equipoId: number): Promise<void> {
      
       await this.equipoStaffRepository.deleteStaffTeamId(staffId,equipoId);
     }
   
     async deleteStaffTeamByStaffId(staffId: number): Promise<void> {
       await this.equipoStaffRepository.deleteEquipoStaffByStaffId(staffId);
     }
         
     async deleteStaffTeamById(id: number): Promise<void> {
       await this.equipoStaffRepository.deleteStaffTeamById(id);
     } 

     async findStaffByTeamId(teamId: number): Promise<EquipoStaffDTO[]> {
      return await this.equipoStaffRepository.findStaffByTeamId(teamId); 
    }

    async getEquiposByStaffTelefono(telefono: string): Promise<number[]> {
      return await this.equipoStaffRepository.getEquiposByStaffTelefono(telefono);
    }
}
