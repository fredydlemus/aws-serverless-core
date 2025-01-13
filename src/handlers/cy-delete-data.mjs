export const cyDeleteDataHandler = (event, context, callback) => {
    console.log(event, context);
    callback(null, 'Deleted!')
}