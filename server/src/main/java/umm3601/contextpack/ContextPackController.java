package umm3601.contextpack;

import static com.mongodb.client.model.Filters.eq;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;

import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;

/**
 * Controller that manages request for info about context Packs.
 */
public class ContextPackController {





private final JacksonMongoCollection<ContextPack> contextPackCollection;

/**
 * Construct a controller for the context Packs
 *
 * @param database the database containing context Pack data
 */
public ContextPackController(MongoDatabase database) {
  contextPackCollection = JacksonMongoCollection.builder().build(database, "context Packs", ContextPack.class);
}

/**
 * Get the single context Pack specified by the 'id' parameter in the request.
 *
 * @param ctx a Javalin HTTP context
 */
public void getContextPack(Context ctx) {
  String id = ctx.pathParam("id");
  ContextPack contextPack;

  try {
    contextPack = contextPackCollection.find(eq("_id", new ObjectId(id))).first();
  } catch(IllegalArgumentException e) {
    throw new BadRequestResponse(" The requested context Pack id wasn't a legal Mongo Object ID.");
  }
  if (contextPack == null) {
    throw new NotFoundResponse("The requested context Pack was not found.");
  } {
    ctx.json(contextPack);
  }
}

public void getContextPacks(Context ctx) {
  ctx.json(contextPackCollection.find(new Document()).into(new ArrayList<>()));
}

/**
 *  Get a JSON response with a list of all the context Packs.
 *
 * @param ctx a Javalin HTTP context
 */
public void addNewContextPack(Context ctx) {
  ContextPack newContextPack = ctx.bodyValidator(ContextPack.class)
    .check(cp -> cp.name != null && cp.name.length() > 0) //Verify that the context Pack has a name that is not blank
    .check(cp -> cp.enabled == false || cp.enabled == true)//Verify that the enabled is true or false
    .check(cp -> cp.wordpacks != null)//Verify that the array is not empty
    .get();

  contextPackCollection.insertOne(newContextPack);
  ctx.status(201);
  ctx.json(ImmutableMap.of("id", newContextPack.name));
}

/**
   * Utility function to generate the md5 hash for a given string
   *
   * @param str the string to generate a md5 for
   */
  @SuppressWarnings("lgtm[java/weak-cryptographic-algorithm]")
  public String md5(String str) throws NoSuchAlgorithmException {
    MessageDigest md = MessageDigest.getInstance("MD5");
    byte[] hashInBytes = md.digest(str.toLowerCase().getBytes(StandardCharsets.UTF_8));

    StringBuilder result = new StringBuilder();
    for (byte b : hashInBytes) {
      result.append(String.format("%02x", b));
    }
    return result.toString();
  }
}
