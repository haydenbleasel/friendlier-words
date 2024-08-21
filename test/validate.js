const fs = require('fs');
const path = require('path');

const libDir = path.join(__dirname, '..', 'lib');

function validateJsonFiles() {
  const wordMap = new Map();
  const duplicates = [];

  // Read all JSON files in the lib directory
  fs.readdirSync(libDir).forEach((file) => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(libDir, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      content.forEach((word) => {
        if (wordMap.has(word)) {
          duplicates.push({ word, file1: wordMap.get(word), file2: file });
        } else {
          wordMap.set(word, file);
        }
      });
    }
  });

  // Report results
  if (duplicates.length === 0) {
    console.log('No duplicate words found across all JSON files.');
  } else {
    console.log('Duplicate words found:');
    duplicates.forEach(({ word, file1, file2 }) => {
      console.log(`- "${word}" in ${file1} and ${file2}`);
    });
    process.exit(1); // Exit with error code if duplicates found
  }
}

validateJsonFiles();
