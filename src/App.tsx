import React, { useState } from "react";
import Todo from "./TodoModel";
import UserInput from "./components/UserInput";
import Todos from "./components/Todos";

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Todo[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    const searchedTodo = todos.filter((todo) => {
      const titleMatch = todo.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const tagsMatch = todo.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return titleMatch || tagsMatch;
    });

    setSearchResult(searchedTodo);
  };

  return (
    <div className="App">
      <UserInput
        todo={todo}
        setTodo={setTodo}
        todos={todos}
        setTodos={setTodos}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Todos
        todos={todos}
        setTodos={setTodos}
        searchTerm={searchTerm}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
    </div>
  );
}

export default App;
