import { RESTDataSource } from 'apollo-datasource-rest';
import DataLoader from 'dataloader';

export class PaymentsAPI extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = 'http://localhost:10333/api/';
  }

  private transferLoader = new DataLoader(async (ids) => {
    const response = await this.get('transfers', { ids: ids.join(',') });
    const rows = response.data;
    return ids.map(id => rows.find((row: any) => row.id === id));
  });

  async getTransferById(id: string) {
    return this.get(`transfers/${id}`);
  }

  async newTransfer(data: any) {
    return this.post('transfers', data);
  }

  async getTransfers(params: any) {
    const response = await this.get('transfers', params);
    return response.data;
  }

  async getTransferByIdFast(id: string) {
    return this.transferLoader.load(id);
  }
}
