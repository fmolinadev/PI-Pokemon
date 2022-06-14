import { NavBar } from "../Nav/NavBar";
import { AllPokemon } from "../AllPokemon/AllPokemon";
import { Footer } from "../Footer/Footer";
import { Aside as Filter } from "../Aside/Aside";

export function Home() {
  return (
    <div>
      <NavBar />
      <Filter />
      <AllPokemon />
      <Footer />
    </div>
  );
}

window.scrollTo(0, 0);
