import React from "react";

export default function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(username, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  );
}

interface LoginFormState {
  username: string;
  password: string;
}

export class ClassLoginForm extends React.Component<{}, LoginFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(this.state);
          this.setState({ username: "", password: "" });
        }}
      >
        <div className="form-control">
          <label htmlFor="">Username</label>
          <input
            type="text"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    );
  }
}
