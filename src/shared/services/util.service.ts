import { Injectable } from "@nestjs/common";
import { StaffDTO } from "../dtos/staff.dto";
import { EquipoDTO } from "../dtos/equipo.dto";
import { JugadorDTO } from "../dtos/jugador.dto";
import { UsuarioDTO } from "../dtos/usuario.dto";

@Injectable()
export class UtilsService {

      static calculateTeamKey(equipoTO: EquipoDTO): string {
        const descripcion = equipoTO.descripcion || '';
        const nombre = equipoTO.nombre || '';
    
        // Obtener los primeros caracteres
        const keyPart1 = descripcion.substring(0, 5).toLowerCase(); // Primeros 3 caracteres de apellido1    
        const keyPart2 = nombre.substring(0, 5).toLowerCase(); // Primeros 2 caracteres del nombre

  
        return `${keyPart1}${keyPart2}`.toUpperCase(); // Concatenar partes para formar el internalKey
      }

    // Método para calcular el internalkey
    private static calculateInternalKey(apellido1:string, apellido2:string, nombre:string, fechanacimiento:Date/*staffDTO: StaffDTO*/): string {

      // Obtener los primeros caracteres
      const keyPart1 = apellido1.substring(0, 3).toLowerCase(); // Primeros 3 caracteres de apellido1
      const keyPart2 = apellido2.substring(0, 3).toLowerCase(); // Primeros 3 caracteres de apellido2
      const keyPart3 = nombre.substring(0, 2).toLowerCase(); // Primeros 2 caracteres del nombre
      const formattedDate = this.formatBirthDate(new Date(/*staffDTO.*/fechanacimiento));
      return `${keyPart1}${keyPart2}${keyPart3}${formattedDate}`.toUpperCase(); // Concatenar partes para formar el internalKey
    }

    static calculateUsuarioInternalKey(usuarioDTO: UsuarioDTO): string {
      const apellido1 = usuarioDTO.apellido1 || '';
      const apellido2 = usuarioDTO.apellido2 || '';
      const nombre = usuarioDTO.nombre || '';

      return UtilsService.calculateInternalKey(apellido1,apellido2,nombre,usuarioDTO.fechanacimiento);
    }

    static calculateStaffInternalKey(staffDTO: StaffDTO): string {
        const apellido1 = staffDTO.apellido1 || '';
        const apellido2 = staffDTO.apellido2 || '';
        const nombre = staffDTO.nombre || '';
  
        return UtilsService.calculateInternalKey(apellido1,apellido2,nombre,staffDTO.fechanacimiento);
      }

      static calculatePlayerInternalKey(jugadorDTO: JugadorDTO): string {
        const apellido1 = jugadorDTO.apellido1 || '';
        const apellido2 = jugadorDTO.apellido2 || '';
        const nombre = jugadorDTO.nombre || '';
    
        return UtilsService.calculateInternalKey(apellido1,apellido2,nombre,jugadorDTO.fechanacimiento);
      }
    
     static  formatBirthDate(birthDate: Date | null | undefined): string {
        if (!birthDate) return '';
        
        return `${birthDate.getFullYear()}${String(birthDate.getMonth() + 1).padStart(2, '0')}${String(birthDate.getDate()).padStart(2, '0')}`;
      }

      static formatDateToPostgres(originalDate) {
        // Verificar si el argumento es un objeto Date válido
        const year = originalDate.getFullYear();
        const month = originalDate.getMonth(); // Los meses son 0-indexados
        const day = originalDate.getDate();
        
        // Crear un nuevo objeto Date, estableciendo la hora a medianoche (00:00:00)
        return new Date(Date.UTC(year, month, day));
      }
}