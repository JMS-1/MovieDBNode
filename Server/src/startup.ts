import { createSchemaConfiguration } from "@jms-1/mongodb-graphql/lib/schema";
import debug from "debug";
import express from "express";
import { GraphQLSchema } from "graphql";
import { join } from "path";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

import { ContainerCollection } from "./collections/container";
import { GenreCollection } from "./collections/genre";
import { LanguageCollection } from "./collections/language";
import { csvData, RecordingCollection } from "./collections/recording";
import { SeriesCollection } from "./collections/series";
import { Config } from "./config";
import { getMessage } from "./utils";
import { createServer, IncomingMessage, ServerResponse } from "http";

const utfBom = Buffer.from([0xef, 0xbb, 0xbf]);

interface IContext {
  isAdmin: boolean;
  isAuth: boolean;
  requireAuth: boolean;
  res: ServerResponse<IncomingMessage>;
}

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

  app.use(express.static(join(__dirname, "../dist")));

  app.get("/export", (_request, response) => {
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

  const server = new ApolloServer<IContext>({
    plugins: [
      {
        requestDidStart: async () => ({
          didEncounterErrors: async (requestContext) => {
            if (requestContext?.contextValue?.requireAuth === false) {
              const gqlErrors = requestContext.errors || [];

              if (gqlErrors.some((e) => e.originalError instanceof Error)) {
                requestContext.contextValue.requireAuth = true;
              }
            }
          },
          willSendResponse: async (requestContext) => {
            const context = requestContext?.contextValue;

            if (context?.requireAuth && context.res) {
              context.res.statusCode = 401;

              const http = requestContext.response?.http;

              if (http?.headers?.set) {
                http.headers.set(
                  "WWW-Authenticate",
                  'Basic realm="neuroomNet CMS"'
                );
              }
            }
          },
        }),
      },
    ],
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
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const context = {
          isAdmin: false,
          isAuth: false,
          requireAuth: false,
          res,
        };

        if (req?.headers) {
          const auth = /^Basic (.+)$/.exec(req.headers.authorization || "");

          if (auth) {
            const user = /^([^:]*):([^:]*)$/.exec(
              Buffer.from(auth[1], "base64").toString()
            );

            if (user) {
              context.isAuth = true;
              context.isAdmin =
                user[1] === Config.gqlUser && user[2] === Config.gqlPassword;
            }
          }
        }

        return context;
      },
    }) as any
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
