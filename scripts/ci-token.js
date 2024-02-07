const fs = require('fs');
const path = require('path');

const placeholder = '%TOKEN%';
const templateLines = [
  'registry=https://registry.npmjs.org/',
  '@wildegor:registry=https://npm.pkg.github.com/',
  `//npm.pkg.github.com/:_authToken=${placeholder}`,
  '',
];

(() => {
  const npmPath = path.resolve('.npmrc');
  const npmContent = templateLines.join('\n').replace(placeholder, process.env.NODE_ENV_TOKEN.trim());
  fs.writeFileSync(npmPath, npmContent);
  console.log(npmContent);
})();


