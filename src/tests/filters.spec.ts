import { IObjectWithId } from '../src/common/types';
import * as filters from '../src/common/filters';

describe("filters", () => {
  let rows: IObjectWithId[];
  beforeAll(() => {
    rows = [
      { id: '1', a: 'a1', b: 'b1' },
      { id: '2', a: 'a2', b: 'b2' },
      { id: '3', a: 'a3', b: 'b2' },
      { id: '4', a: 'a4', b: 'b3' },
    ];
  })

  it("filter rows by IDs", () => {
    const result = filters.filterRowsByIdsAndPaginate(rows, { ids: '1,2' });
    expect(result).toEqual([ rows[0], rows[1] ]); // first 2 rows
  });

  it("filter rows by IDs and custom filter", () => {
    const result = filters.filterRowsByIdsAndPaginate(rows, { ids: '1,2' }, (r) => r.b === 'b2');
    expect(result).toEqual([ rows[1] ]); // second row
  });

});
