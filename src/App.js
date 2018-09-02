import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as api from './api';
import './App.css';
import Header from './components/Header';
import AllArticles from './components/AllArticles';
import ArticlePage from './components/ArticlePage';
import Error from './components/Error';

class App extends Component {
  state = {
    currentUser: {},
    error: null
  }

  render() {
    if (this.state.error) {
      return <div className="App">
        <Header currentUser={this.state.currentUser} resetError={this.resetError}/>
        <Error error={this.state.error} />
      </div>
    } else return (
      <div className="App">
      <Header currentUser={this.state.currentUser} resetError={this.resetError}/>
        <Switch>
          <Route path={`/articles/:article_id`} render={(routeProps) => <ArticlePage {...routeProps} currentUser={this.state.currentUser} handleError={this.handleError}/>}/>
          <Route exact path="/" render={() => <AllArticles currentUser={this.state.currentUser} handleError={this.handleError}/>}/>
          <Route path="/*" component={Error}/>
        </Switch>
      </div>
    );
  };

  componentDidMount() {
    api.getUser('cooljmessy')
    .then((currentUser) => {
      this.setState({
        currentUser
      })
    })
  }

  handleError = (error) => {
    this.setState({
      error
    })
  }

  resetError = () => {
    this.setState({
      error: null
    })
  }
  
}

export default App;
