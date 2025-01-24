import { useState } from "../lib/react/hook/useState";

function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  const changeInput = (event) => {
    const value = event.target.value.trim();
    setInputValue(value);
  };

  const pushTodo = () => {
    const newTodo = { id: Date.now(), text: inputValue };
    setTodoList((prev) => [...prev, newTodo]);
    setInputValue("");
  };

  const deleteTodo = (todoId) => {
    setTodoList((prevTodo) => prevTodo.filter((todo) => todo.id !== todoId));
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
          todoList.map((todo) => (
            <div style={{ display: "flex" }}>
              <li key={todo.id}>{todo.text}</li>
              <button type="button" onClick={() => deleteTodo(todo.id)}>
                삭제
              </button>
            </div>
          ))}
      </ul>
    </main>
  );
}

export default TodoList;
