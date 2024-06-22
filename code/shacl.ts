
let entity = await get_all(req.params.db_name);
if (entity) {
    const parser = new ParserJsonld({context: "https://mx2.tibovanheule.space/ontology/context"});
    const input = new Readable({
        read: () => {
            input.push(JSON.stringify(entity))
            input.push(null)
        }
    })
    const quadStream = parser.import(input);
    const dataset = await rdf.dataset().import(quadStream);
    const shapes = await rdf.dataset().import(rdf2.fromFile('tijdstabellen-ap-SHACL.ttl'))
    
    const validator = new SHACLValidator(shapes, {factory: rdf})
    
    const report = await validator.validate(dataset)
    entity["conforms"]= report.conforms
    entity["report"] = report.results.map(el => {
        return {
            message: el.message,
            path: el.path,
            focusnode: el.focusNode,
            severity: el.severity,
            sourceConstraintComponent: el.sourceConstraintComponent,
            sourceShape: el.sourceShape
        }
    })
}