import React, { Component } from 'react';
import BookShelf from './BookShelf.js';

class ListBooks extends Component {
  /* takes in book ID and the shelf chosen by end user
   * filters out the book object from the App.js state
   * passes along the book object with the desired shelf to parent */
  shelfChange = (id, shelf) => {
    let books = this.props.shelfBooks;
    const book = books.filter(b => b.id === id)[0];
    this.props.onShelfChange(book, shelf);
  };

  render() {
    return (
      <div>
        <BookShelf
          key="currentlyReading"
          books={this.props.shelfBooks.filter(book => book.shelf === 'currentlyReading')}
          onShelfChange={this.shelfChange}
          shelf="Currently Reading"
        />
        <BookShelf
          key="wantToRead"
          books={this.props.shelfBooks.filter(book => book.shelf === 'wantToRead')}
          onShelfChange={this.shelfChange}
          shelf="Want To Read"
        />
        <BookShelf
          key="read"
          books={this.props.shelfBooks.filter(book => book.shelf === 'read')}
          onShelfChange={this.shelfChange}
          shelf="Read"
        />
      </div>
    );
  };
};

export default ListBooks;
