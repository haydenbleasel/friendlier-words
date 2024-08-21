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
      let content;
      try {
        content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (error) {
        console.error(`Error parsing JSON in file ${file}: ${error.message}`);
        continue; // Skip this file and move to the next one
      }

      content = content.filter((word) => {
        // Remove hyphenated words
        if (word.includes('-')) {
          duplicates.push({ word, file1: file, file2: 'Hyphenated' });
          return false;
        }

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
    console.log(
      'No duplicate, related, or hyphenated words found across all JSON files.'
    );
  } else {
    console.log('Duplicate, related, or hyphenated words found and removed:');
    for (const { word, file1, file2 } of duplicates) {
      if (file2 === 'Hyphenated') {
        console.log(`- "${word}" removed from ${file1} (hyphenated word)`);
      } else {
        console.log(`- "${word}" removed from ${file2} (kept in ${file1})`);
      }
    }
  }
}

validateAndRemoveDuplicates();
