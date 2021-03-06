import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'The Adventures of Huckleberry Finn',
      'Life on the Mississippi',
      'Roughing It'  
    ]
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'It',
      'The Shining',
      'Carrie'
    ]
  },
  {
    name: 'Terry Pratchett',
    imageUrl: 'images/authors/terrypratchett.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'Guards! Guards!',
      'Making Money',
      'The Colour Magic'
    ]
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'Twelfth Night',
      'Romeo and Juliet',
      'The Tempest'
    ]
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) => 
      author.books.some((title) => 
        title === answer))
  }
};

const state = {
  turnData: getTurnData(authors),
  highlight: ''
};

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct': 'wrong';
render();
}

function render() {
  ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}/>, 
    document.getElementById('root'));
}
render();



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
