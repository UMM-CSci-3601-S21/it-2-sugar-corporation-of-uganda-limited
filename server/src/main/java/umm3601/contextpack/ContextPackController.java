package umm3601.contextpack;

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
import java.util.regex.Matcher;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.regex;

public class ContextPackController {

private static final String NAME_KEY = "name";

private final JacksonMongoCollection<ContextPack> contextPackCollection;

/**
 * Construct a controller for the context packs
 *
 * @param database the database containing context Pack data
 */
public ContextPackController(MongoDatabase database) {
  contextPackCollection = JacksonMongoCollection.builder().build(database, "contextPacks", ContextPack.class);
}

 /**
   * Get a JSON response with a list of all the context packs.
   *
   * @param ctx a Javalin HTTP context
   */
  public void getContextPacks(Context ctx) {

    List<Bson> filters = new ArrayList<>(); // start with a blank document

    if (ctx.queryParamMap().containsKey(NAME_KEY)) {
      filters.add(regex(NAME_KEY, Pattern.quote(ctx.queryParam(NAME_KEY)), "i"));
    }

    String sortBy = ctx.queryParam("sortby", "name"); //Sort by sort query param, default is name
    String sortOrder = ctx.queryParam("sortorder", "asc");

    ctx.json(contextPackCollection.find(filters.isEmpty() ? new Document() : and(filters))
      .sort(sortOrder.equals("desc") ?  Sorts.descending(sortBy) : Sorts.ascending(sortBy))
      .into(new ArrayList<>()));
  }

  public void getContextPack(Context ctx){
    String id = ctx.pathParam("id");
    ContextPack contextPack;

    try {
      contextPack = contextPackCollection.find(eq("_id", new ObjectId(id))).first();
    } catch(IllegalArgumentException e){
      throw new BadRequestResponse("The id is not valid");
    }
    if(contextPack == null){
      throw new NotFoundResponse("The Context Pack could not be found");
    }
    else {
      ctx.json(contextPack);
    }
  }

/**
 *  Add a context pack to the database.
 *
 * @param ctx a Javalin HTTP context
 */
public void addNewContextPack(Context ctx) {
  ContextPack newContextPack = ctx.bodyValidator(ContextPack.class)
    .check(cp -> cp.name != null && cp.name.length() > 0) //Verify that the context Pack has a name that is not blank
    .check(cp -> cp.enabled == true || cp.enabled == false)//Verify that the enabled is true or false
    .check(cp -> cp.wordPacks != null)//Verify that the array is not empty
    .get();

  contextPackCollection.insertOne(newContextPack);
  ctx.status(201);
  ctx.json(ImmutableMap.of("_id", newContextPack._id));
}

/**
 *  Delete a context pack from the database
 *
 *  @param ctx a Javalin HTTP context
 */
public void deleteContextPack(Context ctx) {
  String id = ctx.pathParam("id");
  contextPackCollection.deleteOne(eq("_id", new ObjectId(id)));
}

public void addNewWordPack(Context ctx) {
  String cpId = ctx.url();
  Pattern pattern = Pattern.compile("/contextpacks/(\\w*)/");
  Matcher matcher = pattern.matcher(cpId);
  cpId = matcher.group(1);
  WordPack newWordPack = ctx.bodyValidator(WordPack.class)
    .check(cp -> cp.name != null && cp.name.length() > 0) //Verify that the context Pack has a name that is not blank
    .check(cp -> cp.enabled == true || cp.enabled == false)//Verify that the enabled is true or false
    .check(cp -> cp.nouns != null)//Verify that the array is not empty
    .check(cp -> cp.verbs != null)
    .check(cp -> cp.adjectives != null)
    .check(cp -> cp.misc != null)
    .get();

  ContextPack cp = contextPackCollection.findOneById(cpId);
  cp.wordPacks.add(newWordPack);
  ctx.status(201);
  ctx.json(ImmutableMap.of("_id", cp._id));
  }
}
