import React from "react";
import "./Todo.css";

// TODO: fix webpack image loading, dynamic uri.
require("./icon.png");

interface ITodoItem {
  id: number;
  text: string;
  done: boolean;
}

export default function TodoFunctions() {
  const [newTodo, setNewTodo] = React.useState<ITodoItem>({
    id: JSON.parse(localStorage.getItem("todos"))?.slice(-1)[0]?.id ?? 0,
    text: "",
    done: false,
  });

  const [filteredItem, setFilterItem] = React.useState("");
  const [todoItems, setTodoItems] = React.useState<Array<ITodoItem>>(
    JSON.parse(localStorage.getItem("todos")) ?? []
  );
  const [filteredItems, setFilteredItems] = React.useState<Array<ITodoItem>>(
    []
  );

  const addTodoInput = React.useRef(null);

  React.useEffect(() => {
    if (todoItems.length > filteredItems.length) {
      addTodoInput.current.focus();
    }
    localStorage.setItem("todos", JSON.stringify(todoItems));
    setFilteredItems(todoItems);
  }, [todoItems]);

  React.useEffect(() => {
    const newFilteredItems = todoItems.filter((todo) =>
      todo.text.toLowerCase().includes(filteredItem.toLowerCase())
    );
    setFilteredItems(newFilteredItems);
  }, [filteredItem]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newTodo.text != "") {
      setTodoItems([...todoItems, { ...newTodo, id: newTodo.id + 1 }]);
      setNewTodo({ id: newTodo.id + 1, text: "", done: false });
    }
  }

  function handleToggle(todo: ITodoItem) {
    setTodoItems(
      todoItems.map((el) => (el.id == todo.id ? { ...el, done: !el.done } : el))
    );
  }

  function handleDelete(todo: ITodoItem) {
    setTodoItems(todoItems.filter((el) => el.id != todo.id));
  }

  function handleEdit(e: React.ChangeEvent<HTMLInputElement>, todo: ITodoItem) {
    setTodoItems(
      todoItems.map((el) =>
        el.id == todo.id ? { ...el, text: e.target.value } : el
      )
    );
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="todo-form">
        <img width="50" height="50" src="src/icon.png" />
        <div>
          <input
            className="text-input"
            type="text"
            placeholder="Search..."
            value={filteredItem}
            onChange={(e) => setFilterItem(e.target.value)}
          />
          <input
            className="text-input"
            type="text"
            value={newTodo.text}
            ref={addTodoInput}
            placeholder="Do..."
            onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
          />
          <button className="add-btn" type="submit">
            Add
          </button>
        </div>
      </form>
      <ul className="todo-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => handleToggle(todo)}
              onDelete={() => handleDelete(todo)}
              onEdit={(e) => handleEdit(e, todo)}
            />
          ))
        ) : (
          <p style={{ marginLeft: "0.5rem" }}>No todos found.</p>
        )}
      </ul>
    </>
  );
}

interface ITodoProps {
  todo: ITodoItem;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TodoItem({ todo, onToggle, onDelete, onEdit }: ITodoProps) {
  const [enabled, setEnabled] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (enabled) {
      inputRef.current.focus();
    }
  }, [enabled]);

  return (
    <li>
      <div
        className={`todo-text ${
          todo.done ? "todo-finished" : "todo-unfinished"
        }`}
      >
        {enabled ? (
          <input
            ref={inputRef}
            value={todo.text}
            onChange={onEdit}
            onBlur={() => setEnabled(false)}
          />
        ) : (
          todo.text
        )}
      </div>

      <input
        defaultChecked={todo.done}
        type="checkbox"
        onClick={onToggle}
        title={todo.done ? "Undo" : "Do"}
      />
      <button
        className="edit-btn"
        title="Edit"
        onClick={() => setEnabled(true)}
      >
        ✏️
      </button>
      <button className="delete-btn" onClick={onDelete} title="Delete">
        &times;
      </button>
    </li>
  );
}
