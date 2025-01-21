import Footer from "./components/Footer";
import Header from "./components/header";
import Main from "./components/Main";
import { useState } from "./lib/react/hook/useState";

function App() {
  const [count, setCount] = useState(0);

  const handleCount = (event) => {
    setCount(count + 1);
  };

  return (
    <div id="app">
      <Header test="123" />
      <Main />
      <Footer />
      <div>{count}</div>
      <button onClick={handleCount}>증가</button>
    </div>
  );
}

export default App;
