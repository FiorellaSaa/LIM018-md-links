const fs = require('fs');
const path = require('path');

const ruta1 = './prueba/prueba.md';
const ruta2 = './prueba/prueba2.md';
const ruta3 = './prueba/prueba.text';
const rutaAbsolute = 'c:\\Users\\Fiorella\\Proyecto 4-mdLinks\\LIM018-md-links';

// Verificar si existe la ruta
function routeExists(route) {
  const routeVerify = fs.existsSync(route);
  if (routeVerify) {
    return route;
  }
  return 'Err: the route does not exist';
}
console.log(routeExists(ruta1));
console.log(routeExists(ruta2));

// Verificar si la ruta es abosluta
function routeAbsolute(route) {
  const routeAbsoluteVerify = path.isAbsolute(route);
  if (routeAbsoluteVerify) {
    return route;
  }
  return 'The path is relative';
}
console.log(routeAbsolute(ruta1));
console.log(routeAbsolute(rutaAbsolute));

// convertir una ruta relativa a abosluta
function convertRouteToAbsolute(route) {
  return path.resolve(route);
}
console.log('Route converted to absolute', convertRouteToAbsolute(ruta1));

// Extensión .md
function fileExtension(routeFile) {
  const routeExt = path.extname(routeFile);
  if (routeExt === '.md') {
    return routeExt;
  }
  return 'It is not .md extension';
}
console.log(fileExtension(ruta3));

// Leyendo data del archivo prueba.md-síncrono
function readContent(route) {
  try {
    const readContentFile = fs.readFileSync(route, 'utf-8');
    return readContentFile;
  } catch (error) {
    return '';
  }
}
console.log(readContent(ruta1));

module.exports = {
  routeExists,
  routeAbsolute,
  convertRouteToAbsolute,
  fileExtension,
  readContent,
};
