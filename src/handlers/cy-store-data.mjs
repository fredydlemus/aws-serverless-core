export const cyStoreDataHandler = (event, context, callback) => {
    console.log(event)
    callback(null, {
        headers: {
            'Control-Access-Allow-Origin': '*'
        }
    })
}