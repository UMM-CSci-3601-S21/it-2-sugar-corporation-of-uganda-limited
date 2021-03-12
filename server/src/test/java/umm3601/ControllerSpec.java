package umm3601;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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

import io.javalin.http.Context;
import io.javalin.http.util.ContextUtil;
import io.javalin.plugin.json.JavalinJson;
import umm3601.contextpack.ContextPack;
import umm3601.contextpack.ContextPackController;

public class ControllerSpec {

  MockHttpServletRequest mockReq = new MockHttpServletRequest();
  MockHttpServletResponse mockRes = new MockHttpServletResponse();


  private MongoCollection<Document> contextPackDocuments;

  static MongoClient mongoClient;
  static MongoDatabase db;

  private ContextPackController packController;

  private ObjectId testIDOne;
  private ObjectId testIDTwo;
  private ObjectId testIDThree;

  @BeforeAll
  public static void setupDB() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(
      MongoClientSettings.builder()
      .applyToClusterSettings(builder ->
        builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
      .build());

    db = mongoClient.getDatabase("test");
  }

  @AfterAll
  public static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @BeforeEach
  public void clearAndPopulateDB() {

    //reset mock values
    mockReq.resetAll();
    mockRes.resetAll();

    //set up db
    contextPackDocuments = db.getCollection("contextPacks");
    contextPackDocuments.drop();
    testIDOne = new ObjectId();
    testIDTwo = new ObjectId();
    testIDThree = new ObjectId();
    List<Document> testPacks = new ArrayList<>();
    testPacks.add(
      new Document()
        .append("_id", testIDOne )
        .append("name", "Example 1")
        .append("icon", "example.png")
        .append("enabled", false)
        .append("wordPacks", Arrays.asList(
          new Document()
          .append("name", "Example 1")
          .append("enabled", false)
          .append("nouns", Arrays.asList(
            new Document()
            .append("word", "This")
            .append("forms", Arrays.asList("THIS"))
          ))
          .append("verbs", Arrays.asList(
            new Document()
            .append("word", "Is")
            .append("forms", Arrays.asList("IS"))
          ))
          .append("adjectives", Arrays.asList(
            new Document()
            .append("word", "An")
            .append("forms", Arrays.asList("AN"))
          ))
          .append("misc", Arrays.asList(
            new Document()
            .append("word", "Example")
            .append("forms", Arrays.asList("EXAMPLE"))
          ))
        )));
    testPacks.add(
      new Document()
        .append("_id",testIDTwo)
        .append("name", "Example 2")
        .append("icon", "example.png")
        .append("enabled", false)
        .append("wordPacks", Arrays.asList(
          new Document()
          .append("name", "Example 2")
          .append("enabled", false)
          .append("nouns", Arrays.asList(
            new Document()
            .append("word", "This")
            .append("forms", Arrays.asList("THIS"))
          ))
          .append("verbs", Arrays.asList(
            new Document()
            .append("word", "Is")
            .append("forms", Arrays.asList("IS"))
          ))
          .append("adjectives", Arrays.asList(
            new Document()
            .append("word", "An")
            .append("forms", Arrays.asList("AN"))
          ))
          .append("misc", Arrays.asList(
            new Document()
            .append("word", "Example")
            .append("forms", Arrays.asList("EXAMPLE"))
          ))
        )));
    testPacks.add(
      new Document()
        .append("_id", testIDThree)
        .append("name", "Example 3")
        .append("icon", "example.png")
        .append("enabled", false)
        .append("wordPacks", Arrays.asList(
          new Document()
          .append("name", "Example 3")
          .append("enabled", false)
          .append("nouns", Arrays.asList(
            new Document().append("word", "This").append("forms", Arrays.asList("THIS"))
          ))
          .append("verbs", Arrays.asList(
            new Document().append("word", "Is").append("forms", Arrays.asList("IS"))
          ))
          .append("adjectives", Arrays.asList(
            new Document().append("word", "An").append("forms", Arrays.asList("AN"))
          ))
          .append("misc", Arrays.asList(
            new Document().append("word", "Example").append("forms", Arrays.asList("EXAMPLE"))
          ))
        )));
    contextPackDocuments.insertMany(testPacks);
    packController = new ContextPackController(db);
  }

  @Test
  public void shouldGetAllPacks() throws IOException {

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextPacks");
    packController.getContextPacks(ctx);

    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    assertEquals(contextPackDocuments.countDocuments(), JavalinJson.fromJson(result, ContextPack[].class).length);
  }

  @Test
  public void shouldGetExampleOnePack() {

    mockReq.setQueryString("name=Example 1");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextPacks");
    packController.getContextPacks(ctx);

    assertEquals(200, mockRes.getStatus());
    String result = ctx.resultString();
    ContextPack[] resultPacks = JavalinJson.fromJson(result, ContextPack[].class);

    assertEquals(1,resultPacks.length);
    assertEquals("Example 1", resultPacks[0].name);
  }
}
