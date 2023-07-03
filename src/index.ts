import animals from '../lib/animals.json' assert { type: 'json' };
import space from '../lib/space.json' assert { type: 'json' };
import plants from '../lib/plants.json' assert { type: 'json' };

const categories = [animals, space, plants];

export const friendlyWords = ({
  segments = 2,
  separator = '-',
}: {
  segments?: number;
  separator?: string;
}): string => {
  const words: string[] = [];

  new Array(segments).fill(undefined).forEach(() => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const index = Math.floor(Math.random() * category.length);
    const word = category[index];

    words.push(word);
  });

  return words.join(separator);
};
