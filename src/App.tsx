import "./App.css";
import MainLeft from "./components/MainLeft/MainLeft";
import MainRight from "./components/MainRight/MainRight";

function App() {
  return (
    <div className="App">
      <div className="AppMain">
        <MainLeft />
        <MainRight />
      </div>
    </div>
  );
}

export default App;
