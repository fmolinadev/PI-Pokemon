import React from "react";
import { Link } from "react-router-dom";
import "./LandingStyles.css";
import imgLanding from "../../assets/IMAGE_LANDING_PNG.png";

export function LandingPage() {
  return (
    <div class="landing-container">
      <section class="content">
        <h1 class="title">¿Quieres conocer más sobre tu Pokémon favorito?</h1>
        <Link to="/pokemon">
          <button class="btn">¡Hazlo ahora!</button>
        </Link>
      </section>
      <Link to="/pokemon">
        <img class="img" src={imgLanding} alt="dogs landing" />
      </Link>
    </div>
  );
}
