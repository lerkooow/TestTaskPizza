import { Header } from "./components/Header";
import { PizzaList } from "./components/PizzaList";

import s from "./App.module.scss";

function App() {
  return (
    <div className={s.app}>
      <Header />
      <PizzaList />
    </div>
  );
}

export default App;
