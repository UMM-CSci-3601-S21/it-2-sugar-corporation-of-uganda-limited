package umm3601.contextpack;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class ContextPack {

  @ObjectId @Id
  public String name;

  public int age;
  public String company;
  public String email;
  public String avatar;
  public String role;
}
