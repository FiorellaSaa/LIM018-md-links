const fs = require('fs');
const path = require('path');
const axios = require('axios');

const ruta1 = './prueba/prueba.md';
const ruta2 = './prueba/prueba2.md';
const ruta3 = './prueba/prueba.text';
const rutaDir = './prueba';
const rutaAbsolute = 'c:\\Users\\Fiorella\\Proyecto 4-mdLinks\\LIM018-md-links';

// Verificar si existe la ruta
function routeExists(route) {
  const routeVerify = fs.existsSync(route);
  if (routeVerify) {
    return route;
  }
  return 'Err: the route does not exist';
}
// console.log(routeExists(ruta1));
// console.log(routeExists(ruta2));

// Verificar si la ruta es abosluta
function routeAbsolute(route) {
  const routeAbsoluteVerify = path.isAbsolute(route);
  if (routeAbsoluteVerify) {
    return route;
  }
  return 'The path is relative';
}
// console.log(routeAbsolute(ruta1));
// console.log(routeAbsolute(rutaAbsolute));

// convertir una ruta relativa a abosluta
function convertRouteToAbsolute(route) {
  return path.resolve(route);
}
// console.log("Route converted to absolute", convertRouteToAbsolute(ruta1));

// Extensión .md
function fileExtension(route) {
  const routeExt = path.extname(route);
  if (routeExt === '.md') {
    return routeExt;
  }
  return 'It is not .md extension';
}
// console.log(fileExtension(ruta3));

// Leyendo data del archivo prueba.md-síncrono
function readContent(route) {
  try {
    const readContentFile = fs.readFileSync(route, 'utf-8');
    return readContentFile;
  } catch (error) {
    return '';
  }
}
// console.log(readContent(ruta1));

// Verificar si es un directorio
const isDirectory = (route) => fs.lstatSync(route).isDirectory();
// console.log(isDirectory(rutaDir));

// Verificar si es un archivo
const isFile = (route) => fs.lstatSync(route).isFile();
// console.log(isFile(rutaDir));
// Leer archivos de un directorio

const readDirectory = (route) => fs.readdirSync(route);
// console.log(readDirectory(rutaDir));

// Recursión para obtener los archivos
const recursionToObtainFiles = (route) => {
  const storeFiles = [];
  if (isFile(route)) {
    return route;
  }
  const readFilesOfDirectory = readDirectory(route);
  readFilesOfDirectory.forEach((file) => {
    const newRoute = path.join(route, file);
    storeFiles.push(recursionToObtainFiles(newRoute));
  });
  return storeFiles;
};
console.log(recursionToObtainFiles(rutaDir));

// Función para obtener los links
function getLinks(route) {
  const methodReadFile = readContent(route);
  const regularExpression = /\[(.+)\]\((https?:\/\/.+)\)/gi;
  // const regularExpression = /(\[(.*?)\])?\(http(.*?)\)/gm
  const arrayLinks = methodReadFile.match(regularExpression);
  return arrayLinks;
}
// console.log(getLinks(ruta1));

// Función para almacenar los links en un array
function storeLinks(arrayLinks, route) {
  const newArray = [];
  if (arrayLinks.length > 0) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arrayLinks.length; i++) {
      const firstCut = arrayLinks[i].indexOf(']');
      const textLink = arrayLinks[i].slice(1, firstCut);
      const urlLink = arrayLinks[i].slice(firstCut + 2, -1);
      const object = {
        text: textLink,
        href: urlLink,
        file: route,
      };
      newArray.push(object);
    }
    return newArray;
  }
  return 'No links in the file';
}
// console.log(storeLinks(getLinks(ruta1), ruta1));

/* axios.get('https://docs.npmjs.com/v8/commands/npm-install')
  .then((response) => {
    //console.log(response.status);
    // console.log(response.statusText);
    console.log(response);
  })
  .catch((error) => {
    // console.log(error.response.status);
    // console.log(error.response.statusText);
    console.log(error)
  }); */
// Función para realizar petición http
function makeHttpRequest(arrayObject) {
  const getArray = arrayObject.map((element) => {
    const runAxios = axios.get(element.href)
      .then((response) => ({
        ...element,
        status: response.status,
        message: response.statusText,
      }))
      .catch((error) => ({
        ...element,
        // status: error.response.status,
        // status: error.response ? error.response.status : (error.request ? error.request : '500'),
        // message: error.response.statusText,
        status: 404,
        message: 'fail',
        // statusCode: 404,
      // statusMessage: 'Not Found',
      }));
    return runAxios;
  });
  return Promise.all(getArray);
}
/* makeHttpRequest(storeLinks(getLinks(ruta1), ruta1)).then((response) => {
  console.log(response);
}); */

module.exports = {
  routeExists,
  routeAbsolute,
  convertRouteToAbsolute,
  fileExtension,
  readContent,
  isDirectory,
  isFile,
  readDirectory,
  getLinks,
  storeLinks,
  makeHttpRequest,
};
