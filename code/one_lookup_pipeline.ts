let ids: Set<string> = new Set<string>();
ids.add(create_iri("GeplandStopPunt", db_name, id.toString()))
let last: Set<string> = new Set<string>();
let db = connection.db(db_name);
let collection: Collection<Document> = db.collection(collection_name);
let res = await collection.findOne({"_id": create_iri("GeplandStopPunt", db_name, id.toString())})
if (res) {
    let list: any[] = res["GeplandStoppunt-startVan"].map((el) => el.tot)
    list.forEach((el) => {ids.add(el);last.add(el)})
    for (let i = 0; i < k; i++) {
        list = await collection.find({
            $or: last.map((el) => {
                return {_id: {$eq: el}}
            })
        }, {projection: {geojson: 0}}).toArray();
        last.clear()
        list.forEach((el) => {
            el = el["GeplandStoppunt-startVan"]
            el.forEach((el2: { tot: string; }) => {
                ids.add(el2.tot); last.add(el2.tot)
            })
        })
    }
}

return collection.find({
    $or: res.neighbours.map((el) => {
        return {_id: {$eq: el}}
    })
}, {projection: {geojson: 0}}).toArray()