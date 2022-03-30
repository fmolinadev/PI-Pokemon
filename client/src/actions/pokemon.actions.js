import axios from "axios";
//Variables para los tipos de actions:
export const GET_ALL = "GET_ALL";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_DETAIL = "GET_DETAIL";
export const POST_POKEMON = "POST_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const FILTER_BY_ORIGEN = "FILTER_BY_ORIGEN";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const RESET = "RESET";
export const RESET_DETAIL = "RESET_DETAIL";
export const SET_LOADING = "SET_LOADING";
//Rutas del Back:
export const URL_ALL_POKEMON = "http://localhost:3001/pokemon/index";
export const URL_POST_POKEMON = "http://localhost:3001/pokemon/create";
export const URL_TYPES = "http://localhost:3001/types";

//Fn para el reducer:
//Pokemon:
export function getAllPokemon() {
  return async function (dispatch) {
    try {
      let jsonPokemon = await axios.get(URL_ALL_POKEMON);
      return dispatch({
        type: GET_ALL,
        payload: jsonPokemon.data,
        //Recordar que el payload es la info que se usa para modificar los estados, y el type hace que se identifique a la action.
      });
    } catch (error) {
      console.log(error.message);
      return alert(
        "Oh no! Hubo un error al cargar la informacion. Intenta en unos minutos"
      );
    }
  };
}

export function getPokemonName(name) {
  return async function (dispatch) {
    try {
      if (name.search(/^[a-zA-Zñáéíóúü]*$/)) {
        return alert("El nombre a buscar solo debe contener letras.");
      }

      return dispatch({
        type: GET_BY_NAME,
        payload: name,
      });
    } catch (error) {
      return alert(`Ups! No existe un Pokémon con ese nombre.`);
    }
  };
}

export function getPokemonId(id) {
  return async function (dispatch) {
    try {
      let jsonPokemonID = await axios.get(
        `http://localhost:3001/pokemon/${id}`
      );
      // console.log(jsonPokemonID);
      return dispatch({
        type: GET_DETAIL,
        payload: jsonPokemonID.data,
      });
    } catch (error) {
      return alert(`No encontramos Pokemon con el ID ${id}.`);
    }
  };
}
export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      const pokemonCreated = await axios.post(URL_POST_POKEMON, payload);
      return dispatch({
        type: POST_POKEMON,
        payload: pokemonCreated.data,
      });
    } catch (error) {
      console.log(error.message);
      return alert(
        "Oh no! Hubo un error al crear el Pokemon. ¡Intenta de nuevo!"
      );
    }
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

export function resetDetail() {
  return {
    type: RESET_DETAIL,
  };
}

//Filtros y ordenamientos:

export function filterByOrigin(payload) {
  try {
    return {
      type: FILTER_BY_ORIGEN,
      payload: payload,
    };
  } catch (error) {
    console.log(error.message);
    return alert(
      "Oh no! Hubo un error al cargar Pokemones por origen. ¡Intenta crear uno!"
    );
  }
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
}

export function setLoading(value) {
  return {
    type: SET_LOADING,
    payload: value,
  };
}

//Types:

export function getTypes() {
  return async function (dispatch) {
    try {
      let jsonTypes = await axios.get(URL_TYPES);
      return dispatch({
        type: GET_TYPES,
        payload: jsonTypes.data,
      });
    } catch (error) {
      console.log(error);
      return alert(
        "Algo salio mal al cargar los Types. Intenta de nuevo más tarde"
      );
    }
  };
}

export function filterByTypes(payload) {
  try {
    return {
      type: FILTER_BY_TYPES,
      payload,
    };
  } catch (error) {
    console.log(error);
    return alert("Error: falló el filtro de este Type. ¡Intenta de nuevo!");
  }
}
