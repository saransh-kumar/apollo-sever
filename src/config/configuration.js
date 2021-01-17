import pkg from 'dotenv';

// eslint-disable-next-line import/no-mutable-exports
let { config } = pkg;

config();

const envVars = process.env;
config = Object.freeze({
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT

});
export default config;
