import React from "react";
import "./FooterStyles.css";

export function Footer() {
  return (
    <footer class="footer-container">
      <a
        href="https://franciscomolina.com.ar"
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "inherit" }}
      >
        <p>© Francisco Molina | PI Pokemon</p>
      </a>
    </footer>
  );
}
