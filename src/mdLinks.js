/* eslint-disable no-unreachable-loop */
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
// console.log(routeExists(rutaDir));
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
// console.log(fileExtension('./prueba/prueba1.md'));

// Leyendo data del archivo prueba.md-síncrono
/* function readContent(route) {
  try {
    const readContentFile = fs.readFileSync(route, 'utf-8');
    return readContentFile;
  } catch (error) {
    return '';
  }
} */
// Leyendo data del archivo
function readContent(route) {
  if (fileExtension(route) === '.md') {
    return fs.readFileSync(route, 'utf-8');
  }
  return 'No .md file';
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
// [ 'prueba.html', 'prueba.md', 'prueba.text', 'prueba1.md' ]

/* function readDirectory(route) {
  const filesMd = [];
  for (let i = 0; i < readDirectory.length; i++) {
    const filesExtension = path.extname(readDirectory[i]);
    console.log(filesExtension);
    if (filesExtension === '.md') {
      filesMd.push(fs.readdirSync(route));
    }
  }
  return filesMd;
  return 'no hay archivos md';
}
console.log(readDirectory(rutaDir)); */
// Recursión para obtener los archivos
const recursionToObtainFiles = (route) => {
  const storeFiles = [];
  if (isFile(route)) {
    storeFiles.push(route);
    return storeFiles;
  }
  const readFilesOfDirectory = readDirectory(route);
  for (let i = 0; i < readFilesOfDirectory.length; i++) {
    const readArrayFiles = path.join(route, readFilesOfDirectory[i]);
    storeFiles.push(recursionToObtainFiles(readArrayFiles));
  }
  return storeFiles.flat();
};
// console.log(recursionToObtainFiles(rutaDir));
/* [
  'prueba\\prueba.html',
  'prueba\\prueba.md',
  'prueba\\prueba.text',
  'prueba\\prueba1.md'
] */

// Función para obtener los links
function getLinks(route) {
  const methodReadFile = readContent(route);
  const regularExpression = /\[(.+)\]\((https?:\/\/.+)\)/gi;
  // const regularExpression = /(\[(.*?)\])?\(http(.*?)\)/gm
  const arrayLinks = methodReadFile.match(regularExpression);
  return arrayLinks;
}
// console.log(getLinks('./prueba/prueba1.md'));
/* [
  '[How to Mock dependencies with Jest](https://dev.to/this-is-learning/how-to-mock-dependencies-with-jest-457l)',
  '[ES6 Class Mocks](https://jestjs.io/docs/es6-class-mocks#the-4-ways-to-create-an-es6-class-mock)',
  '[ES6 Class Mocks](https://jestjs/docs/es6-class-mocks#the-4-ways-to-create-an-es6-class-mock)'
] */
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
/* [
  {
    text: 'Link npm-install',
    href: 'https://docs.npmjs.com/cli/v8/commands/npm-install',
    file: './prueba/prueba.md'
  }
 ] */
const makeHttpRequest = (arrayObject) => {
  const getArray = [];
  for (let i = 0; i < arrayObject.length; i++) {
    const element = arrayObject[i];
    const runAxios = axios
      .get(element.href)
      .then((response) => ({
        ...element,
        status: response.status,
        message: response.statusText,
      }))
      .catch(() => ({
        ...element,
        status: 404,
        message: 'fail',
      }));
    getArray.push(runAxios);
  }
  return Promise.all(getArray);
};
/* makeHttpRequest(storeLinks(getLinks(ruta1), ruta1)).then((response) => {
  console.log(response);
}); */
/* [
  {
    text: 'Link npm-install',
    href: 'https://docs.npmjs.com/cli/v8/commands/npm-install',
    file: './prueba/prueba.md',
    status: 200,
    message: 'OK'
  },
 ] */

module.exports = {
  routeExists,
  routeAbsolute,
  convertRouteToAbsolute,
  fileExtension,
  readContent,
  isDirectory,
  isFile,
  readDirectory,
  recursionToObtainFiles,
  getLinks,
  storeLinks,
  makeHttpRequest,
};
