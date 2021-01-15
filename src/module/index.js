import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
// eslint-disable-next-line import/extensions
import * as user from './user/index.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'));

const typeDefs = mergeTypes(typesArray, { all: true });

export default {
  resolvers: {
    Query: {
      ...user.Query
    }
  },
  typeDefs
};
