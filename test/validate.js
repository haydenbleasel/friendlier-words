const fs = require('node:fs');
const path = require('node:path');

const libDir = path.join(__dirname, '..', 'lib');

function validateAndRemoveDuplicates() {
  const wordMap = new Map();
  const duplicates = [];

  // Read all JSON files in the lib directory
  for (const file of fs.readdirSync(libDir)) {
    if (path.extname(file) === '.json') {
      const filePath = path.join(libDir, file);
      let content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      content = content.filter((word) => {
        if (wordMap.has(word)) {
          duplicates.push({ word, file1: wordMap.get(word), file2: file });
          return false; // Remove the duplicate
        }

        wordMap.set(word, file);
        return true;
      });

      // Write the updated content back to the file
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    }
  }

  // Report results
  if (duplicates.length === 0) {
    console.log('No duplicate words found across all JSON files.');
  } else {
    console.log('Duplicate words found and removed:');
    for (const { word, file1, file2 } of duplicates) {
      console.log(`- "${word}" removed from ${file2} (kept in ${file1})`);
    }
  }
}

validateAndRemoveDuplicates();
