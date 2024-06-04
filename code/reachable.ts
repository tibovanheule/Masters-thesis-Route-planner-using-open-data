collection.aggregate([
    { '$match': { '_id': id } }, { '$project': { 'geojson': 0 }
    }, {
    '$graphLookup': {
        'from': 'merged',
        'startWith': '$GeplandStoppunt-startVan.tot',
        'connectFromField': 'GeplandStoppunt-startVan.tot',
        'connectToField': '_id',
        'as': 'neighbours',
        'maxDepth': k
        }
    }, { '$project': { 'neighbours.geojson': 0 } }
])