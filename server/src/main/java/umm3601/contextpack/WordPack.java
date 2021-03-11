package umm3601.contextpack;

import java.util.ArrayList;

import org.mongojack.ObjectId;

public class WordPack {
  @ObjectId
  public String _id;

  public String name;
  public boolean enabled;
  public ArrayList<Word> nouns;
  public ArrayList<Word> verbs;
  public ArrayList<Word> adjectives;
  public ArrayList<Word> misc;


}
