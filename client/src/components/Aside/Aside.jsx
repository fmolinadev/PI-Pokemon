import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  filterByOrigin,
  filterByTypes,
  orderByName,
  orderByAttack,
  getAllPokemon,
  resetDetail,
} from "../../actions/pokemon.actions";
import "./AsideStyles.css";

export function Aside(setCounterPokemon) {
  const [, setOrder] = useState("");
  const [, setTypes] = useState("allPokemon");

  const dispatch = useDispatch();
  const totalTypes = useSelector((state) => state.types);
  //   const totalPokemon = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(resetDetail());
    dispatch(getTypes());
    dispatch(getAllPokemon());
  }, [dispatch]);

  //Funcion de reseteo a los filtros/orden:
  function handleReset(e) {
    e.preventDefault();
    dispatch(getTypes());
    dispatch(getAllPokemon());
  }

  //Filtrado por el origen
  function handleFilterOrigin(e) {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
    setTypes(e.target.value);
  }

  //Filtro por los Typos:
  function handleFilterByTypes(e) {
    e.preventDefault();
    dispatch(filterByTypes(e.target.value));
  }

  //Orden alfebetico:
  function handleFilterName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Order by ${e.target.value}`);
  }

  //Orden por fuerza:
  function handleOrderByAttack(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setOrder(`Order by ${e.target.value}`);
  }

  return (
    <div>
      <aside class="aside-container">
        <h3>Mostrar:</h3>
        <div>
          <label class="label">Ordenado por: </label>
          <select
            class="select"
            defaultValue="name"
            onChange={(e) => handleFilterName(e)}
          >
            <option class="options" value="name" disabled>
              Name
            </option>
            <option class="options" value="aToZ">
              A - Z
            </option>
            <option class="options" value="zToA">
              Z - A
            </option>
          </select>

          <select
            class="select"
            defaultValue="attack"
            onChange={(e) => handleOrderByAttack(e)}
          >
            <option class="options" value="attack" disabled>
              Attack
            </option>
            <option class="options" value="minToMax">
              - to +
            </option>
            <option class="options" value="maxToMin">
              + to -
            </option>
          </select>
        </div>

        <div>
          <label class="label">Filtrado por: </label>
          <select
            class="select"
            defaultValue="allOrigin"
            onChange={(e) => handleFilterOrigin(e)}
          >
            <option class="options" value="allOrigin">
              All Origin
            </option>
            <option class="options" value="pokemonApi">
              Poke Api
            </option>
            <option class="options" value="pokemonsCreated">
              Created
            </option>
          </select>

          <select
            class="select"
            defaultValue="Types"
            onChange={(e) => handleFilterByTypes(e)}
            id="type-select"
          >
            <option class="options" value="Types" disabled>
              Types
            </option>
            <option class="options" value="allTypes">
              All Types
            </option>
            {totalTypes &&
              totalTypes
                .sort(function (a, b) {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                })
                .map((t) => (
                  <option class="options" value={t.name} key={t.name}>
                    {t.name}
                  </option>
                ))}
          </select>
          <div>
            <span>AVA VAN LOS SELECTED</span>
          </div>
          <button class="btn-reload" onClick={(e) => handleReset(e)}>
            Reload
          </button>
        </div>
      </aside>
    </div>
  );
}
