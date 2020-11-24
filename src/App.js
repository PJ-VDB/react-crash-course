import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddTodo from "./components/AddTodo";
import Header from "./components/layout/Header";
import React, { Component } from "react";
import Todos from "./components/Todos";
import About from "./components/pages/About";
// import { v4 as uuid } from "uuid";
import axios from "axios";

class App extends Component {
  state = {
    todos: [
      // {
      //   id: uuid(),
      //   title: "Take out the trash",
      //   completed: false,
      // },
      // {
      //   id: uuid(),
      //   title: "Dinner with gf",
      //   completed: false,
      // },
      // {
      //   id: uuid(),
      //   title: "Meeting with boss",
      //   completed: false,
      // },
    ],
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => this.setState({ todos: res.data }));
  }

  //Toggle the complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        //run through list to find the correct todo
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
    // console.log(id);
  };

  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then((res) => {
      this.setState({
        todos: [...this.state.todos.filter((todo) => todo.id !== id)],
      });
      //... copies all data
    })
  };

  addTodo = (title) => {
    // const newTodo = {
    //   id: uuid(),
    //   title: title,
    //   completed: false,
    // };
    axios
      .post("https://jsonplaceholder.typicode.com/todos/", {
        title: title,
        completed: false,
      })
      .then((res) =>
        this.setState({
          todos: [...this.state.todos, res.data],
        })
      );
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header> </Header>
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo}> </AddTodo>
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  ></Todos>
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
