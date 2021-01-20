/* eslint-disable no-console */
import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { UserAPI } from './datasource/index';

class Server {
  constructor(config) {
    this.config = config;
    // eslint-disable-next-line no-console
    console.log('config: ', config);
    this.app = Express();
  }

  bootstrap() {
    // this.setupApollo(schema);
    // return this;
    this.setupRouts();
    return this;
  }

  setupRouts() {
    const { app } = this;
    app.get('/health-check', (req, res) => {
      res.send('I am fine');
    });
    return this;
  }

  setupApollo(schema) {
    const { app } = this;
    this.Server = new ApolloServer({
      ...schema,
      dataSources: () => {
        const userAPI = new UserAPI();
        return { userAPI };
      },
      context: ({ req }) => {
        if (req) {
          return { token: req.headers.authorization };
        }
        return {};
      }
    });
    this.Server.applyMiddleware({ app });
    this.httpServer = createServer(app);
    this.Server.installSubscriptionHandlers(this.httpServer);
    this.run();
  }

  run() {
    const { config: { PORT } } = this;
    this.httpServer.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`APP is running on PORT ${PORT}`);
    });
  }
}
export default Server;
