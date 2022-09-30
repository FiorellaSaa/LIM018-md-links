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

// Leer archivos de un directorio
function readDirectory(route) {
  const routeDir = fs.readdirSync(route);
  if (routeDir) {
    return routeDir;
  }
  return 'it is a file';
}
// console.log(readDirectory(rutaDir));

function getLinks(route) {
  const methodReadFile = readContent(route);
  const regularExpression = /\[(.+)\]\((https?:\/\/.+)\)/gi;
  // const regularExpression = /(\[(.*?)\])?\(http(.*?)\)/gm
  const arrayLinks = methodReadFile.match(regularExpression);
  return arrayLinks;
}
// console.log(getLinks(ruta1));

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
console.log(storeLinks(getLinks(ruta1), ruta1));

function makeHttpRequest(arrayObjects) {
  const newArrayObjects = [];
  // console.log(arrayObjects.length);
  if (arrayObjects.length > 0) {
  // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arrayObjects.length; i++) {
    // console.log(arrayObjects[i]);
      axios.get(arrayObjects[i].href)
        .then((response) => {
          // console.log(resolve.status);
          // console.log(resolve.statusText);
          // console.log(response);
          const object = {
            // href: arrayObjects[i].href,
            // text: arrayObjects[i].text,
            // file: route,
            ...arrayObjects,
            status: response.status,
            message: response.statusText,
          };
          // console.log('este es el objeto', object);
          newArrayObjects.push(object);
        })
        .catch((error) => {
          // console.log(error.response.status);
          // console.log(error.response.statusText);
          // console.log(error);
          const object = {
            // href: arrayObjects[i].href,
            // text: arrayObjects[i].text,
            // file: route,
            ...arrayObjects,
            status: error.status,
            message: error.statusText,
          };
          newArrayObjects.push(object);
        });
    }
    return newArrayObjects;
  }
  return Promise.all(newArrayObjects);
}
makeHttpRequest(storeLinks(getLinks(ruta1), ruta1)).then((result) => {
  console.log(result);
});

module.exports = {
  routeExists,
  routeAbsolute,
  convertRouteToAbsolute,
  fileExtension,
  readContent,
};
