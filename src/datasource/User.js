import { RESTDataSource } from 'apollo-datasource-rest';
import configurations from '../config/configuration';

export default class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${configurations.SERVICE_URL}/api/user`;
  }

  getMe() {
    return this.get('./me');
  }

  loginUser(payload) {
    return this.post('/login', payload);
  }
}
