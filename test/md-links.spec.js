const mdLinks = require('..');
const { routeExists } = require('../index.js');
const { routeAbsolute } = require('../index.js');

describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
});

describe('routeExists', () => {
  it('Debería ser una funcion', () => {
    expect(typeof routeExists).toBe('function');
  });
  it('Debería retornar la ruta si existe', () => {
    const route = './prueba/prueba.md';
    const trueRoute = routeExists(route);
    expect(trueRoute).toBe(route);
  });
  it('Debería retornar mensaje si la ruta no existe', () => {
    const routeFalse = 'C:/Proyecto 4-mdLinks/LIM018-md-links/prueba1.md';
    const trueRoute = routeExists(routeFalse);
    expect(trueRoute).toBe('Err: La ruta no existe');
  });
});
describe('routeAbsolute', () => {
  it('Debería ser una función', () => {
    expect(typeof routeAbsolute).toBe('function');
  });
  it('Debería retornar la ruta si es absoluta', () => {
    const route = 'c:\\Users\\Fiorella\\Proyecto 4-mdLinks\\LIM018-md-links\\prueba';
    const trueRoute = routeAbsolute(route);
    expect(trueRoute).toBe(route);
  });
  it('Debería retornar mensaje si la ruta no es absoluta', () => {
    const routeFalse = './prueba/prueba1.md';
    const trueRoute = routeAbsolute(routeFalse);
    expect(trueRoute).toBe('La ruta es relativa');
  });
});
