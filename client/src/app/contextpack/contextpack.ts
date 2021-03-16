export interface ContextPack {
  _id: string;
  name: string;
  icon: string;
  enabled: boolean;
  wordPacks?: WordPack[];
}

export interface WordPack {
  name: string;
  enabled: boolean;
  nouns?: Words[];
  verbs?: Words[];
  adjectives?: Words[];
  misc?: Words[];
}

export interface Words {
  word?: string;
  forms?: string[];
}
