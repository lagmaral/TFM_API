import { join } from 'path';
import { ConfigService } from '@nestjs/config';

export function staticPaths(configService: ConfigService) {
  return [
    {
        rootPath: join(__dirname, '..', 'public'), // Cambia la ruta a tu carpeta "public"
        serveRoot: '/pauldarrak/uploads', // URL base pública
    },
    {
      rootPath: join(configService.get<string>('UPLOAD_PATH')+configService.get<string>('SATFF_UPLOAD_PATH')),
      serveRoot: '/pauldarrak/photos/staff',
    },
    {
       rootPath: join(configService.get<string>('UPLOAD_PATH')+configService.get<string>('PLAYERS_UPLOAD_PATH')),
      serveRoot: '/pauldarrak/photos/players',
    },
  ];
}
