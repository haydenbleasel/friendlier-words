import adjectives from "../lib/adjectives.json" assert { type: "json" };
import animals from "../lib/animals.json" assert { type: "json" };
import architecture from "../lib/architecture.json" assert { type: "json" };
import art from "../lib/art.json" assert { type: "json" };
import colors from "../lib/colors.json" assert { type: "json" };
import fashion from "../lib/fashion.json" assert { type: "json" };
import food from "../lib/food.json" assert { type: "json" };
import history from "../lib/history.json" assert { type: "json" };
import music from "../lib/music.json" assert { type: "json" };
import mythology from "../lib/mythology.json" assert { type: "json" };
import nature from "../lib/nature.json" assert { type: "json" };
import space from "../lib/space.json" assert { type: "json" };
const prefixes = [...adjectives, ...colors];

const categories = [
  animals,
  space,
  food,
  mythology,
  nature,
  music,
  architecture,
  art,
  fashion,
  history,
];

const getRandomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

const validateInput = (segments: number, separator: string): void => {
  if (segments < 2) {
    throw new Error("Need at least 2 words");
  }

  if (!separator) {
    throw new Error("Need a separator");
  }
};

const getUniqueWord = (words: string[]): string => {
  const category = getRandomElement(categories);
  const word = getRandomElement(category);
  return words.includes(word) ? getUniqueWord(words) : word;
};

export const friendlyWords = (segments = 2, separator = "-"): string => {
  validateInput(segments, separator);

  const words: string[] = [getRandomElement(prefixes)];

  for (let index = 1; index < segments; index += 1) {
    words.push(getUniqueWord(words));
  }

  return words.join(separator);
};
