const { Component } = React;

class List extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  createTodo = (e) => {
    e.preventDefault();
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: this.state.todos.length,
          text: this.refs.text.value
        }
      ]
    });
    this.refs.text.value = '';
  }

  todos = () => {
    return this.state.todos.map(todo => {
      return (<li key={todo.id}>{todo.text}</li>);
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.todos()}
        </ul>
        <form onSubmit={this.createTodo}>
          <input ref='text' placeholder="Add a TODO"/>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return <List />;
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
