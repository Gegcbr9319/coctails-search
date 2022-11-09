import axios from "axios";
import { searchContext } from "component/context/search";
import { ActionPointsSearch } from "component/reducer/search";
import { IResponceData } from "interface";
import React, { FormEvent, useContext, useState } from "react";
import "./SearchApi.css";

export function SearchApi() {
  const [valueLocal, setValueLocal] = useState("");
  const [isArrayEmpty, setIsArrayEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatchSearch } = useContext(searchContext);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueLocal(e.target.value);
    setIsArrayEmpty(false);
  };

  const searchHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const dataArray: IResponceData[] =
        (
          await axios.get(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valueLocal}`
          )
        ).data.drinks || [];
      if (dataArray.length === 0) {
        setIsArrayEmpty(true);
      }
      dispatchSearch({ type: ActionPointsSearch.ADD, payload: dataArray });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-api">
      <h3> Search Coctails</h3>
      <form className="form-api" onSubmit={searchHandler}>
        <input
          type="search"
          className="search-api-input"
          value={valueLocal}
          onChange={inputHandler}
        ></input>
        <input
          type="submit"
          className="submit-api-input"
          value="Search"
        ></input>
      </form>
      {isArrayEmpty && (
        <p className="empty-message"> Nothing was found for your query</p>
      )}
      {isLoading && <p className="loading-message"> Loading Data</p>}
    </div>
  );
}
