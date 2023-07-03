import animals from '../lib/animals.json' assert { type: 'json' };

export const friendlyWords = (): string => {
  const idx1 = Math.floor(Math.random() * animals.length);
  const idx2 = Math.floor(Math.random() * animals.length);
  const idx3 = Math.floor(Math.random() * animals.length);

  const animal1 = animals[idx1];
  const animal2 = animals[idx2];
  const animal3 = animals[idx3];

  return `${animal1}-${animal2}-${animal3}`;
};
