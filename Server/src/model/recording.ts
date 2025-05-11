import * as types from "@jms-1/mongodb-graphql/lib/types";

import { TRecordingContainerType, TRecordingSort } from "./enum";
import { uniqueIdPattern } from "./utils";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecordingContainerType = types.GqlEnum(
  "RecordingContainerType",
  TRecordingContainerType,
  {
    description: "Ablageart einer Aufzeichnung.",
    sortable: true,
  }
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Link = types.GqlObject(
  "Link",
  {
    description: types.GqlNullable(
      types.GqlString({
        description: "Optional eine Beschreibung des Verweises.",
        validation: {
          max: 2000,
          type: "string",
        },
      })
    ),
    name: types.GqlString({
      description: "Der Anzeigetext für den Verweise.",
      validation: {
        max: 100,
        min: 1,
        type: "string",
      },
    }),
    url: types.GqlString({
      description: "Der eigentliche Verweis.",
      validation: {
        max: 2000,
        min: 1,
        type: "string",
      },
    }),
  },
  { description: "Beschreibt einen Verweis." }
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Recording = types.GqlObject(
  "Recording",
  {
    _id: types.GqlId({
      computed: true,
      description: "Automatisch vergebene eindeutige Kennung der Aufzeichnung.",
    }),
    containerId: types.GqlNullable(
      types.GqlString({
        description:
          "Optional die Ablage in der die Aufzeichnung zu finden ist.",
        validation: {
          pattern: uniqueIdPattern,
          type: "string",
        },
      })
    ),
    containerPosition: types.GqlNullable(
      types.GqlString({
        description:
          "Optional der Standort der Aufzeichnung innerhalb der Ablage.",
        validation: {
          max: 100,
          type: "string",
        },
      })
    ),
    containerType: RecordingContainerType,
    created: types.GqlString({
      computed: true,
      description:
        "Datum an dem die Aufzeichnung erzeugt wurde (ISO Notation).",
      sortable: true,
      validation: {
        type: "string",
      },
    }),
    description: types.GqlNullable(
      types.GqlString({
        description: "Optional eine Beschreibung für die Aufzeichnung.",
        validation: {
          max: 2000,
          type: "string",
        },
      })
    ),
    fullName: types.GqlString({
      computed: true,
      description: "Der berechnete vollständige Name der Aufzeichnung.",
      sortable: true,
    }),
    genres: types.GqlArray(
      types.GqlString({
        description: "Alle Kategorien der Aufzeichnung.",
        validation: {
          pattern: uniqueIdPattern,
          type: "string",
        },
      })
    ),
    languages: types.GqlArray(
      types.GqlString({
        description: "Alle Sprachen der Aufzeichnung.",
        validation: {
          pattern: uniqueIdPattern,
          type: "string",
        },
      })
    ),
    links: types.GqlArray(Link),
    name: types.GqlString({
      description: "Der Anzeigetext für die Aufzeichnung.",
      sortable: true,
      validation: {
        max: 100,
        min: 1,
        type: "string",
      },
    }),
    rentTo: types.GqlNullable(
      types.GqlString({
        description: "Optional an wen die Aufzeichnung verliehen ist.",
        sortable: true,
        validation: {
          max: 200,
          type: "string",
        },
      })
    ),
    series: types.GqlNullable(
      types.GqlString({
        description: "Optional die Serie zu der die Aufzeichnung gehört.",
        validation: {
          pattern: uniqueIdPattern,
          type: "string",
        },
      })
    ),
  },
  { description: "Beschreibt eine Aufzeichnung." }
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecordingSort = types.GqlEnum("RecordingSort", TRecordingSort, {
  description:
    "Eigenschaften, nach denen die Aufzeichnungen sortiert werden können.",
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const QueryCountInfo = types.GqlObject(
  "QueryCountInfo",
  {
    _id: types.GqlId({ description: "Die eindeutige Kennung des Kriteriums." }),
    count: types.GqlInt({
      description: "Die Anzahl der Aufzeichnungen für das Kriterium.",
    }),
  },
  {
    description:
      "Beschreibt die Anzahl von Aufzeichnungen für ein bestimmtes Kriterium.",
  }
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecordingQueryResponse = types.GqlObject(
  "RecordingQueryResponse",
  {
    correlationId: types.GqlNullable(
      types.GqlId({
        description: "Eindeutige Kennung des zugehörigen Aufrufs.",
      })
    ),
    count: types.GqlInt({
      description:
        "Die Anzahl der Aufzeichnungen bezüglich der vorgegebenen Einschränkungen.",
    }),
    genres: types.GqlArray(QueryCountInfo, {
      description:
        "Statistik über die Anzahl der Aufzeichnungen pro Kategorie.",
    }),
    languages: types.GqlArray(QueryCountInfo, {
      description: "Statistik über die Anzahl der Aufzeichnungen pro Sprache.",
    }),
    total: types.GqlInt({
      description: "Die gesamte Anzahl an Aufzeichnungen.",
    }),
    view: types.GqlArray(Recording, {
      description:
        "Das zu den Ergebnissen passende Fenster von Aufzeichnungen.",
    }),
  },
  { description: "Ergebnis einer freien Suche nach Aufzeichnungen." }
);
