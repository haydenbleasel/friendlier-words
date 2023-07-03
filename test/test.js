const friendlyWords = require('../dist/index.js').friendlyWords;

console.log('Default\n\n');

for (let i = 0; i < 10; i++) {
  console.log(friendlyWords());
}

console.log('\n\n3 Segments\n\n');

for (let i = 0; i < 10; i++) {
  console.log(friendlyWords(3));
}

console.log('\n\nCustom separator\n\n');

for (let i = 0; i < 10; i++) {
  console.log(friendlyWords(2, '/'));
}
