package umm3601.mongotest;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.*;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Sorts;
import org.bson.Document;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import umm3601.contextpack.ContextPack;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Some simple "tests" that demonstrate our ability to
 * connect to a Mongo database and run some basic queries
 * against it.
 * Created by mcphee on 20/2/17.
 *
 * Configured for Team AT by Team AT on 10/3/21
 */
public class MongoSpec {

  private MongoCollection<Document> contextPackDocuments;

  static MongoClient mongoClient;
  static MongoDatabase db;

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
    contextPackDocuments = db.getCollection("packs");
    contextPackDocuments.drop();
    List<Document> testPacks = new ArrayList<>();
    testPacks.add(
      new Document()
        .append("contextPackName", "Example 1")
        .append("icon", "example.png")
        .append("enabled", false)
        .append("wordPacks",
          new Document()
          .append("wordPackName", "Example 1")
          .append("enabled", false)
          .append("nouns",
            new Document()
            .append("word", "This")
            .append("forms", Arrays.asList("THIS"))
          )
          .append("verbs",
            new Document()
            .append("word", "Is")
            .append("forms", Arrays.asList("IS"))
          )
          .append("adjectives",
            new Document()
            .append("word", "An")
            .append("forms", Arrays.asList("AN"))
          )
          .append("misc",
            new Document()
            .append("word", "Example")
            .append("forms", Arrays.asList("EXAMPLE"))
          )
        )
    );
    testPacks.add(
      new Document()
        .append("contextPackName", "Example 2")
        .append("icon", "example.png")
        .append("enabled", false)
        .append("wordPacks",
          new Document()
          .append("wordPackName", "Example 2")
          .append("enabled", false)
          .append("nouns",
            new Document()
            .append("word", "This")
            .append("forms", Arrays.asList("THIS"))
          )
          .append("verbs",
            new Document()
            .append("word", "Is")
            .append("forms", Arrays.asList("IS"))
          )
          .append("adjectives",
            new Document()
            .append("word", "An")
            .append("forms", Arrays.asList("AN"))
          )
          .append("misc",
            new Document()
            .append("word", "Example")
            .append("forms", Arrays.asList("EXAMPLE"))
          )
        )
    );
    testPacks.add(
      new Document()
        .append("contextPackName", "Example 3")
        .append("icon", "example.png")
        .append("enabled", false)
        .append("wordPacks",
          new Document()
          .append("wordPackName", "Example 3")
          .append("enabled", false)
          .append("nouns",
            new Document()
            .append("word", "This")
            .append("forms", Arrays.asList("THIS"))
          )
          .append("verbs",
            new Document()
            .append("word", "Is")
            .append("forms", Arrays.asList("IS"))
          )
          .append("adjectives",
            new Document()
            .append("word", "An")
            .append("forms", Arrays.asList("AN"))
          )
          .append("misc",
            new Document()
            .append("word", "Example")
            .append("forms", Arrays.asList("EXAMPLE"))
          )
        )
    );

    contextPackDocuments.insertMany(testPacks);
  }

  private List<Document> intoList(MongoIterable<Document> documents) {
    List<Document> contextPacks = new ArrayList<>();
    documents.into(contextPacks);
    return contextPacks;
  }

  private int countPacks(FindIterable<Document> documents) {
    List<Document> contextPacks = intoList(documents);
    return contextPacks.size();
  }

  @Test
  public void shouldBeThreePacks() {
    FindIterable<Document> documents = contextPackDocuments.find();
    int numberOfPacks = countPacks(documents);
    assertEquals(3, numberOfPacks, "Should be 3 total context packs");
  }

  /**
   * Checks that deeper level fields can be grabbed and checked
   * and that it produces the correct context pack document that
   * the field exists in.
   */
  /**
  @Test
  public void shouldFindCorrectFields() {
    //Surface layer
    FindIterable<Document> surface = contextPackDocuments.find(eq("contextPackName", "Example 1"));
    int numberOfPacks = countPacks(documents);
    assertEquals(1, numberOfPacks, "Only exists in 'Example 1'");

    //Second Layer
    FindIterable<Document> second = contextPackDocuments.find( {"wordPacks.wordPackName":"Example 2"} );
    numberOfPacks = countPacks(documents);
    assertEquals(1, numberOfPacks, "Only exists in 'Example 2'");

    //Third Layer
    documents = contextPackDocuments.find(eq("word", "Example"));
    numberOfPacks = countPacks(documents);
    assertEquals(3, numberOfPacks, "Exists in all Examples");
  }
  */
}
