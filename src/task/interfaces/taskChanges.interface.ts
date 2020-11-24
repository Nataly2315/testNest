export interface TaskChanges {
    readonly operationType: string;
    readonly ns: object;
    readonly fullDocument: object;
}