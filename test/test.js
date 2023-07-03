const friendlyWords = require('../dist/index.js').friendlyWords;

console.log('Default:', friendlyWords());
console.log('3 Segments:', friendlyWords(3));
console.log('Custom separator:', friendlyWords(2, '/'));
