import React, { useState } from "react";
import { Input } from "antd";
import Todo from "../TodoModel";
const { Search } = Input;

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const UserInput: React.FC<Props> = ({
  todo,
  setTodo,
  todos,
  setTodos,
  handleSearch,
  searchTerm,
  setSearchTerm
}) => {
  const [isAdding, setIsAdding] = useState<boolean>(true);

  function onAddTodo() {
    if (isAdding && todo) {
      // Handle User Input
      const userTitleStr = todo.split("#");
      const userTagsArr = userTitleStr.slice(1).map((tag) => `#${tag}`);

      // Set & Seperate User Input Value
      const userTitle = userTitleStr[0];
      const userTags = userTagsArr;

      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: Date.now(),
          title: userTitle,
          tags: userTags,
        },
      ]);
      setTodo("");
    }
  }

  function onSearch() {
    setIsAdding(!isAdding);
    setSearchTerm('');
  }

  return (
    <Search
      placeholder={isAdding ? "Create Todo" : "Search Todo"}
      allowClear
      enterButton={isAdding ? "Add" : "Search"}
      size="large"
      onKeyDown={(e) => e.key === "Control" && onSearch()}
      onSearch={onAddTodo}
      onChange={(e) => (isAdding ? setTodo(e.target.value) : handleSearch(e))}
      value={isAdding ? todo : searchTerm}
    />
  );
};

export default UserInput;
