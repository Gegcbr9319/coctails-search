import { modalContext } from "component/context/modal";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import "./ModalPage.css";

export function ModalPage() {
  const navigate = useNavigate();
  const { stateModal } = useContext(modalContext);

  const {
    strDrink,
    strDrinkThumb,
    strAlcoholic,
    strCategory,
    strGlass,
    strInstructions,
    strIngredient1,
    strMeasure1,
    strIngredient2,
    strMeasure2,
    strIngredient3,
    strMeasure3,
    strIngredient4,
    strMeasure4,
    strIngredient5,
    strMeasure5,
    strIngredient6,
    strMeasure6,
    strIngredient7,
    strMeasure7,
    strIngredient8,
    strMeasure8,
    strIngredient9,
    strMeasure9,
    strIngredient10,
    strMeasure10,
    strIngredient11,
    strMeasure11,
    strIngredient12,
    strMeasure12,
  } = stateModal;

  const buttonClickHandler = () => {
    navigate("/search");
  };

  const ingr = {
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
  };

  const ingredients = Object.entries(ingr)
    .filter(
      ([key, value]) =>
        (key.includes("strIngredient") || key.includes("strMeasure")) && value
    )
    .map(([, value], index, array) => {
      if (index >= Math.ceil(array.length / 2)) {
        return null;
      }
      const num = array[Math.ceil(index + array.length / 2)] || [, ""];
      return {
        ingredient: value,
        measure: num[1],
      };
    })
    .filter((item) => item);

  return (
    <div className="modal-page">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-h2"> {strDrink} </h2>
        </div>
        <img src={strDrinkThumb} className="modal-img"></img>
        <div className="modal-instruction">
          <h3 className="modal-h3">{strAlcoholic}</h3>
          <h4 className="modal-h4">{strCategory}</h4>
          <h4 className="modal-h4">{strGlass}</h4>
        </div>
        <h3> How to make it</h3>
        <p className="modal-p">{strInstructions}</p>
        <div className="modal-ingr">
          {ingredients?.map((item) => (
            <div key={Math.random()}>
              <h3>{item?.ingredient}:</h3>
              <p>{item?.measure}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        value="back"
        className="modal-button"
        onClick={buttonClickHandler}
      >
        Put to go back
      </button>
    </div>
  );
}
