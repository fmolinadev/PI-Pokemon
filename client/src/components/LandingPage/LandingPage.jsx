import React from "react";
import { Link } from "react-router-dom";
import "./LandingStyles.css";
import imgLanding from "../../assets/Logo Pokemon.png";

export function LandingPage() {
  return (
    <div class="landing-container">
      <section class="content">
        <Link to="/pokemon/index">
          <img class="img" src={imgLanding} alt="landing img" />
        </Link>
        <h1 class="title">¿Quieres conocer más sobre tu Pokémon favorito?</h1>
        <Link to="/pokemon/index">
          <button class="btn">¡Hazlo ahora!</button>
        </Link>
      </section>
    </div>
  );
}
