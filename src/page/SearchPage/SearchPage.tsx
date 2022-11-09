import { CardApi, SearchApi } from "component";
import { searchContext } from "component/context/search";
import { IResponceData } from "interface";
import React, { useContext, useEffect, useState } from "react";
import "./SearchPage.css";

export function SearchPage() {
  const { stateSearch } = useContext(searchContext);
  const [cardState, setCardState] = useState<IResponceData[]>(stateSearch.data);
  const [filterAlco, setFilterAlco] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterGlass, setFilterGlass] = useState<string>("");
  const [pagState, setPagState] = useState(25);
  const [curentPage, setcurrentPage] = useState(0);

  function filter() {
    let filterData = [...stateSearch.data]
      .filter((data) => {
        if (!filterAlco) {
          return true;
        }
        return data.strAlcoholic === filterAlco;
      })
      .filter((data) => {
        if (!filterCategory) {
          return true;
        }
        return data.strCategory === filterCategory;
      })
      .filter((data) => {
        if (!filterGlass) {
          return true;
        }
        return data.strGlass === filterGlass;
      });
    filterData = pagination(filterData);
    setCardState(filterData);
  }

  function pagination(filterData: IResponceData[]): IResponceData[] {
    if (filterData.length <= pagState) {
      return filterData;
    }
    const pages: IResponceData[][] = [];

    for (let i = 0; i < filterData.length; i = i + pagState) {
      const page: IResponceData[] = filterData.slice(i, i + pagState);
      pages.push(page);
    }
    console.log(pages);
    return pages[curentPage];
  }

  useEffect(() => {
    setCardState(stateSearch.data);
    filter();
  }, [
    filterAlco,
    filterCategory,
    filterGlass,
    stateSearch.data,
    pagState,
    curentPage,
  ]);

  return (
    <>
      <SearchApi />
      <div className="search-filters">
        <h3> Choise your filters:</h3>
        <div className="filters">
          <label>
            <h4>Alchohol</h4>
            <select
              onChange={(e) => {
                setFilterAlco(e.target.value);
              }}
            >
              <option value="">Any</option>
              <option value="Alcoholic">Alcoholic</option>
              <option value="Non alcoholic">Non alcoholic</option>
            </select>
          </label>
          <label>
            <h4>Category</h4>
            <select
              onChange={(e) => {
                setFilterCategory(e.target.value);
              }}
            >
              <option value="">Any</option>
              <option value="Ordinary Drink">Ordinary Drink</option>
              <option value="Punch / Party Drink">Punch / Party Drink</option>
              <option value="Cocktail">Cocktail</option>
              <option value="Coffee / Tea">Coffee / Tea</option>
              <option value="Shot">Shot</option>
            </select>
          </label>
          <label>
            <h4>Glass</h4>
            <select
              onChange={(e) => {
                setFilterGlass(e.target.value);
              }}
            >
              <option value="">Any</option>
              <option value="Cocktail glass">Cocktail </option>
              <option value="Beer mug">Beer </option>
              <option value="Coffee mug">Coffee </option>
              <option value="Highball glass">Highball </option>
              <option value="Hurricane glass">Hurricane </option>
              <option value="Collins glass">Collins </option>
              <option value="Martini Glass">Martini </option>
              <option value="Shot glass">Shot </option>
              <option value="Wine Glass">Wine </option>
              <option value="Whiskey sour glass">Whiskey sour</option>
            </select>
          </label>
          <label>
            <h4> Card on Page</h4>
            <select
              onChange={(e) => {
                setPagState(+e.target.value);
              }}
            >
              <option value={25}>25</option>
              <option value={10}>10</option>
              <option value={5}>5</option>
            </select>
          </label>
        </div>
      </div>
      <div className="search-cards">
        {cardState?.map((data: IResponceData) => {
          return <CardApi {...data} key={data.idDrink} />;
        })}
      </div>
      {cardState.length !== 0 && (
        <div className="button-search">
          <button
            onClick={() => setcurrentPage((prevState) => prevState - 1)}
            disabled={curentPage === 0 || stateSearch.data.length === 0}
          >
            Prev Page
          </button>
          {curentPage + 1}
          <button
            onClick={() => setcurrentPage((prevState) => prevState + 1)}
            disabled={
              curentPage ===
                Math.ceil(stateSearch.data.length / pagState) - 1 ||
              stateSearch.data.length === 0
            }
          >
            Next Page
          </button>
        </div>
      )}
    </>
  );
}
