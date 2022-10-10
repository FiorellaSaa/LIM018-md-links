// const mdLinks = require('..');
const { routeExists } = require('../src/index');
const { routeAbsolute } = require('../src/index');
const { convertRouteToAbsolute } = require('../src/index');
const { fileExtension } = require('../src/index');
const { readContent } = require('../src/index');

/* describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
}); */

describe('routeExists', () => {
  it('Should be a function', () => {
    expect(typeof routeExists).toBe('function');
  });
  it('Should return the route if it exist', () => {
    const route = './prueba/prueba.md';
    const trueRoute = routeExists(route);
    expect(trueRoute).toBe(route);
  });
  it('Should return a message if the route it does not exist', () => {
    const routeFalse = 'C:/Proyecto 4-mdLinks/LIM018-md-links/prueba1.md';
    const trueRoute = routeExists(routeFalse);
    expect(trueRoute).toBe('Err: the route does not exist');
  });
});
describe('routeAbsolute', () => {
  it('Should be a function', () => {
    expect(typeof routeAbsolute).toBe('function');
  });
  it('Should return the route if it is absolute', () => {
    const route = 'c:\\Users\\Fiorella\\Proyecto 4-mdLinks\\LIM018-md-links\\prueba';
    const trueRoute = routeAbsolute(route);
    expect(trueRoute).toBe(route);
  });
  it('Should return a message if the path is not absolute', () => {
    const routeFalse = './prueba/prueba1.md';
    const trueRoute = routeAbsolute(routeFalse);
    expect(trueRoute).toBe('The path is relative');
  });
});
describe('convertRouteToAbsolute', () => {
  it('Should be a function', () => {
    expect(typeof convertRouteToAbsolute).toBe('function');
  });
  it('Convert the route relative in absolute', () => {
    const route = './prueba/prueba.md';
    const method = convertRouteToAbsolute(route);
    expect(method).toBe('C:\\Users\\N24\\Desktop\\Fiorella\\Proyecto 4-mdLinks\\LIM018-md-links\\prueba\\prueba.md');
  });
});
describe('fileExtension', () => {
  it('Should be a function', () => {
    expect(typeof fileExtension).toBe('function');
  });
  it('Return file extension if it is .md', () => {
    const route = './prueba/prueba.md';
    const method = fileExtension(route);
    expect(method).toBe('.md');
  });
  it('Return file extension if it is not .md', () => {
    const route = './prueba/prueba.html';
    const method = fileExtension(route);
    expect(method).toBe('It is not .md extension');
  });
});
describe('readContent', () => {
  it('Should be a function', () => {
    expect(typeof readContent).toBe('function');
  });
  it('Display file contents', () => {
    const route = './prueba/prueba1.md';
    const method = readContent(route);
    expect(method).toBe('[Link node.js](https://nodejs.org/api/fs.html)');
  });
  it('Return empty if no content in the file', () => {
    const route = './prueba/pruebas.md';
    const method = readContent(route);
    expect(method).toBe('');
  });
});
// Directorio
// array Links
// Petición http --> mock
// mdLinks
