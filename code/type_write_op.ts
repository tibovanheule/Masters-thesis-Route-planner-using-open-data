export class InsertOneWriteOperation<T> {
    "insertOne": { "document": T };
    constructor(field: T) {
        this["insertOne"] = {"document": field}
    }
}
