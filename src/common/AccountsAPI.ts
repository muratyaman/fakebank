import { RESTDataSource } from 'apollo-datasource-rest';
import DataLoader from 'dataloader';

export class AccountsAPI extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = 'http://localhost:10222/api/';
  }

  private accountLoader = new DataLoader(async (ids) => {
    const response = await this.get('accounts', { ids: ids.join(',') });
    const rows = response.data;
    return ids.map(id => rows.find((row: any) => row.id === id));
  });

  async getAccountById(id: string) {
    return this.get(`accounts/${id}`);
  }

  async getAccounts(params: any = null) {
    const response = await this.get('accounts', params);
    return response.data;
  }

  async getAccountByIdFast(id: string) {
    return this.accountLoader.load(id);
  }
}
