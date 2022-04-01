import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../Loading/Loading";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { NavBar } from "../Nav/NavBar";
import { Footer } from "../Footer/Footer";

import { getPokemonId, resetDetail } from "../../actions/pokemon.actions";
import "./DetailsStyles.css";

export function Details() {
  const dispatch = useDispatch();
  const params = useParams(); //Para obtener el ID por Params
  const onePokemon = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getPokemonId(params.id));
    dispatch(resetDetail());
  }, [dispatch, params.id]);

  if (!onePokemon.name) {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <div>
          <Loading />
        </div>
      </div>
    );
  } else if (onePokemon.length !== 0) {
    console.log(onePokemon);
    return (
      <div class="background">
        <NavBar />
        <div>
          <div class="cardsDetails">
            <div>
              <h3 class="pokeName">
                {`#${onePokemon.id}:`} {onePokemon.name}
              </h3>
              <img
                src={onePokemon.image}
                alt={onePokemon.name}
                class="pokeImage"
              />
            </div>
            <div class="types">
              {onePokemon.types
                ? onePokemon.types.map((e) => "  " + e).join(",")
                : onePokemon.types}
            </div>
            <div class="description">
              <div>
                <h4>{`Vida: ${onePokemon.life} hp`}</h4>
              </div>
              <div>
                <h4>{`Ataque: ${onePokemon.attack} Pw`}</h4>
              </div>
              <div>
                <h4>{`Defensa: ${onePokemon.defense} Pw`}</h4>
              </div>
              <div>
                <h4>{`Velocidad: ${onePokemon.speed} km/h`}</h4>
              </div>
              <div>
                <h4>{`Altura: ${onePokemon.height} cm`}</h4>
              </div>
              <div>
                <h4>{`Peso: ${onePokemon.weight} kg`}</h4>
              </div>
            </div>
          </div>
          <div>
            <button class="button-home">
              <Link to="/pokemon/index" class="linked">
                Volver al inicio
              </Link>
            </button>
            <button class="button-home">
              <Link to="/create" class="linked">
                Crear un Pokémon
              </Link>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else if (!onePokemon.length) {
    return (
      <div>
        <NavBar />
        <div>
          <ErrorPage />
        </div>
        <Footer />
      </div>
    );
  }
}
