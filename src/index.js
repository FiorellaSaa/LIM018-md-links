const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { link } = require('fs/promises');

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
        status: 'Fail request',
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

const sampleArrays = [
  {
    text: 'Link npm-install',
    href: 'https://docs.npmjs.com/cli/v8/commands/npm-install',
    file: './prueba/prueba.md',
    status: 200,
    message: 'OK',
  },
  {
    text: 'Link package-json',
    href: 'https://docs.npmjs.com/cli/v8/configuring-npm/package-json',
    file: './prueba/prueba.md',
    status: 200,
    message: 'OK',
  },
  {
    text: 'Link npm-install',
    href: 'https://docs.npmjs.com/cli/v8/commands/npm-install',
    file: './prueba/prueba.md',
    status: 200,
    message: 'OK',
  },
  {
    text: 'Link package-json',
    href: 'https://docs.npmjs.com/cli/v8/configuring-npm/package-json',
    file: './prueba/prueba.md',
    status: 200,
    message: 'OK',
  },
  {
    text: 'Link node.js',
    href: 'https://nodejs.org/api/fs.html',
    file: './prueba/prueba.md',
    status: 200,
    message: 'OK',
  },
  {
    text: 'Link node.js',
    href: 'https://nodejs/api/fs.html',
    file: './prueba/prueba.md',
    status: 404,
    message: 'fail',
  },
];
// Total Stats
const statsVerify = (arrayLinks) => {
  const totalLinks = arrayLinks.length;
  return totalLinks;
};
console.log('Total:', statsVerify(sampleArrays));

// Unique Stats
/* const uniqueVerify = (arrayLinks) => {
  const uniqueLinks = arrayLinks.filter((item, index) => arrayLinks.indexOf(item) === index);
  return (uniqueLinks);
};
console.log('Unique:', uniqueVerify(sampleArrays)); */

/* const uniqueVerify = (arrayLinks) => {
  const conteinerElem = [];
  const uniqueLinks = arrayLinks.reduce((elem, item) => {
    if (elem.href !== item.href) {
      conteinerElem.push(item);
    }
    return conteinerElem;
  });
  return uniqueLinks;
};
console.log('Unique', uniqueVerify(sampleArrays)); */

// Broken Stats
const brokenVerify = (arrayLinks) => {
  const statusBroken = arrayLinks.filter((item) => item.status >= 400);
  return statusBroken.length;
};
console.log('Broken:', brokenVerify(sampleArrays));

module.exports = {
  routeExists,
  routeAbsolute,
  convertRouteToAbsolute,
  fileExtension,
  readContent,
  getLinks,
  storeLinks,
  statsVerify,
  brokenVerify,
};
