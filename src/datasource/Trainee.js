import { RESTDataSource } from 'apollo-datasource-rest';
import configurations from '../config/configuration';

export default class TraineeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${configurations.SERVICE_URL}/api/trainee`;
  }

  async getTrainees(skip, limit, sortedBy, sortedOrder) {
    return this.get(`/?sortedBy=${sortedBy}&limit=${limit}&skip=${skip}&sortedOrder=${sortedOrder}`);
  }

  async createTrainee(payload) {
    return this.post('/', payload);
  }

  async updateTrainee(payload) {
    return this.put('/', payload);
  }

  deleteTrainee(payload) {
    return this.delete(`/${payload.originalId}`, payload);
  }
}
