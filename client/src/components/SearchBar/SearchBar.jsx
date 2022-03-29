import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getPokemonName } from "../../actions/pokemon.actions";
import "./SearchStyles.css";

export function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  //Handle del input
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  //Handle del serach
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || name === "" || !name.trim().length) {
      setName("");
      return;
    }
    dispatch(getPokemonName(name.toLowerCase()));
  }

  return (
    <div class="search-container">
      <input
        class="input-search"
        onChange={(e) => handleInputChange(e)}
        type="text"
        placeholder="¿Cómo se llama el Pokémon?"
      />
      <button class="btn-search" onClick={(e) => handleSubmit(e)} type="submit">
        Buscar
      </button>
    </div>
  );
}
