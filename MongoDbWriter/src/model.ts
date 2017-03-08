export var containerCollection = "containers";

export interface IContainer {
    _id: number;

    name: string;

    type: number;

    description?: string;

    parentId?: number;

    location?: string;
}

