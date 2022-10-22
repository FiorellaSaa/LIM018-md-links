#!/usr/bin/env node
const chalk = require('chalk');
const { mdLinks } = require('./index');
const { totalStatsVerify, uniqueLinksStats, brokenLinks } = require('./stats');

// const process.argv = ['node', 'file.js', ‘x’, ‘y’];
// arg[0] node route --> node 'C:\\Program Files\\nodejs\\node.exe',
// arg[1] md-links route --> 'cli.js'
// arg[2] 'x' file route --> firstarg
// arg[3] 'y' options --validate or --stats --> secondarg

const args = process.argv;
const initialArg = process.argv.slice(2);
const route = args[2];
const optionValidate = initialArg.includes('--validate');
const optionStats = initialArg.includes('--stats');
const help = initialArg.includes('--help');

if (args.length <= 2) {
  console.log(chalk.yellow(`
  ╔════════════════════ Md-Links by Fiorella Saa ══════════════════╗
          ⚠ Enter a path or type md-links --help to help you
  ══════════════════════════════════════════════════════════════════
  `));
} else if (help) {
  console.log(chalk.blue(`
  ═══════════════════════════════════════════════════════════════════════════════════════════════
  💻Type:
   ✔ md-links <path>                    ║ Links found with their path, text and file
   ✔ md-links <path> --validate         ║ Links found with their path, text, status, and ok/fail
   ✔ md-links <path> --stats            ║ Displays the total number of links and unique links 
   ✔ md-links <path> --validate --stats ║ Displays the total links, unique links and broken links
  ════════════════════════════════════════════════════════════════════════════════════════════════
   `));
} else {
  mdLinks(route, { stats: optionStats, validate: optionValidate })
    .then((arrayLinks) => {
      if (optionStats && !optionValidate) {
        console.log(`
        ※ Stats ※
      Total links: ${chalk.blue(totalStatsVerify(arrayLinks))};
      Unique Links: ${chalk.magenta(uniqueLinksStats(arrayLinks))};
      `);
      } else if (optionValidate && optionStats) {
        console.log(`
        ※ Validate && Stats ※
      Total links: ${chalk.blue(totalStatsVerify(arrayLinks))};
      Unique Links: ${chalk.magenta(uniqueLinksStats(arrayLinks))};
      Broken links: ${chalk.cyan(brokenLinks(arrayLinks))};
      `);
      } else {
        arrayLinks.forEach((link) => {
          if (!optionStats && !optionValidate) {
            console.log(`
          ※ Links founds ※
          href: ${chalk.green(link.href)};
          text: ${chalk.green(link.text)};
          file: ${chalk.green(link.file)};
          `);
          } else {
            console.log(`
          ※ status links ※
          href: ${chalk.green(link.href)};
          text: ${chalk.green(link.text)};
          file: ${chalk.green(link.file)};
          message: ${
  link.message === 'OK' ? chalk.yellow(link.message) : chalk.red(link.message)
};
          status: ${chalk.yellow(link.status)};
          `);
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
