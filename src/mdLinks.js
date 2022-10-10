/* eslint-disable max-len */
const {
  routeExists,
  convertRouteToAbsolute,
  fileExtension,
  getLinks,
  storeLinks,
  recursionToObtainFiles,
  makeHttpRequest,
} = require('./index');

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
              resolve(makeHttpRequest(storeLinks(getLinks(fileRoute), fileRoute)));
            }
            resolve((storeLinks(getLinks(fileRoute), fileRoute)));
          }
        });
      }
    } else {
      reject(new Error('Err: the route does not exist'));
    }
  });
}
mdLinks('./prueba', { validate: true }).then((resolve) => {
  console.log(resolve);
}).catch((error) => { console.log(error); });

module.exports = {
  mdLinks,
};
