import { Injectable } from "@nestjs/common";
import { StaffDTO } from "../dtos/staff.dto";
import { EquipoDTO } from "../dtos/equipo.dto";

@Injectable()
export class UtilsService {

      static calculateTeamKey(equipoTO: EquipoDTO): string {
        const descripcion = equipoTO.descripcion || '';
        const nombre = equipoTO.nombre || '';
    
        // Obtener los primeros caracteres
        const keyPart1 = descripcion.substring(0, 5).toLowerCase(); // Primeros 3 caracteres de apellido1    
        const keyPart2 = nombre.substring(0, 5).toLowerCase(); // Primeros 2 caracteres del nombre

  
        return `${keyPart1}${keyPart2}`; // Concatenar partes para formar el internalKey
      }

    static calculateInternalKey(staffDTO: StaffDTO): string {
        const apellido1 = staffDTO.apellido1 || '';
        const apellido2 = staffDTO.apellido2 || '';
        const nombre = staffDTO.nombre || '';
    
        // Obtener los primeros caracteres
        const keyPart1 = apellido1.substring(0, 3).toLowerCase(); // Primeros 3 caracteres de apellido1
        const keyPart2 = apellido2.substring(0, 3).toLowerCase(); // Primeros 3 caracteres de apellido2
        const keyPart3 = nombre.substring(0, 2).toLowerCase(); // Primeros 2 caracteres del nombre
        const formattedDate = UtilsService.formatBirthDate(new Date(staffDTO.fechanacimiento));
        
        return `${keyPart1}${keyPart2}${keyPart3}${formattedDate}`; // Concatenar partes para formar el internalKey
      }
    
     static  formatBirthDate(birthDate: Date | null | undefined): string {
        if (!birthDate) return '';
        
        return `${birthDate.getFullYear()}${String(birthDate.getMonth() + 1).padStart(2, '0')}${String(birthDate.getDate()).padStart(2, '0')}`;
      }
}