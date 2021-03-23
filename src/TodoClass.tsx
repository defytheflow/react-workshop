import React from "react";

/*
  TODO:
   - Focus add field on Mount.
   - Focus add field after each new item.
   - Make it look pretty. Add styles. Button colors. spacing
   - Rewrite using function component and react hooks (useState, useEffect, useRef).
 */

interface TodoState {
  newTodo: ITodo;
  todoItems: Array<ITodo>;
  searchItem: string;
  filteredItems: Array<ITodo>;
}

interface ITodo {
  id: number;
  text: string;
  done: boolean;
}

export default class Todo extends React.Component<{}, TodoState> {
  private addTodoInput: React.RefObject<HTMLInputElement>;
  // React.createRef for focus.

  constructor(props: {}) {
    super(props);
    this.state = {
      newTodo: {
        text: "",
        id: JSON.parse(localStorage.getItem("todos"))?.slice(-1)[0]?.id ?? 0,
        done: false,
      },
      todoItems: [],
      searchItem: "",
      filteredItems: [],
    };

    this.addTodoInput = React.createRef();

    this.handleFilter = this.handleFilter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.addTodoInput.current.focus();
    const values = localStorage.getItem("todos");

    if (values) {
      this.setState({ todoItems: JSON.parse(values) });
    }
  }

  componentDidUpdate(prevProps: {}, prevState: TodoState) {
    if (prevState.searchItem != this.state.searchItem) {
      this.handleFilter();
    }
    if (prevState.todoItems != this.state.todoItems) {
      this.setState({ filteredItems: this.state.todoItems });
      localStorage.setItem("todos", JSON.stringify(this.state.todoItems));
    }
  }

  handleFilter() {
    const suitableItems = this.state.todoItems.filter((todo) =>
      todo.text.toLowerCase().includes(this.state.searchItem)
    );
    this.setState({ filteredItems: suitableItems });
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    this.addTodoInput.current.focus();
    const newTodo = this.state.newTodo;

    if (newTodo.text !== "") {
      this.setState({
        todoItems: [
          ...this.state.todoItems,
          { ...newTodo, id: newTodo.id + 1 },
        ],
        newTodo: { text: "", done: false, id: newTodo.id + 1 },
      });
    }
  }

  handleToggle(todo: ITodo) {
    this.setState({
      todoItems: this.state.todoItems.map((el) =>
        el.id == todo.id ? { ...el, done: !todo.done } : el
      ),
    });
  }

  handleDelete(todo: ITodo) {
    this.addTodoInput.current.focus();
    this.setState({
      todoItems: this.state.todoItems.filter((el) => el.id != todo.id),
    });
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            ref={this.addTodoInput}
            type="text"
            value={this.state.newTodo.text}
            onChange={(e) =>
              this.setState({
                newTodo: { ...this.state.newTodo, text: e.target.value },
              })
            }
          />
          <button type="submit">Add</button>
        </form>
        <input
          type="text"
          value={this.state.searchItem}
          onChange={(e) =>
            this.setState({ searchItem: e.target.value.toLowerCase() })
          }
        />
        <button onClick={this.handleFilter}>Search</button>
        <ul>
          {this.state.filteredItems.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => this.handleToggle(todo)}
              onDelete={() => this.handleDelete(todo)}
            />
          ))}
        </ul>
      </>
    );
  }
}

interface TodoItemProps {
  todo: Omit<ITodo, "id">;
  onToggle: () => void;
  onDelete: () => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const STYLES = todo.done
    ? { color: "green", textDecoration: "line-through" }
    : { color: "red" };
  return (
    <li style={STYLES}>
      {todo.text}
      <input checked={todo.done} onChange={onToggle} type="checkbox" />
      <button onClick={onDelete}>&times;</button>
    </li>
  );
}
