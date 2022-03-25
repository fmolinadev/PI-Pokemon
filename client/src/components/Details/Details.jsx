import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../Loading/Loading";
import { NavBar } from "../Nav/NavBar";
import { Footer } from "../Footer/Footer";

import { getPokemonId, resetDetail } from "../../actions/pokemon.actions";
import "./DetailsStyles.css";

export function Details() {
  const dispatch = useDispatch();
  const params = useParams(); //Para obtener el ID por Params
  const onePokemon = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(resetDetail());
    dispatch(getPokemonId(params.id));
  }, [dispatch, params.id]);

  if (onePokemon.length !== 0) {
    return (
      <div className="background">
        <NavBar />
        <div>
          <div className="cardsDetails">
            <div>
              <h3 className="pokeName">{onePokemon.name}</h3>
              <img
                src={onePokemon.image}
                alt={onePokemon.name}
                className="pokeImage"
              />
            </div>
            <div className="types">
              {onePokemon.types &&
                onePokemon.types.map((e) => (
                  <p key={onePokemon.id}>{e.name}</p>
                ))}
            </div>
            <div className="description">
              <div>
                <h4>{`Vida: ${onePokemon.life}`}</h4>
              </div>
              <div>
                <h4>{`Ataque: ${onePokemon.attack}`}</h4>
              </div>
              <div>
                <h4>{`Defensa: ${onePokemon.defense}`}</h4>
              </div>
              <div>
                <h4>{`Velocidad: ${onePokemon.speed}`}</h4>
              </div>
              <div>
                <h4>{`Altura: ${onePokemon.height}`}</h4>
              </div>
              <div>
                <h4>{`Peso: ${onePokemon.weight}`}</h4>
              </div>
            </div>
          </div>
          <div>
            <button className="button-home">
              <Link to="/pokemon">Volver al inicio</Link>
            </button>
            <button className="button-home">
              <Link to="/create">Crear un Pokémon</Link>
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
          <Loading />
        </div>
        <Footer />
      </div>
    );
  }
}
