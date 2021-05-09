import { RESTDataSource } from 'apollo-datasource-rest';
import DataLoader from 'dataloader';

export class AuthAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:10111/api/';
  }

  private userLoader = new DataLoader(async (ids) => {
    const response = await this.get('users', { ids: ids.join(',') });
    const rows = response.data;
    return ids.map(id => rows.find((row: any) => row.id === id));
  });

  //willSendRequest(request) {
    //console.log('AuthAPI.willSendRequest', request);
    //request.params.set('api_key', this.context.token);
    //request.headers.set('Authorization', this.context.token);

    //if (this.context.token) {
    //  request.headers.set('Authorization', this.context.token);
    //}
  //}

  async getUserById(id: string) {
    return this.get(`users/${id}`);
  }

  async getUsers(params: any = null) {
    const response = await this.get('users', params);
    return response.data;
  }

  async getUserByIdFast(id: string) {
    return this.userLoader.load(id);
  }
}
