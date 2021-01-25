import { RESTDataSource } from 'apollo-datasource-rest';
import configurations from '../config/configuration';

export default class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${configurations.SERVICE_URL}/api/user`;
  }

  async willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getMe() {
    return this.get('/me');
  }

  async loginUser(payload) {
    return this.post('/login', payload);
  }
}
