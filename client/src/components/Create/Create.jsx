import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../Nav/NavBar";
import { Footer } from "../Footer/Footer";
import {
  postPokemon,
  getTypes,
  getAllPokemon,
} from "../../actions/pokemon.actions";
import { useDispatch, useSelector } from "react-redux";
import "./CreateStyles.css";

//Validacion del formulario:
import { validate } from "./validateForm";

export function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateTypes = useSelector((state) => state.types);
  const totalPokemon = useSelector((state) => state.pokemons);

  const [errors, setErrorForm] = useState({});
  const [input, setInput] = useState({
    name: ``,
    life: ``,
    attack: ``,
    defense: ``,
    speed: ``,
    height: ``,
    weight: ``,
    typeA: ``,
    typeB: ``,
  });

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAllPokemon());
    // console.log(getTypes)
  }, [dispatch]);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrorForm(validate({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let findName = totalPokemon.filter(
        (e) => e.name.toLowerCase() === input.name.toLowerCase()
      );

      if (!findName)
        return alert("Ya existe un pokemon con este nombre. ¡Cambialo!");
      else {
        const newPokemon = {
          name: input.name,
          life: input.life,
          attack: input.attack,
          defense: input.defense,
          speed: input.speed,
          height: input.height,
          weight: input.weight,
          typeA: input.typeA,
          typeB: input.typeB,
        };
        console.log(newPokemon);
        dispatch(postPokemon(newPokemon));
      }

      setInput({
        name: ``,
        life: ``,
        attack: ``,
        defense: ``,
        speed: ``,
        height: ``,
        weight: ``,
        typeA: ``,
        typeB: ``,
      });
      return (
        alert(`El Pokémon fue creado con éxito.`),
        navigate(`/pokemon/index?=name${input.name}`)
      );
    } catch (error) {
      console.log(error);
      return alert(
        "Oh no! Algo falló al crear el Pokémon. ¡Intentalo de nuevo!"
      );
    }
  };

  return (
    <div class="create_container">
      <header>
        <NavBar />
      </header>
      <h1 class="title">¡Crea un nuevo Pokémon!</h1>
      <form class="form" onSubmit={handleSubmit}>
        <div class="info-form">
          <div>
            <label>Nombre</label>
            <input
              onChange={handleInputChange}
              value={input.name}
              name="name"
              type="text"
              placeholder="¿Cómo se llama el Pokémon?..."
              required
            />
            {errors.name && (
              <div class="errors">
                <div id="name">{errors.name}</div>
              </div>
            )}
          </div>
          <div>
            <label>Vida</label>
            <input
              onChange={handleInputChange}
              value={input.life}
              name="life"
              type="number"
              min="1"
              placeholder="Vida..."
            />
            {errors.life && (
              <div class="errors">
                <div>{errors.life}</div>
              </div>
            )}
          </div>
          <label>
            Ataque
            <input
              onChange={handleInputChange}
              value={input.attack}
              name="attack"
              type="number"
              min="1"
              placeholder="Poder de ataque..."
            />
            {errors.attack && (
              <div class="errors">
                <div>{errors.attack}</div>
              </div>
            )}
          </label>
          <div>
            <label>Defensa</label>
            <input
              onChange={handleInputChange}
              value={input.defense}
              name="defense"
              type="number"
              min="1"
              placeholder="Poder de defensa.."
            />
            {errors.defense && (
              <div class="errors">
                <div>{errors.defense}</div>
              </div>
            )}
          </div>
          <div>
            <label>Velocidad</label>
            <input
              onChange={handleInputChange}
              value={input.speed}
              name="speed"
              type="number"
              min="1"
              placeholder="Inserta su velocidad..."
            />
            {errors.speed && (
              <div class="errors">
                <div>{errors.speed}</div>
              </div>
            )}
          </div>
          <div>
            <label>Peso</label>
            <input
              onChange={handleInputChange}
              value={input.weight}
              name="weight"
              type="number"
              min="1"
              placeholder="Inserta el peso (en kg)"
            />
            {errors.weight && (
              <div class="errors">
                <div>{errors.weight}</div>
              </div>
            )}
          </div>
          <div>
            <label>Tamaño</label>
            <input
              onChange={handleInputChange}
              value={input.height}
              name="height"
              type="number"
              min="1"
              placeholder="Inserta el tamaño (cm)"
            />
            {errors.height && (
              <div class="errors">
                <div>{errors.height}</div>
              </div>
            )}
          </div>
          <div>
            <label>Imagen</label>
            <input
              onChange={handleInputChange}
              value={input.image}
              name="image"
              type="url"
              placeholder="Copia la url de la imagen..."
            />
            {errors.image && (
              <div class="errors">
                <div>{errors.image}</div>
              </div>
            )}
          </div>
          <div>
            <label>Tipos</label>
            <select
              value={input.typeA}
              name="typeA"
              onChange={handleInputChange}
              required
            >
              <option value="typeA">Primer tipo</option>
              {stateTypes.map((x) => (
                <option value={x.name} key={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
            <select
              value={input.typeB}
              name="typeB"
              onChange={handleInputChange}
            >
              <option value="StypeB">Segundo tipo</option>
              {stateTypes.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button class="btn-create" type="submit">
          Crear
        </button>
      </form>

      <div>
        <Footer />
      </div>
    </div>
  );
}
