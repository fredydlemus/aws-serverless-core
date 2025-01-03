export const cyStoreDataHandler = (event, context, callback) => {
    callback(null, {
        headers: {
            'Control-Access-Allow-Origin': '*'
        }
    })
}