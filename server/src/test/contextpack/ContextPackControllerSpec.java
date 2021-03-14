package umm3601.contextpack;

import static com.mongodb.client.model.Filters.eq;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.collect.ImmutableMap;
import com.mockrunner.mock.web.MockHttpServletRequest;
import com.mockrunner.mock.web.MockHttpServletResponse;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;


import org.bson.Document;
import org.bson.types.ObjectId;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
import io.javalin.http.util.ContextUtil;
import io.javalin.plugin.json.JavalinJson;
import umm3601.contextpack.ContextPackControllerSpec;

public class ContextPackControllerSpec {

  MockHttpServletRequest mockReq = new MockHttpServletRequest();
  MockHttpServletResponse mockRes = new MockHttpServletResponse();

  private ContextPackController contextPackController;

  private ObjectId testID;

  static MongoClient mongoClient;
  static MongoDatabase db;

  static ObjectMapper jsonMapper = new ObjectMapper();

  @BeforeAll
  public static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(MongoClientSettigns.builder().applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr)))).build());

    db = mongoClient.getDatabase("test");
  }

  @BeforeEach
  public void setupEach() throws IOException {

    // Reset our mock request and response objects
    mockReq.resetAll();
    mockRes.resetAll();

    // Setup database
    MongoCollection<Document> contextPackDocuments = db.getCollection("contextpacks");
    contextPackDocuments.drop();
    testID = new ObjectId();
    Document testPackID = new Document()
    .append("contextPackName", testID)
    .append("icon", "cat.png")
    .append("enabledOne", true)
    .append("wordPacks", Arrays.asList(
      new Document("wordPackName", "dogs")
            .append("enabledTwo", true)
            .append("verbs",
                Arrays.asList(new Document("word", "run").append("forms", Arrays.asList("horsie", "horse"))))
            .append("nouns",
                Arrays.asList(new Document("word", "horse").append("forms", Arrays.asList("horsie", "horse"))))
            .append("adjectives",
                Arrays.asList(new Document("word", "blue").append("forms", Arrays.asList("horsie", "horse"))))
            .append("misc",
                Arrays.asList(new Document("word", "goat").append("forms", Arrays.asList("horsie", "horse")))),

      new Document("wordPackName", "cats")
            .append("enabledTwo", true)
            .append("verbs",
                Arrays.asList(new Document("word", "walk").append("forms", Arrays.asList("pink", "pork"))))
            .append("nouns",
                Arrays.asList(new Document("word", "goat").append("forms", Arrays.asList("goat", "goats"))))
            .append("adjectives",
                Arrays.asList(new Document("word", "red").append("forms", Arrays.asList("seven", "horse"))))
            .append("misc",
                Arrays.asList(new Document("word", "moo").append("forms", Arrays.asList("horse"))))

                )

    );
    contextPackDocuments.insertOne(testPackID);

    MongoCollection<Document> wordlistDocuments = db.getCollection("wordPacks");

    Document testListID = new Document()
          .append("wordPackName", "MountainDew")
          .append("enabled", true)
          .append("nouns",
                Arrays.asList(new Document("word", "horse").append("forms", Arrays.asList("horsie", "horse"))))
          .append("adjectives",
                Arrays.asList(new Document("word", "Bob").append("forms", Arrays.asList("Bob"))))
          .append("verbs",
                Arrays.asList(new Document("word", "run").append("forms", Arrays.asList("ran", "runs"))))
          .append("misc",
                Arrays.asList(new Document("word", "run").append("forms", Arrays.asList("ran", "runs"))));
    wordlistDocuments.insertOne(testListID);
    contextPackController = new ContextPackController(db);
  }

  @AfterAll
  public static void tearDown() {
    db.drop();
    mongoClient.close();
  }

  @Test
  public void GetAllContextPacks() throws IOException {

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/packs");
    contextPackController.getPacks(ctx);

    assertEquals(200, mockRes.status());

    String result = ctx.resultString();
    assertTrue(JavalinJson.fromJson(result, ContextPack[].class).length >= 1);
    assertEquals(db.getCollection("contextpacks").countDocuments(), JavalinJson.fromJson(result, ContextPack[].class).length);
  }
}
