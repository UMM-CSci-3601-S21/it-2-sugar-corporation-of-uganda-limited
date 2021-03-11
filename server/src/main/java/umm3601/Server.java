package umm3601;

import java.util.Arrays;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import io.javalin.Javalin;
import io.javalin.core.util.RouteOverviewPlugin;
import umm3601.contextpack.ContextPackController;

public class Server {

  static String appName = "Word River";

  public static void main(String[] args) {

    // Get the MongoDB address and database name from environment variables and
    // if they aren't set, use the defaults of "localhost" and "dev".
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");
    String databaseName = System.getenv().getOrDefault("MONGO_DB", "dev");

    // Setup the MongoDB client object with the information we set earlier
    MongoClient mongoClient
      = MongoClients.create(MongoClientSettings
        .builder()
        .applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
        .build());

    // Get the database
    MongoDatabase database = mongoClient.getDatabase(databaseName);

    // Initialize dependencies
    ContextPackController contextPackController = new ContextPackController(database);

    Javalin server = Javalin.create(config -> {
      config.registerPlugin(new RouteOverviewPlugin("/api"));
    });
    /*
     * Shuts down 'mongoClient' if server fails to start
     * or stops unexpectedly.
     */
    server.events(event -> {
      event.serverStartFailed(mongoClient::close);
      event.serverStopped(mongoClient::close);
    });
    Runtime.getRuntime().addShutdownHook(new Thread(() -> {
      server.stop();
    }));

    server.start(4567);

    // List context packs, filtered using query parameters
    server.get("/api/packs", contextPackController::getContextPacks);

    // Get the specified context pack
    server.get("/api/packs/:id", contextPackController::getContextPack);

    // Add new context pack with the info being in the JSON body
    // of the HTTP request
    server.post("/api/packs", contextPackController::addNewContextPack);

    server.exception(Exception.class, (e, ctx) -> {
      ctx.status(500);
    });
  }
}
