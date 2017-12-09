const { connect, Provider } = ReactRedux;
const { createStore, combineReducers } = Redux;
const { Component } = React;

// +----------------+
// |                |
// |    ACTIONS     |
// |                |
// +----------------+

function addTodo(text) {
 return { type: 'ADD_TODO', text }
}

// +----------------+
// |                |
// |    REDUCERS    |
// |                |
// +----------------+

const reducers = {
  todos: (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          action.todo
        ]
      default:
        return state
    }
  }
};

// +----------------+
// |                |
// |     STORE      |
// |                |
// +----------------+

const store = createStore(combineReducers(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


// +----------------+
// |                |
// |   COMPONENTS   |
// |                |
// +----------------+

class List extends React.Component {

  createTodo = (e) => {
    e.preventDefault();
    store.dispatch(addTodo({
      text: this.refs.text.value
    }));
    this.refs.text.value = '';
  }

  todos = () => {
    return this.props.todos.map(todo => {
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

function mapStateToProps(state) {
  const { todos } = state;
  return { todos };
}

List = connect(mapStateToProps)(List)

class App extends React.Component {
  render() {
    return <Provider store={store}>
      <List />
    </Provider>
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
