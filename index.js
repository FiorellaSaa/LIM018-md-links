
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
  return 'Err: La ruta no existe';
}
console.log(routeExists(ruta1));
console.log(routeExists(ruta2));

// Verificar si la ruta es abosluta
function routeAbsolute(route) {
  const routeAbsoluteVerify = path.isAbsolute(route);
  if (routeAbsoluteVerify) {
    return route;
  }
  return 'La ruta es relativa';
}
console.log(routeAbsolute(ruta1));
console.log(routeAbsolute(rutaAbsolute));

// convertir una ruta relativa a abosluta
function convertRoute(route) {
  return path.resolve(route);
}
console.log('Ruta convertida a absoluta', convertRoute(ruta1));

// Extensión .md
function mdExtention(route) {
  const routeExt = path.extname(route);
  if (routeExt === '.md') {
    return routeExt;
  }
  return 'No es de extensión md';
}
console.log(mdExtention(ruta3));

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
  convertRoute,
  mdExtention,
  readContent,
};
