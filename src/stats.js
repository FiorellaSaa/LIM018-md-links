/* const sampleArrays = [
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
]; */
// Total Stats
const totalStatsVerify = (arrayLinks) => {
  const totalLinks = arrayLinks.length;
  return totalLinks;
};
// console.log('Total:', totalStatsVerify(sampleArrays));

// Unique Stats
const uniqueLinksStats = (arrayLinks) => {
  const uniqueLinks = new Set(arrayLinks.map((elem) => elem.href)).size;
  return uniqueLinks;
};
// console.log('Unique:', uniqueLinksStats(sampleArrays));

// Broken Stats
const brokenLinks = (arrayLinks) => {
  const statusBroken = arrayLinks.filter((item) => item.status >= 400);
  return statusBroken.length;
};
// console.log('Broken:', brokenLinks(sampleArrays));

module.exports = {
  totalStatsVerify,
  uniqueLinksStats,
  brokenLinks,
};
