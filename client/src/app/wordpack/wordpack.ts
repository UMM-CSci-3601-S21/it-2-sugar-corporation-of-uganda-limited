import { Words } from '../words/words';

export interface WordPack {
  name: string;
  enabled: boolean;
  nouns: Array<Words>;
  verbs: Array<Words>;
  adjectives: Array<Words>;
  misc: Array<Words>;
}
