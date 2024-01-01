import React, { useState } from "react";
import Todo from "../TodoModel";
import { Input, Modal, Table, Tag } from "antd";
import { FaEdit, FaTrash, FaBookmark, FaHashtag } from "react-icons/fa";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  searchTerm: string;
  searchResult: Todo[];
  setSearchResult: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Todos: React.FC<Props> = ({
  todos,
  setTodos,
  searchTerm,
  searchResult,
  setSearchResult,
}) => {
  const [isEditTodo, setIsEditingTodo] = useState<boolean>(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editTodoTitle, setEditTodoTitle] = useState<string>("");
  const [editTodoTags, setEditTodoTags] = useState<string>("");

  const columns: any = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <>
          {tags?.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (record: Todo, index: number) => (
        <div className="todos__edit">
          <FaTrash
            key={`trash-${index}`}
            onClick={() => onDeleteTodo(record)}
          />
          <FaEdit key={`edit-${index}`} onClick={() => onEditTodo(record)} />
        </div>
      ),
    },
  ];

  function onDeleteTodo(record: Todo) {
    const filteredTodo = todos.filter((todo) => todo.id !== record.id);
    setTodos(filteredTodo);
  }

  function onEditTodo(record: Todo) {
    setIsEditingTodo(true);
    setEditTodoId(record.id);
    setEditTodoTitle(record.title);
    setEditTodoTags(record.tags.join(""));
  }

  function handleEditTodo() {
    const tagsArr = editTodoTags
      .split("#")
      .filter(Boolean)
      .map((tag) => `#${tag}`);

    if (searchResult.length > 0) {
      setSearchResult(
        searchResult.map((todo) =>
          todo.id === editTodoId
            ? {
                ...todo,
                title: editTodoTitle,
                tags: tagsArr,
              }
            : todo
        )
      )
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === editTodoId
            ? {
                ...todo,
                title: editTodoTitle,
                tags: tagsArr,
              }
            : todo
        )
      );
    }


    closeModal();
  }

  function closeModal() {
    setIsEditingTodo(false);
    setEditTodoId(null);
    setEditTodoTitle("");
    setEditTodoTags("");
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={searchTerm ? searchResult : todos}
      ></Table>
      <Modal
        title="Edit Todo"
        open={isEditTodo}
        className="todo_editModal"
        onOk={handleEditTodo}
        onCancel={closeModal}
      >
        <Input
          value={editTodoTitle}
          placeholder="Enter new Title"
          onChange={(e) => setEditTodoTitle(e.target.value)}
          prefix={<FaBookmark />}
        />
        <br />
        <br />
        <Input
          value={editTodoTags}
          placeholder="Enter new tags"
          onChange={(e) => setEditTodoTags(e.target.value)}
          prefix={<FaHashtag />}
        />
      </Modal>
    </>
  );
};

export default Todos;
