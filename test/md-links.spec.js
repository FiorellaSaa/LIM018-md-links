// const mdLinks = require('..');
const axios = require('axios');
const {
  routeExists,
  routeAbsolute,
  convertRouteToAbsolute,
  fileExtension,
  readContent,
  storeLinks,
  makeHttpRequest,
  recursionToObtainFiles,
} = require('../src/mdLinks');

const { totalStatsVerify, uniqueLinksStats, brokenLinks } = require('../src/stats');

jest.mock('axios');

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
    const routeAbs = 'C:\\Users\\N24\\Desktop\\Fiorella\\Proyecto 4-mdLinks\\LIM018-md-links\\prueba\\prueba.md';
    const method = convertRouteToAbsolute(route);
    expect(method).toBe(routeAbs);
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
    const route = './prueba/prueba2.md';
    const link = '[Link package-json-1](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)';
    const method = readContent(route);
    expect(method).toBe(link);
  });
  /* it('Return empty if no content in the file', () => {
    const route = './prueba/pruebas.md';
    const method = readContent(route);
    expect(method).toBe('');
  }); */
  it('Return message if no content in the file', () => {
    const route = './prueba/prueba.html';
    const method = readContent(route);
    expect(method).toBe('No .md file');
  });
});
describe('recursionToObtainFiles', () => {
  it('Should be a function', () => {
    expect(typeof recursionToObtainFiles).toBe('function');
  });
  it('Should return all the files of the directory', () => {
    const routeDir = './prueba';
    const filesOfDir = [
      'prueba\\prueba.html',
      'prueba\\prueba.md',
      'prueba\\prueba.text',
      'prueba\\prueba1.md',
      'prueba\\prueba2.md',
      'prueba\\pruebas.md',
    ];
    expect(recursionToObtainFiles(routeDir)).toStrictEqual(filesOfDir);
  });
});
describe('makeHttpRequest', () => {
  it('Should return the links with href, text, file, message and status', () => {
    const sampleArray = [
      {
        href: 'https://docs.npmjs.com/cli/v8/configuring-npm/package-json',
        text: 'Link package-json-1',
        file: 'C:\\Users\\N24\\Desktop\\Fiorella\\Proyecto 4-mdLinks\\LIM018-md-links\\prueba\\prueba.md',
        message: 'OK',
        status: 200,
      },
    ];
    axios.get.mockImplementation(() => Promise.resolve({ statusText: 'OK', status: 200 }));
    makeHttpRequest(sampleArray).then((response) => expect(response).toStrictEqual(sampleArray));
  });
  /* it('Should return the links with href, text, file, message and status', () => {
    const sampleArray2 = [
      {
        href: 'https://jestjs/docs/es6-class-mocks#the-4-ways-to-create-an-es6-class-mock',
        text: 'ES6 Class Mocks',
        file: 'C:\\Users\\N24\\Desktop\\Fiorella\\Proyecto 4-mdLinks\\LIM018-md-links\\prueba\\prueba1.md',
        message: 'fail',
        status: 404,
      },
    ];
    axios.get.mockImplementation(() => Promise.resolve({ statusText: 'fail', status: 404 }));
    makeHttpRequest(sampleArray2).catch(() => expect().toStrictEqual(sampleArray2));
  }); */
});
describe('storeLinks', () => {
  it('Should return the links with href, text and route', () => {
    const routefile = 'C:\\Users\\N24\\Desktop\\Fiorella\\Proyecto 4-mdLinks\\LIM018-md-links\\prueba\\prueba.md';
    const arrayLinks = [
      '[Link package-json-1](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)',
    ];
    const store = [
      {
        href: 'https://docs.npmjs.com/cli/v8/configuring-npm/package-json',
        text: 'Link package-json-1',
        file: 'C:\\Users\\N24\\Desktop\\Fiorella\\Proyecto 4-mdLinks\\LIM018-md-links\\prueba\\prueba.md',
      },
    ];
    expect(storeLinks(arrayLinks, routefile)).toEqual(store);
  });
  it('Should return a message: "No links in the file"', () => {
    const routefile = './prueba/pruebas.md';
    const arrayLinks = [];
    expect(storeLinks(arrayLinks, routefile)).toEqual('No links in the file');
  });
});
describe('totalStatsVerify', () => {
  it('Should be a function', () => {
    expect(typeof totalStatsVerify).toBe('function');
  });
  it('Should return the total number of links', () => {
    const sampleArrays = [
      {
        text: 'Link npm-install',
        href: 'https://docs.npmjs.com/cli/v8/commands/npm-install',
        file: './prueba/prueba.md',
        status: 200,
        message: 'OK',
      },
    ];
    // const totalLinks = sampleArrays.length;
    expect(totalStatsVerify(sampleArrays)).toEqual(1);
  });
});
describe('uniqueLinksStats', () => {
  it('Should be a function', () => {
    expect(typeof uniqueLinksStats).toBe('function');
  });
  it('Should return the total number of unique links', () => { 
    const sampleArrays = [
      {
        text: 'Link npm-install',
        href: 'https://docs.npmjs.com/cli/v8/commands/npm-install',
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
    ];
    // const uniqueLinks = new Set(sampleArrays.map((elem) => elem.href)).size;
    expect(uniqueLinksStats(sampleArrays)).toEqual(1);
  });
});
describe('brokenLinks', () => {
  it('Should be a function', () => {
    expect(typeof brokenLinks).toBe('function');
  });
  it('Should return the broken links', () => {
    const sampleArrays = [
      {
        text: 'Link npm-install',
        href: 'https://docs.npmjs.com/cli/v8/commands/npm-install',
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
    expect(brokenLinks(sampleArrays)).toEqual(1);
  });
});