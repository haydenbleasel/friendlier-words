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
        // Remove words containing spaces
        if (word.includes(' ')) {
          duplicates.push({ word, file1: file, file2: 'Contains space' });
          return false;
        }

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

        // Check for plurals
        const singularWord = word.replace(/e?s$/, '');
        if (wordMap.has(singularWord)) {
          duplicates.push({
            word,
            file1: wordMap.get(singularWord),
            file2: file,
          });
          return false; // Remove the plural
        }

        // Check for words ending in 'y' (e.g., "trend" and "trendy")
        const baseWordY = word.replace(/y$/, '');
        if (wordMap.has(baseWordY)) {
          duplicates.push({
            word,
            file1: wordMap.get(baseWordY),
            file2: file,
          });
          return false; // Remove the word ending in 'y'
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
      'No duplicate, related, hyphenated, space-containing, plural, or y-ending words found across all JSON files.'
    );
  } else {
    console.log(
      'Duplicate, related, hyphenated, space-containing, plural, or y-ending words found and removed:'
    );
    for (const { word, file1, file2 } of duplicates) {
      if (file2 === 'Hyphenated') {
        console.log(`- "${word}" removed from ${file1} (hyphenated word)`);
      } else if (file2 === 'Contains space') {
        console.log(`- "${word}" removed from ${file1} (contains space)`);
      } else if (word.match(/e?s$/)) {
        console.log(
          `- "${word}" removed from ${file2} (plural of word in ${file1})`
        );
      } else if (word.match(/y$/)) {
        console.log(
          `- "${word}" removed from ${file2} (y-ending variant of word in ${file1})`
        );
      } else {
        console.log(`- "${word}" removed from ${file2} (kept in ${file1})`);
      }
    }
  }
}

validateAndRemoveDuplicates();
