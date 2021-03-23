import React from "react";
import ReactDOM from "react-dom";

import Todo from "./TodoClass";
import Counter from "./Counter";
import LoginForm from "./LoginForm";
import TodoFunctions from "./TodoFunctions";

interface FooterProps {
  color: string;
}

function Footer(props: FooterProps) {
  return (
    <h1 id="myFooter" style={{ color: props.color }}>
      Footer
    </h1>
  );
}

function App() {
  const [wins, setWins] = React.useState(0);

  return (
    <>
      {/* <h1>Wins: {wins}</h1>
      <Counter toWin={20} onWin={() => setWins(wins + 1)} />
      <Footer color="blue" />
      <LoginForm /> */}
      <TodoFunctions />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
