const fs = require('node:fs');
const path = require('node:path');

const libDir = path.join(__dirname, '..', 'lib');

function validateAndRemoveDuplicates() {
  const wordMap = new Map();
  const duplicates = [];
  const relatedWords = new Map();

  // Read all JSON files in the lib directory
  for (const file of fs.readdirSync(libDir)) {
    if (path.extname(file) === '.json') {
      const filePath = path.join(libDir, file);
      let content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      content = content.filter((word) => {
        // Check for exact duplicates
        if (wordMap.has(word)) {
          duplicates.push({ word, file1: wordMap.get(word), file2: file });
          return false; // Remove the duplicate
        }

        // Check for related words (e.g., "x" and "xing")
        const baseWord = word.replace(/ing$/, '');
        if (relatedWords.has(baseWord)) {
          const relatedWord = relatedWords.get(baseWord);
          duplicates.push({
            word,
            file1: wordMap.get(relatedWord),
            file2: file,
          });
          return false; // Remove the related word
        }

        wordMap.set(word, file);
        if (word.endsWith('ing')) {
          relatedWords.set(baseWord, word);
        } else {
          relatedWords.set(word, word);
        }
        return true;
      });

      // Write the updated content back to the file
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    }
  }

  // Report results
  if (duplicates.length === 0) {
    console.log('No duplicate or related words found across all JSON files.');
  } else {
    console.log('Duplicate or related words found and removed:');
    for (const { word, file1, file2 } of duplicates) {
      console.log(`- "${word}" removed from ${file2} (kept in ${file1})`);
    }
  }
}

validateAndRemoveDuplicates();
