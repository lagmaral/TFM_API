import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { StaffDTO } from 'src/shared/dtos/staff.dto';
import { StaffMapper } from 'src/shared/mappers/staff.mapper';

import { StaffRepository } from 'src/shared/repository/staff.repository';
import { LoggerService } from 'src/shared/services/logger.service';
import { EquipoStaffService } from '../equipo-staff/equipo-staff.service';
import { UsuarioDTO } from 'src/shared/dtos/usuario.dto';
import { UtilsService } from 'src/shared/services/util.service';


@Injectable()
export class StaffService {
  constructor(
    private staffRepository: StaffRepository,
    private readonly equipoStaffService: EquipoStaffService,
    private readonly logger: LoggerService,
  ) {
    logger.setContext('StaffService');
  }

  async newStaff(staffDTO: StaffDTO): Promise<StaffDTO> {
    // Calcular internalkey
    const internalKey = this.calculateInternalKey(staffDTO.apellido1, staffDTO.apellido2,staffDTO.nombre,staffDTO.fechanacimiento);

    // Verificar si ya existe un Staff con este internalKey
    const existingStaff = await this.staffRepository.repository.findOne({
      where: { internalkey: internalKey },
    });
    if (existingStaff) {
      throw new ConflictException('Miembro ya existente'); // Lanza un error si ya existe
    }

    // Crear una nueva instancia de Staff
    const staff = StaffMapper.toEntity(staffDTO);
    staff.internalkey = internalKey;
    // Guardar en la base de datos
    return await this.staffRepository.create(staff);
  }

  async isAdminUser(input: UsuarioDTO): Promise<boolean> {
    const internalKey = this.calculateInternalKey(input.apellido1, input.apellido2,input.nombre,input.fechanacimiento);
    const existingStaff = await this.staffRepository.repository.findOne({
      where: { internalkey: internalKey },
    });
    if (existingStaff) {
      return true;
    }else{

      return false;
    }
  }

  async findById(id: number): Promise<StaffDTO> {
    return await this.staffRepository.findById(id);
  }

  async updateStaff(id: number, input: StaffDTO): Promise<StaffDTO> {
    // 1. Comprobar si el usuario existe por el token
    const staff = await this.staffRepository.findById(id);
    if (!staff) {
      throw new NotFoundException('Miembro del staff no encontrado');
    }

    // 2. Verificar si el teléfono existe en la base de datos
    const internalKey = this.calculateInternalKey(input.apellido1, input.apellido2,input.nombre,input.fechanacimiento);
    const existingStaff = await this.staffRepository.repository.findOne({
      where: { internalkey: internalKey },
    });
    const numericId = Number(id);
    if (existingStaff && existingStaff.id !== numericId) {
      throw new ConflictException('Miembro ya existente'); // Lanza un error si ya existe
    }
    // 3. Modificar el usuario con los nuevos datos
    // Si el teléfono es válido o no se modifica, se puede actualizar
    const updatedStaff = StaffMapper.toEntity(input);
    updatedStaff.id = updatedStaff.id; // Mantener el ID del usuario actual
    updatedStaff.internalkey = internalKey; // Mantener el mismo token si es necesario
    updatedStaff.fechanacimiento = UtilsService.formatDateToPostgres(new Date(updatedStaff.fechanacimiento));
    //this.logger.log("ANTES DE GUARDAR: "+JSON.stringify(updatedStaff));
    // Actualiza la base de datos con los nuevos datos del usuario
    await this.staffRepository.update(id, updatedStaff);

    // Devuelve el DTO actualizado del usuario
    return await this.staffRepository.findById(id);
  }

  // Método para calcular el internalkey
  private calculateInternalKey(apellido1:string, apellido2:string, nombre:string, fechanacimiento:Date/*staffDTO: StaffDTO*/): string {
    //const apellido1 = staffDTO.apellido1 || '';
    //const apellido2 = staffDTO.apellido2 || '';
    //const nombre = staffDTO.nombre || '';

    // Obtener los primeros caracteres
    const keyPart1 = apellido1.substring(0, 3).toLowerCase(); // Primeros 3 caracteres de apellido1
    const keyPart2 = apellido2.substring(0, 3).toLowerCase(); // Primeros 3 caracteres de apellido2
    const keyPart3 = nombre.substring(0, 2).toLowerCase(); // Primeros 2 caracteres del nombre
    const formattedDate = this.formatBirthDate(new Date(/*staffDTO.*/fechanacimiento));
    return `${keyPart1}${keyPart2}${keyPart3}${formattedDate}`; // Concatenar partes para formar el internalKey
  }

  formatBirthDate(birthDate: Date | null | undefined): string {
    if (!birthDate) return '';
    
    return `${birthDate.getFullYear()}${String(birthDate.getMonth() + 1).padStart(2, '0')}${String(birthDate.getDate()).padStart(2, '0')}`;
  }



  async findPaginated(
    filters: any,
    paginationDto: PaginationDto,
  ): Promise<{ data: StaffDTO[]; total: number }> {
    const { page, limit } = paginationDto;
    this.logger.log('findPaginated'+JSON.stringify(paginationDto));
    this.logger.log('findPaginated'+JSON.stringify(filters));
    const [result, total] = await this.staffRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result.map((staff) => StaffMapper.toDTO(staff)), // Map results to DTOs
      total,
    };
  }

  async deleteStaff(id: number): Promise<boolean> {
    await this.equipoStaffService.deleteEquipoStaffByStaffId(id);
    return await this.staffRepository.deleteById(id);
  }
}
