import { RESTDataSource } from 'apollo-datasource-rest';
import configurations from '../config/configuration';

export default class TraineeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${configurations.SERVICE_URL}/api/trainee`;
  }

  async getTrainees() {
    return this.get('/');
  }

  async createTrainee(payload) {
    return this.post('/', payload);
  }

  async updateTrainee(payload) {
    console.log('Payload', payload);
    return this.put('/', payload);
  }

  deleteTrainee(payload) {
    console.log('Payload: ', payload);
    return this.delete(`/${payload.originalId}`, payload);
  }
}
