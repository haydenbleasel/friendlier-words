import animals from '../lib/animals.json' assert { type: 'json' };
import space from '../lib/space.json' assert { type: 'json' };
import plants from '../lib/plants.json' assert { type: 'json' };

const categories = [animals, space, plants];

export const friendlyWords = (segments = 2, separator = '-'): string => {
  const words: string[] = [];

  for (let index = 0; index < segments; index += 1) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = Math.floor(Math.random() * category.length);

    words.push(category[word]);
  }

  return words.join(separator);
};
