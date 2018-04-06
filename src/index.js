import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BooksApp from './components/App.js';
import './styles/index.css';

ReactDOM.render(
  <BrowserRouter><BooksApp /></BrowserRouter>,
  document.getElementById('root')
);
