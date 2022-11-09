import React, { useReducer } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import { PageNotFound, AboutPage, SearchPage, ModalPage } from "./page";
import { searchContext } from "component/context/search";
import { initialStateSearch, reducerSearch } from "./component/reducer/search";
import { modalContext } from "component/context/modal";
import { initialStateModal, reducerModal } from "component/reducer/modal";

function App(): JSX.Element {
  const [stateSearch, dispatchSearch] = useReducer(
    reducerSearch,
    initialStateSearch
  );
  const [stateModal, dispatchModal] = useReducer(
    reducerModal,
    initialStateModal
  );

  return (
    <div className="App">
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/search">Search Coctails</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route
          path="/search"
          element={
            <searchContext.Provider value={{ stateSearch, dispatchSearch }}>
              <modalContext.Provider value={{ stateModal, dispatchModal }}>
                <SearchPage />
              </modalContext.Provider>
            </searchContext.Provider>
          }
        />
        <Route
          path="/modal"
          element={
            <searchContext.Provider value={{ stateSearch, dispatchSearch }}>
              <modalContext.Provider value={{ stateModal, dispatchModal }}>
                <ModalPage />
              </modalContext.Provider>
            </searchContext.Provider>
          }
        />
        <Route path="/*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default App;
