package umm3601.contextpack;

import java.lang.reflect.Array;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class ContextPack {

  @ObjectId @Id
  public String contextPackName;

  public String icon;
  public boolean enabledOne;
  public Array[] wordPacks;

  public class WordPacks {

    public String wordPackName;
    public boolean enabledTwo;

    public Array[] nouns;
    public Array[] verbs;
    public Array[] adjectives;
    public Array[] misc;

    public class Type {

      public String word;
      public Array[] forms;
    }
  }
}
