const sharp = require('sharp');
const fs = require('fs');

// Lee la imagen de entrada desde el archivo local
const buffer = fs.readFileSync('tsest.JPG'); // Cambia 'input-image.jpg' por tu imagen de prueba

// Procesa la imagen con sharp
sharp(buffer)
  .resize(400) // Redimensionar a 400px de ancho
  .webp({ quality: 80 }) // Convertir a formato WebP con calidad 80
  .toFile('output-image.webp') // Guardar la imagen procesada
  .then(() => console.log('Imagen procesada correctamente'))
  .catch(err => console.error('Error procesando la imagen:', err));
