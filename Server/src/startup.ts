import { createSchemaConfiguration } from "@jms-1/mongodb-graphql/lib/schema";
import debug from "debug";
import express from "express";
import { GraphQLSchema } from "graphql";
import { join } from "path";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { expressMiddleware } from "@as-integrations/express5";
import { createServer } from "http";

import { ContainerCollection } from "./collections/container";
import { GenreCollection } from "./collections/genre";
import { LanguageCollection } from "./collections/language";
import { csvData, RecordingCollection } from "./collections/recording";
import { SeriesCollection } from "./collections/series";
import { Config } from "./config";
import { getMessage } from "./utils";

const utfBom = Buffer.from([0xef, 0xbb, 0xbf]);

async function startup(): Promise<void> {
  const app = express();
  const httpServer = createServer(app);

  app.use((req, res, next) => {
    const { originalUrl } = req;

    const hasLanguage =
      originalUrl === "/de" ||
      originalUrl.startsWith("/de/") ||
      originalUrl === "/en" ||
      originalUrl.startsWith("/en/");

    if (!Config.defaultRoute) {
      next();
    } else if (originalUrl.startsWith("/graphql")) {
      next();
    } else if (hasLanguage) {
      next();
    } else {
      res.redirect(`/de${originalUrl}`);
    }
  });

  app.use(express.static(join(__dirname, "../dist/browser")));

  app.get("/:lang/export", (_request, response) => {
    response.setHeader(
      "Content-disposition",
      "attachment; filename=export.csv"
    );
    response.setHeader("Content-Type", "text/csv; charset=utf-8");
    response.status(200);
    response.write(utfBom);
    response.write(csvData, "utf-8");
    response.end();
  });

  const server = new ApolloServer({
    schema: new GraphQLSchema(
      await createSchemaConfiguration({
        containers: ContainerCollection,
        genres: GenreCollection,
        languages: LanguageCollection,
        recordings: RecordingCollection,
        series: SeriesCollection,
      })
    ),
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: Config.port }, resolve)
  );
}

function startupError(error: unknown): void {
  debug("startup")("%s", getMessage(error));
}

try {
  startup().then(undefined, startupError).catch(startupError);
} catch (error) {
  startupError(error);
}
