collection.find({
        geojson: {
            $within: {
                $geometry: {type: "Polygon", coordinates: bufferedLinestring},
            }
        }
    }, { projection: { "_id": 0, geojson: 0}
})