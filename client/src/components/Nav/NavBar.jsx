import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import LogoPokemon from "../../assets/Logo Pokemon.png";
import "./NavbarStyles.css";
// import { NavLinks, OneLink } from "./MenuNavBarStyles";

export function NavBar() {
  return (
    <div class="nav-container">
      <nav>
        <div class="all-li">
          <Link to="/pokemon" style={{ textDecoration: "inherit" }}>
            <li class="link-route">Home</li>
          </Link>
          <Link to="/create" style={{ textDecoration: "inherit" }}>
            <li class="link-route">Crear</li>
          </Link>
          <Link to={"/about"} style={{ textDecoration: "inherit" }}>
            <li class="link-route">Sobre mi</li>
          </Link>
        </div>
        <div class="branding">
          <img class="logo-pokemon" src={LogoPokemon} alt="Pokemon App Logo" />
        </div>
        <div class="search-container">
          <SearchBar />
        </div>
      </nav>
    </div>
  );
}
