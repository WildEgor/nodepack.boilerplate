const fs = require('fs');
const path = require('path');
const readline = require('readline');

const placeholder = '%TOKEN%';
const templateLines = [
  'registry=https://registry.npmjs.org/',
  '@wildegor:registry=https://npm.pkg.github.com/',
  `//npm.pkg.github.com/:_authToken=${placeholder}`,
  '',
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.input.on('keypress', () => {
  const len = rl.line.length;

  readline.moveCursor(rl.output, -len, 0);
  readline.clearLine(rl.output, 1);

  for (let i = 0; i < len; i += 1) {
    rl.output.write('*');
  }
});

rl.question('Paste NPM token: ', (answer) => {
  const token = answer.trim();
  if (token) {
    const npmPath = path.resolve('.npmrc');
    const npmContent = templateLines.join('\n').replace(placeholder, token);
    fs.writeFileSync(npmPath, npmContent);
  }
  rl.history.slice(1);
  rl.close();
});


