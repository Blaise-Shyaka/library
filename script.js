/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
import {
  getDomElement,
  setInnerHTML,
  setValue,
  setCheckedValue,
  getAllElementsOfType,
  addEvent,
// eslint-disable-next-line import/extensions
} from './dom.js';

const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.toggleStatus = function () {
    this.readStatus = !this.readStatus;
  };
}

function getUserInput() {
  const title = getDomElement('#title').value;
  const author = getDomElement('#author').value;
  const pages = getDomElement('#pages').value;
  const readStatus = getDomElement('#checkbox').checked;

  return {
    title,
    author,
    pages,
    readStatus,
  };
}

function validateForm(obj) {
  const formValues = Object.values(obj);
  let emptyInputTagsCount = 0;
  for (let i = 0; i < formValues.length; i += 1) {
    if (formValues[i].length === 0) emptyInputTagsCount += 1;
  }

  if (emptyInputTagsCount > 0) return false;
  return true;
}

function notifyUser(obj) {
  const titleNotice = getDomElement('#title-notice');
  const authorNotice = getDomElement('#author-notice');
  const pagesNotice = getDomElement('#pages-notice');

  if (obj.title.length === 0) {
    setInnerHTML(titleNotice, 'Title is required');
  }

  if (obj.author.length === 0) {
    setInnerHTML(authorNotice, 'Author is required');
  }

  if (obj.pages.length === 0) {
    setInnerHTML(pagesNotice, 'Number of pages is required');
  }
}

function cleanNoticeBoard() {
  setInnerHTML(getDomElement('#title-notice'), '');
  setInnerHTML(getDomElement('#author-notice'), '');
  setInnerHTML(getDomElement('#pages-notice'), '');
}

function cleanForm() {
  setValue(getDomElement('#title'), '');
  setValue(getDomElement('#author'), '');
  setValue(getDomElement('#pages'), '');
  setCheckedValue(getDomElement('#checkbox'), false);
}

function addCard(arr, obj) {
  const card = `<div class='col-sm-4 my-2'>
    <div class='card text-center text-dark bg-light'>
      <div class='card-header'>
        ${obj.title}
      </div>
      <div class='card-body'>
        <h5 class='card-title'>${obj.author}</h5>
        <p class='card-text'>${obj.pages} pages</p>
        <a href='#' class="btn ${obj.readStatus ? 'btn-success' : 'btn-primary'} toggle" data-index-number="${arr.indexOf(obj)}">${obj.readStatus ? 'Read' : 'Not read'}</a>
        <a href='#' class='btn btn-danger dlt-button' data-index-number="${arr.indexOf(obj)}">Delete</a>
      </div>
    </div>
  </div>`;

  return card;
}

function printCard(arr) {
  const markup = arr.map(elt => addCard(arr, elt)).join('');
  const booksList = getDomElement('#books_list');
  setInnerHTML(booksList, markup);
  const allDeleteBtn = getAllElementsOfType('.dlt-button');
  const allToggleBtn = getAllElementsOfType('.toggle');

  addEvent(allDeleteBtn, 'click', deleteOneCard);
  addEvent(allToggleBtn, 'click', toggleBookStatus);
}

// eslint-disable-next-line consistent-return
function addBookToLibrary() {
  cleanNoticeBoard();

  const formIsValid = validateForm(getUserInput());
  if (!formIsValid) return notifyUser(getUserInput());

  const {
    title, author, pages, readStatus,
  } = getUserInput();
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
}

const addBook = getDomElement('#addBook');
const newBook = getDomElement('#toggle-add-book');

function toggleNewBook() {
  const elt = newBook;
  const form = getDomElement('.form_book');
  elt.classList.toggle('d-none');
  form.classList.toggle('d-none');
}

addBook.addEventListener('click', () => {
  addBookToLibrary();
  printCard(myLibrary);
  cleanForm();
  toggleNewBook();
});

function deleteOneCard(event) {
  const clickedButton = event.currentTarget;
  const correspondingBookIndex = clickedButton.dataset.indexNumber;
  myLibrary.splice(correspondingBookIndex, 1);
  printCard(myLibrary);
}

function toggleBookStatus(event) {
  const bookIndex = event.currentTarget.dataset.indexNumber;
  const book = myLibrary[bookIndex];
  book.toggleStatus();
  printCard(myLibrary);
}

newBook.addEventListener('click', toggleNewBook);
