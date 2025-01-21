import { useState } from "../lib/react/hook/useState";

function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  const changeInput = (event) => {
    const value = event.target.value.trim();
    setInputValue(value);
  };

  const pushTodo = () => {
    setTodoList(inputValue);
  };

  return (
    <main>
      <h1>Todo List</h1>
      <div style={{ display: "flex" }}>
        <input type="text" value={inputValue} onChange={changeInput} />
        <button type="button" onClick={pushTodo}>
          추가
        </button>
      </div>
      <ul>
        {todoList &&
          todoList.map((todo, index) => <li key={index}>{todo.value}</li>)}
      </ul>
    </main>
  );
}

export default TodoList;
