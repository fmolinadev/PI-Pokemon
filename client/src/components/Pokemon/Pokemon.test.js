import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import store from "../../store/store";
import App from "../../App";
import Pokemon from "../Pokemon/Pokemon";

describe("PostPokemon", () => {
  it("El formulario debe tener un Input para el nombre del Pokemon", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Pokemon />
        </BrowserRouter>
      </Provider>
    );
    const element = container.querySelectorAll("input");
    expect(element.type).toBe("text");
  });
});
