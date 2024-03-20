import "./App.css";
import Header from "./components/header";
import Home from "./pages/home";

function App() {
  return (
    <div className="dark:text-white">
      <Header />
      <Home />
    </div>
  );
}

export default App;
