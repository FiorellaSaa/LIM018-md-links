/* eslint-disable max-len */
const {
  routeExists,
  convertRouteToAbsolute,
  fileExtension,
  getLinks,
  storeLinks,
  recursionToObtainFiles,
  makeHttpRequest,
  isFile,
  // readDirectory,
} = require('./index');

/* function mdLinks(route, options = { validate: false }) {
  return new Promise((resolve, reject) => {
    // Función para verificar si existe la ruta
    const verifyRoute = routeExists(route);
    // Función que convierte la ruta en absoluta
    const absoluteRoute = convertRouteToAbsolute(verifyRoute);
    // Función para saber si es directorio y leerlo
    // console.log(verifyDirectory);
    // Función que lee el archivo y valida
    if (verifyRoute) {
      // TODO: create an array of files -> if the route is a single file
      // then this array should be an array of one file,
      // if the route is a dir, the array of files should have all the files contained in the dir

      // console.log(verifyRoute);
      if (isFile(route)) {
        // console.log('哈喽 esto ya no está en chino😋');
        if (fileExtension(absoluteRoute) === '.md') {
          if (options.validate === true) {
            // console.log('entiendo chino 我明白😎');
            resolve(makeHttpRequest(storeLinks(getLinks(absoluteRoute), absoluteRoute)));
          } else {
            resolve(storeLinks(getLinks(absoluteRoute), absoluteRoute));
            // console.log('hello 哈喽 🙋‍♀️');
          }
        } else {
          reject(new Error('there are not .md extension'));
        }
      } else if (options.validate === true) {
        const arrayRequest = recursionToObtainFiles(absoluteRoute).map((fileRoute) => {
          if (fileExtension(fileRoute) === '.md') {
            resolve(makeHttpRequest(storeLinks(getLinks(fileRoute), fileRoute)));
            // console.log('esto ya no está en chino 这是中文😁');
          } else {
            // console.log('ja ja ja 哈哈哈哈😵');
            return [];
          }
        });
        // console.log('aquí', arrayRequest);
        resolve(arrayRequest.flat());
      } else {
        const arrayRecursion = recursionToObtainFiles(absoluteRoute).map((fileRoute) => {
          if (fileExtension(fileRoute) === '.md') {
            return storeLinks(getLinks(fileRoute), fileRoute);
          }
          return [];
        });
        // console.log('Esto tbm 你好🙄');
        resolve(arrayRecursion.flat());
      }
    } else {
      reject(new Error('Err: the route does not exist'));
    }
  });
}
mdLinks('./prueba', { validate: true }).then((resolve) => {
  console.log(resolve);
}).catch((error) => { console.log(error); }); */

// TODO: create an array of files -> if the route is a single file
// then this array should be an array of one file,
// if the route is a dir, the array of files should have all the files contained in the dir

function mdLinks(route, options = { validate: false }) {
  return new Promise((resolve, reject) => {
    // Función para verificar si existe la ruta
    const verifyRoute = routeExists(route);
    // Función que convierte la ruta en absoluta
    const absoluteRoute = convertRouteToAbsolute(verifyRoute);
    // Función que lee el archivo y valida
    if (verifyRoute) {
      if (recursionToObtainFiles(absoluteRoute)) {
        const arrayRequest = recursionToObtainFiles(absoluteRoute);
        arrayRequest.map((fileRoute) => {
          if (fileExtension(fileRoute) === '.md') {
          // console.log(fileExtension(fileRoute));
            if (options.validate === true) {
              console.log('esto tbm está en chino 这是中文😁');
              return resolve(makeHttpRequest(storeLinks(getLinks(fileRoute), fileRoute)));
            }
            console.log('😵');
            return resolve((storeLinks(getLinks(fileRoute), fileRoute)));
          }
        });
        // console.log('Esto tbm 你好🙄');
        // console.log()arrayRequest();
        console.log('holaaaaaaaa', arrayRequest);
      }
    } else {
      reject(new Error('Err: the route does not exist'));
    }
  });
}
mdLinks('./prueba', { validate: true }).then((resolve) => {
  console.log(resolve);
}).catch((error) => { console.log(error); });

/* function mdLinks(route, options = { validate: false }) {
  return new Promise((resolve, reject) => {
    // Función para verificar si existe la ruta
    const verifyRoute = routeExists(route);
    // Función que convierte la ruta en absoluta
    const absoluteRoute = convertRouteToAbsolute(verifyRoute);
    const recursionDir = recursionToObtainFiles(absoluteRoute);
    // Función que lee el archivo y valida
    if (verifyRoute) {
      console.log(verifyRoute);
      if (recursionDir) {
        console.log(recursionDir);
        console.log('哈喽 esto está UN POCO en chino😋');
        const newArrayOfMdExtension = [];
        for (let i = 0; i < recursionDir.length; i++) {
          if (fileExtension(recursionDir[i]) === '.md') {
            newArrayOfMdExtension.push(recursionDir[i]);
          }
          // console.log(newArrayOfMdExtension);
        }
        resolve(newArrayOfMdExtension);
        if (options.validate === true) {
          console.log('esto ya NO está TANTO en chino 这是中文😁');
          const arrayOfObjects = [];
          for (let i = 0; i < newArrayOfMdExtension.length; i++) {
            const newArray = makeHttpRequest(storeLinks(newArrayOfMdExtension[i], recursionDir[i]));
            arrayOfObjects.push(newArray);
          }
          // console.log(newArrayOfMdExtension);
          resolve(arrayOfObjects);
        } else {
          console.log('ja ja ja 哈哈哈哈😵');
          resolve(storeLinks(newArrayOfMdExtension, recursionDir));
        }
      }
    }
    reject(new Error('Err: the route does not exist'));
  });
}

mdLinks('./prueba', { validate: true })
  .then((resolve) => {
    console.log(resolve);
  })
  .catch((error) => {
    console.log(error);
  }); */

module.exports = {
  mdLinks,
};
