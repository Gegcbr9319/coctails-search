import { IResponceData } from "interface";

export enum ActionPointsSearch {
  ADD = "ADD",
}

export const initialStateSearch: { data: IResponceData[] } = {
  data: [],
};

export type ActionTypeSearch = {
  type: ActionPointsSearch.ADD;
  payload: IResponceData[];
};

export function reducerSearch(
  stateSearch: { data: IResponceData[] },
  action: ActionTypeSearch
) {
  switch (action.type) {
    case ActionPointsSearch.ADD:
      return { data: action.payload };
    default:
      return stateSearch;
  }
}
