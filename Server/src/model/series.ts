import * as types from "@jms-1/mongodb-graphql/lib/types";

import { uniqueIdPattern } from "./utils";

export const Series = types.GqlObject(
  "Series",
  {
    _id: types.GqlId({
      computed: true,
      description: "Automatisch vergebene eindeutige Kennung der Serie.",
    }),
    description: types.GqlNullable(
      types.GqlString({
        description: "Optional eine Beschreibung für die Serie.",
        validation: {
          max: 2000,
          type: "string",
        },
      })
    ),
    fullName: types.GqlNullable(
      types.GqlString({
        computed: true,
        description: "Der berechnete vollständige Name für die Serie.",
        sortable: true,
        validation: {
          type: "string",
        },
      })
    ),
    name: types.GqlString({
      description: "Der Anzeigetext für die Serie.",
      sortable: true,
      validation: {
        max: 50,
        min: 1,
        type: "string",
      },
    }),
    parentId: types.GqlNullable(
      types.GqlString({
        description:
          "Optional die eindeutige Kennung der übergeordneten Serie.",
        validation: {
          pattern: uniqueIdPattern,
          type: "string",
        },
      })
    ),
  },
  { description: "Beschreibt eine Serie." }
);
