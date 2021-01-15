import Express from 'express';
import { ApolloServer } from 'apollo-server-express';

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
      ...schema
    });
    this.Server.applyMiddleware({ app });
    this.run();
  }

  run() {
    const { app, config: { PORT } } = this;
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`App is running on PORT ${PORT}`);
    });
  }
}
export default Server;
