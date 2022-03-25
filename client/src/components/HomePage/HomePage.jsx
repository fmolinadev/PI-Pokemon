import { NavBar } from "../Nav/NavBar";
import { AllPokemon } from "../AllPokemon/AllPokemon";
import { Footer } from "../Footer/Footer";

export function Home() {
  return (
    <div>
      <NavBar />
      <AllPokemon />
      <div>
        <Footer />
      </div>
    </div>
  );
}

window.scrollTo(0, 0);
