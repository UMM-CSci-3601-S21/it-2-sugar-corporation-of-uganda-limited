package umm3601.contextpack;

import java.io.Console;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
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
    .check(cp -> cp.wordLists != null)//Verify that the array is not empty
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
  System.err.println("got to 1");
  String id = ctx.pathParam("id");
  System.out.println("got to 2");
  contextPackCollection.deleteOne(eq("_id", new ObjectId(id)));
  System.out.println("got to 3");
  ctx.status(201);
  ctx.json(ImmutableMap.of("_id", id));
}

/**
 * Adds new word lists by taking a context pack with an empty name, icon, and enabled and adding the word lists
 * to an already existing context pack
 * @param ctx a Javalin HTTP context
 */
public void addNewWordList(Context ctx) {
  ContextPack oldContextPack;
  //get the id of the context pack to be updated using the url path
  String cpId = ctx.pathParam("id");
  //get the context pack using the id
  try {
    oldContextPack = contextPackCollection.find(eq("_id", new ObjectId(cpId))).first();
  } catch(IllegalArgumentException e) {
    throw new BadRequestResponse("The id is not valid");
  }

  //A contextpack that contains the new word packs
  ContextPack tempContextPack = ctx.bodyValidator(ContextPack.class)
    .check(cp -> cp.wordLists != null)//Verify that the array is not empty
    .get();

  //add the word lists to the old context pack
  oldContextPack.wordLists.addAll(tempContextPack.wordLists);

  //replace the old context pack with the new instance that contains the new word lists
  contextPackCollection.findOneAndReplace(Filters.eq(cpId), oldContextPack);
  ctx.status(201);
  ctx.json(ImmutableMap.of("_id", oldContextPack._id));
  }
}
