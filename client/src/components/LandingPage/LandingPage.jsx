import React from "react";
import { Link } from "react-router-dom";
import imgLanding from "../../assets/IMAGE_LANDING_PNG.png";

export function LandingPage() {
  return (
    <div>
      <section>
        <h1>"¿Quieres saber todo sobre tu Pokemon favorito?"</h1>
        <Link to="/pokemon">
          <button>¡Hazlo ahora!</button>
        </Link>
      </section>
      <Link to="/pokemon">
        <img src={imgLanding} alt="dogs landing" />
      </Link>
    </div>
  );
}
