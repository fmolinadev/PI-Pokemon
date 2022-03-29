import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../actions/pokemon.actions";
import imgError from "../../assets/error_rocket.gif";
import "./ErrorAlerStyles.css";

export function ErrorAlert({ msg = "Error. Return to home.", code }) {
  const dispatch = useDispatch();

  function handleGoHome() {
    dispatch(setLoading(true));
  }

  return (
    <div class="error_container">
      <img class="gifRocket" src={imgError} alt="img error" />
      <span>{code}</span>
      <p class="error">Error</p>
      <span class="spanError">{msg}</span>
      <div onClick={handleGoHome()}>
        <Link to="/pokemon/index">
          <button class="btn-goHome">Ir a la pagina principal.</button>
        </Link>
      </div>
    </div>
  );
}
