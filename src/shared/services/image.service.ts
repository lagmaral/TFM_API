import { Injectable } from '@nestjs/common';
import * as Jimp from 'jimp';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { LoggerService } from './logger.service';

@Injectable()
export class ImageService {
  async  processAndSaveImage(pathText:string,originalFilename: string): Promise<string[]> {
    const sizes = {
      icon: 100,
      small: 400,
      medium: 800,
      large: 1200,
    };


    const savedPaths: string[] = [];
    const baseName = path.parse(originalFilename).name; // Extraer nombre base sin extensión
    const outputDir = path.join(pathText);
    // Crear carpeta si no existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  
    for (const [key, size] of Object.entries(sizes)) {
      const filename = `${baseName}-${size}.webp`; // Nombre con el tamaño
      const outputPath = path.join(outputDir, filename);
      const buffer = fs.readFileSync(pathText+"/"+originalFilename);
      await sharp(buffer)
        .resize(size) // Redimensionar a ancho específico
        .webp({ quality: 80 }) // Convertir a formato WebP con calidad 80
        .toFile(outputPath); // Guardar en disco
      savedPaths.push(outputPath); // Registrar ruta del archivo
    }
    return savedPaths; // Devolver las rutas de las imágenes generadas
  }
}


