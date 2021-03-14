import {}

export interface ContextPack {
  _id: string;
  name: string;
  icon: string;
  enabled: boolean;
  wordPacks: ArrayList<WordPack>[];
}
