import React from "react";
import "./PokemonStyles.css";

export function Pokemon({ image, name, types, attack }) {
  return (
    <div class="card-pokemon-container" key={name}>
      <div>
        <img
          class="poke-img"
          src={image || "https://imgur.com/fOOL1IV"}
          alt="Imagen del Pokemon."
        />
      </div>
      <h3 class="poke-name">{name}</h3>
      <h3>{attack}</h3>
      <div>
        <h4 class="poke-types">
          {types ? types.map((e) => "  " + e).join(",") : types}
        </h4>
      </div>
    </div>
  );
}
