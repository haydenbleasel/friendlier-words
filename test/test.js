const friendlyWords = require('../dist/index.js').friendlyWords;

const iterations = 5000;
const testCases = [
  { name: '2 words', args: [2] },
  { name: '3 words', args: [3] },
  { name: '4 words', args: [4] },
  { name: '5 words', args: [5] },
  { name: 'Custom separator', args: [3, '+'] },
];

const results = testCases.map(({ name, args }) => {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    friendlyWords(...args);
  }
  const end = performance.now();
  const duration = end - start;
  return { name, duration: duration.toFixed(2) };
});

// biome-ignore lint/nursery/noConsole: "Performance test results"
console.table(results);
