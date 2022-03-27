//Importo los tipos de action:
import {
  GET_ALL,
  GET_BY_NAME,
  GET_DETAIL,
  POST_POKEMON,
  GET_TYPES,
  FILTER_BY_TYPES,
  FILTER_BY_ORIGEN,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  RESET,
  RESET_DETAIL,
  SET_LOADING,
} from "../actions/pokemon.actions";

const initialState = {
  pokemons: [],
  types: [],
  filter: [],
  detail: {},
  backUp: [],
  errorLoader: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        pokemons: action.payload,
        backUp: action.payload,
        filter: action.payload,
      }; //retorno la copia del estado y paso el action.

    case GET_BY_NAME:
      return { ...state, backUp: action.payload };

    case GET_DETAIL:
      return { ...state, detail: action.payload };

    case POST_POKEMON:
      return { ...state, pokemons: state.pokemons.concat(action.payload) };

    case GET_TYPES:
      return { ...state, types: action.payload };

    case FILTER_BY_TYPES:
      const pokemons = state.filter;
      const typesFiltered =
        action.payload === "allTypes"
          ? pokemons
          : pokemons.filter((e) => {
              if (typeof e.types[0] !== "string") {
                e.types = e.types.map((t) => t.name);
              }

              return e.types.includes(action.payload);
            });
      return {
        ...state,
        backUp: typesFiltered,
      };

    case FILTER_BY_ORIGEN:
      const filterOrigin = state.backUp;
      const filterByOrigin =
        action.payload === "pokemonsCreated"
          ? filterOrigin.filter((e) => e.pokemonsCreated)
          : filterOrigin.filter((e) => !e.pokemonsCreated);
      return {
        ...state,
        pokemons:
          action.payload === "allOrigin" ? state.backUp : filterByOrigin,
      };

    case ORDER_BY_NAME:
      let pokemonSort =
        action.payload === "aToZ"
          ? state.backUp.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.backUp.sort(function (a, b) {
              if (a.name > b.name) return -1;

              if (b.name > a.name) return 1;

              return 0;
            });
      return {
        ...state,
        backUp: pokemonSort,
      };

    case ORDER_BY_ATTACK:
      let pokemonOrderByAttack =
        action.payload === "minToMax"
          ? state.backUp.sort(function (a, b) {
              if (a.attack > b.attack) return 1;
              if (b.attack > a.attack) return -1;
              return 0;
            })
          : state.backUp.sort(function (a, b) {
              if (a.attack > b.attack) return -1;
              if (b.attack > a.attack) return 1;
              return 0;
            });
      return {
        ...state,
        backUp: pokemonOrderByAttack,
      };

    case RESET:
      return {
        ...state,
        pokemon: [],
      };

    case RESET_DETAIL:
      return {
        ...state,
        detail: {},
      };

    case SET_LOADING:
      return {
        ...state,
        pokemons: action.payload ? [] : state.pokemons,
      };

    default:
      return state;
  }
}

export default rootReducer;
