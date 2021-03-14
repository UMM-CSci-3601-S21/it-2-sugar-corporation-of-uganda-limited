import { Words } from '../words/words';

export interface WordPack {
  name: string;
  enabled: boolean;
  nouns?: Words[];
  verbs?: Words[];
  adjectives?: Words[];
  misc?: Words[];
}
