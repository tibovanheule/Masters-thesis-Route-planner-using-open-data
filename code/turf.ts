function buffer_linestring(coordinates: [[number,number],[number,number]], meters: number) {
    let point = turf.lineString();
    return turf.buffer(point, meters, {units: 'meters'})["geometry"]["coordinates"];
}