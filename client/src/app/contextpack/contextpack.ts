import { WordPack } from '../wordpack/wordpack';

export interface ContextPack {
  _id: string;
  name: string;
  icon?: string;
  enabled: boolean;
  wordPacks?: WordPack[];
}
