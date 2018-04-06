import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI.js';

class SearchBooks extends React.Component {
	state = {
		query: '',
		results: []
	};

	updateQuery = (string) => {
		this.setState({
			query: string
		});
		BooksAPI.search(string)
		.then((res) => {
			if (res.error) {
				this.setState({
					results: []
				});
			} else {
				this.updateResults(res);
			};
		});
	};

	updateResults = (books) => {
		this.setState({
			results: books
		});
	};
	/* takes in book ID and the shelf chosen by end user
   * filters out the book object from the search results
   * passes along the book object with the desired shelf to parent */
	shelfChange = (id, shelf) => {
		let books = this.state.results;
		const book = books.filter(b => b.id === id)[0];
		book.shelf = shelf;
		this.props.onShelfChange(book, shelf);
	};

	render() {
	  return (
  		<div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
          	<input
							type="text"
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
          </div>
        </div>
        <div className="search-books-results">
					<ol className="books-grid">
						{this.state.results.map(book =>
							<li key={book.id} className="book">
								<div className="book-top">
									<div className="book-cover" style={{
										width: 128,
										height: 193,
										backgroundImage: book.imageLinks ? (
											`url(${book.imageLinks.thumbnail})`
										) : (null)}} />
									<div className="book-shelf-changer">
											<select
												value={book.shelf}
												onChange={(event) => this.shelfChange(book.id, event.target.value)}
											>
												<option value="none" disabled>Move to...</option>
												<option value="currentlyReading">Currently Reading</option>
												<option value="wantToRead">Want to Read</option>
												<option value="read">Read</option>
												<option value="none">None</option>
											</select>
									</div>
								</div>
							</li>
						)}
					</ol>
        </div>
      </div>
  	);
	};
};

export default SearchBooks;
