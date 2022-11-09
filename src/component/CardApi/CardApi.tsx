import { modalContext } from "component/context/modal";
import { searchContext } from "component/context/search";
import { ActionPointsModal } from "component/reducer/modal";
import { IResponceData } from "interface";
import React, { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CardApi.css";

interface ICardApiProps extends IResponceData {
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic: string;
  strCategory: string;
  strGlass: string;
  idDrink: string;
}

export const CardApi: FC<ICardApiProps> = ({
  strDrink,
  strDrinkThumb,
  strAlcoholic,
  strCategory,
  strGlass,
  idDrink,
}) => {
  const navigate = useNavigate();
  const { dispatchModal } = useContext(modalContext);
  const { stateSearch } = useContext(searchContext);

  const buttonClickHandler = () => {
    stateSearch.data.forEach((value, index) => {
      if (value.idDrink === idDrink) {
        dispatchModal({
          type: ActionPointsModal.ADD,
          payload: stateSearch.data[index],
        });
      }
    });
    navigate("/modal");
  };

  return (
    <>
      <button
        className="card-api"
        onClick={buttonClickHandler}
        data-testid="card-api"
      >
        <h2 className="card-api-h2">{strDrink}</h2>
        <img src={strDrinkThumb} className="card-api-img"></img>
        <h3 className="card-api-h3">{strAlcoholic}</h3>
        <h4 className="card-api-h4">{strCategory}</h4>
        <h4 className="card-api-h4">{strGlass}</h4>
      </button>
    </>
  );
};
