import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurableService {

  static folderPath:string;
  static playerPath:string;

  constructor(private readonly configService: ConfigService) {
    ConfigurableService.folderPath = this.getStaffPath();
    ConfigurableService.playerPath = this.getPlayerPath();
    /*this.configObject = {
      uploadPath: this.configService.get<string>('UPLOAD_PATH') || './uploads',
      anotherProperty: this.configService.get<string>('ANOTHER_PROPERTY') || 'default value',
      // Agrega más propiedades según sea necesario
    };*/
  }

  static getURLStaffPath(): string{
    return "/pauldarrak/photos/staff/";
  }

  static getURLEscudosPath(): string{
    return "/pauldarrak/uploads/";
  }

  static getURLPlayersPath(): string{
    return "/pauldarrak/photos/players/";
  }

  static getConfigStaffPath(): string{
    return ConfigurableService.folderPath;
  }

  static getConfigPlayerPath(): string{
    return ConfigurableService.playerPath;
  }

  private getStaffPath(): string {
    return this.configService.get<string>('UPLOAD_PATH')+this.configService.get<string>('SATFF_UPLOAD_PATH');
  }

  private getPlayerPath(): string {
    return this.configService.get<string>('UPLOAD_PATH')+this.configService.get<string>('PLAYERS_UPLOAD_PATH');
  }
}