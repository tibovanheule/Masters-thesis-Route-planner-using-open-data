return new InsertOneWriteOperation<Route>({
    "@type": "Route",
    "_id": create_iri("Route", timestamp, row.route_id),
    "Route.lijn": create_iri("Lijn", timestamp, row.route_id),
    "Route.gedektDoor": [],
    "Route.naam": new TaalString(row.route_long_name, "fr")
});