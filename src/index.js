/* eslint-disable max-len */
const {
  routeExists,
  convertRouteToAbsolute,
  fileExtension,
  getLinks,
  storeLinks,
  recursionToObtainFiles,
  makeHttpRequest,
} = require('./mdLinks');

function mdLinks(route, options) {
  return new Promise((resolve, reject) => {
    // Función para verificar si existe la ruta
    const verifyRoute = routeExists(route);
    // Función que lee el archivo y valida
    if (verifyRoute) {
      // Función que convierte la ruta en absoluta
      const absoluteRoute = convertRouteToAbsolute(verifyRoute);
      if (recursionToObtainFiles(absoluteRoute)) {
        const allArrays = recursionToObtainFiles(absoluteRoute);
        const newArraysMd = allArrays.filter((fileRoute) => fileExtension(fileRoute) === '.md');
        const allStoreLinks = [];
        newArraysMd.forEach((fileRoute) => {
          allStoreLinks.push(storeLinks(getLinks(fileRoute), fileRoute));
        });
        if (options.validate === true) {
          resolve(makeHttpRequest(allStoreLinks.flat()));
        } else {
          resolve(allStoreLinks.flat());
        }
      }
    } else {
      reject(new Error('the route does not exist'));
    }
  });
}
/* mdLinks('./prueba', { validate: false }).then((resolve) => {
  console.log(resolve);
}).catch((error) => {
  console.log(error);
}); */

module.exports = {
  mdLinks,
};
