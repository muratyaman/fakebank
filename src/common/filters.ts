import { IObjectWithId } from './types';

export type CustomFilterType = (row: any) => boolean;
const defaultCustomFilter: CustomFilterType = (row: any) => !!row || true;

export function filterRowsByIdsAndPaginate(
  rows: IObjectWithId[],
  params: any,
  customFilter: CustomFilterType = defaultCustomFilter,
) {
  const { ids = '', offset = 0, limit = 0 } = params;
  let result: IObjectWithId[] = rows;
  if (ids && ids !== '') {
    const idArr = ids.split(',');
    result = result.filter((r: IObjectWithId) => idArr.includes(r.id));
  }
  if (customFilter && customFilter !== defaultCustomFilter) {
    result = result.filter(customFilter);
  }
  if (limit) {
    result = result.filter((row: any, idx: number) => offset <= idx && idx < limit);
  }
  return result;
}
