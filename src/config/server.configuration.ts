export default () => ({
  app: {
    port: parseInt(process.env.PORT) || 3000,
    url: '',
  },
  database: {
    uri: process.env.MONGO_URI,
    name: process.env.MONGO_DB_NAME,
  },
  keys: {
    session_key: process.env.SESSION_SECRET,
  },
});
