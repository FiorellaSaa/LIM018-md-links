const {
  routeExists,
  convertRouteToAbsolute,
  fileExtension,
  getLinks,
  storeLinks,
  makeHttpRequest,
  // readDirectory,
} = require('./index');

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    // Función para verificar si existe la ruta
    if (routeExists(path) === false) {
      reject('the path is invalid');
    }
    // Función que convierte la ruta en absoluta
    const absoluteRoute = convertRouteToAbsolute(path);
    // Función que verifica si el archivo es .md
    const arraysFile = fileExtension(absoluteRoute);
    // Función que lee el archivo y valida
    makeHttpRequest(arraysFile)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
console.log(mdLinks('./prueba/prueba.md'))
module.exports = {
  mdLinks,
};
