import Footer from "./components/Footer";
import Header from "./components/header";
import Main from "./components/Main";
import TodoList from "./components/TodoList";
import { useState } from "./lib/react/hook/useState";

function App() {
  return (
    <div id="app">
      <TodoList />
    </div>
  );
}

export default App;
