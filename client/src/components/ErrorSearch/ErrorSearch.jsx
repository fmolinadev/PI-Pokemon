import React from "react";
import ImagePokedex from "../../assets/pokedex-error.png";
import "./ErrorSearch.css";
const ErrorSearch = () => {
  return (
    <div class="searchError">
      <img src={ImagePokedex} alt="pokedex_error" class="searchError-pokedex" />
      <p class="searchError-msg-error">
        No se encontraron Pokémones <br /> con estas caracteristicas.
      </p>
    </div>
  );
};

export default ErrorSearch;
