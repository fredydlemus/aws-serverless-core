export const cyStoreDataHandler = (event, context, callback) => {
    console.log(event)
    const age = event.personData.age
    callback(null, age * 2)
}