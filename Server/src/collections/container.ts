import { collectionNames } from "./collections";
import { MongoConnection } from "./connection";
import { HierarchicalCollection } from "./hierarchical";

import { Container } from "../model/entities";

class ContainerHierarchicalCollection extends HierarchicalCollection<
  typeof Container
> {
  readonly collectionName = collectionNames.containers;
  readonly entityName = "Ablage";
  readonly parentProp = "containerId";
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ContainerCollection = MongoConnection.createCollection(
  Container,
  ContainerHierarchicalCollection
);
