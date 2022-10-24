const axios = require('axios');
const { mdLinks } = require('../src/index');

jest.mock('axios');

describe('mdLinks', () => {
  it('Should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('should return path --validate:true', () => {
    const sampleArray = [
      {
        href: 'https://docs.npmjs.com/cli/v8/configuring-npm/package-json',
        text: 'Link package-json-1',
        file: 'C:\\Users\\N24\\Desktop\\Fiorella\\Proyecto 4-mdLinks\\LIM018-md-links\\prueba\\prueba2.md',
        message: 'OK',
        status: 200,
      },
    ];
    axios.get.mockImplementation(() => Promise.resolve({ statusText: 'OK', status: 200 }));
    return mdLinks('./prueba/prueba2.md', { validate: true }).then((arrayObject) => {
      expect(arrayObject).toStrictEqual(sampleArray);
    });
  });
  it('should return path --validate:false', () => {
    const sampleArray = [
      {
        href: 'https://docs.npmjs.com/cli/v8/configuring-npm/package-json',
        text: 'Link package-json-1',
        file: 'C:\\Users\\N24\\Desktop\\Fiorella\\Proyecto 4-mdLinks\\LIM018-md-links\\prueba\\prueba2.md',
      },
    ];
    expect(mdLinks('./prueba/prueba2.md', { validate: false })).resolves.toStrictEqual(sampleArray);
  });
});
