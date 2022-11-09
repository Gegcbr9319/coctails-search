import { ActionTypeSearch } from "component/reducer/search";
import { IResponceData } from "interface";
import { createContext } from "react";

interface ISearchDataValue {
  stateSearch: { data: IResponceData[] };
  dispatchSearch: React.Dispatch<ActionTypeSearch>;
}

const defaultSearchValue: ISearchDataValue = {
  stateSearch: { data: [] },
  dispatchSearch: () => null,
};
export const searchContext = createContext(defaultSearchValue);
