import animals from '../lib/animals.json' assert { type: 'json' };
import space from '../lib/space.json' assert { type: 'json' };
import plants from '../lib/plants.json' assert { type: 'json' };

const categories = [animals, space, plants];

export const friendlyWords = (): string => {
  const category1 = categories[Math.floor(Math.random() * categories.length)];
  const category2 = categories[Math.floor(Math.random() * categories.length)];

  const idx1 = Math.floor(Math.random() * category1.length);
  const idx2 = Math.floor(Math.random() * category2.length);

  const object1 = category1[idx1];
  const object2 = category2[idx2];

  return `${object1}-${object2}`;
};
