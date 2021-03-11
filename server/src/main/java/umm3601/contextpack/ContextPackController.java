package umm3601.contextpack;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.regex;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Sorts;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;

/**
 * Controller that manages requests for info about context packs.
 */
public class ContextPackController{

  private static final String NAME_KEY = "name";

  private final JacksonMongoCollection<ContextPack> contextPackCollection;

  /**
   * Construct a controller for context pack.
   *
   * @param database the database containing pack data
   */
  public ContextPackController(MongoDatabase database) {
    contextPackCollection = JacksonMongoCollection.builder().build(database, "contextPack", ContextPack.class);
  }

  /**
   * Get the single pack specified by the `id` parameter in the request.
   *
   * @param ctx a Javalin HTTP context
   */
  public void getPack(Context ctx) {
    String id = ctx.pathParam("id");
    ContextPack contextPack;

    try {
      contextPack = contextPackCollection.find(eq("_id", new ObjectId(id))).first();
    } catch(IllegalArgumentException e) {
      throw new BadRequestResponse("The requested context pack id wasn't a legal Mongo Object ID.");
    }
    if (contextPack == null) {
      throw new NotFoundResponse("The requested context pack was not found");
    } else {
      ctx.json(contextPack);
    }
  }

  /**
   * Get a JSON response with a list of all the context packs.
   *
   * @param ctx a Javalin HTTP context
   */
  public void getPacks(Context ctx) {

    List<Bson> filters = new ArrayList<>(); // start with a blank document

    if (ctx.queryParamMap().containsKey(NAME_KEY)) {
      filters.add(regex(NAME_KEY,  Pattern.quote(ctx.queryParam(NAME_KEY)), "i"));
    }

    String sortBy = ctx.queryParam("sortby", "name"); //Sort by sort query param, default is name
    String sortOrder = ctx.queryParam("sortorder", "asc");

    ctx.json(contextPackCollection.find(filters.isEmpty() ? new Document() : and(filters))
      .sort(sortOrder.equals("desc") ?  Sorts.descending(sortBy) : Sorts.ascending(sortBy))
      .into(new ArrayList<>()));
  }

  /**
   * Add a new context pack JSON object to the database.
   *
   * @param ctx a Javalin HTTP context
   */
  public void addNewPack(Context ctx) {
    User newUser = ctx.bodyValidator(User.class)
      .check(usr -> usr.name != null && usr.name.length() > 0) //Verify that the user has a name that is not blank
      .check(usr -> usr.email.matches(emailRegex)) // Verify that the provided email is a valid email
      .check(usr -> usr.age > 0) // Verify that the provided age is > 0
      .check(usr -> usr.role.matches("^(admin|editor|viewer)$")) // Verify that the role is one of the valid roles
      .check(usr -> usr.company != null && usr.company.length() > 0) // Verify that the user has a company that is not blank
      .get();

    // Generate user avatar (you won't need this part for todos)
    try {
      newUser.avatar = "https://gravatar.com/avatar/" + md5(newUser.email) + "?d=identicon";  // generate unique md5 code for identicon
    } catch (NoSuchAlgorithmException ignored) {
      newUser.avatar = "https://gravatar.com/avatar/?d=mp";                           // set to mystery person
    }

    userCollection.insertOne(newUser);
    ctx.status(201);
    ctx.json(ImmutableMap.of("id", newUser._id));
  }

}
