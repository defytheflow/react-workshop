import React from "react";

interface CounterProps {
  initialValue?: number;
  toWin: number;
  onWin: () => void;
}

interface CounterState {
  value: number;
  loading: boolean;
  pets: Array<string>;
}

export default function Counter(props: CounterProps) {
  const [value, setValue] = React.useState(props.initialValue ?? 0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setValue(Math.floor(Math.random() * 20));
      setLoading(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (props.toWin && value === props.toWin) {
      props.onWin();
    }
  }, [value]);

  function handleIncrease() {
    setValue(value + 1);
  }

  function handleDecrease() {
    setValue(value - 1);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <span>{value}</span>
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleDecrease}>Decrease</button>
    </>
  );
}

export class ClassCounter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      value: 0,
      loading: true,
      pets: ["Meow", "Dog", "Rabbit", "Cow"],
    };
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false, value: Math.floor(Math.random() * 20) });
    }, 1500);
  }

  componentDidUpdate(prevProps: CounterProps, prevState: CounterState) {
    if (
      prevState.value !== this.state.value &&
      this.props.toWin &&
      this.state.value === this.props.toWin
    ) {
      alert("You have won!");
    }
  }

  handleIncrease() {
    this.setState({ value: this.state.value + 1 });
  }

  handleDecrease() {
    this.setState({ value: this.state.value - 1 });
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }

    return (
      <>
        {this.state.value > 10 && <p>Look, value is greater than 10!</p>}
        {this.state.pets.map((pet) => (
          <h3 key={pet}>{pet}</h3>
        ))}
        <span>{this.state.value}</span>
        <button onClick={this.handleIncrease}>Increase</button>
        <button onClick={this.handleDecrease}>Decrease</button>
      </>
    );
  }
}
