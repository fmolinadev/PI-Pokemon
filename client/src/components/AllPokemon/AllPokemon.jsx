import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pokemon } from "../Pokemon/Pokemon";
// import { Aside as Filter } from "../Aside/Aside";
import {
  getAllPokemon,
  getTypes,
  resetDetail,
} from "../../actions/pokemon.actions";
import { Loading } from "../Loading/Loading";
// import { ErrorPage } from "../ErrorPage/ErrorPage";
import "./AllPokemonStyles.css";
import { Link } from "react-router-dom";
import ErrorSearch from "../ErrorSearch/ErrorSearch";

export function AllPokemon() {
  let dispatch = useDispatch();
  let allPokemon = useSelector((state) => state.backUp);
  let errorRender = useSelector((state) => state.errorRender);

  const [counterPokemon, setCounterPokemon] = useState(1);
  const [pokemonPerPage /* setPokemonPerPage */] = useState(12);

  const lastPokemon = counterPokemon * pokemonPerPage; // 1 * 12 = 12
  const firstPoke = lastPokemon - pokemonPerPage; // 12 - 12 = 0
  //Indicador:
  const indexPages = Math.ceil(allPokemon.length / pokemonPerPage);

  const pokemonData = useSelector((state) =>
    state.backUp ? state.backUp.slice(firstPoke, lastPokemon) : false
  );

  const back = () => {
    if (counterPokemon !== 1) {
      setCounterPokemon(counterPokemon - 1);
    }
  };

  const next = () => {
    if (counterPokemon !== indexPages) {
      setCounterPokemon(counterPokemon + 1);
    }
  };

  const begin = () => {
    setCounterPokemon(1);
  };

  const end = () => {
    setCounterPokemon(indexPages);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (counterPokemon > indexPages) {
    back();
  }

  useEffect(() => {
    dispatch(resetDetail());
    dispatch(getAllPokemon());
    dispatch(getTypes());
  }, [dispatch]);

  if (errorRender.length === 0) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <div>
        <div class="main-pokemons-card">
          {pokemonData.length === 0 ? (
            <ErrorSearch />
          ) : (
            pokemonData.map((p, index) => (
              <Link
                key={index}
                to={"/pokemon/" + p.id}
                tyle={{ textDecoration: "inherit" }}
              >
                <Pokemon
                  key={index}
                  name={p.name}
                  types={p.types}
                  image={p.image}
                  health={p.life}
                  // attack={p.attack}
                  defense={p.defense}
                  speed={p.speed}
                  id={p.id}
                />
              </Link>
            ))
          )}
        </div>
        <div class="pagination">
          <button onClick={begin} class="pagination-button">
            {"<"}
          </button>
          <button onClick={back} class="pagination-button a">
            Anterior
          </button>
          <p>
            {counterPokemon} de {indexPages}
          </p>
          <button onClick={next} class="pagination-button p">
            Proximo
          </button>
          <button onClick={end} class="pagination-button">
            {">"}
          </button>
        </div>
      </div>
    );
  }
}
