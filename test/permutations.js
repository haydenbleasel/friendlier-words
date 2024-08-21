const { friendlyWords } = require('../dist/index.js');
const adjectives = require('../lib/adjectives.json');
const animals = require('../lib/animals.json');
const food = require('../lib/food.json');
const music = require('../lib/music.json');
const mythology = require('../lib/mythology.json');
const nature = require('../lib/nature.json');
const space = require('../lib/space.json');

const categories = [animals, space, food, mythology, nature, music];

function calculatePermutations(segments) {
  if (segments < 2) {
    throw new Error('Need at least 2 words');
  }

  let totalPermutations = adjectives.length; // Start with the number of adjectives

  // Multiply by the total number of words in all other categories for each additional segment
  const totalWordsInCategories = categories.reduce(
    (sum, category) => sum + category.length,
    0
  );
  for (let i = 1; i < segments; i++) {
    totalPermutations *= totalWordsInCategories;
  }

  return totalPermutations;
}

// Calculate permutations for different numbers of segments
console.log('Possible permutations:');
for (let i = 2; i <= 5; i++) {
  console.log(`${i} words: ${calculatePermutations(i).toLocaleString()}`);
}

// Generate a sample of unique words
const uniqueWords = new Set();
const sampleSize = 1000;
const maxAttempts = sampleSize * 10;

for (let i = 0; i < maxAttempts && uniqueWords.size < sampleSize; i++) {
  uniqueWords.add(friendlyWords(5)); // Generate 5-word combinations
}

console.log(`\nUnique ${5}-word combinations generated: ${uniqueWords.size}`);
console.log('Sample of generated words:');
console.log([...uniqueWords].slice(0, 10).join('\n'));
