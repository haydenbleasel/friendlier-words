const { friendlyWords } = require('../dist/index.js');

for (let i = 0; i < 100; i++) {
  console.log(friendlyWords());
}
