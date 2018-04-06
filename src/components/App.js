import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI.js';
import '../styles/App.css';
import ListBooks from './ListBooks.js';
import SearchBooks from './SearchBooks.js';

class BooksApp extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({
        books: res
      });
    });
  };
/* takes book and shelf passed from child component
 * calls the update function from BooksAPI
 * updates state with the results */
  updateShelves = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      BooksAPI.getAll().then(res => {
        this.setState({
          books: res
        });
      });
    });
  };

  render() {
    return (
    	<div className="app">
      {/*Home page*/}
        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks onShelfChange={this.updateShelves} shelfBooks={this.state.books} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      {/*Search page*/}
       	<Route path="/search" exact render={() => (
    			<SearchBooks onShelfChange={this.updateShelves} shelfBooks={this.state.books} />
    		)}/>
	  	</div>
    );
  };
};

export default BooksApp;
