export const cyGetDataHandler = (event, context, callback) => {
    const type = event.type
    if(type === 'all'){
        callback(null, 'all the data')
    }else if (type === 'single'){
        callback(null, 'Just my data')
    }else{
        callback(null, 'Hello from lambda!')
    }
}