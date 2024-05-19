
async function load_file_from_zip(zip_loc: string, file: string, func: RecordHandler, db_name: string, collection: string) {
    return new Promise<void>(async (resolve, reject) => {
        const result: any[] = [];
        const zip: StreamZip.StreamZipAsync = new StreamZip.async({file: zip_loc});
        const stm: Parser = (await zip.stream(file)).pipe(parse({
            delimiter: ',', columns: true
        }));
        // transform line using function
        stm.on('data', async (data) => result.push(await func(data, db_name))
        )
        // Catch any error
        stm.on('error', (err) => {
            console.error(err.message);
            reject(err)
        });
        stm.on('finish', async () => {
            zip.close()
            // Do Work with the result
            resolve()
        });
    })
}