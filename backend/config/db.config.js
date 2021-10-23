module.exports = {
    HOST: process.env.MONGO_HOST || 'localhost',
    PORT: process.env.MONGO_PORT || 27017,
    QUERY: process.env.MONGO_QUERY || '?retryWrites=true&w=majority',
    USER: process.env.MONGO_USER || 'dbAdmin',
    PASS: process.env.MONGO_PASS || 'password',
    DB: process.env.MONGO_DB || 'backend'
}