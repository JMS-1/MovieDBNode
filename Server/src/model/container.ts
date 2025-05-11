import * as types from "@jms-1/mongodb-graphql/lib/types";

import { TContainerType } from "./enum";
import { uniqueIdPattern } from "./utils";

export const ContainerType = types.GqlEnum("ContainerType", TContainerType, {
  description: "Die möglichen Arten von Ablagen.",
  sortable: true,
});

export const Container = types.GqlObject(
  "Container",
  {
    _id: types.GqlId({
      computed: true,
      description: "Automatisch vergebene eindeutige Kennung des Ablage.",
    }),
    description: types.GqlNullable(
      types.GqlString({
        description: "Eine Beschreibung für die Ablage.",
        validation: {
          max: 2000,
          type: "string",
        },
      })
    ),
    name: types.GqlString({
      description: "Der Anzeigetext für die Ablage.",
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
          "Optional die eindeutige Kennung der übergeordneten Ablage.",
        validation: {
          pattern: uniqueIdPattern,
          type: "string",
        },
      })
    ),
    parentLocation: types.GqlNullable(
      types.GqlString({
        description: "Die Position der Ablage in der übergeordneten Ablage.",
        validation: {
          max: 100,
          type: "string",
        },
      })
    ),
    type: ContainerType,
  },
  { description: "Beschreibt eine Ablage." }
);
