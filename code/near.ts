collection.find({
        geojson: { $near: {
                $geometry: {type: "Point", coordinates: geojson},
                $minDistance: 0,
                $maxDistance: meter
        }        }
    }, { projection: { "_id": 1, geojson: 0 } 
})