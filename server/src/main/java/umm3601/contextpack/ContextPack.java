package umm3601.contextpack;

import java.lang.reflect.Array;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class ContextPack {

  @ObjectId @Id
  public String name;

  public String icon;
  public boolean enabled;
  public Array[] wordpacks;

  public class WordPacks {

    public String name;
    public boolean enabled;

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
